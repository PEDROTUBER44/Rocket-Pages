<script setup lang="ts">
// --- Layout State ---
// Menu logic handled by AppHeader

// --- Services Page Content ---
const services = [
  {
    title: 'Rocket Fitness',
    description: 'Performance humana potencializada por dados. Monitoramento bio-métrico avançado e planos de treino adaptativos via IA.',
    icon: 'i-heroicons-heart',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    features: ['Aplicativos de Treino', 'Análise de Saúde', 'Monitoramento Biométrico'],
    link: '/services/fitness'
  },
  {
    title: 'Rocket Cloud',
    description: 'Infraestrutura invisível, escalabilidade infinita. Gerenciamento multi-cloud inteligente para aplicações críticas.',
    icon: 'i-heroicons-cloud',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    features: ['Gestão Multi-Cloud', 'Arquitetura Escalável', 'Performance Global'],
    link: '/services/cloud'
  },
  {
    title: 'Rocket Devel',
    description: 'Engenharia de software de elite. Desenvolvimento de produtos digitais de alta performance e sistemas distribuídos.',
    icon: 'i-heroicons-code-bracket',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    features: ['Web e Mobile de Alta Performance', 'Arquitetura de Sistemas', 'Modernização de Legado'],
    link: '/services/devel'
  },
  {
    title: 'Rocket Marketing',
    description: 'Crescimento acelerado por inteligência. Estratégias de aquisição e retenção baseadas em ciência de dados.',
    icon: 'i-heroicons-rocket-launch',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    features: ['Branding com Dados', 'Tráfego Pago Preciso', 'Automação e CRM'],
    link: '/services/marketing'
  }
]

const faqItems = [
  {
    label: 'Como funciona o processo de orçamento?',
    content: 'Após o primeiro contato, agendamos uma reunião de discovery para entender suas necessidades. Em até 48h, enviamos uma proposta técnica e comercial detalhada, sem compromisso.'
  },
  {
    label: 'Vocês atendem empresas de qual porte?',
    content: 'Atendemos desde startups em estágio inicial (MVP) até grandes corporações que precisam de modernização de legado ou squads dedicados.'
  },
  {
    label: 'Qual o prazo médio de entrega?',
    content: 'Depende da complexidade. Landing pages e sites institucionais levam de 2 a 4 semanas. Produtos digitais complexos (SaaS, Apps) trabalham com cronogramas de 2 a 6 meses, com entregas parciais a cada sprint.'
  },
  {
    label: 'Oferecem suporte após o lançamento?',
    content: 'Sim! Oferecemos planos de sustentação, manutenção evolutiva e monitoramento 24/7 para garantir que sua operação nunca pare.'
  }
]

useAppSeo({
  title: 'Nossos Serviços',
  description: 'Explore o ecossistema Rocket: Fitness, Cloud, Devel e Marketing. Soluções completas para acelerar seu crescimento.',
  image: '/og-services.png',
  breadcrumbs: [
      { name: 'Home', url: 'https://rocketweb.tech' },
      { name: 'Serviços', url: 'https://rocketweb.tech/servicos' }
  ]
})

// Scroll Functionality
const servicesSection = ref<HTMLElement | null>(null);

const scrollToServices = () => {
  servicesSection.value?.scrollIntoView({ behavior: 'smooth' });
};

// --- Scroll Animation (same as index.vue) ---
const setupScrollAnimation = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  const elements = document.querySelectorAll('.reveal-on-scroll');
  elements.forEach(el => observer.observe(el));
};

