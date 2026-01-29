<script setup lang="ts">
const isOpen = ref(false);
const { user, fetchUser, logout } = useAuth();


const isLoggingOut = ref(false);

async function handleLogout() {
    isLoggingOut.value = true;
    try {
        await logout();
        await navigateTo('/login');
    } finally {
        isLoggingOut.value = false;
    }
}

onMounted(() => {
    fetchUser();
});

// Navigation Items
const items = [
  { label: "Serviços", to: "/servicos", icon: "i-lucide-briefcase" },
  { label: "Recursos", to: "/recursos", icon: "i-lucide-book-open" },
  { label: "Empresas", to: "/empresas", icon: "i-lucide-building-2" },
  { label: "Sobre Nós", to: "/about", icon: "i-lucide-info" },
];

// Mobile Menu Data
const accordionItems = [
  { label: "Serviços", icon: "i-lucide-briefcase", defaultOpen: true, slot: "services" },
  { label: "Navegação", icon: "i-lucide-compass", slot: "navigation" }
];

const serviceLinks = [
  { label: 'Todos os Serviços', icon: 'i-lucide-layers', to: '/servicos' },
  { label: 'Rocket Cloud', icon: 'i-heroicons-cloud', to: '/services/cloud' },
  { label: 'Rocket Fitness', icon: 'i-heroicons-heart', to: '/services/fitness' },
  { label: 'Rocket Devel', icon: 'i-heroicons-code-bracket', to: '/services/devel' },
  { label: 'Rocket Marketing', icon: 'i-heroicons-rocket-launch', to: '/services/marketing' },
];

const navigationLinks = [
  { label: 'Recursos', icon: 'i-lucide-book-open', to: '/recursos' },
  { label: 'Empresas', icon: 'i-lucide-building-2', to: '/empresas' },
  { label: 'Sobre Nós', icon: 'i-lucide-info', to: '/about' },
];


</script>

<template>
  <header class="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
    <UContainer class="flex h-16 items-center justify-between gap-3">
      <div class="flex items-center gap-2 lg:flex-1">
        <NuxtLink to="/" class="flex items-center hover:opacity-80 transition-opacity">
          <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-8 w-auto" />
        </NuxtLink>
      </div>

      <div class="hidden lg:flex flex-1 justify-center">
        <UNavigationMenu :items="items" variant="link" class="gap-x-4"/>
      </div>

      <div class="flex items-center justify-end gap-2 lg:flex-1">
        <!-- Logged In State -->
            <!-- Premium "Scroll" Interaction -->
        <template v-if="user">
            <!-- Premium "Scroll" Interaction -->
            <div class="group flex items-center p-1 rounded-full border border-transparent hover:border-white/10 bg-transparent hover:bg-[#0a0a0a]/50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] mr-2">
                
                <!-- Avatar (Click -> Account) -->
                <NuxtLink to="/account" class="relative z-20 flex-shrink-0" aria-label="Minha Conta">
                     <UAvatar 
                        :src="user.profile_icon_url || '/default-avatar.png'" 
                        alt="Profile" 
                        size="sm" 
                        class="ring-2 ring-transparent group-hover:ring-primary-500 transition-all duration-500 cursor-pointer" 
                    />
                </NuxtLink>

                <!-- Logout Reveal (The "Pergaminho") -->
                <div class="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                     <button 
                        @click="handleLogout" 
                        class="flex items-center gap-2 pl-3 pr-2 text-sm text-red-500 hover:text-red-400 font-medium whitespace-nowrap transition-colors"
                        :disabled="isLoggingOut"
                     >
                          <span>Sair</span>
                          <UIcon v-if="!isLoggingOut" name="i-lucide-log-out" class="w-4 h-4" />
                          <UIcon v-else name="i-lucide-loader-2" class="w-4 h-4 animate-spin" />
                     </button>
                </div>
            </div>
        </template>
        <!-- Logged Out State -->
        <template v-if="!user">
            <UButton
            label="Login"
            to="/login"
            color="primary"
            variant="solid"
            class="hidden sm:inline-flex text-white"
            />
        </template>

        <UButton
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          class="lg:hidden"
          aria-label="Menu"
          @click="isOpen = true"
        />
      </div>
    </UContainer>

    <ClientOnly>
      <USlideover v-model:open="isOpen" side="left" :ui="{ content: '!w-[280px] !max-w-[280px] !flex-none' }">
        <template #content>
          <div class="flex flex-col h-full bg-[#0a0a0a] border-r border-white/10 w-full">
            <div class="flex items-center justify-between p-6 mb-2">
              <div class="flex items-center">
                <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-7 w-auto" />
              </div>
              <UButton icon="i-lucide-x" color="neutral" variant="ghost" @click="isOpen = false" />
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar space-y-2 px-6">
              <UAccordion 
                :items="accordionItems" 
                :ui="{ 
                  item: 'pt-0 pb-2 text-sm text-white',
                  trigger: 'px-3 py-2 text-gray-300 hover:text-white bg-transparent hover:bg-white/5 font-medium w-full justify-start rounded-md mb-1' 
                }"
              >
                <template #services>
                  <div class="pl-4 mt-1 space-y-1 border-l border-white/10 ml-2">
                    <NuxtLink 
                      v-for="item in serviceLinks"
                      :key="item.label"
                      :to="item.to"
                      @click="isOpen = false"
                      class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <UIcon :name="item.icon" class="w-4 h-4" />
                      {{ item.label }}
                    </NuxtLink>
                  </div>
                </template>

                <template #navigation>
                  <div class="pl-4 mt-1 space-y-1 border-l border-white/10 ml-2">
                    <NuxtLink 
                      v-for="item in navigationLinks"
                      :key="item.label"
                      :to="item.to"
                      @click="isOpen = false"
                      class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                    >
                      <UIcon :name="item.icon" class="w-4 h-4" />
                      {{ item.label }}
                    </NuxtLink>
                  </div>
                </template>
              </UAccordion>
            </div>

            <div class="mt-auto p-6 border-t border-white/10 space-y-4">
               <template v-if="user">
                    <UButton block size="lg" label="Minha Conta" to="/account" color="primary" variant="solid" class="text-white" @click="isOpen = false" />
                    <UButton 
                        block 
                        size="lg"
                        color="red" 
                        variant="ghost" 
                        icon="i-lucide-log-out" 
                        class="justify-start hover:bg-red-500/10 hover:text-red-400 text-gray-400"
                        @click="handleLogout"
                    >
                        Sair da Conta
                    </UButton>
               </template>
               <template v-else>
                   <UButton block size="lg" label="Login" to="/login" color="primary" variant="solid" class="text-white" @click="isOpen = false" />
               </template>
            </div>
          </div>
        </template>
      </USlideover>
    </ClientOnly>


  </header>
</template>

<style scoped>
/* Custom Scrollbar needed for the slideover */
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
</style>
