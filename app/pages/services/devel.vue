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
const stats = [
  { value: '+50', label: 'Projetos Entregues' },
  { value: '99.9%', label: 'Uptime Garantido' },
  { value: '24/7', label: 'Suporte Dedicado' },
  { value: 'Mobile', label: '& Web First' },
];

const specialties = [
  {
    icon: 'i-lucide-laptop',
    title: 'Web Applications',
    description: 'Sistemas robustos e escaláveis utilizando React, Next.js e Node.js. Painéis administrativos, dashboards e plataformas SaaS.'
  },
  {
    icon: 'i-lucide-smartphone',
    title: 'Apps Mobile',
    description: 'Desenvolvimento nativo e híbrido para iOS e Android. Levamos a experiência da sua marca para a palma da mão do cliente.'
  },
  {
    icon: 'i-lucide-network',
    title: 'Integrações & API',
    description: 'Conectamos seu negócio ao mundo. Integração de sistemas de pagamento, CRMs, ERPs e automação de marketing.'
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
  title: 'Rocket Devel - Soluções Tecnológicas Sob Medida'
})
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#ca000d] selection:text-white relative flex flex-col">
    
    <!-- Background Elements -->
    <div class="fixed inset-0 grid-pattern z-0"></div>
    <div class="floating-element w-96 h-96 top-[-10%] left-[-10%] opacity-40"></div>
    <div class="floating-element w-64 h-64 bottom-[10%] right-[-5%] opacity-30" style="animation-delay: -5s;"></div>
    
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
    <main class="flex-grow relative z-10">
      
      <!-- HERO SECTION -->
      <section class="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ca000d]/30 bg-[#ca000d]/10 text-[#ca000d] text-xs font-semibold tracking-wide">
              <span class="w-2 h-2 rounded-full bg-[#ca000d] animate-pulse"></span>
              ROCKET DEVEL
            </div>
            
            <!-- Title -->
            <h1 class="text-5xl sm:text-7xl font-bold leading-tight">
              Transformamos código em <br/>
              <span class="text-gradient">Resultados Reais</span>
            </h1>
            
            <!-- Subtitle -->
            <p class="text-gray-400 text-lg max-w-lg leading-relaxed">
              Desenvolvimento de software sob medida, aplicações web de alta performance e sistemas integrados. A tecnologia certa para impulsionar o seu negócio.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <UButton 
                size="xl" 
                label="Iniciar Projeto" 
                color="primary" 
                class="glow-button text-white"
                icon="i-lucide-arrow-right"
                trailing
                to="/contact"
              />
              <UButton 
                size="xl" 
                label="Conversar Agora" 
                variant="outline" 
                color="neutral" 
                icon="i-lucide-message-circle"
                class="enhanced-card border-white/10 text-white hover:bg-white/5"
                to="/contact"
              />
            </div>
          </div>

          <!-- Right Content - Code Card -->
          <div class="relative">
            <div class="enhanced-card p-6 relative z-20 animate-float">
              <div class="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                <span class="ml-auto text-xs text-gray-500 font-mono">App.tsx</span>
              </div>
              <div class="font-mono text-sm space-y-2">
                <div class="text-purple-400">const <span class="text-blue-400">RocketDevel</span> = <span class="text-yellow-400">()</span> => {'{'}</div>
                <div class="pl-4 text-gray-300">return (</div>
                <div class="pl-8 text-gray-300"><span class="text-blue-400">&lt;div</span> className="<span class="text-green-400">future-tech</span>"&gt;</div>
                <div class="pl-12 text-white">"Inovação e Performance"</div>
                <div class="pl-8 text-blue-400">&lt;/div&gt;</div>
                <div class="pl-4 text-gray-300">);</div>
                <div class="text-purple-400">{'}'}</div>
              </div>
            </div>
            
            <!-- Floating React Icon -->
            <div class="absolute -top-10 -right-10 z-10 opacity-60">
              <UIcon name="i-lucide-atom" class="w-24 h-24 text-[#ca000d] animate-spin-slow" />
            </div>
            <div class="absolute -bottom-10 -left-10 z-10 opacity-40">
              <UIcon name="i-lucide-terminal" class="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </section>

      <!-- STATS SECTION -->
      <section class="py-10 border-y border-white/5 bg-white/[0.005]">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center group">
            <div class="text-3xl font-bold text-white mb-1 group-hover:text-[#ca000d] transition-colors">{{ stat.value }}</div>
            <div class="text-sm text-gray-400">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <!-- SPECIALTIES SECTION -->
      <section class="py-24 relative">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold mb-4">Nossas Especialidades</h2>
            <p class="text-gray-400 max-w-2xl mx-auto">
              Do conceito ao deploy, oferecemos um ciclo completo de desenvolvimento focado na experiência do usuário e na escalabilidade.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div 
              v-for="(specialty, index) in specialties" 
              :key="index" 
              class="enhanced-card p-8 group"
            >
              <div class="w-12 h-12 bg-[#ca000d]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#ca000d]/20 transition-colors">
                <UIcon :name="specialty.icon" class="w-6 h-6 text-[#ca000d]" />
              </div>
              <h3 class="text-xl font-bold mb-3 text-white">{{ specialty.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed mb-4">{{ specialty.description }}</p>
              <NuxtLink to="#" class="text-[#ca000d] text-sm font-semibold hover:text-white transition-colors flex items-center gap-2">
                Saiba mais <UIcon name="i-lucide-arrow-right" class="w-3 h-3" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA SECTION -->
      <section class="py-20 relative overflow-hidden">
        <div class="absolute inset-0 bg-[#ca000d]/5"></div>
        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
          <UIcon name="i-lucide-rocket" class="w-12 h-12 text-[#ca000d] mx-auto mb-6 animate-bounce" />
          <h2 class="text-3xl sm:text-4xl font-bold mb-6">Pronto para decolar seu projeto?</h2>
          <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
            Não importa a complexidade, a Rocket Devel tem a equipe e a tecnologia certa para entregar. Vamos construir o futuro juntos.
          </p>
          <div class="flex justify-center gap-4">
            <UButton 
              size="xl" 
              label="Solicitar Orçamento" 
              color="primary" 
              class="glow-button text-white"
              to="/contact"
            />
          </div>
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
                        <li><NuxtLink to="/services/devel" class="hover:text-[#ca000d] transition-colors">Desenvolvimento</NuxtLink></li>
                        <li><NuxtLink to="/services/fitness" class="hover:text-red-500 transition-colors">Fitness</NuxtLink></li>
                        <li><NuxtLink to="/services/marketing" class="hover:text-red-500 transition-colors">Marketing</NuxtLink></li>
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
  position: fixed;
  inset: 0;
  opacity: 0.04;
  background-image: linear-gradient(rgba(202, 0, 13, 0.3) 1px, transparent 1px), 
                  linear-gradient(90deg, rgba(202, 0, 13, 0.3) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}

/* === FLOATING ELEMENTS === */
.floating-element {
  position: fixed;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(202, 0, 13, 0.15), rgba(255, 68, 68, 0.05));
  filter: blur(80px);
  z-index: 0;
  animation: float-slow 10s infinite alternate ease-in-out;
  pointer-events: none;
}

@keyframes float-slow {
  0% { transform: translate(0, 0); }
  100% { transform: translate(30px, 20px); }
}

/* === ENHANCED CARD === */
.enhanced-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(202, 0, 13, 0.02) 50%, rgba(255, 255, 255, 0.01) 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.enhanced-card:hover {
  transform: translateY(-10px) scale(1.01);
  box-shadow: 0 20px 50px rgba(202, 0, 13, 0.15);
  border-color: rgba(202, 0, 13, 0.4);
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
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(202, 0, 13, 0.3);
  transition: all 0.3s ease-in-out;
}

.glow-button:hover {
  box-shadow: 0 0 25px rgba(202, 0, 13, 0.6);
}

.glow-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: skewX(-20deg);
  transition: 0.5s;
}

.glow-button:hover::after {
  left: 150%;
  transition: 0.7s ease-in-out;
}

/* === FLOAT ANIMATION === */
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* === SPIN SLOW === */
.animate-spin-slow {
  animation: spin 10s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
