<script setup lang="ts">
const toast = useToast();
const { user, fetchUser } = useAuth();
const csrfCookie = useCsrfCookie();

const isMenuOpen = ref(false);

// --- State ---
const isLoading = ref(true);
const isSaving = ref(false);

// Form states
const categoryForm = reactive({ name: '', description: '' });
const muscleForm = reactive({ name: '', body_part: 'UPPER_BODY' });
const equipmentForm = reactive({ name: '', gym_required: false });

// Data lists
const categories = ref<any[]>([]);
const muscles = ref<any[]>([]);
const equipment = ref<any[]>([]);

// Body part options
const bodyPartOptions = [
  { label: 'Parte Superior', value: 'UPPER_BODY' },
  { label: 'Parte Inferior', value: 'LOWER_BODY' },
  { label: 'Core / Abdômen', value: 'CORE' },
];

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
    await fetchUser();
    await loadAuxiliaryData();
});

/* --- Navigation Data (same as account.vue) --- */
const accordionItems = computed(() => {
  const items = [
    { label: "Conta", icon: "i-lucide-user-circle", slot: "account" },
    { label: "Gerenciamento", icon: "i-lucide-briefcase", slot: "management" },
    { label: "Recursos", icon: "i-lucide-box", slot: "resources" }
  ];
  
  const hasAdminRole = user.value?.roles?.some((r: string) => 
    ['rocket_contact_admin', 'rocket_fitness_admin'].includes(r)
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
      { label: 'Dados Auxiliares', icon: 'i-lucide-database', to: '/admin/fitness/auxiliary', active: true }
    );
  }
  
  return links;
});

// --- API Calls ---
async function loadAuxiliaryData() {
  isLoading.value = true;
  try {
    const res = await $fetch<any>('/api/fitness/auxiliary');
    categories.value = res.categories || [];
    muscles.value = res.muscles || [];
    equipment.value = res.equipment || [];
  } catch (e: any) {
    toast.add({ title: 'Erro', description: 'Falha ao carregar dados auxiliares', color: 'neutral' });
  } finally {
    isLoading.value = false;
  }
}

async function createCategory() {
  if (!categoryForm.name.trim()) return;
  
  isSaving.value = true;
  try {
    await $fetch('/api/fitness/admin/categories', {
      method: 'POST',
      headers: { 'X-CSRF-Token': csrfCookie.value || '' },
      body: {
        name: categoryForm.name,
        description: categoryForm.description || null
      }
    });
    toast.add({ title: 'Sucesso', description: 'Categoria criada!', color: 'primary' });
    categoryForm.name = '';
    categoryForm.description = '';
    await loadAuxiliaryData();
  } catch (e: any) {
    toast.add({ title: 'Erro', description: e.data?.error || 'Falha ao criar categoria', color: 'neutral' });
  } finally {
    isSaving.value = false;
  }
}

async function createMuscle() {
  if (!muscleForm.name.trim()) return;
  
  isSaving.value = true;
  try {
    await $fetch('/api/fitness/admin/muscles', {
      method: 'POST',
      headers: { 'X-CSRF-Token': csrfCookie.value || '' },
      body: {
        name: muscleForm.name,
        body_part: muscleForm.body_part
      }
    });
    toast.add({ title: 'Sucesso', description: 'Músculo criado!', color: 'primary' });
    muscleForm.name = '';
    muscleForm.body_part = 'UPPER_BODY';
    await loadAuxiliaryData();
  } catch (e: any) {
    toast.add({ title: 'Erro', description: e.data?.error || 'Falha ao criar músculo', color: 'neutral' });
  } finally {
    isSaving.value = false;
  }
}

async function createEquipment() {
  if (!equipmentForm.name.trim()) return;
  
  isSaving.value = true;
  try {
    await $fetch('/api/fitness/admin/equipment', {
      method: 'POST',
      headers: { 'X-CSRF-Token': csrfCookie.value || '' },
      body: {
        name: equipmentForm.name,
        gym_required: equipmentForm.gym_required
      }
    });
    toast.add({ title: 'Sucesso', description: 'Equipamento criado!', color: 'primary' });
    equipmentForm.name = '';
    equipmentForm.gym_required = false;
    await loadAuxiliaryData();
  } catch (e: any) {
    toast.add({ title: 'Erro', description: e.data?.error || 'Falha ao criar equipamento', color: 'neutral' });
  } finally {
    isSaving.value = false;
  }
}

