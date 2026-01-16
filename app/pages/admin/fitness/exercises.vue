<script setup lang="ts">
const toast = useToast();
const { user, fetchUser } = useAuth();
const csrfCookie = useCsrfCookie();

const isMenuOpen = ref(false);

// --- State ---
const isLoading = ref(true);
const isSaving = ref(false);
const exercises = ref<any[]>([]);
const currentPage = ref(1);
const itemsPerPage = 20;

// Filters
const searchQuery = ref('');
const filterCategory = ref<string | null>(null);
const filterDifficulty = ref<string | null>(null);

// Modal state
const isModalOpen = ref(false);
const editingExercise = ref<any>(null);

// Auxiliary data
const categories = ref<any[]>([]);
const muscles = ref<any[]>([]);
const equipment = ref<any[]>([]);

// Form state
const formData = reactive({
  name: '',
  description: '',
  category_id: '',
  difficulty: 'BEGINNER',
  mechanics: 'COMPOUND',
  force: 'PUSH',
  default_tracking_mode: 'REPS_AND_WEIGHT',
  met_value: 3.5,
  is_unilateral: false,
  is_bodyweight: false,
  search_tags: '',
  primary_muscles: [] as string[],
  secondary_muscles: [] as string[],
  equipment_ids: [] as string[],
  instructions: [{ step: 1, text: '' }] as { step: number; text: string }[],
});

// Image upload
const imageFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);

// Options
const difficultyOptions = [
  { label: 'Iniciante', value: 'BEGINNER', color: 'text-green-400' },
  { label: 'Intermediário', value: 'INTERMEDIATE', color: 'text-yellow-400' },
  { label: 'Avançado', value: 'ADVANCED', color: 'text-orange-400' },
  { label: 'Elite', value: 'ELITE', color: 'text-red-400' },
];

const mechanicsOptions = [
  { label: 'Composto', value: 'COMPOUND' },
  { label: 'Isolado', value: 'ISOLATION' },
  { label: 'Isométrico', value: 'ISOMETRIC' },
];

const forceOptions = [
  { label: 'Empurrar', value: 'PUSH' },
  { label: 'Puxar', value: 'PULL' },
  { label: 'Estático', value: 'STATIC' },
  { label: 'Outro', value: 'OTHER' },
];

const trackingOptions = [
  { label: 'Reps + Carga', value: 'REPS_AND_WEIGHT' },
  { label: 'Apenas Reps', value: 'REPS_ONLY' },
  { label: 'Tempo + Distância', value: 'TIME_AND_DISTANCE' },
  { label: 'Apenas Tempo', value: 'TIME_ONLY' },
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
  await loadExercises();
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
      { label: 'Gerenciar Exercícios', icon: 'i-lucide-dumbbell', to: '/admin/fitness/exercises', active: true },
      { label: 'Dados Auxiliares', icon: 'i-lucide-database', to: '/admin/fitness/auxiliary' }
    );
  }
  
  return links;
});

// Debounce search
let searchTimeout: ReturnType<typeof setTimeout>;
watch(searchQuery, () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    loadExercises();
  }, 400);
});

watch([filterCategory, filterDifficulty], () => {
  currentPage.value = 1;
  loadExercises();
});

// --- API Calls ---
async function loadAuxiliaryData() {
  try {
    const res = await $fetch<any>('/api/fitness/auxiliary');
    categories.value = res.categories || [];
    muscles.value = res.muscles || [];
    equipment.value = res.equipment || [];
  } catch (e) {
    toast.add({ title: 'Erro', description: 'Falha ao carregar dados auxiliares', color: 'neutral' });
  }
}

