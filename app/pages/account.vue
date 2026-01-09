<script setup lang="ts">
const isMenuOpen = ref(false);

// --- Background Particles Logic ---
const particles = ref<{ left: string; size: string; delay: string; duration: string }[]>([]);

onMounted(() => {
    // Generate particles
    for (let i = 0; i < 20; i++) {
        particles.value.push({
            left: Math.random() * 100 + '%',
            size: Math.random() * 3 + 1 + 'px',
            delay: Math.random() * 5 + 's',
            duration: Math.random() * 10 + 10 + 's'
        });
    }
});
const currentTab = ref('profile');

// Simulação das Roles
const roles = ref<string[]>(["fitness_admin", "rocket_fitness"]);

// Estado do Perfil
const profile = reactive({
  username: "UsuarioRocket",
  email: "usuario@rocket.com",
  profile_icon_url: "",
});

/* --- Navigation & Menu Data --- */
// Accordion items for the "Cascade" menu style
const accordionItems = [
  {
    label: "Conta",
    icon: "i-lucide-user-circle",
    defaultOpen: true,
    slot: "account"
  },
  {
    label: "Gerenciamento",
    icon: "i-lucide-briefcase",
    slot: "management"
  },
  {
    label: "Recursos",
    icon: "i-lucide-box",
    slot: "resources"
  }
];

const accountLinks = [
  { label: 'Perfil', icon: 'i-lucide-user', id: 'profile' },
  { label: 'Segurança', icon: 'i-lucide-shield-check', id: 'security' },
  { label: 'Notificações', icon: 'i-lucide-bell', id: 'notifications' },
  { label: 'Assinatura', icon: 'i-lucide-credit-card', id: 'billing' },
];

const managementLinks = [
   { label: 'Gerenciar Empresas', icon: 'i-lucide-building-2', to: '/manage_company' },
   { label: 'Painel Fitness', icon: 'i-lucide-activity', to: '/rocketfitnessapp', condition: roles.value.includes('rocket_fitness') },
];