async function deleteItem(type: 'categories' | 'muscles' | 'equipment', id: string) {
  if (!confirm('Tem certeza que deseja excluir este item?')) return;
  
  isSaving.value = true;
  try {
    await $fetch(`/api/fitness/admin/${type}/${id}`, {
      method: 'DELETE',
      headers: { 'X-CSRF-Token': csrfCookie.value || '' }
    });
    toast.add({ title: 'Sucesso', description: 'Item excluído!', color: 'primary' });
    await loadAuxiliaryData();
  } catch (e: any) {
    toast.add({ title: 'Erro', description: e.data?.error || 'Falha ao excluir item', color: 'neutral' });
  } finally {
    isSaving.value = false;
  }
}

function getBodyPartLabel(value: string) {
  return bodyPartOptions.find(o => o.value === value)?.label || value;
}

useAppSeo({
  title: 'Dados Auxiliares - Fitness Admin',
  description: 'Gerenciamento de categorias, músculos e equipamentos',
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
    
    <!-- Header (same as account.vue) -->
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

    <!-- Slideover Menu (same as account.vue) -->
    <ClientOnly>
      <USlideover v-model:open="isMenuOpen" side="left" class="mobile-menu-slideover" :ui="{ content: '!w-[280px] !max-w-[280px] !flex-none' }">
        <template #content>
            <div class="flex flex-col h-full bg-[#0a0a0a] border-r border-white/10 w-full">
                <div class="flex items-center justify-between p-6 mb-2">
                  <div class="flex items-center">
                    <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-7 w-auto" />
                  </div>
                  <UButton icon="i-lucide-x" color="neutral" variant="ghost" @click="isMenuOpen = false" />
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
              <h1 class="text-3xl md:text-4xl font-bold text-white">Dados Auxiliares</h1>
              <p class="text-gray-400 mt-2">Gerencie categorias, músculos e equipamentos do sistema Fitness</p>
            </div>
          </div>
          
          <!-- Info Banner -->
          <div class="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
            <UIcon name="i-lucide-info" class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <p class="text-sm text-blue-300">
              Gerencie as tabelas auxiliares usadas na criação de exercícios. Essas informações são compartilhadas em todo o sistema Fitness.
            </p>
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
          <div class="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <!-- Content Grid -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Categories Column -->
          <div class="space-y-4">
            <!-- Create Form -->
            <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                  <UIcon name="i-lucide-tag" class="w-5 h-5 text-primary-400" />
                </div>
                <h3 class="text-lg font-bold text-white">Nova Categoria</h3>
              </div>
              
              <form @submit.prevent="createCategory" class="space-y-3">
                <div>
                  <UInput 
                    v-model="categoryForm.name"
                    placeholder="Nome da categoria"
                    :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' }"
                    required
                  />
                </div>
                <div>
                  <UInput 
                    v-model="categoryForm.description"
                    placeholder="Descrição (opcional)"
                    :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' }"
                  />
                </div>
                <UButton 
                  type="submit"
                  label="Criar Categoria"
                  :loading="isSaving"
                  class="w-full justify-center text-white"
                  color="primary"
                />
              </form>
            </div>
            
            <!-- List -->
            <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div class="px-5 py-3 border-b border-white/10 bg-white/5">
                <h4 class="text-sm font-bold text-gray-300">Categorias ({{ categories.length }})</h4>
              </div>
              <div class="max-h-80 overflow-y-auto custom-scrollbar">
                <div v-if="categories.length === 0" class="p-4 text-center text-gray-500 text-sm">
                  Nenhuma categoria cadastrada
                </div>
                <div 
                  v-for="item in categories" 
                  :key="item.id"
                  class="flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group"
                >
                  <div>
                    <span class="text-white font-medium text-sm">{{ item.name }}</span>
                  </div>
                  <button
                    @click="deleteItem('categories', item.id)"
                    class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
                  >
                    <UIcon name="i-lucide-trash-2" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Muscles Column -->
          <div class="space-y-4">
            <!-- Create Form -->
            <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <UIcon name="i-lucide-activity" class="w-5 h-5 text-orange-400" />
                </div>
                <h3 class="text-lg font-bold text-white">Novo Músculo</h3>
              </div>
              
              <form @submit.prevent="createMuscle" class="space-y-3">
                <div>
                  <UInput 
                    v-model="muscleForm.name"
                    placeholder="Nome científico (Ex: Pectoralis Major)"
                    :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' }"
                    required
                  />
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Parte do Corpo</label>
                  <div class="relative">
                    <select 
                      v-model="muscleForm.body_part" 
                      class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
                    >
                      <option v-for="opt in bodyPartOptions" :key="opt.value" :value="opt.value" class="bg-[#0c0d0f]">
                        {{ opt.label }}
                      </option>
                    </select>
                    <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <UButton 
                  type="submit"
                  label="Criar Músculo"
                  :loading="isSaving"
                  class="w-full justify-center text-white"
                  color="primary"
                />
              </form>
            </div>
            
            <!-- List -->
            <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div class="px-5 py-3 border-b border-white/10 bg-white/5">
                <h4 class="text-sm font-bold text-gray-300">Músculos ({{ muscles.length }})</h4>
              </div>
              <div class="max-h-80 overflow-y-auto custom-scrollbar">
                <div v-if="muscles.length === 0" class="p-4 text-center text-gray-500 text-sm">
                  Nenhum músculo cadastrado
                </div>
                <div 
                  v-for="item in muscles" 
                  :key="item.id"
                  class="flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group"
                >
                  <div>
                    <span class="text-white font-medium text-sm">{{ item.name }}</span>
                    <span class="block text-xs text-gray-500 mt-0.5">{{ getBodyPartLabel(item.body_part || '') }}</span>
                  </div>
                  <button
                    @click="deleteItem('muscles', item.id)"
                    class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
                  >
                    <UIcon name="i-lucide-trash-2" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Equipment Column -->
          <div class="space-y-4">
            <!-- Create Form -->
            <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <UIcon name="i-lucide-dumbbell" class="w-5 h-5 text-green-400" />
                </div>
                <h3 class="text-lg font-bold text-white">Novo Equipamento</h3>
              </div>
              
              <form @submit.prevent="createEquipment" class="space-y-3">
                <div>
                  <UInput 
                    v-model="equipmentForm.name"
                    placeholder="Nome (Ex: Halteres)"
                    :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' }"
                    required
                  />
                </div>
                <div class="flex items-center gap-3">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      v-model="equipmentForm.gym_required"
                      class="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                    />
                    <span class="text-sm text-gray-300">Requer academia</span>
                  </label>
                </div>
                <UButton 
                  type="submit"
                  label="Criar Equipamento"
                  :loading="isSaving"
                  class="w-full justify-center text-white"
                  color="primary"
                />
              </form>
            </div>
            
            <!-- List -->
            <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div class="px-5 py-3 border-b border-white/10 bg-white/5">
                <h4 class="text-sm font-bold text-gray-300">Equipamentos ({{ equipment.length }})</h4>
              </div>
              <div class="max-h-80 overflow-y-auto custom-scrollbar">
                <div v-if="equipment.length === 0" class="p-4 text-center text-gray-500 text-sm">
                  Nenhum equipamento cadastrado
                </div>
                <div 
                  v-for="item in equipment" 
                  :key="item.id"
                  class="flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group"
                >
                  <div class="flex items-center gap-2">
                    <span class="text-white font-medium text-sm">{{ item.name }}</span>
                    <UBadge v-if="item.gym_required" size="xs" color="neutral" variant="subtle">Academia</UBadge>
                  </div>
                  <button
                    @click="deleteItem('equipment', item.id)"
                    class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
                  >
                    <UIcon name="i-lucide-trash-2" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </UContainer>
    </main>
  </div>
</template>

<style scoped>
:deep(.mobile-menu-slideover > div > div) {
    width: 280px !important;
    max-width: 280px !important;
}
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ca000d; }

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
</style>
