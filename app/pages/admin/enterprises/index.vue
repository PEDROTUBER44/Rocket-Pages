<script setup lang="ts">
import { z } from 'zod';

const toast = useToast();
const { user, fetchUser } = useAuth();
const csrfCookie = useCsrfCookie();

const isMenuOpen = ref(false);

// --- State ---
const isLoading = ref(true);
const isSaving = ref(false);
const enterprises = ref<any[]>([]);
const currentPage = ref(1);
const itemsPerPage = 20;
const totalItems = ref(0); // Add total items tracking if API provides it
const hasMore = ref(false);

// Filters
const searchQuery = ref('');
const filterChecked = ref<boolean | null>(null); // null = all, true = checked, false = unchecked
const filterAnnotated = ref<boolean | null>(null);

// Modal state
const isModalOpen = ref(false);
const selectedEnterprise = ref<any>(null);

// Interaction Form
const interactionForm = reactive({
  checked: false,
  annotation: ''
});

// --- Background Particles ---
const particles = ref<{ left: string; size: string; delay: string; duration: string }[]>([]);
onMounted(async () => {
  for (let i = 0; i < 20; i++) {
    particles.value.push({
      left: Math.random() * 100 + '%',
      size: Math.random() * 3 + 1 + 'px',
      delay: Math.random() * 5 + 's',
      duration: Math.random() * 10 + 10 + 's'
    });
  }
  await Promise.all([
    fetchUser(),
    loadEnterprises()
  ]);
});

/* --- Navigation Data --- */
// Copied and adapted logic as per instructions to match existing styles
const accordionItems = computed(() => {
  const items = [
    { label: "Conta", icon: "i-lucide-user-circle", slot: "account" },
    { label: "Gerenciamento", icon: "i-lucide-briefcase", slot: "management" },
    { label: "Recursos", icon: "i-lucide-box", slot: "resources" }
  ];
  
  const hasAdminRole = user.value?.roles?.some((r: string) => 
    ['rocket_contact_admin', 'rocket_fitness_admin', 'enterprise_informations'].includes(r)
  );
  if (hasAdminRole) {
    items.push({ label: "Administração", icon: "i-lucide-shield", slot: "admin", defaultOpen: true } as any);
  }
  
  return items;
});

const accountLinks = [
  { label: 'Perfil', icon: 'i-lucide-user', to: '/account' },
  { label: 'Segurança', icon: 'i-lucide-shield-check', to: '/account' },
];
const managementLinks = [
   { label: 'Gerenciar Empresas', icon: 'i-lucide-building-2', to: '/manage_company' },
   { label: 'Painel Fitness', icon: 'i-lucide-activity', to: '/rocketfitnessapp', condition: user.value?.roles?.includes('rocket_fitness') },
];
const resourceLinks = [
    { label: 'Documentação', icon: 'i-lucide-file-text', to: '#' },
    { label: 'Suporte', icon: 'i-lucide-life-buoy', to: '#' },
];

const adminLinks = computed(() => {
  const links = [];
  
  if (user.value?.roles?.includes('rocket_contact_admin')) {
    links.push({ label: 'Gerenciar Contatos', icon: 'i-lucide-mail', to: '/admin/contacts' });
  }
  
  if (user.value?.roles?.includes('rocket_fitness_admin')) {
    links.push(
      { label: 'Gerenciar Exercícios', icon: 'i-lucide-dumbbell', to: '/admin/fitness/exercises' },
      { label: 'Dados Auxiliares', icon: 'i-lucide-database', to: '/admin/fitness/auxiliary' }
    );
  }

  if (user.value?.roles?.includes('enterprise_informations')) {
    links.push(
      { label: 'Empresas (Data)', icon: 'i-lucide-database-zap', to: '/admin/enterprises', active: true }
    );
  }
  
  return links;
});

// Debounce search
let searchTimeout: ReturnType<typeof setTimeout>;
watch([searchQuery, filterChecked, filterAnnotated], () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    loadEnterprises();
  }, 400);
});

// --- API Calls ---