const resourceLinks = [
    { label: 'Documentação', icon: 'i-lucide-file-text', to: '#' },
    { label: 'Suporte', icon: 'i-lucide-life-buoy', to: '#' },
];
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-gray-200 font-sans flex flex-col relative overflow-hidden">
    <!-- Background Effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="grid-bg absolute inset-0"></div>
        
        <!-- Floating Blobs (Neutral/Brand Mix) -->
        <div class="absolute inset-0">
            <div class="floating-blob blob-neutral top-[-10%] left-[-5%] w-[500px] h-[500px]"></div>
            <div class="floating-blob blob-white bottom-[-10%] right-[-5%] w-[400px] h-[400px]"></div>
        </div>

        <!-- Particles -->
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
    
    <!-- Global Header (Adapted from about.vue) -->
    <header class="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl transition-all duration-300">
      <UContainer class="flex h-16 items-center justify-between gap-3">
        <!-- Left: Menu Trigger & Logo -->
        <div class="flex items-center gap-4 lg:flex-1">
           <UButton
            icon="i-lucide-menu"
            color="neutral"
            variant="ghost"
            aria-label="Menu"
            @click="isMenuOpen = true"
          />
          <NuxtLink
            to="/"
            class="flex items-center hover:opacity-80 transition-opacity"
          >
            <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-8 w-auto" />
          </NuxtLink>
        </div>

        <!-- Right: User Actions -->
        <div class="flex items-center justify-end gap-3 lg:flex-1">
             <UButton icon="i-lucide-bell" color="neutral" variant="ghost" class="hidden sm:inline-flex text-gray-400 hover:text-white" />
             <div class="h-6 w-px bg-white/10 hidden sm:block"></div>
             <div class="flex items-center gap-3 pl-2">
                 <span class="text-sm font-medium text-white hidden sm:block">{{ profile.username }}</span>
                 <UAvatar :src="profile.profile_icon_url" size="sm" class="ring-2 ring-transparent hover:ring-primary-500 transition-all cursor-pointer" />
             </div>
        </div>
      </UContainer>
    </header>

    <!-- Slideover (Left Side) -->
    <ClientOnly>
      <USlideover v-model:open="isMenuOpen" side="left" class="mobile-menu-slideover" :ui="{ content: '!w-[280px] !max-w-[280px] !flex-none' }">
        <template #content>
            <div class="flex flex-col h-full bg-[#0a0a0a] border-r border-white/10 w-full">
                <div class="flex items-center justify-between p-6 mb-2">
                  <div class="flex items-center">
                    <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-7 w-auto" />
                  </div>
                  <UButton
                    icon="i-lucide-x"
                    color="neutral"
                    variant="ghost"
                    @click="isMenuOpen = false"
                  />
                </div>

                <!-- Accordion Menu (Cascade) -->
                <div class="flex-1 overflow-y-auto custom-scrollbar space-y-2 px-6">
                     <UAccordion 
                        :items="accordionItems" 
                        :ui="{ 
                            item: 'pt-0 pb-2 text-sm text-white',
                            trigger: 'px-3 py-2 text-gray-300 hover:text-white bg-transparent hover:bg-white/5 font-medium w-full justify-start rounded-md mb-1' 
                        }"
                      >
                        <!-- Account Section -->
                        <template #account>
                            <div class="pl-4 mt-1 space-y-1 border-l border-white/10 ml-2">
                                <button 
                                    v-for="item in accountLinks" 
                                    :key="item.id"
                                    @click="currentTab = item.id; isMenuOpen = false"
                                    :class="[
                                        'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200',
                                        currentTab === item.id 
                                            ? 'text-primary-400 bg-primary-500/10 font-medium' 
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    ]"
                                >
                                    <UIcon :name="item.icon" class="w-4 h-4" />
                                    {{ item.label }}
                                </button>
                            </div>
                        </template>

                        <!-- Management Section -->
                        <template #management>
                             <div class="pl-4 mt-1 space-y-1 border-l border-white/10 ml-2">
                                <NuxtLink 
                                    v-for="item in managementLinks"
                                    :key="item.label"
                                    :to="item.to"
                                    v-show="item.condition !== false"
                                    class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                                >
                                     <UIcon :name="item.icon" class="w-4 h-4" />
                                     {{ item.label }}
                                </NuxtLink>
                             </div>
                        </template>

                        <!-- Resources Section -->
                        <template #resources>
                             <div class="pl-4 mt-1 space-y-1 border-l border-white/10 ml-2">
                                 <NuxtLink 
                                    v-for="item in resourceLinks"
                                    :key="item.label"
                                    :to="item.to"
                                    class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                                >
                                     <UIcon :name="item.icon" class="w-4 h-4" />
                                     {{ item.label }}
                                </NuxtLink>
                             </div>
                        </template>
                     </UAccordion>
                </div>

                <div class="mt-auto p-6 border-t border-white/10">
                   <UButton 
                        label="Sair" 
                        icon="i-lucide-log-out" 
                        color="neutral" 
                        variant="ghost" 
                        block 
                        class="text-red-500 hover:text-red-400 hover:bg-red-500/10 justify-start"
                     />
                </div>
            </div>
        </template>
      </USlideover>
    </ClientOnly>

    <!-- Main Content Area -->
    <main class="flex-1 relative z-10 w-full overflow-y-auto pt-16">
        
       <!-- Profile Tab -->
       <div v-show="currentTab === 'profile'" class="w-full h-full flex flex-col">
            <!-- Banner -->
            <div class="h-80 w-full bg-gray-600 border-b border-gray-600 relative group cursor-pointer bg-cover bg-center bg-no-repeat transition-all duration-300">
               <!-- Banner Overlay -->
               <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
               
               <!-- Banner Edit Button -->
               <div class="absolute top-10 right-10 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="w-12 h-12 rounded-full bg-black/25 backdrop-blur-md border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-300">
                        <UIcon name="i-lucide-pencil" class="w-5 h-5 text-white" />
                    </button>
               </div>
            </div>

            <!-- Profile Info Container -->
            <div class="px-6 pb-24 -mt-20 flex flex-col items-center w-full max-w-5xl mx-auto z-10">
                
                <!-- Avatar -->
                <div class="relative group mb-5">
                    <UAvatar 
                        :src="profile.profile_icon_url" 
                        icon="i-lucide-user"
                        size="3xl" 
                        class="ring-4 ring-gray-800 bg-gray-800 h-32 w-32 object-cover"
                    />
                     
                    <!-- Avatar Edit Overlay -->
                    <div class="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                        <UIcon name="i-lucide-pencil" class="w-6 h-6 text-white" />
                    </div>
                </div>

                <!-- Username & Bio Section -->
                <div class="w-full flex justify-center items-center flex-col">
                    <section class="text-center w-full min-w-[200px] max-w-lg px-5">
                        
                        <!-- Username (Readonly) -->
                        <div class="mb-4">
                             <input
                                type="text"
                                :value="profile.username"
                                readonly
                                class="block w-full rounded-md bg-transparent px-3 py-1.5 text-center text-2xl font-semibold text-white outline-none border-2 border-transparent focus:border-white/20 cursor-default"
                                title="Username não pode ser alterado diretamente"
                            />
                        </div>

                         <!-- Bio -->
                        <div class="mb-6">
                            <textarea
                                placeholder="Escreva sua biografia..."
                                rows="3"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm text-gray-400 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500 text-center transition-all hover:bg-white/10 resize-none min-h-[80px]"
                            ></textarea>
                        </div>
                    </section>
                </div>


                <!-- Form Grid -->
                <div class="flex justify-center items-center flex-col w-full">
                    <div class="grid w-full max-w-2xl grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-24 px-5">
                        
                        <!-- Date -->
                        <div class="block w-full">
                            <input
                                type="date"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm font-semibold text-white outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-500 [color-scheme:dark]"
                            />
                        </div>

                        <!-- Email (Readonly) -->
                        <div class="block w-full">
                             <input
                                type="text"
                                :value="profile.email"
                                readonly
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm font-semibold text-gray-400 outline-none cursor-not-allowed opacity-70"
                                title="Email gerenciado nas configurações de segurança"
                            />
                        </div>

                        <!-- Phone -->
                        <div class="block w-full">
                            <input
                                type="tel"
                                placeholder="Seu telefone"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm font-semibold text-white outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-gray-500"
                            />
                        </div>

                        <!-- Gender -->
                        <div class="block w-full">
                            <div class="relative">
                                <select
                                    class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm font-semibold text-white outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer"
                                    style="background-image: none;"
                                >
                                    <option value="" disabled selected>Selecione seu gênero</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="prefer_not_say">Prefiro não dizer</option>
                                </select>
                                <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <!-- Country -->
                         <div class="block w-full">
                            <div class="relative">
                                <select
                                    class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm font-semibold text-white outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer"
                                >
                                    <option value="" disabled selected>Selecione seu país</option>
                                    <option value="BR">Brasil (BR)</option>
                                    <option value="US">Estados Unidos (US)</option>
                                    <option value="PT">Portugal (PT)</option>
                                </select>
                                 <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <!-- Language -->
                        <div class="block w-full">
                            <div class="relative">
                                 <select
                                    class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-sm font-semibold text-white outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer"
                                >
                                    <option value="pt-BR">Português (Brasil)</option>
                                    <option value="en-US">Inglês (EUA)</option>
                                </select>
                                 <UIcon name="i-lucide-chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
       </div>

       <!-- Security Tab -->
       <div v-show="currentTab === 'security'" class="p-4 md:p-8 w-full max-w-4xl mx-auto animate-fade-in mt-10">
            
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-white tracking-tight">Segurança</h2>
            </div>

            <!-- Change Password Card -->
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
                    <!-- Current Password -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium text-gray-400 ml-1">Senha Atual</label>
                        <UInput 
                            type="password"
                            placeholder="*************"
                            size="lg"
                            icon="i-lucide-lock"
                            class="w-full"
                            :ui="{
                                base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300',
                                leadingIcon: 'text-gray-400'
                            }"
                        />
                    </div>

                    <!-- New Password -->
                    <div class="space-y-2">
                        <label class="text-sm font-medium text-gray-400 ml-1">Nova Senha</label>
                         <UInput 
                            type="password"
                            placeholder="*************"
                            size="lg"
                            icon="i-lucide-lock-keyhole"
                            class="w-full"
                            :ui="{
                                base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300',
                                leadingIcon: 'text-gray-400'
                            }"
                        />
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row justify-end">
                    <UButton 
                        label="Atualizar Senha" 
                        size="xl"
                        class="px-8 font-bold shadow-lg shadow-red-900/20 w-full sm:w-auto text-center justify-center group relative overflow-hidden"
                        :ui="{ 
                            base: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-300 border-none text-white'
                        }"
                    />
                </div>
            </div>
       </div>
       
       <!-- Other Tabs Placeholders -->
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

.glass-card {
    background: rgba(10, 10, 10, 0.6);
    backdrop-filter: blur(20px);
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

.animate-fade-in {
    animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); scale: 0.98; }
    to { opacity: 1; transform: translateY(0); scale: 1; }
}

/* Background Effects Styles */
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