onMounted(() => {
  setupScrollAnimation();
});
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#ca000d] selection:text-white relative flex flex-col">
    
    <!-- Background Elements -->
    <div class="fixed inset-0 grid-pattern z-0"></div>
    <div class="fixed top-0 right-0 w-[500px] h-[500px] bg-[#ca000d]/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

    <AppHeader />

    <!-- CONTENT -->
    <main class="flex-grow flex flex-col relative z-10">
      <UContainer class="pt-32 lg:pt-52 pb-24 text-center w-full">
        
        <!-- Header -->
        <div class="max-w-2xl mx-auto space-y-6 reveal-on-scroll">
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
              class="text-white hover:no-underline w-full sm:w-auto justify-center group"
              @click="scrollToServices"
            >
              <template #trailing>
                <UIcon name="i-lucide-arrow-right" class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </template>
            </UButton>
          </div>
        </div>

        <!-- Methodology Section (Process) -->
        <div class="mb-32 mt-24 reveal-on-scroll" style="transition-delay: 100ms;">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
             <!-- Connecting Line (Desktop) -->
             <div class="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>

             <div v-for="(step, i) in [
                { title: 'Discovery', desc: 'Imersão total no seu negócio para mapear dores e oportunidades.', icon: 'i-heroicons-magnifying-glass' },
                { title: 'Estratégia', desc: 'Planejamento detalhado, arquitetura e definição de roadmap.', icon: 'i-heroicons-map' },
                { title: 'Execução', desc: 'Desenvolvimento ágil com sprints semanais e feedbacks constantes.', icon: 'i-heroicons-code-bracket-square' },
                { title: 'Evolução', desc: 'Lançamento, monitoramento e melhoria contínua do produto.', icon: 'i-heroicons-rocket-launch' }
             ]" :key="i" class="relative z-10 group">
                <div class="w-24 h-24 mx-auto bg-[#050505] border border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:border-[#ca000d] group-hover:shadow-[0_0_30px_-5px_rgba(202,0,13,0.3)] transition-all duration-500 relative">
                   <div class="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                   <UIcon :name="step.icon" class="w-10 h-10 text-gray-400 group-hover:text-[#ca000d] transition-colors duration-300" />
                   <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#ca000d] flex items-center justify-center text-white font-bold text-sm border-4 border-[#050505]">
                      {{ i + 1 }}
                   </div>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">{{ step.title }}</h3>
                <p class="text-gray-400 text-sm">{{ step.desc }}</p>
             </div>
          </div>
        </div>

        <!-- Services Grid -->
        <!-- Services Grid -->
        <div id="servicos" ref="servicesSection" class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32 mt-20 text-left scroll-mt-24 reveal-on-scroll" style="transition-delay: 200ms;">
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

        <!-- Tech Stack Section -->
        <div class="mb-32 bg-white/5 rounded-3xl p-10 border border-white/5 relative overflow-hidden reveal-on-scroll" style="transition-delay: 300ms;">
           <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505] to-[#050505]"></div>
           <div class="relative z-10 text-center">
              <h2 class="text-2xl font-bold text-white mb-8 opacity-80">Stack Tecnológica de Alta Performance</h2>
              <div class="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                 <!-- Placeholder Icons - replaced with generic names if specific icons missing, but using standard heroicons/simpleicons naming convention usually implies custom request or svg. Using text/simple representations for reliability if icons not loaded. -->
                 <!-- Using text representations combined with generic icons to ensure visibility -->
                 <div v-for="tech in ['Rust', 'Python', 'Node.js', 'Vue.js', 'Nuxt', 'AWS']" :key="tech" class="flex flex-col items-center gap-2 group cursor-default">
                    <div class="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                        <UIcon name="i-heroicons-cpu-chip" class="w-8 h-8 text-white" />
                    </div>
                    <span class="font-semibold text-white/80 group-hover:text-white transition-colors">{{ tech }}</span>
                 </div>
              </div>
           </div>
        </div>

        <!-- FAQ Section -->
        <FaqSection :items="faqItems" />

        <!-- CTA Section -->
        <BaseCtaSection
          title="Pronto para transformar seu futuro?"
          description="Entre em contato com nossos especialistas e descubra como o ecossistema Rocket pode acelerar seus resultados."
          button-label="Falar com Consultor"
          button-to="/contact"
          class="reveal-on-scroll"
          style="transition-delay: 500ms;"
        />

      </UContainer>
    </main>

    <!-- FOOTER -->
    <AppFooter />

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

/* === REVEAL ON SCROLL === */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1), 
              transform 1s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0) translateZ(0);
}
</style>
