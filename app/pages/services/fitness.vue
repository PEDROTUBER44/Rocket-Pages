<script setup lang="ts">
// --- Trust Items Data ---
const trustItems = [
  {
    icon: 'i-lucide-award',
    title: 'Experiência Comprovada',
    desc: '+500 academias confiam na nossa tecnologia para gerenciar seus negócios.'
  },
  {
    icon: 'i-lucide-headset',
    title: 'Suporte 24/7',
    desc: 'Atendimento humano disponível a qualquer hora, por chat, telefone ou email.'
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Dados Seguros',
    desc: 'Conformidade total com LGPD e criptografia de ponta para proteger seus dados.'
  }
];

// --- Solution Cards Data ---
const solutions = [
  {
    icon: 'i-lucide-smartphone',
    title: 'White Label App',
    description: 'Tenha seu próprio aplicativo na Apple Store e Google Play. Personalizado com sua marca, cores e identidade visual.',
    featured: false
  },
  {
    icon: 'i-lucide-users',
    title: 'Gestão Administrativa',
    description: 'CRM completo, controle financeiro, gestão de planos recorrentes e catracas com reconhecimento facial.',
    featured: false
  },
  {
    icon: 'i-lucide-heart-pulse',
    title: 'Integração Wearable',
    description: 'Sincronize dados de Apple Watch, Garmin e Polar. Monitore a frequência cardíaca dos alunos em tempo real.',
    featured: false
  },
  {
    icon: 'i-lucide-video',
    title: 'Rocket Live & VOD',
    description: 'Plataforma de streaming integrada para aulas ao vivo e gravadas. Monetize conteúdo híbrido.',
    featured: false
  },
  {
    icon: 'i-lucide-bot',
    title: 'Smart Coach AI',
    description: 'Inteligência artificial que sugere progressão de cargas e adaptações de treino baseadas no histórico.',
    featured: false
  },
  {
    icon: 'i-lucide-trophy',
    title: 'Gamificação',
    description: 'Ranking, níveis, medalhas e desafios sociais. Aumente a retenção criando uma comunidade competitiva.',
    featured: true
  }
];

// --- Pricing Data ---
const basicPlanFeatures = [
  'App White Label personalizado',
  'CRM básico com até 500 alunos',
  'Gestão de planos e mensalidades',
  'Check-in por QR Code',
  'Suporte por email'
];

const proPlanFeatures = [
  'Tudo do plano Academia',
  'Alunos ilimitados',
  'Integração com catracas biométricas',
  'Smart Coach AI incluso',
  'Rocket Live & VOD',
  'Gerente de conta dedicado'
];

const comparisonTable = [
  { feature: 'Alunos', basic: 'Até 500', pro: 'Ilimitado', proBold: true },
  { feature: 'App White Label', basic: '✓', pro: '✓' },
  { feature: 'Integração Wearable', basic: 'Básica', pro: 'Avançada', proBold: true },
  { feature: 'Streaming (Live/VOD)', basic: '—', pro: '✓', proHighlight: true },
  { feature: 'Smart Coach AI', basic: '—', pro: '✓', proBold: true },
  { feature: 'Suporte', basic: 'Email', pro: '24/7 Prioritário', proBold: true }
];

// --- FAQ Data ---
const faqItems = [
  {
    label: 'Como funciona o aplicativo White Label?',
    content: 'Desenvolvemos um aplicativo exclusivo para a sua academia, publicado na Apple Store e Google Play com a sua marca, logo e cores. Seus alunos baixam o app e têm acesso a treinos, check-in, agendamentos e muito mais.',
  },
  {
    label: 'Posso integrar com catracas e equipamentos?',
    content: 'Sim! Temos integração nativa com as principais marcas de catracas do mercado (Henry, Dimep, TopData). Também integramos com wearables como Apple Watch, Garmin e Polar para monitoramento em tempo real.',
  },
  {
    label: 'Quanto tempo leva para implementar?',
    content: 'O tempo médio de implementação é de 2 a 4 semanas, dependendo da complexidade. Isso inclui migração de dados, configuração do sistema e treinamento da sua equipe.',
  },
  {
    label: 'Meus dados estão seguros?',
    content: 'Absolutamente. Utilizamos criptografia AES-256, servidores com certificação ISO 27001 e estamos em total conformidade com a LGPD. Seus dados e os dados dos seus alunos estão protegidos.',
  },
  {
    label: 'Vocês oferecem período de teste?',
    content: 'Sim! Oferecemos 14 dias de teste grátis com todas as funcionalidades do plano Pro. Sem compromisso e sem necessidade de cartão de crédito.',
  }
];

