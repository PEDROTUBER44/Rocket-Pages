<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const isMenuOpen = ref(false);
const toast = useToast();
const { user, fetchUser } = useAuth();
const router = useRouter();

// --- Background Particles ---
const particles = ref<{ left: string; size: string; delay: string; duration: string }[]>([]);
onMounted(() => {
    for (let i = 0; i < 20; i++) {
        particles.value.push({
            left: Math.random() * 100 + '%',
            size: Math.random() * 3 + 1 + 'px',
            delay: Math.random() * 5 + 's',
            duration: Math.random() * 10 + 10 + 's'
        });
    }
    // Ensure we have the latest data
    fetchUser();
});

const currentTab = ref('profile');
const isLoading = ref(false);

// --- Form State ---
const formData = reactive({
    bio: "",
    country: "",
    gender: "",
    phone_number: "",
    date_of_birth: undefined as string | undefined // YYYY-MM-DD
});

// Watch user to populate form
watchEffect(() => {
    if (user.value) {
        formData.bio = user.value.bio || "";
        formData.country = user.value.country || "";
        formData.gender = user.value.gender || "";
        formData.phone_number = user.value.phone_number || "";
        formData.date_of_birth = user.value.date_of_birth || undefined;
    }
});


// Helper for Authenticated Requests
const csrfCookie = useCsrfCookie();

// --- Actions ---

async function saveProfile() {
    isLoading.value = true;
    try {
        await $fetch('/api/users/profile', {
            method: 'PATCH',
            headers: {
                'X-CSRF-Token': csrfCookie.value || ''
            },
            body: {
                bio: formData.bio || null,
                country: formData.country || null,
                gender: formData.gender || null,
                phone_number: formData.phone_number || null,
                date_of_birth: formData.date_of_birth || null
            }
        });
        toast.add({ title: 'Sucesso', description: 'Perfil atualizado!', color: 'primary' });
        await fetchUser(); // Refresh local data
    } catch (e: any) {
        toast.add({ title: 'Erro', description: 'Falha ao atualizar perfil.', color: 'neutral' });
    } finally {
        isLoading.value = false;
    }
}

// Upload Helpers
const avatarInput = ref<HTMLInputElement | null>(null);
const bannerInput = ref<HTMLInputElement | null>(null);

function triggerAvatarUpload() { avatarInput.value?.click(); }
function triggerBannerUpload() { bannerInput.value?.click(); }

async function handleFileUpload(event: Event, type: 'avatar' | 'banner') {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    if (!file) return;

    isLoading.value = true;
    try {
        // Process Image
        let processedBlob: Blob;
        if (type === 'avatar') {
            processedBlob = await processCircularImage(file);
        } else {
            processedBlob = await processWideImage(file);
        }
        
        // Debug
        console.log(`[Upload] Image processed: ${processedBlob.size} bytes, type: ${processedBlob.type}`);

        const endpoint = type === 'avatar' ? '/api/users/avatar' : '/api/users/banner';
        
        // Determine extension based on type (avif or webp)
        const ext = processedBlob.type === 'image/webp' ? 'webp' : 'avif';
        const filename = `image.${ext}`;

        // Create new FormData for the upload
        const uploadData = new FormData();
        // The backend expects 'file' part with a filename
        uploadData.append('file', processedBlob, filename); 

        await $fetch(endpoint, {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfCookie.value || ''
            },
            body: uploadData
        });
        toast.add({ title: 'Sucesso', description: `${type === 'avatar' ? 'Avatar' : 'Banner'} atualizado!`, color: 'primary' });
        await fetchUser();
    } catch (e: any) {
        console.error("Upload Error:", e);
        const msg = e.message || 'Falha no upload.';
        toast.add({ title: 'Erro', description: msg, color: 'neutral' });
    } finally {
        isLoading.value = false;
        // Reset input
        input.value = ''; 
    }
}

// --- Password Change ---
const passState = reactive({
    old_password: '',
    new_password: ''
});

async function changePassword() {
    if(!passState.old_password || !passState.new_password) {
        toast.add({ title: 'Erro', description: 'Preencha todos os campos.', color: 'neutral' });
        return;
    }
    
    isLoading.value = true;
    try {
        await $fetch('/api/auth/change-password', {
            method: 'POST',
            headers: {
                'X-CSRF-Token': csrfCookie.value || ''
            },
            body: {
                old_password: passState.old_password,
                new_password: passState.new_password
            }
        });
        toast.add({ title: 'Sucesso', description: 'Senha alterada com sucesso!', color: 'primary' });
        passState.old_password = '';
        passState.new_password = '';
    } catch (e: any) {
        toast.add({ title: 'Erro', description: e.response?._data?.error || 'Erro ao alterar senha.', color: 'neutral' });
    } finally {
        isLoading.value = false;
    }
}