async function loadExercises() {
  isLoading.value = true;
  try {
    const params = new URLSearchParams();
    params.set('limit', itemsPerPage.toString());
    params.set('offset', ((currentPage.value - 1) * itemsPerPage).toString());
    if (searchQuery.value) params.set('q', searchQuery.value);
    if (filterCategory.value) params.set('category_id', filterCategory.value);
    if (filterDifficulty.value) params.set('difficulty', filterDifficulty.value);

    const res = await $fetch<any[]>(`/api/fitness/exercises?${params.toString()}`);
    exercises.value = res || [];
  } catch (e: any) {
    toast.add({ title: 'Erro', description: 'Falha ao carregar exercícios', color: 'neutral' });
  } finally {
    isLoading.value = false;
  }
}

function openCreateModal() {
  editingExercise.value = null;
  resetForm();
  isModalOpen.value = true;
}

async function openEditModal(exerciseId: string) {
  isLoading.value = true;
  try {
    const res = await $fetch<any>(`/api/fitness/exercises/${exerciseId}`);
    editingExercise.value = res;
    
    // Populate form
    formData.name = res.name || '';
    formData.description = res.description || '';
    formData.category_id = res.category?.id || '';
    formData.difficulty = res.difficulty || 'BEGINNER';
    formData.mechanics = res.mechanics || 'COMPOUND';
    formData.force = res.force || 'PUSH';
    formData.default_tracking_mode = res.default_tracking_mode || res.tracking || 'REPS_AND_WEIGHT';
    formData.met_value = res.met_value || 3.5;
    formData.is_unilateral = res.is_unilateral || false;
    formData.is_bodyweight = res.is_bodyweight || false;
    formData.search_tags = (res.search_tags || res.tags || []).join(', ');
    
    // Muscles
    formData.primary_muscles = (res.muscles || []).filter((m: any) => m.role === 'PRIMARY').map((m: any) => m.id);
    formData.secondary_muscles = (res.muscles || []).filter((m: any) => m.role === 'SECONDARY').map((m: any) => m.id);
    formData.equipment_ids = (res.equipment || []).map((e: any) => e.id);
    
    // Instructions
    if (res.instructions && res.instructions.length > 0) {
      formData.instructions = res.instructions.sort((a: any, b: any) => a.step - b.step);
    } else {
      formData.instructions = [{ step: 1, text: '' }];
    }
    
    // Image preview
    if (res.img_exercise_url || res.img) {
      imagePreview.value = res.img_exercise_url || res.img;
    } else {
      imagePreview.value = null;
    }
    
    isModalOpen.value = true;
  } catch (e) {
    toast.add({ title: 'Erro', description: 'Falha ao carregar exercício', color: 'neutral' });
  } finally {
    isLoading.value = false;
  }
}

function resetForm() {
  formData.name = '';
  formData.description = '';
  formData.category_id = '';
  formData.difficulty = 'BEGINNER';
  formData.mechanics = 'COMPOUND';
  formData.force = 'PUSH';
  formData.default_tracking_mode = 'REPS_AND_WEIGHT';
  formData.met_value = 3.5;
  formData.is_unilateral = false;
  formData.is_bodyweight = false;
  formData.search_tags = '';
  formData.primary_muscles = [];
  formData.secondary_muscles = [];
  formData.equipment_ids = [];
  formData.instructions = [{ step: 1, text: '' }];
  imageFile.value = null;
  imagePreview.value = null;
}

function addInstruction() {
  const lastStep = formData.instructions.length > 0 ? formData.instructions[formData.instructions.length - 1].step : 0;
  formData.instructions.push({ step: lastStep + 1, text: '' });
}

function removeInstruction(index: number) {
  formData.instructions.splice(index, 1);
  // Renumber steps
  formData.instructions.forEach((inst, idx) => {
    inst.step = idx + 1;
  });
}

function handleImageSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    imageFile.value = input.files[0];
    imagePreview.value = URL.createObjectURL(input.files[0]);
  }
}