// --- Security Checklist ---
const securityChecklist = [
  'Criptografia AES-256 em todos os dados',
  'Conformidade total com LGPD',
  'Backups automáticos diários',
  'Autenticação de dois fatores'
];

// --- Scroll Animation ---
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

// --- Scroll to Pricing ---
const pricingSection = ref<HTMLElement | null>(null);

const scrollToPricing = () => {
  pricingSection.value?.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
  setupScrollAnimation();
});

useAppSeo({
  title: 'Rocket Fitness',
  description: 'Soluções digitais para academias. Aplicativos White Label, CRM e gestão administrativa integrada.',
  image: '/og-fitness.png',
  breadcrumbs: [
      { name: 'Home', url: 'https://rocketweb.tech' },
      { name: 'Serviços', url: 'https://rocketweb.tech/servicos' },
      { name: 'Rocket Fitness', url: 'https://rocketweb.tech/services/fitness' }
  ]
});
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#ca000d] selection:text-white relative flex flex-col">
    
    <!-- Background Elements -->
    <div class="fixed inset-0 grid-pattern z-0"></div>
    <div class="fixed top-0 right-0 w-[500px] h-[500px] bg-[#ca000d]/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

    <!-- HEADER -->
    <AppHeader />

    <!-- MAIN CONTENT -->
    <main class="flex-grow relative z-10">
      
      <!-- HERO SECTION -->
      <div class="relative isolate pt-12 lg:pt-16 hero-glow min-h-screen flex items-center">
        <!-- Background Floating Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="floating-element" style="width: 400px; height: 400px; top: 10%; left: -10%;"></div>
          <div class="floating-element" style="width: 300px; height: 300px; bottom: 20%; right: -5%; animation-delay: -5s;"></div>
        </div>

        <div class="mx-auto max-w-7xl px-6 lg:px-8 py-20 relative z-10 text-center lg:text-left lg:flex lg:items-center lg:gap-16">
          <!-- Left Column - Text -->
          <div class="lg:w-1/2 reveal-on-scroll">
            <div class="inline-flex items-center gap-2 rounded-full bg-[#ca000d]/10 px-3 py-1 text-sm font-semibold text-[#ca000d] ring-1 ring-inset ring-[#ca000d]/20 mb-6">
              <span class="animate-pulse">●</span> Novo Rocket System 2.0
            </div>
            <h1 class="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6">
              Sua academia <br/>
              <span class="text-gradient">conectada ao futuro.</span>
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-400">
              Plataformas digitais de alta performance para academias, boxes de Crossfit e personal trainers. Transforme suor em dados e dados em resultados.
            </p>
            <div class="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-x-6 gap-y-4">
              <UButton 
                size="xl" 
                label="Agendar Demo Gratuita" 
                color="primary" 
                class="glow-button text-white w-full sm:w-auto justify-center" 
                icon="i-lucide-arrow-right"
                trailing
                to="/contact" 
              />
              <UButton 
                size="xl" 
                label="Ver Planos" 
                variant="outline" 
                color="neutral" 
                icon="i-lucide-layers"
                class="w-full sm:w-auto border-white/20 hover:bg-white/10 text-white justify-center"
                @click="scrollToPricing" 
              />
            </div>

            <!-- Stats Grid -->
            <div class="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div>
                <div class="text-2xl font-bold text-white">500+</div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">Academias</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-white">1M+</div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">Treinos/Mês</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-white">98%</div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">Retenção</div>
              </div>
            </div>
          </div>

          <!-- Right Column - Floating Card -->
          <div class="lg:w-1/2 mt-16 lg:mt-0 relative reveal-on-scroll" style="transition-delay: 200ms;">
            <div class="relative enhanced-card rounded-2xl p-4 border-[#ca000d]/30 animate-float-slow">
              <div class="bg-neutral-900 rounded-xl overflow-hidden aspect-[4/3] relative border border-white/5">
                <div class="absolute inset-0 bg-gradient-to-tr from-[#ca000d]/20 to-transparent opacity-50"></div>
                <div class="p-6 space-y-4">
                  <div class="flex justify-between items-center">
                    <div class="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                    <div class="h-8 w-8 bg-[#ca000d] rounded-full flex items-center justify-center text-white">
                      <UIcon name="i-lucide-user" class="w-4 h-4" />
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mt-8">
                    <div class="h-24 bg-black/50 rounded-lg border border-white/10 p-3 relative overflow-hidden">
                      <div class="text-gray-400 text-xs">Calorias</div>
                      <div class="text-2xl font-bold text-white mt-1">840 <span class="text-[#ca000d] text-sm">kcal</span></div>
                      <UIcon name="i-lucide-flame" class="absolute bottom-2 right-2 text-[#ca000d]/20 w-8 h-8" />
                    </div>
                    <div class="h-24 bg-black/50 rounded-lg border border-white/10 p-3 relative overflow-hidden">
                      <div class="text-gray-400 text-xs">Treinos</div>
                      <div class="text-2xl font-bold text-white mt-1">12 <span class="text-green-500 text-sm">↑</span></div>
                      <UIcon name="i-lucide-dumbbell" class="absolute bottom-2 right-2 text-gray-700/50 w-8 h-8" />
                    </div>
                  </div>
                  <div class="h-32 bg-black/50 rounded-lg border border-white/10 mt-4 flex items-end justify-between p-4 gap-2">
                    <div class="w-full bg-[#ca000d]/20 h-[40%] rounded-t"></div>
                    <div class="w-full bg-[#ca000d]/20 h-[70%] rounded-t"></div>
                    <div class="w-full bg-[#ca000d]/20 h-[50%] rounded-t"></div>
                    <div class="w-full bg-[#ca000d] h-[90%] rounded-t shadow-[0_0_15px_rgba(202,0,13,0.5)]"></div>
                    <div class="w-full bg-[#ca000d]/20 h-[60%] rounded-t"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Floating Badge -->
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:-left-6 enhanced-card p-4 rounded-xl flex items-center gap-3 animate-float-alt bg-black/90 border border-[#ca000d]/20 w-max max-w-[90vw]">
              <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <UIcon name="i-lucide-check" class="w-5 h-5" />
              </div>
              <div>
                <div class="text-sm font-bold">Meta Batida</div>
                <div class="text-xs text-gray-400">Série Concluída</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TRUST SECTION (WHY ROCKET FITNESS) -->
      <section id="trust" class="py-24 relative">
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ca000d]/50 to-transparent"></div>
        
        <UContainer>
          <BaseSectionHeader 
            title="Por que Rocket Fitness?" 
            description="Excelência tecnológica e suporte dedicado para o sucesso da sua academia."
            class="text-center mb-16"
          />

          <div class="grid md:grid-cols-3 gap-8">
            <BaseEnhancedCard 
              v-for="(item, index) in trustItems" 
              :key="item.title"
              class="p-8 rounded-2xl group reveal-on-scroll"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              <div class="w-12 h-12 bg-[#ca000d]/10 rounded-xl flex items-center justify-center mb-6 border border-[#ca000d]/20 group-hover:border-[#ca000d] transition-colors">
                <UIcon :name="item.icon" class="w-6 h-6 text-[#ca000d]" />
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ item.title }}</h3>
              <p class="text-gray-400 leading-relaxed">{{ item.desc }}</p>
            </BaseEnhancedCard>
          </div>
        </UContainer>
      </section>

      <!-- SOLUTIONS SECTION -->
      <section id="solucoes" class="py-24 relative bg-[#0a0a0a]">
        <UContainer>
          <BaseSectionHeader 
            title="Soluções Completas" 
            description="Ferramentas integradas para cobrir cada aspecto do seu negócio fitness, desde a recepção até o aplicativo no bolso do aluno."
            class="text-center mb-16"
          />

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BaseEnhancedCard 
              v-for="(solution, index) in solutions" 
              :key="index" 
              class="p-8 rounded-2xl group cursor-pointer reveal-on-scroll"
              :featured="solution.featured"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              <div class="w-14 h-14 rounded-xl bg-[#ca000d]/10 flex items-center justify-center mb-6 group-hover:bg-[#ca000d] transition-colors duration-300">
                <UIcon :name="solution.icon" class="w-7 h-7 text-[#ca000d] group-hover:text-white transition-colors" />
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ solution.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">{{ solution.description }}</p>
            </BaseEnhancedCard>
          </div>
        </UContainer>
      </section>

      <!-- ECOSYSTEM / BENTO GRID SECTION -->
      <section class="py-24 relative">
        <UContainer>
          <BaseSectionHeader 
            title="Ecossistema Integrado" 
            description="Uma visão profunda de como nossos módulos se conectam para maximizar resultados."
            class="mb-12"
            :centered="false"
          >
            <template #title>
              Ecossistema <span class="text-[#ca000d]">Integrado</span>
            </template>
          </BaseSectionHeader>

          <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[140px] reveal-on-scroll">
            
            <!-- Large Card - App Experience (spans 2 cols, 2 rows) -->
            <BaseBentoCard class="md:col-span-2 md:row-span-2 group relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-[#ca000d]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10 h-full flex flex-col">
                <div class="flex items-start justify-between mb-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-[#ca000d] to-[#ff4444] rounded-xl flex items-center justify-center shadow-lg shadow-[#ca000d]/30">
                    <UIcon name="i-lucide-smartphone" class="w-6 h-6 text-white" />
                  </div>
                  <div class="flex items-center gap-2 text-xs">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span class="text-green-400">Live</span>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">App White Label</h3>
                <p class="text-gray-400 text-sm leading-relaxed mb-4">
                  Seu app exclusivo publicado nas lojas com sua marca.
                </p>
                <div class="mt-auto relative flex-1 min-h-[120px] bg-black/40 rounded-xl border border-white/5 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt="App Preview">
                  <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div class="flex gap-2">
                      <span class="bg-[#ca000d] px-2 py-1 rounded text-xs font-bold text-white">iOS</span>
                      <span class="bg-white/20 px-2 py-1 rounded text-xs text-white">Android</span>
                    </div>
                    <div class="text-xs text-gray-400">v2.0</div>
                  </div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Analytics Card with Chart (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <UIcon name="i-lucide-bar-chart-3" class="w-5 h-5 text-[#ca000d]" />
                    <h3 class="text-lg font-bold text-white">Analytics</h3>
                  </div>
                  <p class="text-gray-500 text-xs">Dados em tempo real</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-white">847</div>
                  <div class="text-xs text-green-400">+12% hoje</div>
                </div>
              </div>
              <div class="flex items-end justify-between gap-1 h-12 mt-auto">
                <div class="flex-1 bg-[#ca000d]/20 rounded-t h-[30%] group-hover:bg-[#ca000d]/40 transition-all"></div>
                <div class="flex-1 bg-[#ca000d]/20 rounded-t h-[50%] group-hover:bg-[#ca000d]/40 transition-all"></div>
                <div class="flex-1 bg-[#ca000d]/20 rounded-t h-[70%] group-hover:bg-[#ca000d]/40 transition-all"></div>
                <div class="flex-1 bg-[#ca000d]/20 rounded-t h-[45%] group-hover:bg-[#ca000d]/40 transition-all"></div>
                <div class="flex-1 bg-[#ca000d]/20 rounded-t h-[60%] group-hover:bg-[#ca000d]/40 transition-all"></div>
                <div class="flex-1 bg-[#ca000d]/20 rounded-t h-[80%] group-hover:bg-[#ca000d]/40 transition-all"></div>
                <div class="flex-1 bg-[#ca000d] rounded-t h-[95%] shadow-[0_0_20px_rgba(202,0,13,0.5)]"></div>
              </div>
            </BaseBentoCard>

            <!-- CRM Card with Avatar Stack (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
              <div class="absolute -right-8 -top-8 w-32 h-32 bg-[#ca000d]/10 blur-3xl rounded-full group-hover:bg-[#ca000d]/20 transition-colors"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-2 mb-3">
                  <UIcon name="i-lucide-users" class="w-5 h-5 text-[#ca000d]" />
                  <h3 class="text-lg font-bold text-white">CRM Inteligente</h3>
                </div>
                <p class="text-gray-400 text-xs mb-4">Recuperação automática de inativos</p>
                <div class="flex items-center justify-between">
                  <div class="flex -space-x-2">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-[#0a0a0a] flex items-center justify-center text-xs text-white font-bold">A</div>
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-[#0a0a0a] flex items-center justify-center text-xs text-white font-bold">M</div>
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-[#0a0a0a] flex items-center justify-center text-xs text-white font-bold">J</div>
                    <div class="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0a0a0a] flex items-center justify-center text-xs text-white">+42</div>
                  </div>
                  <div class="text-xs text-gray-400">
                    <span class="text-green-400 font-bold">94%</span> reativados
                  </div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Financeiro Card -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
              <div class="flex items-start justify-between">
                <div>
                  <div class="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3">
                    <UIcon name="i-lucide-wallet" class="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 class="text-lg font-bold text-white mb-1">Financeiro</h3>
                  <p class="text-gray-400 text-xs">Recorrência + NFe automática</p>
                </div>
                <div class="text-right">
                  <div class="text-xs text-gray-500 mb-1">Receita mensal</div>
                  <div class="text-lg font-bold text-emerald-400">R$ 127k</div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Acesso Biométrico (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
              <div class="flex items-center gap-6 h-full">
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-white mb-2">Acesso Biométrico</h3>
                  <p class="text-gray-400 text-xs mb-3">Catracas + Reconhecimento Facial</p>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Online</span>
                    <span class="text-xs text-gray-500">2 catracas</span>
                  </div>
                </div>
                <div class="relative">
                  <div class="w-20 h-20 rounded-full border-2 border-[#ca000d]/30 flex items-center justify-center relative">
                    <div class="absolute inset-0 rounded-full border-2 border-[#ca000d] border-t-transparent animate-spin-slow"></div>
                    <div class="w-14 h-14 rounded-full bg-[#ca000d]/10 flex items-center justify-center">
                      <UIcon name="i-lucide-scan-face" class="w-7 h-7 text-[#ca000d]" />
                    </div>
                  </div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Streaming Card (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-transparent">
              <div class="flex items-center gap-4 h-full">
                <div class="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center relative">
                  <UIcon name="i-lucide-play" class="w-8 h-8 text-purple-400" />
                  <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-white mb-1">Rocket Live & VOD</h3>
                  <p class="text-gray-400 text-xs mb-2">Streaming de aulas integrado</p>
                  <div class="flex gap-2">
                    <span class="text-xs text-purple-400">24 aulas ao vivo</span>
                    <span class="text-xs text-gray-600">•</span>
                    <span class="text-xs text-gray-400">+200 gravadas</span>
                  </div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Gamificação Card (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden bg-gradient-to-br from-amber-900/20 to-transparent">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <UIcon name="i-lucide-trophy" class="w-5 h-5 text-amber-400" />
                    <h3 class="text-lg font-bold text-white">Gamificação</h3>
                  </div>
                  <p class="text-gray-400 text-xs">Rankings e desafios</p>
                </div>
                <div class="flex gap-1">
                  <div class="w-6 h-6 rounded bg-amber-500/20 flex items-center justify-center">
                    <span class="text-xs">🥇</span>
                  </div>
                  <div class="w-6 h-6 rounded bg-gray-500/20 flex items-center justify-center">
                    <span class="text-xs">🥈</span>
                  </div>
                  <div class="w-6 h-6 rounded bg-orange-700/20 flex items-center justify-center">
                    <span class="text-xs">🥉</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full w-[75%] bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"></div>
                </div>
                <span class="text-xs text-amber-400 font-bold">Nível 12</span>
              </div>
            </BaseBentoCard>

          </div>
        </UContainer>
      </section>

      <!-- TRAINING SECTION -->
      <section class="py-24 bg-black relative overflow-hidden">
        <div class="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#ca000d]/5 to-transparent pointer-events-none"></div>
        <UContainer class="flex flex-col lg:flex-row items-center gap-16">
          <div class="lg:w-1/2 reveal-on-scroll">
            <h2 class="text-3xl font-bold text-white mb-6">Treinos prescritos na velocidade da luz.</h2>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="flex-none w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                  <UIcon name="i-lucide-zap" class="w-5 h-5 text-[#ca000d]" />
                </div>
                <div>
                  <h4 class="font-bold text-white">Montagem Rápida</h4>
                  <p class="text-gray-400 text-sm mt-1">Biblioteca com +2000 exercícios em vídeo 4K.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-none w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                  <UIcon name="i-lucide-pie-chart" class="w-5 h-5 text-[#ca000d]" />
                </div>
                <div>
                  <h4 class="font-bold text-white">Anamnese Digital</h4>
                  <p class="text-gray-400 text-sm mt-1">Avaliação física integrada que gera gráficos.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-none w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                  <UIcon name="i-lucide-brain" class="w-5 h-5 text-[#ca000d]" />
                </div>
                <div>
                  <h4 class="font-bold text-white">AI Coach</h4>
                  <p class="text-gray-400 text-sm mt-1">Sugestões inteligentes de progressão de carga.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:w-1/2 w-full reveal-on-scroll" style="transition-delay: 200ms;">
            <div class="enhanced-card p-2 rounded-3xl border border-gray-800 bg-gray-900/50">
              <div class="grid grid-cols-2 gap-2">
                <div class="bg-black p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=100&h=100" class="w-12 h-12 rounded-full object-cover border-2 border-[#ca000d]" alt="User">
                  <div>
                    <div class="text-white font-bold text-sm">Sarah C.</div>
                    <div class="text-xs text-green-400">Treinando</div>
                  </div>
                </div>
                <div class="bg-black p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100" class="w-12 h-12 rounded-full object-cover" alt="User">
                  <div>
                    <div class="text-white font-bold text-sm">Pedro A.</div>
                    <div class="text-xs text-gray-500">Ausente</div>
                  </div>
                </div>
                <div class="col-span-2 bg-[#ca000d]/10 p-4 rounded-2xl border border-[#ca000d]/30 flex justify-between items-center">
                  <div>
                    <div class="text-xs text-[#ca000d] font-bold uppercase">Retenção Mensal</div>
                    <div class="text-2xl font-bold text-white">94.5%</div>
                  </div>
                  <div class="h-10 w-24 flex items-end gap-1">
                    <div class="w-full bg-[#ca000d]/50 h-[40%] rounded-sm"></div>
                    <div class="w-full bg-[#ca000d]/50 h-[60%] rounded-sm"></div>
                    <div class="w-full bg-[#ca000d]/50 h-[50%] rounded-sm"></div>
                    <div class="w-full bg-[#ca000d] h-[80%] rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- SECURITY SECTION -->
      <section id="security" class="py-24 relative reveal-on-scroll">
        <UContainer>
          <div class="flex flex-col lg:flex-row items-center gap-16">
            <!-- Left Content -->
            <div class="lg:w-1/2">
              <div class="text-[#ca000d] font-semibold mb-2 tracking-wider text-sm uppercase">Segurança Primeiro</div>
              <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">Seus dados, protegidos como ouro.</h2>
              <p class="text-gray-400 text-lg mb-6 leading-relaxed">
                Utilizamos protocolos de criptografia AES-256 e estamos em total conformidade com a LGPD. Seus dados e os dados dos seus alunos estão sempre protegidos.
              </p>
              <ul class="space-y-4 mb-8">
                <li v-for="item in securityChecklist" :key="item" class="flex items-start gap-3 text-gray-300">
                  <UIcon name="i-lucide-check" class="w-6 h-6 text-[#ca000d] mt-0.5 flex-shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            
            <!-- Right Visual -->
            <div class="lg:w-1/2 w-full">
              <div class="relative rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-1">
                <div class="bg-[#0a0a0a] rounded-xl p-8 overflow-hidden relative group">
                  <div class="font-mono text-xs text-gray-500 mb-2">// SECURITY PROTOCOL ACTIVE</div>
                  <div class="space-y-2 mb-8">
                    <div class="h-2 w-3/4 bg-white/10 rounded"></div>
                    <div class="h-2 w-1/2 bg-white/10 rounded"></div>
                    <div class="h-2 w-5/6 bg-[#ca000d]/20 rounded animate-pulse"></div>
                  </div>
                  
                  <div class="flex justify-center py-8">
                    <div class="relative transition-transform duration-500 group-hover:scale-110">
                      <div class="absolute inset-0 bg-[#ca000d]/30 blur-2xl rounded-full transition-all duration-500 group-hover:bg-[#ca000d]/50 group-hover:blur-3xl"></div>
                      <UIcon name="i-lucide-shield-check" class="w-32 h-32 text-[#ca000d] relative z-10" />
                    </div>
                  </div>
                  
                  <div class="flex justify-between items-center text-xs text-gray-400 mt-4 pt-4 border-t border-white/10">
                    <span>Status: <span class="text-green-500">SEGURO</span></span>
                    <span>Enc: AES-256</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- PRICING SECTION -->
      <section id="pricing" ref="pricingSection" class="py-24 bg-[#0a0a0a]">
        <UContainer>
          <BaseSectionHeader 
            title="Escolha seu plano" 
            description="Soluções flexíveis para academias de todos os tamanhos."
            class="text-center mb-16"
          />

          <!-- Pricing Cards -->
          <div class="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-20 reveal-on-scroll">
            <!-- Basic Plan -->
            <BaseEnhancedCard class="p-8 flex flex-col">
              <h3 class="text-2xl font-bold text-white mb-2">Academia</h3>
              <p class="text-gray-400 mb-6 h-10">Para academias em crescimento.</p>
              <div class="text-5xl font-bold text-white mb-8">R$ 297 <span class="text-xl text-gray-500 font-normal">/mês</span></div>
              
              <UButton 
                block 
                size="lg" 
                label="Começar Agora" 
                variant="outline" 
                color="neutral" 
                class="mb-8 border-white/20 text-white hover:bg-white/10"
                to="/contact"
              />

              <div class="space-y-4">
                <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">O QUE ESTÁ INCLUÍDO</p>
                <ul class="space-y-3 text-sm text-gray-300">
                  <li v-for="item in basicPlanFeatures" :key="item" class="flex items-center gap-3">
                    <UIcon name="i-lucide-check" class="w-4 h-4 text-[#ca000d]" />
                    {{ item }}
                  </li>
                </ul>
              </div>
            </BaseEnhancedCard>

            <!-- Pro Plan -->
            <BaseEnhancedCard class="p-8 flex flex-col relative" :featured="true">
              <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ca000d] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-[#ca000d]/40 uppercase tracking-widest">
                Recomendado
              </div>
              
              <h3 class="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p class="text-gray-400 mb-6 h-10">Para redes e grandes academias.</p>
              <div class="text-5xl font-bold text-white mb-8">Custom <span class="text-xl text-gray-500 font-normal">/volume</span></div>
              
              <UButton 
                block 
                size="lg" 
                label="Falar com Vendas" 
                color="primary" 
                class="mb-8 glow-button text-white"
                to="/contact"
              />

              <div class="space-y-4">
                <p class="text-xs font-bold text-[#ca000d] uppercase tracking-wider">TUDO DO ACADEMIA, MAIS:</p>
                <ul class="space-y-3 text-sm text-white">
                  <li v-for="(item, index) in proPlanFeatures" :key="item" class="flex items-center gap-3">
                    <UIcon name="i-lucide-check" class="w-4 h-4 text-[#ca000d]" />
                    <span :class="{ 'font-bold': index === 0 }">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </BaseEnhancedCard>
          </div>

          <!-- Comparison Table -->
          <div class="max-w-5xl mx-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden reveal-on-scroll">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr class="bg-white/5 border-b border-white/10">
                    <th class="p-4 md:p-6 text-sm font-semibold text-white w-1/3">Recurso</th>
                    <th class="p-4 md:p-6 text-sm font-semibold text-white w-1/3 border-l border-white/10 text-center">Academia</th>
                    <th class="p-4 md:p-6 text-sm font-semibold text-[#ca000d] w-1/3 border-l border-white/10 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody class="text-sm text-gray-300">
                  <tr 
                    v-for="row in comparisonTable" 
                    :key="row.feature" 
                    class="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td class="p-4 md:p-6 font-medium text-white">{{ row.feature }}</td>
                    <td class="p-4 md:p-6 border-l border-white/10 text-center" :class="{ 'opacity-30': row.basic === '—' }">{{ row.basic }}</td>
                    <td class="p-4 md:p-6 border-l border-white/10 text-center" :class="{ 'text-white font-bold': row.proBold, 'text-[#ca000d] font-bold': row.proHighlight }">{{ row.pro }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- FAQ SECTION -->
      <section class="py-24">
        <UContainer class="max-w-4xl">
          <FaqSection 
            :items="faqItems" 
            description="Tudo o que você precisa saber sobre o Rocket Fitness." 
          />
        </UContainer>
      </section>

      <!-- CTA SECTION -->
      <BaseCtaSection
        title="Comece a transformação hoje."
        description="Junte-se a mais de 500 academias que modernizaram sua gestão e experiência do aluno com a Rocket Fitness."
        button-label="Falar com Consultor"
        button-to="/contact"
        class="reveal-on-scroll"
      />

    </main>

    <!-- FOOTER -->
    <AppFooter />

  </div>
</template>

<style scoped>
/* === GRID PATTERN === */
.grid-pattern {
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  opacity: 1;
  pointer-events: none;
}

/* === FLOATING ELEMENTS === */
.floating-element {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(202, 0, 13, 0.15), rgba(255, 68, 68, 0.05));
  animation: float-slow 20s ease-in-out infinite;
  filter: blur(40px);
  z-index: 0;
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  25% { transform: translateY(-30px) translateX(20px) rotate(5deg); }
  50% { transform: translateY(20px) translateX(-15px) rotate(-3deg); }
  75% { transform: translateY(-10px) translateX(25px) rotate(7deg); }
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-alt {
  animation: float-slow 8s ease-in-out infinite;
}

/* === HERO GLOW === */
.hero-glow {
  background: radial-gradient(circle at center, rgba(202, 0, 13, 0.15) 0%, transparent 70%);
}

/* === ENHANCED CARD === */
.enhanced-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(202, 0, 13, 0.02) 50%, rgba(255, 255, 255, 0.01) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.enhanced-card:hover {
  transform: translateY(-10px) scale(1.01);
  box-shadow: 0 20px 50px rgba(202, 0, 13, 0.15);
  border-color: rgba(202, 0, 13, 0.4);
}

/* === GLOW BUTTON === */
.glow-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.glow-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.glow-button:hover::before {
  left: 100%;
}

.glow-button:hover {
  box-shadow: 0 0 20px rgba(202, 0, 13, 0.6);
}

/* === TEXT GRADIENT === */
.text-gradient {
  background: linear-gradient(to right, #ca000d, #ff4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* === REVEAL ON SCROLL === */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* === SPIN SLOW === */
.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