/* --- Navigation Data --- */
const accordionItems = computed(() => {
  const items = [
    { label: "Conta", icon: "i-lucide-user-circle", defaultOpen: true, slot: "account" },
    { label: "Gerenciamento", icon: "i-lucide-briefcase", slot: "management" },
    { label: "Recursos", icon: "i-lucide-box", slot: "resources" }
  ];
  
  // Adicionar seção Admin se usuário tiver qualquer role de admin
  const hasAdminRole = user.value?.roles?.some((r: string) => 
    ['rocket_contact_admin', 'rocket_fitness_admin', 'enterprise_informations'].includes(r)
  );
  if (hasAdminRole) {
    items.push({ label: "Administração", icon: "i-lucide-shield", slot: "admin" });
  }
  
  return items;
});

const accountLinks = [
  { label: 'Perfil', icon: 'i-lucide-user', id: 'profile' },
  { label: 'Segurança', icon: 'i-lucide-shield-check', id: 'security' },
  { label: 'Notificações', icon: 'i-lucide-bell', id: 'notifications' },
  { label: 'Assinatura', icon: 'i-lucide-credit-card', id: 'billing' },
];
const managementLinks = [
   { label: 'Gerenciar Empresas', icon: 'i-lucide-building-2', to: '/manage_company' },
   { label: 'Painel Fitness', icon: 'i-lucide-activity', to: '/rocketfitnessapp', condition: user.value?.roles?.includes('rocket_fitness') },
];
const resourceLinks = [
    { label: 'Documentação', icon: 'i-lucide-file-text', to: '#' },
    { label: 'Suporte', icon: 'i-lucide-life-buoy', to: '#' },
];