async function saveExercise() {
  // Validation
  if (!formData.name.trim()) {
    toast.add({ title: 'Erro', description: 'Nome é obrigatório', color: 'neutral' });
    return;
  }
  if (!formData.category_id) {
    toast.add({ title: 'Erro', description: 'Categoria é obrigatória', color: 'neutral' });
    return;
  }
  if (formData.primary_muscles.length === 0) {
    toast.add({ title: 'Erro', description: 'Selecione pelo menos um músculo primário', color: 'neutral' });
    return;
  }

  isSaving.value = true;
  try {
    // Parse tags
    const tags = formData.search_tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0 && t.length < 30);

    // Filter empty instructions
    const instructions = formData.instructions
      .filter(i => i.text.trim())
      .map((i, idx) => ({ step: idx + 1, text: i.text.trim() }));

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim() || null,
      category_id: formData.category_id,
      difficulty: formData.difficulty,
      mechanics: formData.mechanics,
      force: formData.force,
      default_tracking_mode: formData.default_tracking_mode,
      met_value: formData.met_value || 3.5,
      is_unilateral: formData.is_unilateral,
      is_bodyweight: formData.is_bodyweight,
      tags: tags,
      primary_muscles: formData.primary_muscles,
      secondary_muscles: formData.secondary_muscles,
      equipment_ids: formData.equipment_ids,
      instructions: instructions,
    };

    let exerciseId: string;

    if (editingExercise.value) {
      // Update
      await $fetch(`/api/fitness/admin/exercises/${editingExercise.value.id}`, {
        method: 'PUT',
        headers: { 'X-CSRF-Token': csrfCookie.value || '' },
        body: payload
      });
      exerciseId = editingExercise.value.id;
    } else {
      // Create
      const res = await $fetch<any>('/api/fitness/admin/exercises', {
        method: 'POST',
        headers: { 'X-CSRF-Token': csrfCookie.value || '' },
        body: payload
      });
      exerciseId = res.id;
    }

    // Upload image if selected
    if (imageFile.value) {
      const imgFormData = new FormData();
      imgFormData.append('file', imageFile.value);
      
      await $fetch(`/api/fitness/admin/exercises/${exerciseId}/cover`, {
        method: 'POST',
        headers: { 'X-CSRF-Token': csrfCookie.value || '' },
        body: imgFormData
      });
    }

    toast.add({ title: 'Sucesso', description: editingExercise.value ? 'Exercício atualizado!' : 'Exercício criado!', color: 'primary' });
    isModalOpen.value = false;
    await loadExercises();
  } catch (e: any) {
    toast.add({ title: 'Erro', description: e.data?.error || 'Falha ao salvar exercício', color: 'neutral' });
  } finally {
    isSaving.value = false;
  }
}

async function deleteExercise(id: string) {
  if (!confirm('Tem certeza que deseja excluir este exercício? Esta ação é irreversível.')) return;

  isSaving.value = true;
  try {
    await $fetch(`/api/fitness/admin/exercises/${id}`, {
      method: 'DELETE',
      headers: { 'X-CSRF-Token': csrfCookie.value || '' }
    });
    toast.add({ title: 'Sucesso', description: 'Exercício excluído!', color: 'primary' });
    await loadExercises();
  } catch (e: any) {
    toast.add({ title: 'Erro', description: e.data?.error || 'Falha ao excluir exercício', color: 'neutral' });
  } finally {
    isSaving.value = false;
  }
}

function getDifficultyInfo(value: string) {
  return difficultyOptions.find(d => d.value === value) || { label: value, color: 'text-gray-400' };
}

function getCategoryName(id: string) {
  return categories.value.find(c => c.id === id)?.name || '-';
}

function resetFilters() {
  searchQuery.value = '';
  filterCategory.value = null;
  filterDifficulty.value = null;
}

