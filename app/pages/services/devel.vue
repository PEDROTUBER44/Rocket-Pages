<script setup lang="ts">
// --- Page Data ---
const stats = [
  { value: '+644', label: 'Projetos Entregues' },
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

const technologies = [
  { name: 'Vue.js', icon: 'i-logos-vue' },
  { name: 'Nuxt', icon: 'i-logos-nuxt-icon' },
  { name: 'React', icon: 'i-logos-react' },
  { name: 'Next.js', icon: 'i-logos-nextjs-icon' },
  { name: 'TypeScript', icon: 'i-logos-typescript-icon' },
  { name: 'Node.js', icon: 'i-logos-nodejs-icon' },
  { name: 'Python', icon: 'i-logos-python' },
  { name: 'Docker', icon: 'i-logos-docker-icon' },
  { name: 'AWS', icon: 'i-logos-aws' },
  { name: 'Tailwind CSS', icon: 'i-logos-tailwindcss-icon' },
  { name: 'PostgreSQL', icon: 'i-logos-postgresql' },
  { name: 'Redis', icon: 'i-logos-redis' },
];

const processSteps = [
  { 
    num: '01', 
    title: 'Discovery & Strategy', 
    desc: 'Imersão no negócio para entender dores e objetivos. Definição de escopo, arquitetura técnica e roadmap do produto.',
    icon: 'i-lucide-search'
  },
  { 
    num: '02', 
    title: 'UX/UI Design', 
    desc: 'Criação de wireframes e protótipos de alta fidelidade, focados na melhor experiência do usuário e conversão.',
    icon: 'i-lucide-palette'
  },
  { 
    num: '03', 
    title: 'Agile Development', 
    desc: 'Desenvolvimento em sprints semanais com entregas contínuas (CI/CD). Código limpo, testado e documentado.',
    icon: 'i-lucide-code-2'
  },
  { 
    num: '04', 
    title: 'Launch & Growth', 
    desc: 'Deploy em ambiente de produção escalável. Monitoramento de performance e sustentação para evolução constante.',
    icon: 'i-lucide-rocket'
  }
];

const trustItems = [
  {
    title: 'Código de Elite',
    desc: 'Não entregamos apenas software que funciona, mas código limpo, manutenível e escalável.',
    icon: 'i-lucide-award'
  },
  {
    title: 'Comunicação Transparente',
    desc: 'Acesso direto ao time técnico. Daily meetings opcionais e relatórios semanais de progresso.',
    icon: 'i-lucide-users'
  },
  {
    title: 'Entrega Rápida',
    desc: 'Metodologias ágeis e automação de devops para reduzir o time-to-market do seu produto.',
    icon: 'i-lucide-zap'
  }
];

const faqItems = [
  {
    label: 'Qual a metodologia de trabalho utilizada?',
    content: 'Trabalhamos com metodologias ágeis (Scrum/Kanban). Realizamos sprints semanais ou quinzenais, com reuniões de review para garantir que o projeto esteja sempre alinhado com as expectativas.'
  },
  {
    label: 'Vocês dão manutenção em sistemas legados?',
    content: 'Sim. Possuímos uma equipe especializada em refatoração e modernização de aplicações legadas, garantindo segurança, performance e escalabilidade sem perder as regras de negócio.'
  },
  {
    label: 'Como funciona a propriedade intelectual (IP)?',
    content: 'Todo o código produzido é 100% propriedade do cliente. Ao final do projeto (ou a qualquer momento solicitado), entregamos os repositórios completos e documentação técnica.'
  },
  {
    label: 'Quais tecnologias vocês utilizam?',
    content: 'Somos especialistas em JavaScript/TypeScript (React, Vue, Node.js) e Python. Para infraestrutura, trabalhamos principalmente com AWS e Google Cloud, utilizando Docker e Kubernetes.'
  }
];

// --- Scroll Logic ---
const servicesSection = ref<HTMLElement | null>(null);

const scrollToServices = () => {
  servicesSection.value?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToResources = () => {
  document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
};

// --- Animations (SSR-Friendly) ---
const { setupScrollAnimation } = useScrollReveal();

onMounted(() => {
  setupScrollAnimation();
});

useAppSeo({
  title: 'Rocket Devel: Desenvolvimento de Software de Alta Performance',
  description: 'Desenvolvimento de software sob medida, aplicações web de alta performance e sistemas integrados.',
  image: '/og-devel.png',
  breadcrumbs: [
      { name: 'Home', url: 'https://rocketweb.tech' },
      { name: 'Serviços', url: 'https://rocketweb.tech/servicos' },
      { name: 'Rocket Devel', url: 'https://rocketweb.tech/services/devel' }
  ]
});

// Schema.org FAQ - Melhora visibilidade em buscas
useFAQSchema([
  { question: 'Qual a metodologia de trabalho utilizada?', answer: 'Trabalhamos com metodologias ágeis (Scrum/Kanban). Realizamos sprints semanais ou quinzenais, com reuniões de review para garantir que o projeto esteja sempre alinhado com as expectativas.' },
  { question: 'Vocês dão manutenção em sistemas legados?', answer: 'Sim. Possuímos uma equipe especializada em refatoração e modernização de aplicações legadas, garantindo segurança, performance e escalabilidade sem perder as regras de negócio.' },
  { question: 'Como funciona a propriedade intelectual (IP)?', answer: 'Todo o código produzido é 100% propriedade do cliente. Ao final do projeto (ou a qualquer momento solicitado), entregamos os repositórios completos e documentação técnica.' },
  { question: 'Quais tecnologias vocês utilizam?', answer: 'Somos especialistas em JavaScript/TypeScript (React, Vue, Node.js) e Python. Para infraestrutura, trabalhamos principalmente com AWS e Google Cloud, utilizando Docker e Kubernetes.' }
]);

// Schema.org Service - Identifica como serviço
useServiceSchema({
  name: 'Rocket Devel',
  description: 'Desenvolvimento de software sob medida, aplicações web de alta performance, apps mobile e sistemas integrados com metodologias ágeis.',
  url: 'https://rocketweb.tech/services/devel',
  image: 'https://rocketweb.tech/og-devel.png'
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
    <main class="flex-grow flex flex-col relative z-10">
      <UContainer class="pt-32 lg:pt-52 pb-24 w-full">
        
        <!-- HERO SECTION -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <!-- Left Content -->
          <div class="space-y-8">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ca000d]/30 bg-[#ca000d]/10 text-[#ca000d] text-xs font-semibold tracking-wide">
              <span class="w-2 h-2 rounded-full bg-[#ca000d] animate-pulse"></span>
              ROCKET DEVEL
            </div>
            
            <!-- Title -->
            <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
              Transformamos código em <br/>
              <span class="text-gradient">Resultados Reais</span>
            </h1>
            
            <!-- Subtitle -->
            <p class="text-gray-400 text-lg sm:text-xl max-w-lg leading-relaxed">
              Desenvolvimento de software sob medida, aplicações web de alta performance e sistemas integrados. A tecnologia certa para impulsionar o seu negócio.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <UButton 
                size="xl" 
                label="Iniciar Projeto" 
                color="primary" 
                class="glow-button text-white justify-center"
                icon="i-lucide-arrow-right"
                trailing
                to="/contact"
              />
              <UButton 
                size="xl" 
                label="Ver Recursos" 
                variant="ghost" 
                color="neutral" 
                icon="i-lucide-layers"
                class="border border-white/10 hover:border-[#ca000d] text-white hover:bg-[#ca000d]/10 justify-center"
                @click="scrollToResources"
              />
            </div>
          </div>

          <!-- Right Content - Code Card -->
          <div class="relative">
            <BaseEnhancedCard class="p-6 relative z-20 animate-float" :hoverEffect="false">
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
            </BaseEnhancedCard>
            
            <!-- Floating React Icon -->
            <div class="absolute -top-10 -right-10 z-10 opacity-60">
              <UIcon name="i-lucide-atom" class="w-24 h-24 text-[#ca000d] animate-spin-slow" />
            </div>
            <div class="absolute -bottom-10 -left-10 z-10 opacity-40">
              <UIcon name="i-lucide-terminal" class="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        <!-- STATS SECTION -->
        <div class="py-10 mb-24 border-y border-white/5 bg-white/[0.02]">
          <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center justify-center p-4 text-center group transition-colors">
               <UIcon :name="stat.icon" class="w-6 h-6 text-[#ca000d] mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              <div class="text-3xl font-bold text-white mb-1 group-hover:text-[#ca000d] transition-colors">{{ stat.value }}</div>
              <div class="text-sm text-gray-400 font-medium group-hover:text-white transition-colors">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- TRUST SECTION (WHY ROCKET) -->
        <div class="mb-32">
          <div class="text-center mb-16 reveal-on-scroll">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Por que a Rocket Devel?</h2>
            <p class="text-gray-400">Excelência técnica e compromisso com o seu resultado.</p>
          </div>

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
        </div>

        <!-- TECH STACK MARQUEE -->
        <div class="mb-32 overflow-hidden relative">
          <BaseSectionHeader 
             title="Tech Stack de Ponta" 
             description="Dominamos as ferramentas que constroem o futuro da web."
             class="text-center mb-16"
          />
          
          <div class="relative flex overflow-x-hidden group">
             <!-- Gradient Masks -->
             <div class="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#050505] to-transparent"></div>
             <div class="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#050505] to-transparent"></div>

             <div class="py-12 animate-marquee whitespace-nowrap flex gap-16">
                <!-- Duplicate array for infinite loop -->
                <div v-for="tech in [...technologies, ...technologies]" :key="tech.name + Math.random()" class="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-default">
                   <UIcon :name="tech.icon" class="w-10 h-10 grayscale hover:grayscale-0 transition-all duration-300" />
                   <span class="text-2xl font-bold opacity-50">{{ tech.name }}</span>
                </div>
             </div>
             
             <div class="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex gap-16">
                <div v-for="tech in [...technologies, ...technologies]" :key="tech.name + Math.random() + 'dup'" class="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-default">
                   <UIcon :name="tech.icon" class="w-10 h-10 grayscale hover:grayscale-0 transition-all duration-300" />
                   <span class="text-2xl font-bold opacity-50">{{ tech.name }}</span>
                </div>
             </div>
          </div>
        </div>

        <!-- SPECIALTIES SECTION -->
        <div id="solutions" class="mb-32 scroll-mt-40">
          <div class="text-center mb-16 reveal-on-scroll">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Soluções Sob Medida</h2>
            <p class="text-gray-400">A melhor tecnologia de desenvolvimento para o seu negócio.</p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <BaseEnhancedCard 
              v-for="(specialty, index) in specialties" 
              :key="index" 
              class="p-8 rounded-2xl group reveal-on-scroll"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              <!-- Icon Container Matching Cloud Page -->
              <div class="w-12 h-12 bg-[#ca000d]/10 rounded-xl flex items-center justify-center mb-6 border border-[#ca000d]/20 group-hover:border-[#ca000d] transition-colors">
                <UIcon :name="specialty.icon" class="w-6 h-6 text-[#ca000d]" />
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ specialty.title }}</h3>
              <p class="text-gray-400 leading-relaxed">{{ specialty.description }}</p>
            </BaseEnhancedCard>
          </div>
        </div>

        <!-- BENTO ECOSYSTEM -->
        <div class="mb-32">
          <BaseSectionHeader 
            title="Ecossistema de Engenharia" 
            description="Não apenas escrevemos código, construímos arquiteturas resilientes e preparadas para o futuro."
            badge="ECOSYSTEM"
            class="mb-16 text-center"
          >
             <template #title>
                Ecossistema de <span class="text-[#ca000d]">Engenharia</span>
             </template>
          </BaseSectionHeader>

          <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[140px] reveal-on-scroll">
            
            <!-- Clean Architecture Card (spans 2 cols, 2 rows) -->
            <BaseBentoCard class="md:col-span-2 md:row-span-2 group relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-[#ca000d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="relative z-10 h-full flex flex-col">
                <div class="flex items-start justify-between mb-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-[#ca000d] to-[#ff4444] rounded-xl flex items-center justify-center shadow-lg shadow-[#ca000d]/30">
                    <UIcon name="i-lucide-layers" class="w-6 h-6 text-white" />
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">SOLID</span>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">Clean Architecture</h3>
                <p class="text-gray-400 text-sm leading-relaxed mb-4">
                  Padrões rigorosos de código. Desacoplamento e testabilidade.
                </p>
                <div class="mt-auto flex-1 min-h-[120px] bg-black/40 rounded-xl border border-white/5 overflow-hidden p-4 font-mono text-xs">
                  <div class="text-gray-500 mb-2">// Domain Layer</div>
                  <div><span class="text-purple-400">class</span> <span class="text-yellow-400">UseCase</span> <span class="text-gray-500">implements</span> <span class="text-green-400">Executable</span> {'{'}</div>
                  <div class="pl-4"><span class="text-blue-400">execute</span>(<span class="text-orange-400">input</span>: <span class="text-purple-400">DTO</span>): <span class="text-purple-400">Result</span> {'{'}</div>
                  <div class="pl-8 text-gray-600">// Business logic...</div>
                  <div class="pl-4">{'}'}</div>
                  <div>{'}'}</div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- CI/CD Pipeline Card (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <UIcon name="i-lucide-git-branch" class="w-5 h-5 text-[#ca000d]" />
                    <h3 class="text-lg font-bold text-white">CI/CD Pipeline</h3>
                  </div>
                  <p class="text-gray-500 text-xs">Deploy automatizado</p>
                </div>
                <div class="flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span class="text-xs text-green-400">All passing</span>
                </div>
              </div>
              <div class="flex items-center gap-2 mt-auto">
                <div class="flex-1 flex items-center gap-1">
                  <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <UIcon name="i-lucide-git-commit" class="w-4 h-4 text-blue-400" />
                  </div>
                  <div class="flex-1 h-px bg-green-500"></div>
                  <div class="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <UIcon name="i-lucide-test-tube" class="w-4 h-4 text-yellow-400" />
                  </div>
                  <div class="flex-1 h-px bg-green-500"></div>
                  <div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <UIcon name="i-lucide-box" class="w-4 h-4 text-purple-400" />
                  </div>
                  <div class="flex-1 h-px bg-green-500"></div>
                  <div class="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <UIcon name="i-lucide-rocket" class="w-4 h-4 text-green-400" />
                  </div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- API Integrations Card (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
              <div class="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-2 mb-3">
                  <UIcon name="i-lucide-plug" class="w-5 h-5 text-blue-400" />
                  <h3 class="text-lg font-bold text-white">API & Integrações</h3>
                </div>
                <p class="text-gray-400 text-xs mb-4">REST, GraphQL, WebSockets</p>
                <div class="flex items-center justify-between">
                  <div class="flex -space-x-2">
                    <div class="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                      <UIcon name="i-logos-stripe" class="w-4 h-4" />
                    </div>
                    <div class="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                      <UIcon name="i-logos-google-icon" class="w-4 h-4" />
                    </div>
                    <div class="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                      <UIcon name="i-logos-aws" class="w-4 h-4" />
                    </div>
                    <div class="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs text-gray-400">+12</div>
                  </div>
                  <span class="text-xs text-blue-400">50+ conectores</span>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Scalability Card -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
              <div class="flex items-start justify-between">
                <div>
                  <div class="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3">
                    <UIcon name="i-lucide-trending-up" class="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 class="text-lg font-bold text-white mb-1">Escalabilidade</h3>
                  <p class="text-gray-400 text-xs">100 → 1M usuários</p>
                </div>
                <div class="text-right">
                  <div class="text-xs text-gray-500 mb-1">Requests/s</div>
                  <div class="text-lg font-bold text-emerald-400">50k+</div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Security Card -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-transparent">
              <div class="flex items-center gap-6 h-full">
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-white mb-2">Segurança</h3>
                  <p class="text-gray-400 text-xs mb-3">LGPD + GDPR Compliant</p>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">AES-256</span>
                    <span class="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">TLS 1.3</span>
                  </div>
                </div>
                <div class="relative">
                  <div class="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <UIcon name="i-lucide-shield-check" class="w-8 h-8 text-purple-400" />
                  </div>
                  <div class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <UIcon name="i-lucide-check" class="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Testing Card (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <UIcon name="i-lucide-test-tube-2" class="w-5 h-5 text-green-400" />
                    <h3 class="text-lg font-bold text-white">Testes Automatizados</h3>
                  </div>
                  <p class="text-gray-500 text-xs">Unit, Integration, E2E</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-green-400">98%</div>
                  <div class="text-xs text-gray-500">coverage</div>
                </div>
              </div>
              <div class="flex items-end justify-between gap-1 h-10 mt-auto">
                <div class="flex-1 bg-green-500/30 rounded-t h-[60%]"></div>
                <div class="flex-1 bg-green-500/30 rounded-t h-[80%]"></div>
                <div class="flex-1 bg-green-500/30 rounded-t h-[70%]"></div>
                <div class="flex-1 bg-green-500/30 rounded-t h-[90%]"></div>
                <div class="flex-1 bg-green-500/30 rounded-t h-[85%]"></div>
                <div class="flex-1 bg-green-500 rounded-t h-[98%] shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
              </div>
            </BaseBentoCard>

            <!-- Database Card (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden bg-gradient-to-br from-cyan-900/20 to-transparent">
              <div class="flex items-center gap-4 h-full">
                <div class="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <UIcon name="i-lucide-database" class="w-7 h-7 text-cyan-400" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-white mb-1">Database Design</h3>
                  <p class="text-gray-400 text-xs mb-2">SQL, NoSQL, Redis, ElasticSearch</p>
                  <div class="flex gap-2">
                    <span class="text-xs text-cyan-400">PostgreSQL</span>
                    <span class="text-xs text-gray-600">•</span>
                    <span class="text-xs text-gray-400">MongoDB</span>
                  </div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Performance Monitoring Card (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden bg-gradient-to-br from-amber-900/20 to-transparent">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <UIcon name="i-lucide-activity" class="w-5 h-5 text-amber-400" />
                    <h3 class="text-lg font-bold text-white">Performance</h3>
                  </div>
                  <p class="text-gray-400 text-xs">Monitoramento 24/7</p>
                </div>
                <div class="flex gap-2">
                  <div class="text-center">
                    <div class="text-lg font-bold text-amber-400">99.9%</div>
                    <div class="text-[10px] text-gray-500">uptime</div>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full w-[99.9%] bg-gradient-to-r from-amber-500 to-green-400 rounded-full"></div>
                </div>
                <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-green-400" />
              </div>
            </BaseBentoCard>

          </div>
        </div>

        <!-- PROCESS TIMELINE -->
        <div class="mb-32">
           <BaseSectionHeader 
            title="Nosso Processo" 
            description="Metodologia ágil e transparente em cada etapa do ciclo de vida do software."
            class="text-center mb-16"
          />

          <div class="grid md:grid-cols-4 gap-8 relative">
             <!-- Connecting Line (Desktop) -->
             <div class="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-white/10 z-0"></div>
             
             <!-- Connecting Line (Mobile) -->
             <div class="md:hidden absolute top-4 bottom-24 left-1/2 w-px bg-white/10 -translate-x-1/2 z-0"></div>

             <div 
               v-for="(step, index) in processSteps" 
               :key="index" 
               class="relative z-10 flex flex-col items-center text-center group reveal-on-scroll"
               :style="{ transitionDelay: `${index * 150}ms` }"
             >
               <div class="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#ca000d] transition-all duration-300 relative">
                 <UIcon :name="step.icon" class="w-7 h-7 text-white group-hover:text-[#ca000d] transition-colors" />
                 
                 <!-- Number Badge -->
                 <div class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#ca000d] text-white text-xs font-bold flex items-center justify-center border-2 border-[#050505]">
                   {{ index + 1 }}
                 </div>
               </div>
               
               <h3 class="text-lg font-bold text-white mb-2">{{ step.title }}</h3>
               <p class="text-sm text-gray-400 max-w-[200px] leading-relaxed">{{ step.desc }}</p>
             </div>
          </div>
        </div>

        <!-- FAQ SECTION -->
        <div class="mb-32 max-w-3xl mx-auto">
             <FaqSection 
               :items="faqItems" 
               description="Tudo o que você precisa saber sobre nosso modelo de trabalho."
             />
        </div>

        <!-- CTA SECTION -->
        <BaseCtaSection
          title="Pronto para decolar seu projeto?"
          description="Não importa a complexidade, a Rocket Devel tem a equipe e a tecnologia certa para entregar. Vamos construir o futuro juntos."
          button-label="Solicitar Orçamento"
          button-to="/contact"
        />

      </UContainer>
    </main>

    <!-- FOOTER -->
    <AppFooter />

  </div>
</template>

<style scoped>
/* === PAGE-SPECIFIC STYLES === */
/* All common styles (grid-pattern, text-gradient, glow-button, animations, 
   marquee, etc.) are now in main.css */

/* No page-specific styles needed */
</style>
