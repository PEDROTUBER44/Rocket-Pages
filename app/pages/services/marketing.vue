<script setup lang="ts">
import EnhancedCard from '~/components/base/EnhancedCard.vue'
import BaseBentoCard from '~/components/base/BaseBentoCard.vue'
import SectionHeader from '~/components/base/SectionHeader.vue'
import BackgroundParticles from '~/components/base/BackgroundParticles.vue'

// --- Page Data ---
const integrations = [
  { name: 'Google Ads', icon: 'i-logos-google-ads' },
  { name: 'Meta', icon: 'i-logos-facebook-icon' },
  { name: 'Analytics', icon: 'i-logos-google-analytics' },
  { name: 'HubSpot', icon: 'i-logos-hubspot' },
];

const marketingStats = [
  { value: 'R$ 50M+', label: 'Verba Gerenciada' },
  { value: 'PRO', label: 'Meta Partner' },
  { value: 'TOP 3%', label: 'Google Premier' },
  { value: '10x', label: 'ROI Médio' }
];

const trustItems = [
  {
    title: 'Algoritmos Proprietários',
    desc: 'Nossa inteligência artificial monitora suas campanhas 24/7, fazendo ajustes de bid e budget em tempo real.',
    icon: 'i-lucide-cpu'
  },
  {
    title: 'Criativos que Convertem',
    desc: 'Time de design focado em performance. Testamos dezenas de variações de anúncios para encontrar os campeões.',
    icon: 'i-lucide-palette'
  },
  {
    title: 'Relatórios Transparentes',
    desc: 'Dashboard em tempo real. Você sabe exatamente onde cada centavo está sendo investido e qual o retorno.',
    icon: 'i-lucide-file-bar-chart-2'
  }
];

const marketingTools = [
  { name: 'Google Ads', icon: 'i-logos-google-ads' },
  { name: 'Meta Ads', icon: 'i-logos-facebook' },
  { name: 'LinkedIn', icon: 'i-logos-linkedin-icon' },
  { name: 'TikTok', icon: 'i-logos-tiktok-icon' },
  { name: 'Analytics 4', icon: 'i-logos-google-analytics' },
  { name: 'HubSpot', icon: 'i-logos-hubspot' },
  { name: 'Salesforce', icon: 'i-logos-salesforce' },
  { name: 'Semrush', icon: 'i-simple-icons-semrush' },
  { name: 'Looker', icon: 'i-logos-looker-icon' },
];

const solutions = [
  {
    icon: 'i-lucide-target',
    title: 'Gestão de Tráfego & Ads',
    description: 'Campanhas de alta performance no Google, Meta e LinkedIn Ads. Focamos em CPA (Custo por Aquisição) e ROAS, não apenas em cliques.',
    featured: true
  },
  {
    icon: 'i-lucide-search',
    title: 'SEO Técnico',
    description: 'Posicione sua marca nas primeiras posições de busca orgânica. Auditoria técnica completa, link building e otimização on-page.',
    featured: false
  },
  {
    icon: 'i-lucide-megaphone',
    title: 'Social & Branding',
    description: 'Gestão de comunidade e branding. Transforme seguidores em advogados da sua marca com conteúdo estratégico.',
    featured: false
  },
  {
    icon: 'i-lucide-database',
    title: 'CRM & Automação',
    description: 'Implementação de funis de vendas automáticos, lead scoring e integração Smarketing (Sales + Marketing).',
    featured: false
  },
  {
    icon: 'i-lucide-bar-chart-3',
    title: 'Business Intelligence',
    description: 'Dashboards em tempo real para tomada de decisão. Transformamos dados brutos em insights acionáveis.',
    featured: false
  },
  {
    icon: 'i-lucide-mail',
    title: 'Email Marketing',
    description: 'Automação de fluxos de nutrição e campanhas de retargeting para aumentar o LTV (Lifetime Value) dos clientes.',
    featured: false
  }
];