// Links de administração (visíveis apenas para admins)
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
    links.push({ label: 'Empresas (Data)', icon: 'i-lucide-database-zap', to: '/admin/enterprises' });
  }
  
  return links;
});
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-gray-200 font-sans flex flex-col relative overflow-hidden">
    <!-- Hidden File Inputs -->
    <input type="file" ref="avatarInput" class="hidden" accept="image/*" @change="(e) => handleFileUpload(e, 'avatar')" />
    <input type="file" ref="bannerInput" class="hidden" accept="image/*" @change="(e) => handleFileUpload(e, 'banner')" />

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

    <!-- Slideover -->
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
                                <button v-for="item in accountLinks" :key="item.id" @click="currentTab = item.id; isMenuOpen = false" :class="['w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200', currentTab === item.id ? 'text-primary-400 bg-primary-500/10 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5']">
                                    <UIcon :name="item.icon" class="w-4 h-4" />
                                    {{ item.label }}
                                </button>
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
                                 <NuxtLink v-for="item in adminLinks" :key="item.label" :to="item.to" class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-200">
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

    <!-- Main Content -->
    <main class="flex-1 relative z-10 w-full overflow-y-auto pt-16" v-if="user">
        
       <!-- Profile Tab -->
       <div v-show="currentTab === 'profile'" class="w-full h-full flex flex-col">
            <!-- Banner -->
            <div 
                class="h-80 w-full bg-gray-600 border-b border-gray-600 relative group cursor-pointer bg-cover bg-center bg-no-repeat transition-all duration-300"
                :style="{ backgroundImage: user?.profile_banner_url ? `url(${user.profile_banner_url})` : 'none' }"
                @click="triggerBannerUpload"
            >
               <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
               <div class="absolute top-10 right-10 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="w-12 h-12 rounded-full bg-black/25 backdrop-blur-md border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-300">
                        <UIcon name="i-lucide-pencil" class="w-5 h-5 text-white" />
                    </button>
               </div>
            </div>

            <div class="px-6 pb-24 -mt-20 flex flex-col items-center w-full max-w-5xl mx-auto z-10">
                <!-- Avatar -->
                <div class="relative group mb-5" @click="triggerAvatarUpload">
                    <UAvatar 
                        :src="user.profile_icon_url" 
                        icon="i-lucide-user"
                        size="3xl" 
                        class="ring-4 ring-gray-800 bg-gray-800 h-32 w-32 object-cover"
                    />
                    <div class="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                        <UIcon name="i-lucide-pencil" class="w-6 h-6 text-white" />
                    </div>
                </div>

                <!-- Info -->
                <div class="w-full flex justify-center items-center flex-col">
                    <section class="text-center w-full min-w-[200px] max-w-lg px-5">
                        <div class="mb-4">
                             <input type="text" :value="user.username" readonly class="block w-full rounded-md bg-transparent px-3 py-1.5 text-center text-2xl font-semibold text-white outline-none border-2 border-transparent cursor-default" />
                        </div>
                        <div class="mb-6">
                            <textarea
                                v-model="formData.bio"
                                placeholder="Escreva sua biografia..."
                                rows="3"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm text-gray-400 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500 text-center transition-all hover:bg-white/10 resize-none min-h-[80px]"
                            ></textarea>
                        </div>
                    </section>
                </div>

                <!-- Form Grid -->
                <div class="flex justify-center items-center flex-col w-full">
                    <div class="grid w-full max-w-2xl grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-10 px-5">
                        <!-- Date -->
                        <div class="block w-full">
                            <label class="text-xs text-gray-500 ml-1 mb-1 block">Data de Nascimento</label>
                            <input type="date" v-model="formData.date_of_birth" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm font-semibold text-white outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-500 [color-scheme:dark]" />
                        </div>

                        <!-- Email -->
                        <div class="block w-full">
                             <label class="text-xs text-gray-500 ml-1 mb-1 block">Email (Protegido)</label>
                             <input type="text" :value="user.email" readonly class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm font-semibold text-gray-400 outline-none cursor-not-allowed opacity-70" />
                        </div>

                        <!-- Phone -->
                        <div class="block w-full">
                            <label class="text-xs text-gray-500 ml-1 mb-1 block">Telefone</label>
                            <input type="tel" v-model="formData.phone_number" placeholder="Seu telefone" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm font-semibold text-white outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-500" />
                        </div>

                        <!-- Gender -->
                        <div class="block w-full">
                            <label class="text-xs text-gray-500 ml-1 mb-1 block">Gênero</label>
                            <div class="relative">
                                <select v-model="formData.gender" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm font-semibold text-white outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer">
                                    <option value="" disabled>Selecione</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="prefer_not_say">Prefiro não dizer</option>
                                </select>
                                <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <!-- Country -->
                         <div class="block w-full">
                            <label class="text-xs text-gray-500 ml-1 mb-1 block">País</label>
                            <div class="relative">
                                <select v-model="formData.country" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm font-semibold text-white outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer">
                                    <option value="" disabled>Selecione</option>
                                    <option value="BR">Brasil</option>
                                    <option value="US">Estados Unidos</option>
                                    <option value="PT">Portugal</option>
                                </select>
                                 <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <UButton 
                        label="Salvar Alterações" 
                        size="xl" 
                        color="primary" 
                        variant="solid"
                        :loading="isLoading"
                        @click="saveProfile"
                        class="px-12 font-bold shadow-lg shadow-primary-500/20 text-white"
                    />
                </div>
            </div>
       </div>

       <!-- Security Tab -->
       <div v-show="currentTab === 'security'" class="p-4 md:p-8 w-full max-w-4xl mx-auto animate-fade-in mt-10">
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-white tracking-tight">Segurança</h2>
            </div>

            <div class="w-full bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-300">
                <div class="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                     <div class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <UIcon name="i-lucide-shield-alert" class="w-5 h-5 text-red-500"/>
                     </div>
                    <div>
                        <h3 class="text-lg font-bold text-white">Alterar Senha</h3>
                        <p class="text-sm text-gray-500">Mantenha sua conta segura alterando sua senha periodicamente.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div class="space-y-2">
                        <label class="text-sm font-medium text-gray-400 ml-1">Senha Atual</label>
                        <UInput type="password" v-model="passState.old_password" placeholder="*************" size="lg" icon="i-lucide-lock" class="w-full" :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300', leadingIcon: 'text-gray-400' }" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-medium text-gray-400 ml-1">Nova Senha</label>
                         <UInput type="password" v-model="passState.new_password" placeholder="*************" size="lg" icon="i-lucide-lock-keyhole" class="w-full" :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300', leadingIcon: 'text-gray-400' }" />
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row justify-end">
                    <UButton 
                        label="Atualizar Senha" 
                        size="xl"
                        :loading="isLoading"
                        @click="changePassword"
                        class="px-8 font-bold shadow-lg shadow-red-900/20 w-full sm:w-auto text-center justify-center group relative overflow-hidden"
                        :ui="{ base: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-300 border-none text-white' }"
                    />
                </div>
            </div>
       </div>
       
       <div v-show="!['profile', 'security'].includes(currentTab)" class="p-10 text-center text-gray-500">
           <UIcon name="i-lucide-construction" class="w-12 h-12 mb-4 mx-auto opacity-50"/>
           <p>Em construção...</p>
       </div>
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

.animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); scale: 0.98; }
    to { opacity: 1; transform: translateY(0); scale: 1; }
}
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
