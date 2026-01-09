<script setup lang="ts">
// --- Layout State ---
const isOpen = ref(false);

// Desktop navigation items
const items = [
  { label: "Serviços", to: "/servicos", icon: "i-lucide-briefcase" },
  { label: "Recursos", to: "/recursos", icon: "i-lucide-book-open" },
  { label: "Empresas", to: "/empresas", icon: "i-lucide-building-2" },
  { label: "Sobre Nós", to: "/about", icon: "i-lucide-info" },
];

// Accordion items para menu mobile cascata
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

// --- Services Page Content ---
const services = [
  {
    title: 'Rocket Fitness',
    description: 'Performance humana potencializada por dados. Monitoramento bio-métrico avançado e planos de treino adaptativos via IA.',
    icon: 'i-heroicons-heart',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    features: ['Wearables Integration', 'Health Analytics', 'Bio-hacking Monitoring'],
    link: '/services/fitness'
  },
  {
    title: 'Rocket Cloud',
    description: 'Infraestrutura invisível, escalabilidade infinita. Gerenciamento multi-cloud inteligente para aplicações críticas.',
    icon: 'i-heroicons-cloud',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    features: ['Multi-cloud Management', 'Serverless Architecture', 'Edge Computing Global'],
    link: '/services/cloud'
  },
  {
    title: 'Rocket Devel',
    description: 'Engenharia de software de elite. Desenvolvimento de produtos digitais de alta performance e sistemas distribuídos.',
    icon: 'i-heroicons-code-bracket',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    features: ['High-Performance Web/Mobile', 'System Architecture', 'Legacy Modernization'],
    link: '/services/devel'
  },
  {
    title: 'Rocket Marketing',
    description: 'Crescimento acelerado por inteligência. Estratégias de aquisição e retenção baseadas em ciência de dados.',
    icon: 'i-heroicons-rocket-launch',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    features: ['Data-Driven Branding', 'Precision Paid Media', 'CRM & Automation'],
    link: '/services/marketing'
  }
]