const processSteps = [
  {
    num: '01',
    title: 'Diagnóstico & Dados',
    desc: 'Análise profunda do cenário atual, concorrentes e público-alvo baseada em dados reais.',
    icon: 'i-lucide-scan-search'
  },
  {
    num: '02',
    title: 'Estratégia Full-Funnel',
    desc: 'Planejamento de canais e mensagens para cada etapa da jornada do cliente, da atração à retenção.',
    icon: 'i-lucide-map'
  },
  {
    num: '03',
    title: 'Execução Ágil',
    desc: 'Implementação de campanhas e testes A/B constantes para encontrar as melhores alavancas de crescimento.',
    icon: 'i-lucide-zap'
  },
  {
    num: '04',
    title: 'Otimização & Scale',
    desc: 'Monitoramento de KPIs e realocação de budget para os canais de maior retorno (ROI).',
    icon: 'i-lucide-trending-up'
  }
];

const faqItems = [
  {
    label: 'Como funciona a cobrança (Fee vs Ad Spend)?',
    content: 'Trabalhamos com um fee fixo de gestão + % sobre o investimento (modelos híbridos). O investimento em mídia (Ad Spend) é pago diretamente às plataformas (Google, Facebook, etc).'
  },
  {
    label: 'Qual o investimento mínimo recomendado?',
    content: 'Depende do nicho e concorrência. Geralmente recomendamos um budget inicial que permita testes estatisticamente relevantes (mínimo de R$ 2.000/mês em mídia).'
  },
  {
    label: 'Quanto tempo demora para ver resultados?',
    content: 'Em tráfego pago (Ads), os resultados podem aparecer nas primeiras semanas. Para SEO e Branding, o trabalho é de médio a longo prazo (3 a 6 meses para maturação).'
  },
  {
    label: 'Vocês criam os vídeos e imagens dos anúncios?',
    content: 'Sim, possuímos um time de Design e Copywriting focado em conversão para produzir todos os criativos das campanhas.'
  }
];

// --- Animation Setup (SSR-Friendly) ---
const { setupScrollAnimation } = useScrollReveal();

const scrollToCases = () => {
  document.getElementById('solucoes')?.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
  setupScrollAnimation();
});

useAppSeo({
  title: 'Rocket Marketing: Tráfego Pago, SEO e Growth Marketing',
  description: 'Performance & Growth. Gestão de Tráfego, SEO Técnico e Automação para escalar seu negócio.',
  image: '/og-marketing.png',
  breadcrumbs: [
      { name: 'Home', url: 'https://rocketweb.tech' },
      { name: 'Serviços', url: 'https://rocketweb.tech/servicos' },
      { name: 'Rocket Marketing', url: 'https://rocketweb.tech/services/marketing' }
  ]
});

// Schema.org FAQ - Melhora visibilidade em buscas
useFAQSchema([
  { question: 'Como funciona a cobrança (Fee vs Ad Spend)?', answer: 'Trabalhamos com um fee fixo de gestão + % sobre o investimento (modelos híbridos). O investimento em mídia (Ad Spend) é pago diretamente às plataformas (Google, Facebook, etc).' },
  { question: 'Qual o investimento mínimo recomendado?', answer: 'Depende do nicho e concorrência. Geralmente recomendamos um budget inicial que permita testes estatisticamente relevantes (mínimo de R$ 2.000/mês em mídia).' },
  { question: 'Quanto tempo demora para ver resultados?', answer: 'Em tráfego pago (Ads), os resultados podem aparecer nas primeiras semanas. Para SEO e Branding, o trabalho é de médio a longo prazo (3 a 6 meses para maturação).' },
  { question: 'Vocês criam os vídeos e imagens dos anúncios?', answer: 'Sim, possuímos um time de Design e Copywriting focado em conversão para produzir todos os criativos das campanhas.' }
]);

