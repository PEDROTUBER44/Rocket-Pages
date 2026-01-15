<script setup lang="ts">
const toast = useToast();
const { user, fetchUser } = useAuth();
const csrfCookie = useCsrfCookie();

// --- State ---
const contacts = ref<any[]>([]);
const isLoading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);
const totalContacts = ref(0);
const filterType = ref<string | null>(null);
const filterStatus = ref<string | null>(null);
const selectedContact = ref<any>(null);
const isDetailModalOpen = ref(false);
const newNote = ref('');
const isAddingNote = ref(false);

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
    await loadContacts();
});

// --- Data Types ---
const tiposContato = [
  { label: 'Rocket Fitness', value: 'rocket_fitness' },
  { label: 'Rocket Devel', value: 'rocket_devel' },
  { label: 'Rocket Marketing', value: 'rocket_marketing' },
  { label: 'Rocket Cloud', value: 'rocket_cloud' },
  { label: 'Outro', value: 'outro' }
];

const statusOptions = [
  { label: 'Novo', value: 'new', color: 'text-blue-400' },
  { label: 'Em Andamento', value: 'in_progress', color: 'text-yellow-400' },
  { label: 'Resolvido', value: 'resolved', color: 'text-green-400' },
  { label: 'Arquivado', value: 'archived', color: 'text-gray-400' },
];

// --- API Calls ---
async function loadContacts() {
  isLoading.value = true;
  try {
    const params = new URLSearchParams();
    params.set('page', currentPage.value.toString());
    if (filterType.value) params.set('contact_type', filterType.value);
    if (filterStatus.value) params.set('status', filterStatus.value);
    
    const res = await $fetch<any>(`/api/contact/admin/list?${params.toString()}`);
    contacts.value = res.contacts || [];
    totalPages.value = res.total_pages || 1;
    totalContacts.value = res.total || 0;
  } catch (e: any) {
    toast.add({ title: 'Erro', description: 'Falha ao carregar contatos', color: 'neutral' });
  } finally {
    isLoading.value = false;
  }
}

async function updateStatus(contactId: string, newStatus: string) {
  try {
    await $fetch(`/api/contact/admin/${contactId}/status`, {
      method: 'PATCH',
      headers: { 'X-CSRF-Token': csrfCookie.value || '' },
      body: { status: newStatus }
    });
    toast.add({ title: 'Sucesso', description: 'Status atualizado', color: 'primary' });
    await loadContacts();
    if (selectedContact.value?.id === contactId) {
      selectedContact.value.status = newStatus;
    }
  } catch (e) {
    toast.add({ title: 'Erro', description: 'Falha ao atualizar status', color: 'neutral' });
  }
}

async function addNote() {
  if (!newNote.value.trim() || !selectedContact.value) return;
  
  isAddingNote.value = true;
  try {
    await $fetch(`/api/contact/admin/${selectedContact.value.id}/note`, {
      method: 'PATCH',
      headers: { 'X-CSRF-Token': csrfCookie.value || '' },
      body: { content: newNote.value }
    });
    toast.add({ title: 'Sucesso', description: 'Anotação adicionada', color: 'primary' });
    newNote.value = '';
    // Reload contact details
    const updated = await $fetch<any>(`/api/contact/admin/${selectedContact.value.id}`);
    selectedContact.value = updated;
  } catch (e) {
    toast.add({ title: 'Erro', description: 'Falha ao adicionar anotação', color: 'neutral' });
  } finally {
    isAddingNote.value = false;
  }
}

function openDetail(contact: any) {
  selectedContact.value = contact;
  isDetailModalOpen.value = true;
}

function getStatusInfo(status: string) {
  return statusOptions.find(s => s.value === status) || { label: status, color: 'text-gray-400' };
}