async function loadEnterprises() {
  isLoading.value = true;
  try {
    const params = new URLSearchParams();
    params.set('limit', itemsPerPage.toString());
    params.set('page', (currentPage.value - 1).toString()); // Start index or page number? Backend handler calls it 'page' and multiplies by limit? Let's check handler. 
    // Handlers: `let limit = params.limit.min(20);` `params.page`
    // DB: `match db::get_enterprises_with_user_context(&client, &auth.user_id, params.page, limit)`
    // Usually page is 0-indexed or 1-indexed. Assuming 0-indexed based on offset logic usually used.
    // If backend uses page directly for offset calculation `page * limit`, then 0 is first page.

    let endpoint = '/api/enterprise_informations';

    // If we have search or specific filters, use the search endpoint
    if (searchQuery.value || filterChecked.value !== null || filterAnnotated.value !== null) {
      endpoint = '/api/enterprise_informations/search';
      if (searchQuery.value) params.set('q', searchQuery.value);
      if (filterChecked.value !== null) params.set('filter_checked', filterChecked.value.toString());
      if (filterAnnotated.value !== null) params.set('filter_has_annotation', filterAnnotated.value.toString());
    }

    const res = await $fetch<any>(`${endpoint}?${params.toString()}`);
    
    // Response structure from backend: { data: [], page: N, total: N, has_more: bool }
    enterprises.value = res.data || [];
    totalItems.value = res.total || 0;
    hasMore.value = res.has_more || false;
  } catch (e: any) {
    toast.add({ title: 'Erro', description: 'Falha ao carregar empresas', color: 'neutral' });
    enterprises.value = [];
  } finally {
    isLoading.value = false;
  }
}

async function openDetailsModal(enterpriseId: string) {
  isLoading.value = true;
  try {
    const res = await $fetch<any>(`/api/enterprise_informations/${enterpriseId}`);
    selectedEnterprise.value = res;
    
    // Populate form from interaction
    interactionForm.checked = res.user_interaction?.checked || false;
    interactionForm.annotation = res.user_interaction?.annotation || '';
    
    isModalOpen.value = true;
  } catch (e) {
    toast.add({ title: 'Erro', description: 'Falha ao carregar detalhes', color: 'neutral' });
  } finally {
    isLoading.value = false;
  }
}

async function saveInteraction() {
  if (!selectedEnterprise.value) return;
  
  isSaving.value = true;
  try {
    const payload = {
      checked: interactionForm.checked,
      annotation: interactionForm.annotation || null
    };

    const res = await $fetch(`/api/enterprise_informations/${selectedEnterprise.value.id}/interact`, {
        method: 'PATCH',
        headers: { 'X-CSRF-Token': csrfCookie.value || '' },
        body: payload
    });

    // Update local state
    if (selectedEnterprise.value) {
        selectedEnterprise.value.user_interaction = res;
    }
    
    // Update list item if exists
    const idx = enterprises.value.findIndex(e => e.id === selectedEnterprise.value.id);
    if (idx !== -1) {
        enterprises.value[idx].user_interaction = res;
    }

    toast.add({ title: 'Sucesso', description: 'Interação salva!', color: 'primary' });
    // Don't close modal, user might want to continue reading
  } catch (e: any) {
    toast.add({ title: 'Erro', description: 'Falha ao salvar interação', color: 'neutral' });
  } finally {
    isSaving.value = false;
  }
}

function formatDate(dateStr: string) {
    if (!dateStr) return '-';
    try {
        return new Date(dateStr).toLocaleDateString('pt-BR');
    } catch {
        return dateStr;
    }
}

function formatCapital(val: number) {
    if (val === undefined || val === null) return '-';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
}