// Schema.org Service - Identifica como serviço
useServiceSchema({
  name: 'Rocket Marketing',
  description: 'Marketing digital orientado a dados com gestão de tráfego pago, SEO técnico, automação de marketing e growth hacking.',
  url: 'https://rocketweb.tech/services/marketing',
  image: 'https://rocketweb.tech/og-marketing.png'
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
    <main class="flex-grow flex flex-col relative z-10 pt-32 pb-20">
      
      <!-- HERO SECTION -->
      <UContainer class="mb-32">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          
          <!-- Left Content -->
          <div class="space-y-8">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#ca000d] text-xs font-bold uppercase tracking-widest">
              <span class="w-2 h-2 rounded-full bg-[#ca000d] animate-pulse"></span>
              Rocket Growth v3.0
            </div>
            
            <h1 class="text-5xl sm:text-7xl font-bold leading-[1.1]">
              Data Driven <br>
              <span class="text-gradient">Marketing.</span>
            </h1>
            
            <p class="text-gray-400 text-lg leading-relaxed max-w-xl">
              Não dependa da sorte. A Rocket Marketing utiliza inteligência de dados, IA e automação para criar máquinas de vendas previsíveis e escaláveis.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 pt-2">
              <UButton 
                size="xl" 
                label="Acelerar Meu Negócio" 
                color="primary" 
                class="glow-button text-white justify-center"
                icon="i-lucide-rocket"
                to="/contact"
              />
              <UButton 
                size="xl" 
                label="Ver Cases" 
                variant="outline" 
                color="neutral" 
                icon="i-lucide-presentation"
                class="glass-panel border-white/10 text-white hover:bg-white/10 justify-center"
                @click="scrollToCases"
              />
            </div>
          </div>

          <!-- Right Content - Performance Card -->
          <div class="relative hidden lg:block perspective-container">
             <!-- Glow behind chart -->
            <div class="absolute inset-0 bg-[#ca000d]/20 blur-[100px] rounded-full z-10 pointer-events-none"></div>

            <div class="glass-panel p-8 rounded-3xl animate-float relative z-20 shadow-2xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden">
               <!-- Grid Pattern Overlay -->
              <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              <div class="relative z-10 flex justify-between items-start mb-8">
                <div>
                  <h3 class="font-bold text-xl text-white">Performance ROI</h3>
                  <div class="text-sm text-gray-400 mt-1 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Live Tracking
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span class="py-1.5 px-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-sm font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                    +127% <UIcon name="i-lucide-trending-up" class="w-4 h-4" />
                  </span>
                </div>
              </div>
              
              <!-- Chart Bars -->
              <div class="flex items-end gap-4 h-56 mb-2 px-2 relative">
                 <!-- Y-Axis Lines (Decorative) -->
                 <div class="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-700 font-mono uppercase">
                    <div class="w-full h-px bg-white/5"></div>
                    <div class="w-full h-px bg-white/5"></div>
                    <div class="w-full h-px bg-white/5"></div>
                    <div class="w-full h-px bg-white/5"></div>
                    <div class="w-full h-px bg-white/5"></div>
                 </div>

                <div class="w-full bg-gradient-to-t from-white/5 to-white/10 rounded-t-lg hover:from-[#ca000d]/40 hover:to-[#ca000d]/60 transition-all duration-500 cursor-pointer relative group border-t border-x border-white/5 hover:border-[#ca000d]/30" style="height: 40%">
                   <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-xl">40%</div>
                </div>
                <div class="w-full bg-gradient-to-t from-white/5 to-white/10 rounded-t-lg hover:from-[#ca000d]/40 hover:to-[#ca000d]/60 transition-all duration-500 cursor-pointer relative group border-t border-x border-white/5 hover:border-[#ca000d]/30" style="height: 60%">
                   <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-xl">60%</div>
                </div>
                <div class="w-full bg-gradient-to-t from-white/5 to-white/10 rounded-t-lg hover:from-[#ca000d]/40 hover:to-[#ca000d]/60 transition-all duration-500 cursor-pointer relative group border-t border-x border-white/5 hover:border-[#ca000d]/30" style="height: 35%">
                   <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-xl">35%</div>
                </div>
                <div class="w-full bg-gradient-to-t from-white/5 to-white/10 rounded-t-lg hover:from-[#ca000d]/40 hover:to-[#ca000d]/60 transition-all duration-500 cursor-pointer relative group border-t border-x border-white/5 hover:border-[#ca000d]/30" style="height: 80%">
                   <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-xl">80%</div>
                </div>
                <!-- Highlighted Bar -->
                <div class="w-full bg-gradient-to-t from-[#ca000d] to-[#ff4444] rounded-t-lg shadow-[0_0_30px_rgba(202,0,13,0.3)] relative group border-t border-x border-[#ff4444]/50" style="height: 95%">
                   <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-[#ca000d] text-xs font-bold px-3 py-1.5 rounded-lg opacity-100 shadow-lg animate-bounce-small">New High</div>
                </div>
              </div>

              <!-- Legend -->
              <div class="flex justify-between text-xs text-gray-500 font-mono uppercase border-t border-white/5 pt-4 relative z-10">
                <span>W 01</span><span>W 02</span><span>W 03</span><span>W 04</span><span class="text-[#ca000d] font-bold">Current</span>
              </div>
            </div>

            <!-- Floating Decoration Cards -->
            <div class="absolute -top-8 -right-8 glass-panel p-4 rounded-xl z-30 animate-float-delayed border border-white/10 bg-[#050505]/80">
              <div class="flex items-center gap-3">
                 <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <UIcon name="i-lucide-users" class="w-5 h-5 text-blue-400" />
                 </div>
                 <div>
                    <div class="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Novos Leads</div>
                    <div class="font-bold text-white text-lg leading-none">+1,240</div>
                 </div>
              </div>
            </div>

            <div class="absolute top-1/2 -left-12 glass-panel p-4 rounded-xl z-30 animate-float-slow bg-[#050505]/90 border border-[#ca000d]/30 shadow-[0_0_30px_rgba(202,0,13,0.15)]">
               <div class="flex items-center gap-3">
                 <div class="w-10 h-10 rounded-lg bg-[#ca000d]/10 flex items-center justify-center border border-[#ca000d]/20 relative">
                    <UIcon name="i-lucide-mouse-pointer-2" class="w-5 h-5 text-[#ca000d]" />
                 </div>
                 <div>
                    <div class="text-[10px] text-gray-400 uppercase tracking-wider font-bold">CTR (Click Rate)</div>
                    <div class="font-bold text-white text-lg leading-none">4.8%</div>
                 </div>
              </div>
            </div>

            <!-- Background Card -->
            <div class="absolute top-6 -right-6 w-full h-full glass-panel rounded-3xl z-10 scale-[0.98] opacity-30 border border-white/5"></div>
          </div>
        </div>
      </UContainer>

      <!-- STATS SECTION -->
      <div class="py-10 mb-24 border-y border-white/5 bg-white/[0.02]">
        <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 max-w-7xl mx-auto">
          <div v-for="stat in marketingStats" :key="stat.label" class="flex flex-col items-center justify-center p-4 text-center group transition-colors">
            <div class="text-3xl font-bold text-white mb-1 group-hover:text-[#ca000d] transition-colors">{{ stat.value }}</div>
            <div class="text-sm text-gray-400 font-medium group-hover:text-white transition-colors">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- WHY ROCKET (TRUST) -->
      <UContainer class="mb-32">
        <div class="text-center mb-16 reveal-on-scroll">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Por que a Rocket?</h2>
          <p class="text-gray-400">Não somos apenas uma agência. Somos seu braço direito de crescimento.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <EnhancedCard 
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
          </EnhancedCard>
        </div>
      </UContainer>

      <!-- TECH STACK MARQUEE -->
      <div class="mb-32 overflow-hidden relative">
        <SectionHeader 
            title="Tech Stack de Performance" 
            description="Dominamos as ferramentas que controlam o tráfego global."
            class="text-center mb-16"
        />
        
        <div class="relative flex overflow-x-hidden group">
            <!-- Gradient Masks -->
            <div class="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#050505] to-transparent"></div>
            <div class="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#050505] to-transparent"></div>

            <div class="py-12 animate-marquee whitespace-nowrap flex gap-16">
              <!-- Duplicate array for infinite loop -->
              <div v-for="tech in [...marketingTools, ...marketingTools]" :key="tech.name + Math.random()" class="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-default">
                  <UIcon :name="tech.icon" class="w-10 h-10 grayscale hover:grayscale-0 transition-all duration-300" />
                  <span class="text-2xl font-bold opacity-50">{{ tech.name }}</span>
              </div>
            </div>
            
            <div class="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex gap-16">
              <div v-for="tech in [...marketingTools, ...marketingTools]" :key="tech.name + Math.random() + 'dup'" class="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-default">
                  <UIcon :name="tech.icon" class="w-10 h-10 grayscale hover:grayscale-0 transition-all duration-300" />
                  <span class="text-2xl font-bold opacity-50">{{ tech.name }}</span>
              </div>
            </div>
        </div>
      </div>

      <!-- ECOSYSTEM (BENTO GRID) -->
      <UContainer class="mb-32">
        <SectionHeader 
          title="Ecossistema de Growth" 
          description="Todas as ferramentas para escalar sua operação digital em um único lugar."
          badge="ECOSYSTEM"
          class="text-center"
        />

        <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[140px] reveal-on-scroll">
          
          <!-- Omnichannel Strategy (spans 2 cols, 2 rows) -->
          <BaseBentoCard class="md:col-span-2 md:row-span-2 group relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-[#ca000d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10 h-full flex flex-col">
              <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-[#ca000d] to-[#ff4444] rounded-xl flex items-center justify-center shadow-lg shadow-[#ca000d]/30">
                  <UIcon name="i-lucide-network" class="w-6 h-6 text-white" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>
                </div>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Omnichannel</h3>
              <p class="text-gray-400 text-sm leading-relaxed mb-4">
                Integração total entre canais de marketing.
              </p>
              <div class="mt-auto flex-1 min-h-[120px] bg-black/40 rounded-xl border border-white/5 overflow-hidden relative flex items-center justify-center">
                <!-- Background Grid -->
                <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]"></div>
                
                <!-- Central Hub -->
                <div class="relative z-10 w-14 h-14 bg-[#ca000d]/20 rounded-full flex items-center justify-center border border-[#ca000d]/30">
                  <UIcon name="i-lucide-rocket" class="w-7 h-7 text-[#ca000d]" />
                </div>
                
                <!-- Orbiting Nodes -->
                <div class="absolute top-4 left-4 p-2 bg-[#0a0a0a] rounded-lg border border-white/10 shadow-lg">
                  <UIcon name="i-logos-google-icon" class="w-4 h-4" />
                </div>
                <div class="absolute top-4 right-4 p-2 bg-[#0a0a0a] rounded-lg border border-white/10 shadow-lg">
                  <UIcon name="i-logos-facebook" class="w-4 h-4" />
                </div>
                <div class="absolute bottom-4 left-4 p-2 bg-[#0a0a0a] rounded-lg border border-white/10 shadow-lg">
                  <UIcon name="i-logos-tiktok-icon" class="w-4 h-4" />
                </div>
                <div class="absolute bottom-4 right-4 p-2 bg-[#0a0a0a] rounded-lg border border-white/10 shadow-lg">
                  <UIcon name="i-lucide-mail" class="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </BaseBentoCard>

          <!-- ROI Calculator Card (spans 2 cols) -->
          <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <UIcon name="i-lucide-calculator" class="w-5 h-5 text-emerald-400" />
                  <h3 class="text-lg font-bold text-white">ROI Tracker</h3>
                </div>
                <p class="text-gray-500 text-xs">Retorno em tempo real</p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-emerald-400">10.2x</div>
                <div class="text-xs text-gray-500">média geral</div>
              </div>
            </div>
            <div class="flex items-end justify-between gap-1 h-12 mt-auto">
              <div class="flex-1 bg-emerald-500/20 rounded-t h-[40%] group-hover:bg-emerald-500/40 transition-all"></div>
              <div class="flex-1 bg-emerald-500/20 rounded-t h-[60%] group-hover:bg-emerald-500/40 transition-all"></div>
              <div class="flex-1 bg-emerald-500/20 rounded-t h-[50%] group-hover:bg-emerald-500/40 transition-all"></div>
              <div class="flex-1 bg-emerald-500/20 rounded-t h-[80%] group-hover:bg-emerald-500/40 transition-all"></div>
              <div class="flex-1 bg-emerald-500/20 rounded-t h-[70%] group-hover:bg-emerald-500/40 transition-all"></div>
              <div class="flex-1 bg-emerald-500 rounded-t h-[95%] shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>
            </div>
          </BaseBentoCard>

          <!-- Analytics Card (spans 2 cols) -->
          <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
            <div class="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors"></div>
            <div class="relative z-10">
              <div class="flex items-center gap-2 mb-3">
                <UIcon name="i-lucide-pie-chart" class="w-5 h-5 text-blue-400" />
                <h3 class="text-lg font-bold text-white">Analytics Avançado</h3>
              </div>
              <p class="text-gray-400 text-xs mb-4">Atribuição multi-touch</p>
              <div class="flex items-center justify-between">
                <div class="flex gap-2">
                  <div class="h-8 w-2 bg-blue-500 rounded-full"></div>
                  <div class="h-8 w-2 bg-purple-500 rounded-full"></div>
                  <div class="h-8 w-2 bg-pink-500 rounded-full"></div>
                  <div class="h-8 w-2 bg-orange-500 rounded-full"></div>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold text-white">847k</div>
                  <div class="text-xs text-gray-500">sessions</div>
                </div>
              </div>
            </div>
          </BaseBentoCard>

          <!-- A/B Testing Card -->
          <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
            <div class="flex items-start justify-between">
              <div>
                <div class="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mb-3">
                  <UIcon name="i-lucide-split" class="w-5 h-5 text-amber-400" />
                </div>
                <h3 class="text-lg font-bold text-white mb-1">A/B Testing</h3>
                <p class="text-gray-400 text-xs">Testes estatísticos</p>
              </div>
              <div class="text-right">
                <div class="flex gap-2 items-center">
                  <span class="text-sm font-bold text-red-400">A</span>
                  <span class="text-xs text-gray-500">vs</span>
                  <span class="text-sm font-bold text-green-400">B ✓</span>
                </div>
                <div class="text-xs text-gray-500 mt-1">+32% conv.</div>
              </div>
            </div>
          </BaseBentoCard>

          <!-- Funnel Visualization (spans 2 cols) -->
          <BaseBentoCard class="md:col-span-2 group relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-transparent">
            <div class="flex items-center gap-4 h-full">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-white mb-2">Funil de Vendas</h3>
                <p class="text-gray-400 text-xs mb-3">Conversão por etapa</p>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <div class="h-2 w-full bg-purple-500/50 rounded-full"></div>
                    <span class="text-xs text-gray-400 w-12">100%</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="h-2 w-3/4 bg-purple-500/50 rounded-full"></div>
                    <span class="text-xs text-gray-400 w-12">68%</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="h-2 w-1/2 bg-purple-500 rounded-full"></div>
                    <span class="text-xs text-purple-400 w-12 font-bold">42%</span>
                  </div>
                </div>
              </div>
            </div>
          </BaseBentoCard>

          <!-- AI Copywriting (spans 2 cols, 2 rows) -->
          <BaseBentoCard class="md:col-span-2 md:row-span-2 group relative overflow-hidden bg-gradient-to-br from-violet-900/10 to-transparent">
            <div class="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10 h-full flex flex-col">
              <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <UIcon name="i-lucide-sparkles" class="w-6 h-6 text-white" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span class="text-xs text-green-400">GPT-4 Turbo</span>
                </div>
              </div>
              <h3 class="text-xl font-bold text-white mb-1">AI Copywriting</h3>
              <p class="text-gray-400 text-sm leading-relaxed mb-4">
                LLMs treinadas em milhões de copies de alta conversão.
              </p>
              
              <!-- AI Terminal -->
              <div class="mt-auto flex-1 min-h-[140px] bg-black/60 rounded-xl border border-violet-500/20 overflow-hidden">
                <!-- Terminal Header -->
                <div class="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5">
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span class="text-xs text-gray-500 font-mono">rocket-ai.generate()</span>
                </div>
                
                <!-- Terminal Content -->
                <div class="p-4 font-mono text-xs space-y-2">
                  <div class="flex items-start gap-2">
                    <span class="text-violet-400">></span>
                    <span class="text-gray-400">Gerando variações para: "fitness campaign"</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-green-400">✓</span>
                    <span class="text-white">"Transforme seu corpo em 30 dias"</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-green-400">✓</span>
                    <span class="text-white">"O shape que você sempre quis"</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-green-400">✓</span>
                    <span class="text-white">"Resultados reais, sem desculpas"</span>
                  </div>
                  <div class="flex items-center gap-2 mt-2">
                    <span class="text-violet-400">></span>
                    <span class="text-gray-400">Analisando performance</span>
                    <span class="animate-pulse text-violet-400">▋</span>
                  </div>
                </div>
              </div>
              
              <!-- Stats Row -->
              <div class="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <div class="text-center">
                  <div class="text-lg font-bold text-violet-400">1,240</div>
                  <div class="text-[10px] text-gray-500 uppercase">copies geradas</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-green-400">+47%</div>
                  <div class="text-[10px] text-gray-500 uppercase">CTR médio</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-amber-400">3.2s</div>
                  <div class="text-[10px] text-gray-500 uppercase">tempo geração</div>
                </div>
              </div>
            </div>
          </BaseBentoCard>

          <!-- Retargeting Card (spans 2 cols) -->
          <BaseBentoCard class="md:col-span-2 group relative overflow-hidden bg-gradient-to-br from-orange-900/20 to-transparent">
            <div class="flex items-center gap-4 h-full">
              <div class="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <UIcon name="i-lucide-repeat" class="w-7 h-7 text-orange-400" />
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-bold text-white mb-1">Retargeting</h3>
                <p class="text-gray-400 text-xs mb-2">Remarketing automatizado</p>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-orange-400 font-bold">78%</span>
                  <span class="text-xs text-gray-500">taxa de reconversão</span>
                </div>
              </div>
            </div>
          </BaseBentoCard>

          <!-- Leads Tracking (spans 2 cols) -->
          <BaseBentoCard class="md:col-span-2 group relative overflow-hidden bg-gradient-to-br from-cyan-900/20 to-transparent">
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <UIcon name="i-lucide-users" class="w-5 h-5 text-cyan-400" />
                  <h3 class="text-lg font-bold text-white">Lead Generation</h3>
                </div>
                <p class="text-gray-400 text-xs">Captura otimizada</p>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-cyan-400">+1,240</div>
                <div class="text-xs text-gray-500">este mês</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full w-[85%] bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"></div>
              </div>
              <span class="text-xs text-cyan-400 font-bold">85%</span>
            </div>
          </BaseBentoCard>

        </div>
      </UContainer>

      <!-- SOLUTIONS (GRID) -->
      <UContainer id="solucoes" class="mb-32 scroll-mt-32">
        <SectionHeader 
          title="Soluções Especializadas" 
          description="Módulos de serviço desenhados para resolver gargalos específicos de crescimento."
          class="text-center"
        />

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EnhancedCard 
            v-for="(solution, index) in solutions" 
            :key="index"
            :featured="solution.featured"
            class="group reveal-on-scroll"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div class="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-white mb-6 group-hover:bg-[#ca000d] group-hover:text-white transition-all duration-300">
               <UIcon :name="solution.icon" class="w-6 h-6" />
            </div>
            <h3 class="text-xl font-bold mb-3 group-hover:text-[#ca000d] transition-colors">{{ solution.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              {{ solution.description }}
            </p>
          </EnhancedCard>
        </div>
      </UContainer>

      <!-- PROCESS SECTION -->
      <UContainer class="mb-32">
        <SectionHeader 
            title="Framework de Aceleração" 
            description="Como transformamos seu budget em receita líquida."
            class="text-center mb-16"
        />

        <div class="grid md:grid-cols-4 gap-8 relative">
           <!-- Connecting Line (Desktop) -->
           <div class="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-white/10 z-0"></div>
           
           <!-- Connecting Line (Mobile) -->
           <div class="md:hidden absolute top-4 bottom-24 left-1/2 w-px bg-white/10 -translate-x-1/2 z-0"></div>

           <div v-for="(step, index) in processSteps" :key="index" class="relative z-10 flex flex-col items-center text-center group reveal-on-scroll" 
           :style="{ transitionDelay: `${index * 150}ms` }">
              <div class="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#ca000d] transition-all duration-300 relative">
                 <UIcon :name="step.icon" class="w-7 h-7 text-white group-hover:text-[#ca000d] transition-colors" />
                 
                 <!-- Number Badge -->
                 <div class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#ca000d] text-white text-xs font-bold flex items-center justify-center border-2 border-[#050505]">
                   {{ index + 1 }}
                 </div>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">{{ step.title }}</h3>
              <p class="text-sm text-gray-400 max-w-[220px] leading-relaxed">{{ step.desc }}</p>
           </div>
        </div>
      </UContainer>

      <!-- FAQ SECTION -->
      <UContainer class="mb-32 max-w-3xl">
         <FaqSection :items="faqItems" />
      </UContainer>

      <!-- CTA SECTION -->
      <UContainer class="mb-24">
        <BaseCtaSection
          title="Pronto para transformar seu futuro?"
          description="Entre em contato com nossos especialistas e descubra como o ecossistema Rocket pode acelerar seus resultados."
          button-label="Falar com Consultor"
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
/* All common styles (grid-pattern, text-gradient, glow-button, glass-panel,
   animations, marquee, etc.) are now in main.css */

/* Bounce-small animation specific to this page */
@keyframes bounce-small {
  0%, 100% { transform: translateY(0) translateX(-50%); }
  50% { transform: translateY(-4px) translateX(-50%); }
}

.animate-bounce-small {
  animation: bounce-small 1s ease-in-out infinite;
}
</style>