useHead({
  title: 'Nossos Serviços - Rocket Ecosystem'
})
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#ca000d] selection:text-white relative flex flex-col">
    
    <!-- Background Elements -->
    <div class="fixed inset-0 grid-pattern z-0"></div>
    <div class="fixed top-0 right-0 w-[500px] h-[500px] bg-[#ca000d]/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

    <!-- HEADER -->
    <header class="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
      <UContainer class="flex h-16 items-center justify-between gap-3">
        <div class="flex items-center gap-2 lg:flex-1">
          <NuxtLink to="/" class="flex items-center hover:opacity-80 transition-opacity">
            <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-8 w-auto" />
          </NuxtLink>
        </div>

        <div class="hidden lg:flex flex-1 justify-center">
          <UNavigationMenu :items="items" variant="link" class="gap-x-4" />
        </div>

        <div class="flex items-center justify-end gap-2 lg:flex-1">
          <UButton label="Login" to="/login" color="primary" variant="solid" class="hidden sm:inline-flex text-white" />
          <UButton icon="i-lucide-menu" color="neutral" variant="ghost" class="lg:hidden" aria-label="Menu" @click="isOpen = true" />
        </div>
      </UContainer>
    </header>

    <!-- CONTENT -->
    <main class="flex-grow flex flex-col relative z-10">
      <UContainer class="pt-32 lg:pt-52 pb-24 text-center w-full">
        
        <!-- Header -->
        <div class="max-w-2xl mx-auto space-y-6">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Soluções para acelerar o seu <span class="text-primary">crescimento</span>
          </h1>
          <p class="text-lg sm:text-xl text-gray-400">
            Uma suíte completa de serviços integrados para transformar cada desafio em oportunidade de crescimento exponencial.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <UButton
              size="xl"
              label="Falar com Consultor"
              color="primary"
              class="text-white w-full sm:w-auto justify-center"
              to="/contact"
            />
            <UButton
              size="xl"
              label="Explorar Serviços"
              variant="link"
              color="neutral"
              icon="i-lucide-arrow-down"
              trailing
              to="#servicos"
              class="text-white hover:no-underline w-full sm:w-auto justify-center"
            />
          </div>
        </div>

        <!-- Services Grid -->
        <div id="servicos" class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 mt-20 text-left scroll-mt-24">
          <div v-for="(service, index) in services" :key="index" 
               class="group relative enhanced-card p-8 rounded-2xl hover:-translate-y-2 transition-all duration-500">
            
            <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

            <div class="relative z-10 flex flex-col h-full">
              <div :class="['w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500', service.bg, service.color]">
                <UIcon :name="service.icon" class="w-8 h-8" />
              </div>

              <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-[#ca000d] transition-colors">{{ service.title }}</h3>
              <p class="text-gray-400 leading-relaxed mb-8 flex-grow">{{ service.description }}</p>

              <ul class="space-y-3 mb-8 border-t border-white/5 pt-6">
                <li v-for="feature in service.features" :key="feature" class="flex items-center gap-3 text-sm text-gray-300">
                  <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-[#ca000d]" />
                  <span>{{ feature }}</span>
                </li>
              </ul>

              <UButton
                :to="service.link"
                class="w-full justify-between group/btn bg-white/5 hover:bg-[#ca000d] text-white border border-white/10 hover:border-[#ca000d] transition-all duration-300"
                variant="ghost"
              >
                <span>Explorar Solução</span>
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </UButton>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <section class="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center border border-white/10">
          <div class="absolute inset-0 bg-gradient-to-br from-[#ca000d]/20 to-black z-0"></div>
          <div class="absolute inset-0 grid-pattern opacity-10 z-0"></div>
          
          <div class="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 class="text-3xl md:text-5xl font-bold text-white">Pronto para transformar seu futuro?</h2>
            <p class="text-lg text-gray-300">Entre em contato com nossos especialistas e descubra como o ecossistema Rocket pode acelerar seus resultados.</p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <UButton
                class="glow-button py-4 px-10 text-base font-bold bg-[#ca000d] hover:bg-[#b0000b] text-white rounded-full shadow-lg shadow-red-900/20"
                variant="solid"
                to="/contact"
              >
                Falar com Consultor
              </UButton>
            </div>
          </div>
        </section>

      </UContainer>
    </main>

    <!-- FOOTER -->
    <footer class="bg-black border-t border-white/10 pt-20 pb-10 relative z-20">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <div class="col-span-2 md:col-span-1">
                    <NuxtLink to="/" class="flex items-center mb-6">
                        <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-10 w-auto" />
                    </NuxtLink>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        Impulsionando a inovação corporativa através de tecnologia de ponta, segurança e performance.
                    </p>
                </div>

                <div>
                    <h4 class="text-white font-bold mb-4">Soluções</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><NuxtLink to="/services/cloud" class="hover:text-red-500 transition-colors">Cloud Computing</NuxtLink></li>
                        <li><NuxtLink to="/services/devel" class="hover:text-red-500 transition-colors">Desenvolvimento</NuxtLink></li>
                        <li><NuxtLink to="/services/fitness" class="hover:text-red-500 transition-colors">Fitness</NuxtLink></li>
                        <li><NuxtLink to="/services/marketing" class="hover:text-red-500 transition-colors">Marketing</NuxtLink></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-white font-bold mb-4">Empresa</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><NuxtLink to="/about" class="hover:text-red-500 transition-colors">Sobre Nós</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Carreiras</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Blog</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Imprensa</NuxtLink></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-white font-bold mb-4">Legal</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Privacidade</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Termos de Uso</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Compliance</NuxtLink></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-sm text-gray-500">© 2025 Rocket Enterprise Inc. Todos os direitos reservados.</p>
                
                <div class="flex gap-6">
                    <NuxtLink to="#" class="text-gray-500 hover:text-white transition-colors">
                        <span class="sr-only">LinkedIn</span>
                        <UIcon name="i-lucide-linkedin" class="w-5 h-5"/>
                    </NuxtLink>
                    <NuxtLink to="#" class="text-gray-500 hover:text-white transition-colors">
                        <span class="sr-only">Twitter</span>
                        <UIcon name="i-lucide-twitter" class="w-5 h-5"/>
                    </NuxtLink>
                     <NuxtLink to="#" class="text-gray-500 hover:text-white transition-colors">
                        <span class="sr-only">Instagram</span>
                        <UIcon name="i-lucide-instagram" class="w-5 h-5"/>
                    </NuxtLink>
                </div>
            </div>
            
             <div class="mt-6 text-center">
                <p class="text-xs text-gray-600 italic">
                    "Porque dele, e por meio dele, e para ele são todas as coisas. A ele seja a glória para sempre. Amém!" (Rm 11:36)
                </p>
            </div>
        </div>
    </footer>

    <!-- SLIDEOVER -->
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
              <UButton block size="lg" label="Login" to="/login" color="primary" variant="solid" class="text-white" @click="isOpen = false" />
            </div>
          </div>
        </template>
      </USlideover>
    </ClientOnly>

  </div>
</template>

<style scoped>
.grid-pattern {
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  opacity: 1;
  pointer-events: none;
}

.enhanced-card {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.enhanced-card:hover {
  border-color: rgba(202, 0, 13, 0.3);
  box-shadow: 0 20px 50px -12px rgba(202, 0, 13, 0.15);
}

.glow-button {
  position: relative;
  overflow: hidden;
}

.glow-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.glow-button:hover::after {
  transform: translateX(100%);
}

/* Custom Scrollbar */
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