function getTypeLabel(type: string) {
  return tiposContato.find(t => t.value === type)?.label || type;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Watchers
watch([filterType, filterStatus], () => {
  currentPage.value = 1;
  loadContacts();
});

watch(currentPage, () => {
  loadContacts();
});

useAppSeo({
  title: 'Gerenciar Contatos - Admin',
  description: 'Painel administrativo para gerenciamento de contatos',
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
    
    <AppHeader />

    <main class="flex-1 relative z-10 w-full overflow-y-auto pt-24 pb-16 px-4 md:px-8">
      <UContainer class="max-w-7xl">
        
        <!-- Header -->
        <div class="mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 class="text-3xl md:text-4xl font-bold text-white">Gerenciar Contatos</h1>
              <p class="text-gray-400 mt-2">{{ totalContacts }} contatos no total</p>
            </div>
            <NuxtLink to="/account" class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
              Voltar para conta
            </NuxtLink>
          </div>
          
          <!-- Filters -->
          <div class="flex flex-wrap gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <div class="flex-1 min-w-[200px]">
              <label class="text-xs text-gray-500 mb-1 block">Filtrar por Tipo</label>
              <div class="relative">
                <select v-model="filterType" class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer">
                  <option :value="null" class="bg-[#0c0d0f]">Todos os tipos</option>
                  <option v-for="tipo in tiposContato" :key="tipo.value" :value="tipo.value" class="bg-[#0c0d0f]">
                    {{ tipo.label }}
                  </option>
                </select>
                <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div class="flex-1 min-w-[200px]">
              <label class="text-xs text-gray-500 mb-1 block">Filtrar por Status</label>
              <div class="relative">
                <select v-model="filterStatus" class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer">
                  <option :value="null" class="bg-[#0c0d0f]">Todos os status</option>
                  <option v-for="status in statusOptions" :key="status.value" :value="status.value" class="bg-[#0c0d0f]">
                    {{ status.label }}
                  </option>
                </select>
                <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
          <div class="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="contacts.length === 0" class="text-center py-20">
          <UIcon name="i-lucide-inbox" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-400 mb-2">Nenhum contato encontrado</h3>
          <p class="text-gray-500">Não há contatos que correspondam aos filtros selecionados.</p>
        </div>
        
        <!-- Contacts Grid -->
        <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="contact in contacts" 
            :key="contact.id"
            @click="openDetail(contact)"
            class="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-primary-500/30 hover:bg-white/[0.08] transition-all duration-300"
          >
            <!-- Status Badge -->
            <div class="absolute top-4 right-4">
              <span :class="['text-xs font-medium px-2 py-1 rounded-full bg-white/10', getStatusInfo(contact.status).color]">
                {{ getStatusInfo(contact.status).label }}
              </span>
            </div>
            
            <!-- Type Badge -->
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
              <span class="text-primary-400 text-xs font-medium">{{ getTypeLabel(contact.contact_type) }}</span>
            </div>
            
            <!-- Info -->
            <h3 class="text-lg font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">
              {{ contact.full_name }}
            </h3>
            <p class="text-gray-400 text-sm mb-3 truncate">{{ contact.email }}</p>
            
            <p class="text-gray-500 text-sm line-clamp-2 mb-4">{{ contact.message }}</p>
            
            <!-- Footer -->
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span v-if="contact.is_company" class="flex items-center gap-1">
                <UIcon name="i-lucide-building-2" class="w-3 h-3" />
                {{ contact.company_name }}
              </span>
              <span v-else class="flex items-center gap-1">
                <UIcon name="i-lucide-user" class="w-3 h-3" />
                Pessoa Física
              </span>
              <span>{{ formatDate(contact.created_at) }}</span>
            </div>
            
            <!-- Notes indicator -->
            <div v-if="contact.admin_notes?.length" class="absolute bottom-4 right-4">
              <div class="flex items-center gap-1 text-xs text-gray-500">
                <UIcon name="i-lucide-message-square" class="w-3 h-3" />
                {{ contact.admin_notes.length }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-8">
          <UButton 
            :disabled="currentPage <= 1"
            icon="i-lucide-chevron-left"
            color="neutral"
            variant="ghost"
            @click="currentPage--"
          />
          <span class="text-gray-400 text-sm px-4">
            Página {{ currentPage }} de {{ totalPages }}
          </span>
          <UButton 
            :disabled="currentPage >= totalPages"
            icon="i-lucide-chevron-right"
            color="neutral"
            variant="ghost"
            @click="currentPage++"
          />
        </div>
      </UContainer>
    </main>
    
    <!-- Detail Modal -->
    <ClientOnly>
      <USlideover v-model:open="isDetailModalOpen" side="right" :ui="{ content: '!w-full !max-w-lg' }">
        <template #content>
          <div v-if="selectedContact" class="flex flex-col h-full bg-[#0a0a0a]">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 class="text-xl font-bold text-white">{{ selectedContact.full_name }}</h2>
                <p class="text-gray-400 text-sm">{{ selectedContact.email }}</p>
              </div>
              <UButton icon="i-lucide-x" color="neutral" variant="ghost" @click="isDetailModalOpen = false" />
            </div>
            
            <!-- Content -->
            <div class="flex-1 overflow-y-auto p-6 space-y-6">
              <!-- Status & Type -->
              <div class="flex gap-2 flex-wrap">
                <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20">
                  <span class="text-primary-400 text-sm font-medium">{{ getTypeLabel(selectedContact.contact_type) }}</span>
                </span>
                <div class="relative">
                  <select 
                    :value="selectedContact.status"
                    @change="(e: any) => updateStatus(selectedContact.id, e.target.value)"
                    :class="['px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-medium outline-none cursor-pointer appearance-none pr-8', getStatusInfo(selectedContact.status).color]"
                  >
                    <option v-for="s in statusOptions" :key="s.value" :value="s.value" class="bg-[#0c0d0f] text-white">
                      {{ s.label }}
                    </option>
                  </select>
                  <UIcon name="i-lucide-chevron-down" class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <!-- Details -->
              <div class="space-y-4">
                <div v-if="selectedContact.phone" class="flex items-center gap-3 text-gray-300">
                  <UIcon name="i-lucide-phone" class="w-4 h-4 text-gray-500" />
                  {{ selectedContact.phone }}
                </div>
                <div v-if="selectedContact.is_company && selectedContact.company_name" class="flex items-center gap-3 text-gray-300">
                  <UIcon name="i-lucide-building-2" class="w-4 h-4 text-gray-500" />
                  {{ selectedContact.company_name }}
                </div>
                <div class="flex items-center gap-3 text-gray-500 text-sm">
                  <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                  Recebido em {{ formatDate(selectedContact.created_at) }}
                </div>
              </div>
              
              <!-- Message -->
              <div>
                <h4 class="text-sm font-medium text-gray-400 mb-2">Mensagem</h4>
                <div class="p-4 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {{ selectedContact.message }}
                </div>
              </div>
              
              <!-- Admin Notes -->
              <div>
                <h4 class="text-sm font-medium text-gray-400 mb-3">Anotações ({{ selectedContact.admin_notes?.length || 0 }})</h4>
                
                <!-- Notes List -->
                <div v-if="selectedContact.admin_notes?.length" class="space-y-3 mb-4">
                  <div v-for="(note, idx) in selectedContact.admin_notes" :key="idx" class="p-3 rounded-lg bg-primary-500/5 border border-primary-500/10">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs font-medium text-primary-400">{{ note.admin_name }}</span>
                      <span class="text-xs text-gray-500">{{ formatDate(note.created_at) }}</span>
                    </div>
                    <p class="text-sm text-gray-300">{{ note.content }}</p>
                  </div>
                </div>
                
                <!-- Add Note -->
                <div class="space-y-2">
                  <textarea 
                    v-model="newNote"
                    placeholder="Adicionar anotação..."
                    rows="3"
                    class="block w-full rounded-lg bg-white/5 border border-white/10 text-white p-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-500 resize-none"
                  ></textarea>
                  <UButton 
                    label="Adicionar Nota"
                    icon="i-lucide-plus"
                    :loading="isAddingNote"
                    :disabled="!newNote.trim()"
                    @click="addNote"
                    class="w-full justify-center text-white"
                    color="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </USlideover>
    </ClientOnly>
    
    <AppFooter />
  </div>
</template>

<style scoped>
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