useAppSeo({
  title: 'Base de Empresas - Admin',
  description: 'Gestão da base de dados de empresas e prospecção',
});
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-gray-200 font-sans flex flex-col relative overflow-hidden">
    
    <!-- Background Effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="grid-bg absolute inset-0"></div>
      <div class="absolute inset-0">
        <div class="floating-blob blob-neutral top-[-10%] left-[-5%] w-[500px] h-[500px]"></div>
        <div class="floating-blob blob-white bottom-[-10%] right-[-5%] w-[400px] h-[400px]"></div>
      </div>
      <div class="absolute inset-0">
        <div 
          v-for="(p, i) in particles" 
          :key="i"
          class="particle"
          :style="{ 
            left: p.left, 
            width: p.size, 
            height: p.size, 
            animationDelay: p.delay, 
            animationDuration: p.duration 
          }"
        ></div>
      </div>
    </div>
    
    <!-- Header -->
    <header class="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl transition-all duration-300">
      <UContainer class="flex h-16 items-center justify-between gap-3">
        <div class="flex items-center gap-4 lg:flex-1">
           <UButton icon="i-lucide-menu" color="neutral" variant="ghost" aria-label="Menu" @click="isMenuOpen = true" />
          <NuxtLink to="/" class="flex items-center hover:opacity-80 transition-opacity">
            <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-8 w-auto" />
          </NuxtLink>
        </div>
        <div class="flex items-center justify-end gap-3 lg:flex-1">
             <div class="flex items-center gap-3 pl-2" v-if="user">
                 <span class="text-sm font-medium text-white hidden sm:block">{{ user.username }}</span>
                 <UAvatar :src="user.profile_icon_url" size="sm" class="ring-2 ring-transparent bg-gray-800" />
             </div>
        </div>
      </UContainer>
    </header>

    <!-- Slideover Menu -->
    <ClientOnly>
      <USlideover v-model:open="isMenuOpen" side="left" class="mobile-menu-slideover" :ui="{ content: '!w-[280px] !max-w-[280px] !flex-none' }">
        <template #content>
            <div class="flex flex-col h-full bg-[#0a0a0a] border-r border-white/10 w-full">
                <div class="flex items-center justify-between p-6 mb-2">
                  <div class="flex items-center">
                    <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-7 w-auto" />
                  </div>
                  <UButton icon="i-lucide-menu" color="neutral" variant="ghost" @click="isMenuOpen = false" />
                </div>

                <div class="flex-1 overflow-y-auto custom-scrollbar space-y-2 px-6">
                     <UAccordion :items="accordionItems" :ui="{ item: 'pt-0 pb-2 text-sm text-white', trigger: 'px-3 py-2 text-gray-300 hover:text-white bg-transparent hover:bg-white/5 font-medium w-full justify-start rounded-md mb-1' }">
                        <template #account>
                            <div class="pl-4 mt-1 space-y-1 border-l border-white/10 ml-2">
                                <NuxtLink v-for="item in accountLinks" :key="item.label" :to="item.to" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                                    <UIcon :name="item.icon" class="w-4 h-4" />
                                    {{ item.label }}
                                </NuxtLink>
                            </div>
                        </template>
                        <template #management>
                             <div class="pl-4 mt-1 space-y-1 border-l border-white/10 ml-2">
                                <NuxtLink v-for="item in managementLinks" :key="item.label" :to="item.to" v-show="item.condition !== false" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                                     <UIcon :name="item.icon" class="w-4 h-4" />
                                     {{ item.label }}
                                </NuxtLink>
                             </div>
                        </template>
                        <template #resources>
                             <div class="pl-4 mt-1 space-y-1 border-l border-white/10 ml-2">
                                 <NuxtLink v-for="item in resourceLinks" :key="item.label" :to="item.to" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                                     <UIcon :name="item.icon" class="w-4 h-4" />
                                     {{ item.label }}
                                </NuxtLink>
                             </div>
                        </template>
                        <template #admin>
                             <div class="pl-4 mt-1 space-y-1 border-l border-primary-500/30 ml-2">
                                 <NuxtLink 
                                   v-for="item in adminLinks" 
                                   :key="item.label" 
                                   :to="item.to" 
                                   :class="['flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200', item.active ? 'text-primary-400 bg-primary-500/10 font-medium' : 'text-gray-400 hover:text-primary-400 hover:bg-primary-500/10']"
                                 >
                                     <UIcon :name="item.icon" class="w-4 h-4" />
                                     {{ item.label }}
                                </NuxtLink>
                             </div>
                        </template>
                     </UAccordion>
                </div>
            </div>
        </template>
      </USlideover>
    </ClientOnly>

    <main class="flex-1 relative z-10 w-full overflow-y-auto pt-24 pb-16 px-4 md:px-8">
      <UContainer class="max-w-7xl">
        
        <!-- Header -->
        <div class="mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 class="text-3xl md:text-4xl font-bold text-white">Base de Empresas</h1>
              <p class="text-gray-400 mt-2">Visualize e gerencie o processo de prospecção</p>
            </div>
            <!-- No Create button as per requirements -->
          </div>
          
          <!-- Filters -->
          <div class="flex flex-wrap gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <div class="flex-1 min-w-[200px]">
              <div class="relative">
                <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  v-model="searchQuery"
                  type="text"
                  placeholder="Buscar por nome, CNPJ ou cidade..."
                  class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 pl-10 pr-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-500"
                />
              </div>
            </div>
            
            <div class="min-w-[150px]">
               <select 
                  v-model="filterChecked" 
                  class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
                >
                  <option :value="null" class="bg-[#0c0d0f]">Todos Status</option>
                  <option :value="true" class="bg-[#0c0d0f]">Verificados</option>
                  <option :value="false" class="bg-[#0c0d0f]">Pendentes</option>
                </select>
            </div>

            <div class="min-w-[150px]">
               <select 
                  v-model="filterAnnotated" 
                  class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
                >
                  <option :value="null" class="bg-[#0c0d0f]">Anotações (Todas)</option>
                  <option :value="true" class="bg-[#0c0d0f]">Com Anotação</option>
                  <option :value="false" class="bg-[#0c0d0f]">Sem Anotação</option>
                </select>
            </div>
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="isLoading && enterprises.length === 0" class="flex justify-center items-center py-20">
          <div class="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="enterprises.length === 0" class="text-center py-20">
          <UIcon name="i-lucide-building-2" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-400 mb-2">Nenhuma empresa encontrada</h3>
          <p class="text-gray-500 mb-4">Tente ajustar os filtros de busca.</p>
        </div>
        
        <!-- Enterprises List -->
        <div v-else class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-white/5 text-gray-400 uppercase font-semibold text-xs border-b border-white/10">
                <tr>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4">Empresa / CNPJ</th>
                  <th class="px-6 py-4">Localização</th>
                  <th class="px-6 py-4">Contatos</th>
                  <th class="px-6 py-4">Responsável</th>
                  <th class="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr 
                  v-for="ent in enterprises" 
                  :key="ent.id"
                  class="hover:bg-white/5 transition-colors cursor-pointer group"
                  @click="openDetailsModal(ent.id)"
                >
                  <td class="px-6 py-3">
                     <div v-if="ent.user_interaction?.checked" class="flex items-center gap-2 text-green-400 font-bold text-xs uppercase bg-green-900/20 px-2 py-1 rounded w-fit">
                         <UIcon name="i-lucide-check-circle-2" class="w-4 h-4" />
                         <span>Verificado</span>
                     </div>
                     <div v-else class="flex items-center gap-2 text-gray-500 text-xs uppercase bg-white/5 px-2 py-1 rounded w-fit">
                         <UIcon name="i-lucide-circle" class="w-4 h-4" />
                         <span>Pendente</span>
                     </div>
                  </td>
                  <td class="px-6 py-3">
                    <div class="font-bold text-white">{{ ent.fantasy_name || ent.name }}</div>
                    <div class="text-xs text-gray-500" title="CNPJ">{{ ent.cnpj }}</div>
                    <div v-if="ent.name !== ent.fantasy_name" class="text-xs text-gray-600 truncate max-w-[200px]">{{ ent.name }}</div>
                  </td>
                  <td class="px-6 py-3">
                    <div class="text-gray-300">{{ ent.address?.city }} - {{ ent.address?.state }}</div>
                    <div class="text-xs text-gray-500">{{ ent.address?.neighborhood }}</div>
                  </td>
                  <td class="px-6 py-3">
                     <div class="flex flex-col gap-1">
                        <div v-for="c in (ent.contacts || []).slice(0, 2)" :key="c.value" class="flex items-center gap-2 text-xs text-gray-400">
                             <UIcon :name="c.kind === 'email' ? 'i-lucide-mail' : 'i-lucide-phone'" class="w-3 h-3" />
                             <span class="truncate max-w-[150px]">{{ c.value }}</span>
                        </div>
                        <span v-if="(ent.contacts?.length || 0) > 2" class="text-xs text-gray-600">+{{ ent.contacts.length - 2 }} contatos</span>
                     </div>
                  </td>
                  <td class="px-6 py-3">
                      <span v-if="ent.owner" class="text-gray-300 text-sm block">{{ ent.owner.name }}</span>
                      <span v-if="ent.owner" class="text-xs text-gray-500">{{ ent.owner.role }}</span>
                      <span v-else class="text-gray-600 text-xs italic">Não informado</span>
                  </td>
                  <td class="px-6 py-3 text-right">
                    <UButton 
                        icon="i-lucide-eye"
                        variant="ghost"
                        color="primary"
                        class="opacity-0 group-hover:opacity-100 transition-opacity"
                        size="sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination -->
          <div class="flex justify-between items-center p-4 border-t border-white/10 bg-white/5">
             <div class="text-xs text-gray-500">
                 Total: {{ totalItems }} empresas
             </div>
             
             <div class="flex gap-2">
                <UButton 
                icon="i-lucide-chevron-left"
                color="neutral"
                variant="ghost"
                :disabled="currentPage <= 1"
                @click="currentPage--; loadEnterprises()"
                />
                <span class="flex items-center px-4 text-gray-400 text-sm">Página {{ currentPage }}</span>
                <UButton 
                icon="i-lucide-chevron-right"
                color="neutral"
                variant="ghost"
                :disabled="!hasMore"
                @click="currentPage++; loadEnterprises()"
                />
             </div>
          </div>
        </div>
      </UContainer>
    </main>
    
    <!-- Modal Details -->
    <ClientOnly>
      <USlideover v-model:open="isModalOpen" side="right" :ui="{ content: '!w-full !max-w-2xl' }">
        <template #content>
          <div class="flex flex-col h-full bg-[#0a0a0a]" v-if="selectedEnterprise">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-white/10 bg-[#050505]">
              <div>
                  <h2 class="text-xl font-bold text-white">
                    {{ selectedEnterprise.fantasy_name || selectedEnterprise.name }}
                  </h2>
                  <p class="text-gray-500 text-sm font-mono mt-1">CNPJ: {{ selectedEnterprise.cnpj }}</p>
              </div>
              <UButton icon="i-lucide-x" color="neutral" variant="ghost" @click="isModalOpen = false" />
            </div>
            
            <!-- Content -->
            <div class="flex-1 overflow-y-auto p-6 space-y-8">
              
              <!-- Interaction Section (Top Priority) -->
              <div class="bg-primary-500/5 border border-primary-500/20 rounded-xl p-6">
                   <h3 class="text-primary-400 font-bold mb-4 flex items-center gap-2">
                       <UIcon name="i-lucide-clipboard-list" class="w-5 h-5"/>
                       Controle de Prospecção
                   </h3>
                   
                   <div class="space-y-4">
                       <div class="flex items-center justify-between bg-black/20 p-3 rounded-lg border border-white/5">
                           <span class="text-gray-300 font-medium">Marcar como Verificado/Contatado</span>
                           <UToggle v-model="interactionForm.checked" color="green" />
                       </div>
                       
                       <div>
                           <label class="block text-xs uppercase text-gray-500 font-bold mb-2">Anotações Internas</label>
                           <textarea 
                               v-model="interactionForm.annotation"
                               rows="4"
                               placeholder="Registre aqui o resultado da tentativa de contato, nome do decisor, melhor horário, etc."
                               class="w-full bg-[#050505] border border-white/10 rounded-lg p-3 text-white text-sm focus:ring-1 focus:ring-primary-500 outline-none resize-none placeholder:text-gray-600"
                           ></textarea>
                       </div>
                       
                       <div class="flex justify-end pt-2">
                           <UButton 
                               label="Salvar Interação"
                               icon="i-lucide-save"
                               :loading="isSaving"
                               @click="saveInteraction"
                               color="primary"
                           />
                       </div>
                   </div>
              </div>

              <!-- General Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <h4 class="text-gray-500 text-xs font-bold uppercase mb-3">Dados Cadastrais</h4>
                      <div class="space-y-3">
                          <div>
                              <span class="block text-gray-600 text-xs">Razão Social</span>
                              <span class="text-gray-200 text-sm">{{ selectedEnterprise.name }}</span>
                          </div>
                          <div>
                              <span class="block text-gray-600 text-xs">Natureza Legal</span>
                              <span class="text-gray-200 text-sm">{{ selectedEnterprise.legal_nature }}</span>
                          </div>
                           <div>
                              <span class="block text-gray-600 text-xs">Capital Social</span>
                              <span class="text-gray-200 text-sm">{{ formatCapital(selectedEnterprise.financial?.capital) }}</span>
                          </div>
                          <div>
                              <span class="block text-gray-600 text-xs">Data de Abertura</span>
                              <span class="text-gray-200 text-sm">{{ formatDate(selectedEnterprise.financial?.opening_date) }}</span>
                          </div>
                      </div>
                  </div>
                  
                   <div>
                      <h4 class="text-gray-500 text-xs font-bold uppercase mb-3">Atividade Econômica</h4>
                      <div class="space-y-3">
                          <div>
                              <span class="block text-gray-600 text-xs">CNAE Principal</span>
                              <span class="text-gray-200 text-sm font-mono bg-white/5 px-2 py-1 rounded inline-block">{{ selectedEnterprise.cnae }}</span>
                          </div>
                          <div>
                              <span class="block text-gray-600 text-xs">Descrição CNAE</span>
                              <span class="text-gray-200 text-sm leading-relaxed">{{ selectedEnterprise.cnae_description }}</span>
                          </div>
                          <div class="flex gap-2 mt-2">
                              <UBadge v-if="selectedEnterprise.financial?.mei" color="teal" variant="subtle" size="xs">MEI</UBadge>
                              <UBadge v-if="selectedEnterprise.financial?.simples_nacional" color="blue" variant="subtle" size="xs">Simples Nacional</UBadge>
                          </div>
                      </div>
                  </div>
              </div>

               <div v-if="selectedEnterprise.owner">
                   <h4 class="text-gray-500 text-xs font-bold uppercase mb-3 border-t border-white/5 pt-4">Quadro Societário</h4>
                    <div class="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                         <div class="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 font-bold">
                             {{ selectedEnterprise.owner.name.charAt(0) }}
                         </div>
                         <div>
                             <div class="text-white font-medium">{{ selectedEnterprise.owner.name }}</div>
                             <div class="text-xs text-gray-500">{{ selectedEnterprise.owner.role }}</div>
                         </div>
                    </div>
               </div>

              <div>
                  <h4 class="text-gray-500 text-xs font-bold uppercase mb-3 border-t border-white/5 pt-4">Contato & Endereço</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="bg-white/5 p-4 rounded-lg border border-white/5 space-y-2">
                           <div class="flex items-start gap-3">
                               <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-gray-400 mt-1 shrink-0"/>
                               <div class="text-sm text-gray-300">
                                   <div class="font-bold text-white">{{ selectedEnterprise.address?.street_type }} {{ selectedEnterprise.address?.street }}, {{ selectedEnterprise.address?.number }}</div>
                                   <div v-if="selectedEnterprise.address?.complement">{{ selectedEnterprise.address.complement }}</div>
                                   <div>{{ selectedEnterprise.address?.neighborhood }}</div>
                                   <div>{{ selectedEnterprise.address?.city }} - {{ selectedEnterprise.address?.state }}</div>
                                   <div class="text-gray-500 text-xs">{{ selectedEnterprise.address?.zip }}</div>
                               </div>
                           </div>
                      </div>
                      
                      <div class="bg-white/5 p-4 rounded-lg border border-white/5 space-y-3">
                           <div v-for="contact in selectedEnterprise.contacts" :key="contact.value" class="flex items-center gap-3">
                               <UIcon :name="contact.kind === 'email' ? 'i-lucide-mail' : 'i-lucide-phone'" class="w-4 h-4 text-gray-400"/>
                               <div class="text-sm">
                                   <div class="text-white select-all">{{ contact.value }}</div>
                                   <div class="text-xs text-gray-500 capitalize">{{ contact.kind }}</div>
                               </div>
                           </div>
                      </div>
                  </div>
              </div>

            </div>
          </div>
        </template>
      </USlideover>
    </ClientOnly>
  </div>
</template>

<style scoped>
/* === Background Grid Pattern === */
.grid-bg {
  background-size: 40px 40px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}

.floating-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float-slow 20s ease-in-out infinite;
}

.blob-neutral { background: rgba(40, 40, 40, 0.3); }
.blob-white { background: rgba(255,255,255,0.05); }

.particle {
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: rise linear infinite;
  pointer-events: none;
}

@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -50px) rotate(10deg); }
  66% { transform: translate(-20px, 20px) rotate(-5deg); }
}

@keyframes rise {
  0% { transform: translateY(100vh) scale(0); opacity: 0; }
  50% { opacity: 0.5; }
  100% { transform: translateY(-100px) scale(1); opacity: 0; }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #ca000d;
}

:deep(.mobile-menu-slideover > div > div) {
    width: 280px !important;
    max-width: 280px !important;
}
</style>