useAppSeo({
  title: 'Gerenciar Exercícios - Fitness Admin',
  description: 'Painel de administração para gerenciamento de exercícios',
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
              <h1 class="text-3xl md:text-4xl font-bold text-white">Gestão de Exercícios</h1>
              <p class="text-gray-400 mt-2">Crie, edite e gerencie os exercícios do sistema Fitness</p>
            </div>
            <div class="flex items-center gap-3">
              <UButton 
                label="Novo Exercício"
                icon="i-lucide-plus"
                @click="openCreateModal"
                class="text-white"
                color="primary"
              />
            </div>
          </div>
          
          <!-- Filters -->
          <div class="flex flex-wrap gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <div class="flex-1 min-w-[200px]">
              <div class="relative">
                <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  v-model="searchQuery"
                  type="text"
                  placeholder="Buscar por nome ou tags..."
                  class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 pl-10 pr-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-500"
                />
              </div>
            </div>
            <div class="min-w-[180px]">
              <div class="relative">
                <select 
                  v-model="filterCategory" 
                  class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
                >
                  <option :value="null" class="bg-[#0c0d0f]">Todas Categorias</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id" class="bg-[#0c0d0f]">
                    {{ cat.name }}
                  </option>
                </select>
                <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div class="min-w-[150px]">
              <div class="relative">
                <select 
                  v-model="filterDifficulty" 
                  class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
                >
                  <option :value="null" class="bg-[#0c0d0f]">Dificuldade</option>
                  <option v-for="diff in difficultyOptions" :key="diff.value" :value="diff.value" class="bg-[#0c0d0f]">
                    {{ diff.label }}
                  </option>
                </select>
                <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <UButton 
              label="Limpar"
              variant="ghost"
              color="neutral"
              @click="resetFilters"
            />
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center items-center py-20">
          <div class="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="exercises.length === 0" class="text-center py-20">
          <UIcon name="i-lucide-dumbbell" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-400 mb-2">Nenhum exercício encontrado</h3>
          <p class="text-gray-500 mb-4">Não há exercícios que correspondam aos filtros selecionados.</p>
          <UButton label="Criar Exercício" icon="i-lucide-plus" @click="openCreateModal" color="primary" class="text-white" />
        </div>
        
        <!-- Exercises Table -->
        <div v-else class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-white/5 text-gray-400 uppercase font-semibold text-xs border-b border-white/10">
                <tr>
                  <th class="px-6 py-4 w-16">Img</th>
                  <th class="px-6 py-4">Nome</th>
                  <th class="px-6 py-4">Categoria</th>
                  <th class="px-6 py-4">Dificuldade</th>
                  <th class="px-6 py-4">Músculos</th>
                  <th class="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                <tr 
                  v-for="ex in exercises" 
                  :key="ex.id"
                  class="hover:bg-white/5 transition-colors"
                >
                  <td class="px-6 py-3">
                    <div v-if="ex.img || ex.img_exercise_url" class="w-12 h-12 rounded-lg overflow-hidden bg-white/10">
                      <img :src="ex.img_exercise_url || ex.img" class="w-full h-full object-cover" alt="" />
                    </div>
                    <div v-else class="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <UIcon name="i-lucide-image" class="w-5 h-5 text-gray-500" />
                    </div>
                  </td>
                  <td class="px-6 py-3">
                    <span class="text-white font-semibold">{{ ex.name }}</span>
                  </td>
                  <td class="px-6 py-3">
                    <UBadge color="neutral" variant="subtle" size="sm">{{ ex.category_name || getCategoryName(ex.category?.id) }}</UBadge>
                  </td>
                  <td class="px-6 py-3">
                    <span :class="['text-xs font-bold uppercase', getDifficultyInfo(ex.difficulty).color]">
                      {{ getDifficultyInfo(ex.difficulty).label }}
                    </span>
                  </td>
                  <td class="px-6 py-3">
                    <span class="text-gray-400 text-sm">{{ (ex.muscle_names || ex.targets || []).slice(0, 3).join(', ') }}</span>
                  </td>
                  <td class="px-6 py-3 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button 
                        @click="openEditModal(ex.id)"
                        class="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 flex items-center justify-center transition-colors"
                      >
                        <UIcon name="i-lucide-pencil" class="w-4 h-4" />
                      </button>
                      <button 
                        @click="deleteExercise(ex.id)"
                        class="w-8 h-8 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-colors"
                      >
                        <UIcon name="i-lucide-trash-2" class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination -->
          <div class="flex justify-center items-center gap-4 p-4 border-t border-white/10 bg-white/5">
            <UButton 
              icon="i-lucide-chevron-left"
              color="neutral"
              variant="ghost"
              :disabled="currentPage <= 1"
              @click="currentPage--; loadExercises()"
            />
            <span class="text-gray-400 text-sm">Página {{ currentPage }}</span>
            <UButton 
              icon="i-lucide-chevron-right"
              color="neutral"
              variant="ghost"
              :disabled="exercises.length < itemsPerPage"
              @click="currentPage++; loadExercises()"
            />
          </div>
        </div>
      </UContainer>
    </main>
    
    <!-- Modal -->
    <ClientOnly>
      <USlideover v-model:open="isModalOpen" side="right" :ui="{ content: '!w-full !max-w-2xl' }">
        <template #content>
          <div class="flex flex-col h-full bg-[#0a0a0a]">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-white/10 bg-[#050505]">
              <h2 class="text-xl font-bold text-white">
                {{ editingExercise ? 'Editar Exercício' : 'Novo Exercício' }}
              </h2>
              <UButton icon="i-lucide-x" color="neutral" variant="ghost" @click="isModalOpen = false" />
            </div>
            
            <!-- Content -->
            <div class="flex-1 overflow-y-auto p-6 space-y-6">
              
              <!-- Basic Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Nome do Exercício *</label>
                  <UInput 
                    v-model="formData.name"
                    placeholder="Ex: Supino Reto"
                    :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' }"
                    required
                  />
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Categoria *</label>
                  <div class="relative">
                    <select 
                      v-model="formData.category_id" 
                      class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" class="bg-[#0c0d0f]" disabled>Selecione...</option>
                      <option v-for="cat in categories" :key="cat.id" :value="cat.id" class="bg-[#0c0d0f]">
                        {{ cat.name }}
                      </option>
                    </select>
                    <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              <div>
                <label class="text-xs text-gray-500 mb-1 block">Descrição</label>
                <textarea 
                  v-model="formData.description"
                  placeholder="Descrição do exercício..."
                  rows="2"
                  class="block w-full rounded-lg bg-white/5 border border-white/10 text-white p-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-500 resize-none"
                ></textarea>
              </div>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Dificuldade *</label>
                  <div class="relative">
                    <select v-model="formData.difficulty" class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer">
                      <option v-for="opt in difficultyOptions" :key="opt.value" :value="opt.value" class="bg-[#0c0d0f]">{{ opt.label }}</option>
                    </select>
                    <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Mecânica</label>
                  <div class="relative">
                    <select v-model="formData.mechanics" class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer">
                      <option v-for="opt in mechanicsOptions" :key="opt.value" :value="opt.value" class="bg-[#0c0d0f]">{{ opt.label }}</option>
                    </select>
                    <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Força</label>
                  <div class="relative">
                    <select v-model="formData.force" class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer">
                      <option v-for="opt in forceOptions" :key="opt.value" :value="opt.value" class="bg-[#0c0d0f]">{{ opt.label }}</option>
                    </select>
                    <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Rastreio</label>
                  <div class="relative">
                    <select v-model="formData.default_tracking_mode" class="block w-full rounded-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer">
                      <option v-for="opt in trackingOptions" :key="opt.value" :value="opt.value" class="bg-[#0c0d0f]">{{ opt.label }}</option>
                    </select>
                    <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Tags (separadas por vírgula)</label>
                  <UInput 
                    v-model="formData.search_tags"
                    placeholder="ex: peito, supino"
                    :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' }"
                  />
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">MET (Calorias/Min)</label>
                  <UInput 
                    v-model.number="formData.met_value"
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="30"
                    placeholder="Ex: 5.0"
                    :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' }"
                  />
                </div>
              </div>
              
              <div class="flex gap-6">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="formData.is_unilateral" class="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500 focus:ring-offset-0" />
                  <span class="text-sm text-gray-300">Unilateral</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="formData.is_bodyweight" class="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500 focus:ring-offset-0" />
                  <span class="text-sm text-gray-300">Peso do Corpo</span>
                </label>
              </div>
              
              <!-- Image Upload -->
              <div>
                <label class="text-xs text-gray-500 mb-2 block">Imagem do Exercício</label>
                <div class="flex items-start gap-4">
                  <div class="w-24 h-24 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                    <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
                    <UIcon v-else name="i-lucide-image" class="w-8 h-8 text-gray-500" />
                  </div>
                  <div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      @change="handleImageSelect"
                      class="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-500/20 file:text-primary-400 hover:file:bg-primary-500/30 cursor-pointer"
                    />
                    <p class="text-xs text-gray-500 mt-2">Formatos suportados: AVIF, WebP. Max 2MB</p>
                  </div>
                </div>
              </div>
              
              <!-- Muscles -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Músculos Primários *</label>
                  <select 
                    v-model="formData.primary_muscles" 
                    multiple
                    class="block w-full h-32 rounded-lg bg-white/5 border border-white/10 text-white p-2 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  >
                    <option v-for="m in muscles" :key="m.id" :value="m.id" class="bg-[#0c0d0f] py-1">{{ m.name }}</option>
                  </select>
                  <p class="text-xs text-gray-500 mt-1">Ctrl/Cmd + click para múltiplos</p>
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Músculos Secundários</label>
                  <select 
                    v-model="formData.secondary_muscles" 
                    multiple
                    class="block w-full h-32 rounded-lg bg-white/5 border border-white/10 text-white p-2 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  >
                    <option v-for="m in muscles" :key="m.id" :value="m.id" class="bg-[#0c0d0f] py-1">{{ m.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="text-xs text-gray-500 mb-1 block">Equipamentos</label>
                  <select 
                    v-model="formData.equipment_ids" 
                    multiple
                    class="block w-full h-32 rounded-lg bg-white/5 border border-white/10 text-white p-2 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  >
                    <option v-for="e in equipment" :key="e.id" :value="e.id" class="bg-[#0c0d0f] py-1">{{ e.name }}</option>
                  </select>
                </div>
              </div>
              
              <!-- Instructions -->
              <div>
                <label class="text-xs text-gray-500 mb-2 block">Instruções Passo-a-Passo</label>
                <div class="space-y-2">
                  <div 
                    v-for="(inst, idx) in formData.instructions" 
                    :key="idx"
                    class="flex gap-2"
                  >
                    <span class="flex-shrink-0 w-8 h-9 rounded-l-lg bg-white/10 flex items-center justify-center text-gray-400 text-sm border border-r-0 border-white/10">
                      {{ inst.step }}
                    </span>
                    <input 
                      v-model="inst.text"
                      type="text"
                      placeholder="Descreva a ação..."
                      class="flex-1 rounded-none rounded-r-lg bg-white/5 border border-white/10 text-white py-2 px-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-500"
                    />
                    <button 
                      @click="removeInstruction(idx)"
                      class="flex-shrink-0 w-9 h-9 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-colors"
                    >
                      <UIcon name="i-lucide-x" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <UButton 
                  label="Adicionar Passo"
                  icon="i-lucide-plus"
                  variant="outline"
                  color="neutral"
                  class="w-full mt-3"
                  @click="addInstruction"
                />
              </div>
              
            </div>
            
            <!-- Footer -->
            <div class="flex items-center justify-end gap-3 p-6 border-t border-white/10 bg-[#050505]">
              <UButton 
                label="Cancelar"
                variant="ghost"
                color="neutral"
                @click="isModalOpen = false"
              />
              <UButton 
                label="Salvar Exercício"
                :loading="isSaving"
                @click="saveExercise"
                class="text-white"
                color="primary"
              />
            </div>
          </div>
        </template>
      </USlideover>
    </ClientOnly>
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
