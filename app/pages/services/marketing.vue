<script setup lang="ts">
// --- Layout State ---
const isOpen = ref(false);

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

// --- Page Data ---
const integrations = [
  { name: 'Google', icon: 'i-lucide-chrome' },
  { name: 'Meta', icon: 'i-lucide-facebook' },
  { name: 'HubSpot', icon: 'i-lucide-layers' },
  { name: 'Salesforce', icon: 'i-lucide-cloud' },
];

const solutions = [
  {
    icon: 'i-lucide-target',
    title: 'Gestão de Tráfego & Ads',
    description: 'Campanhas de alta performance no Google, Meta e LinkedIn Ads. Focamos em CPA (Custo por Aquisição) e ROAS, não apenas em cliques.',
    tags: ['Remarketing', 'Lookalike', 'Copywriting'],
    featured: true
  },
  {
    icon: 'i-lucide-search',
    title: 'SEO Técnico',
    description: 'Posicione sua marca nas primeiras posições. Auditoria técnica, link building e conteúdo estratégico.',
    featured: false
  },
  {
    icon: 'i-lucide-hash',
    title: 'Social & Branding',
    description: 'Gestão de comunidade e branding. Transforme seguidores em advogados da sua marca.',
    featured: false
  },
  {
    icon: 'i-lucide-database',
    title: 'CRM & Automação',
    description: 'Implementação de funis de vendas automáticos, lead scoring e integração entre Marketing e Vendas (Smarketing).',
    hasTerminal: true,
    featured: false
  }
];

// --- Background Particles ---
const particles = ref<{ left: string; size: string; delay: string; duration: string }[]>([]);

onMounted(() => {
  for (let i = 0; i < 15; i++) {
    particles.value.push({
      left: Math.random() * 100 + '%',
      size: Math.random() * 3 + 1 + 'px',
      delay: Math.random() * 5 + 's',
      duration: Math.random() * 10 + 10 + 's'
    });
  }
});

useHead({
  title: 'Rocket Marketing - Performance & Growth'
})
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#ca000d] selection:text-white relative flex flex-col">
    
    <!-- Background Elements -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ca000d]/20 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#ca000d]/10 rounded-full blur-[100px]"></div>
      <div class="absolute inset-0 grid-pattern opacity-30"></div>
    </div>
    
    <!-- Particles -->
    <div class="fixed inset-0 pointer-events-none z-0">
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

    <!-- MAIN CONTENT -->
    <main class="flex-grow relative z-10 pt-32 pb-20">
      
      <!-- HERO SECTION -->
      <section class="max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          
          <!-- Left Content -->
          <div>
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#ca000d] text-xs font-bold mb-8 uppercase tracking-widest">
              <span class="w-2 h-2 rounded-full bg-[#ca000d] animate-pulse"></span>
              Rocket Enterprise v3.0
            </div>
            
            <!-- Title -->
            <h1 class="text-5xl sm:text-7xl font-bold leading-[1.1] mb-6">
              Data Driven <br>
              <span class="text-gradient">Marketing.</span>
            </h1>
            
            <!-- Subtitle -->
            <p class="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
              Não dependa da sorte. A Rocket Marketing utiliza inteligência de dados e automação para criar ecossistemas de vendas previsíveis e escaláveis.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton 
                size="xl" 
                label="Acelerar Meu Negócio" 
                color="primary" 
                class="glow-button text-white"
                icon="i-lucide-rocket"
                to="/contact"
              />
              <UButton 
                size="xl" 
                label="Ver em Ação" 
                variant="outline" 
                color="neutral" 
                icon="i-lucide-play"
                class="glass-panel border-white/10 text-white hover:bg-white/10"
              />
            </div>

            <!-- Integrations -->
            <div class="mt-12 pt-8 border-t border-white/10">
              <p class="text-xs text-gray-500 uppercase tracking-widest mb-4">Integrado com</p>
              <div class="flex gap-6">
                <UIcon 
                  v-for="integration in integrations" 
                  :key="integration.name"
                  :name="integration.icon" 
                  class="w-6 h-6 text-gray-600 hover:text-white transition-colors cursor-pointer" 
                />
              </div>
            </div>
          </div>

          <!-- Right Content - Performance Card -->
          <div class="relative hidden lg:block">
            <div class="glass-panel p-6 rounded-2xl animate-float relative z-20 shadow-2xl">
              <div class="flex justify-between items-center mb-6">
                <h3 class="font-bold">Performance ROI</h3>
                <span class="text-green-500 font-mono text-sm flex items-center gap-1">
                  +127% <UIcon name="i-lucide-trending-up" class="w-4 h-4" />
                </span>
              </div>
              <div class="flex items-end gap-3 h-40 mb-4">
                <div class="w-full bg-white/5 rounded-t hover:bg-[#ca000d]/80 transition-all cursor-pointer" style="height: 40%"></div>
                <div class="w-full bg-white/5 rounded-t hover:bg-[#ca000d]/80 transition-all cursor-pointer" style="height: 60%"></div>
                <div class="w-full bg-white/5 rounded-t hover:bg-[#ca000d]/80 transition-all cursor-pointer" style="height: 30%"></div>
                <div class="w-full bg-white/5 rounded-t hover:bg-[#ca000d]/80 transition-all cursor-pointer" style="height: 80%"></div>
                <div class="w-full bg-[#ca000d] rounded-t shadow-[0_0_15px_#ca000d]" style="height: 95%"></div>
              </div>
              <div class="flex justify-between text-xs text-gray-500 font-mono">
                <span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>HOJE</span>
              </div>
            </div>

            <!-- Background Card -->
            <div class="absolute top-10 -right-10 w-full h-full glass-panel rounded-2xl z-10 scale-90 opacity-40"></div>
          </div>
        </div>
      </section>

      <!-- SOLUTIONS SECTION -->
      <section id="solucoes" class="py-24 relative bg-black/40 mt-20">
        <div class="max-w-7xl mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold mb-2">Ecossistema Rocket</h2>
              <p class="text-gray-400">Soluções integradas para domínio de mercado.</p>
            </div>
            <NuxtLink to="/servicos" class="text-[#ca000d] hover:text-white transition-colors mt-4 md:mt-0 group flex items-center gap-2">
              Ver todos os serviços <UIcon name="i-lucide-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <!-- Featured Card - Tráfego & Ads -->
            <div class="md:col-span-2 glass-panel p-8 rounded-2xl hover:border-[#ca000d]/50 transition-colors group cursor-pointer relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-[#ca000d]/10 rounded-full blur-2xl group-hover:bg-[#ca000d]/20 transition-all"></div>
              
              <div class="w-12 h-12 bg-[#ca000d] rounded-lg flex items-center justify-center text-white mb-6 shadow-lg">
                <UIcon name="i-lucide-target" class="w-6 h-6" />
              </div>
              <h3 class="text-2xl font-bold mb-3">Gestão de Tráfego & Ads</h3>
              <p class="text-gray-400 max-w-lg">
                Campanhas de alta performance no Google, Meta e LinkedIn Ads. Focamos em CPA (Custo por Aquisição) e ROAS, não apenas em cliques.
              </p>
              <div class="mt-8 flex gap-3 flex-wrap">
                <span class="px-3 py-1 rounded bg-white/5 text-xs text-gray-300 border border-white/5">Remarketing</span>
                <span class="px-3 py-1 rounded bg-white/5 text-xs text-gray-300 border border-white/5">Lookalike</span>
                <span class="px-3 py-1 rounded bg-white/5 text-xs text-gray-300 border border-white/5">Copywriting</span>
              </div>
            </div>

            <!-- SEO Técnico -->
            <div class="glass-panel p-8 rounded-2xl hover:border-[#ca000d]/50 transition-colors group cursor-pointer">
              <div class="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white mb-6 group-hover:bg-[#ca000d] group-hover:text-white transition-all">
                <UIcon name="i-lucide-search" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-bold mb-3">SEO Técnico</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                Posicione sua marca nas primeiras posições. Auditoria técnica, link building e conteúdo estratégico.
              </p>
            </div>

            <!-- Social & Branding -->
            <div class="glass-panel p-8 rounded-2xl hover:border-[#ca000d]/50 transition-colors group cursor-pointer">
              <div class="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white mb-6 group-hover:bg-[#ca000d] group-hover:text-white transition-all">
                <UIcon name="i-lucide-hash" class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-bold mb-3">Social & Branding</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                Gestão de comunidade e branding. Transforme seguidores em advogados da sua marca.
              </p>
            </div>

            <!-- CRM & Automação -->
            <div class="md:col-span-2 glass-panel p-8 rounded-2xl hover:border-[#ca000d]/50 transition-colors group cursor-pointer flex flex-col md:flex-row items-center gap-8">
              <div class="flex-1">
                <div class="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white mb-6 group-hover:bg-[#ca000d] group-hover:text-white transition-all">
                  <UIcon name="i-lucide-database" class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold mb-3">CRM & Automação</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  Implementação de funis de vendas automáticos, lead scoring e integração entre Marketing e Vendas (Smarketing).
                </p>
              </div>
              <div class="flex-1 w-full p-4 bg-black/40 rounded border border-white/5 font-mono text-xs text-green-400 opacity-70">
                <p>> Connecting CRM...</p>
                <p>> Lead_Score: 98/100</p>
                <p>> Status: <span class="text-[#ca000d]">HOT LEAD</span></p>
                <p>> Action: Trigger Email Sequence_04</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- CTA SECTION -->
      <section class="py-24 relative overflow-hidden">
        <div class="absolute inset-0 bg-[#ca000d]/5 z-0"></div>
        <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
          
          <UIcon name="i-lucide-zap" class="w-12 h-12 text-[#ca000d] mx-auto mb-6 animate-pulse" />
          
          <h2 class="text-4xl md:text-5xl font-bold mb-6">Pronto para escalar?</h2>
          <p class="text-xl text-gray-400 mb-10">
            Agende uma consultoria estratégica gratuita de 30 minutos. <br>
            Analisaremos sua presença digital atual e desenharemos o plano de voo.
          </p>

          <form class="max-w-md mx-auto space-y-4" @submit.prevent>
            <div class="relative">
              <UIcon name="i-lucide-mail" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="email" 
                placeholder="Digite seu e-mail corporativo" 
                class="w-full bg-[#0a0a0a] border border-white/10 rounded py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ca000d] focus:ring-1 focus:ring-[#ca000d] transition-all placeholder:text-gray-600"
              >
            </div>
            <UButton 
              type="submit" 
              block 
              size="xl" 
              label="Solicitar Contato" 
              color="primary" 
              class="glow-button text-white uppercase tracking-wide"
              to="/contact"
            />
          </form>

          <p class="mt-6 text-sm text-gray-600 flex items-center justify-center gap-1">
            <UIcon name="i-lucide-lock" class="w-4 h-4" /> Seus dados estão seguros. Não enviamos spam.
          </p>
        </div>
      </section>

    </main>

    <!-- FOOTER -->
    <footer class="bg-black border-t border-white/10 pt-20 pb-10 relative z-20">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <!-- Brand Column -->
                <div class="col-span-2 md:col-span-1">
                    <NuxtLink to="/" class="flex items-center mb-6">
                        <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-10 w-auto" />
                    </NuxtLink>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        Impulsionando a inovação corporativa através de tecnologia de ponta, segurança e performance.
                    </p>
                </div>

                <!-- Soluções Column -->
                <div>
                    <h4 class="text-white font-bold mb-4">Soluções</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><NuxtLink to="/services/cloud" class="hover:text-red-500 transition-colors">Cloud Computing</NuxtLink></li>
                        <li><NuxtLink to="/services/devel" class="hover:text-red-500 transition-colors">Desenvolvimento</NuxtLink></li>
                        <li><NuxtLink to="/services/fitness" class="hover:text-red-500 transition-colors">Fitness</NuxtLink></li>
                        <li><NuxtLink to="/services/marketing" class="hover:text-[#ca000d] transition-colors">Marketing</NuxtLink></li>
                    </ul>
                </div>

                <!-- Empresa Column -->
                <div>
                    <h4 class="text-white font-bold mb-4">Empresa</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><NuxtLink to="/about" class="hover:text-red-500 transition-colors">Sobre Nós</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Carreiras</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Blog</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Imprensa</NuxtLink></li>
                    </ul>
                </div>

                <!-- Legal Column -->
                <div>
                    <h4 class="text-white font-bold mb-4">Legal</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Privacidade</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Termos de Uso</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Compliance</NuxtLink></li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Section -->
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
/* === GRID PATTERN === */
.grid-pattern {
  background-size: 50px 50px;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}

/* === GLASS PANEL === */
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* === TEXT GRADIENT === */
.text-gradient {
  background: linear-gradient(to right, #ca000d, #ff1f1f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* === GLOW BUTTON === */
.glow-button {
  box-shadow: 0 0 20px rgba(202, 0, 13, 0.4);
  transition: all 0.3s ease;
}
.glow-button:hover {
  box-shadow: 0 0 35px rgba(202, 0, 13, 0.7);
  transform: scale(1.02);
}

/* === FLOAT ANIMATION === */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* === PARTICLES === */
.particle {
  position: fixed;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: floatUp linear infinite;
}

@keyframes floatUp {
  0% { transform: translateY(100vh) scale(1); opacity: 0; }
  20% { opacity: 0.5; }
  80% { opacity: 0.3; }
  100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
}

/* === CUSTOM SCROLLBAR === */
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
