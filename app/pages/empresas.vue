<script setup lang="ts">
// Menu logic handled by AppHeader

useAppSeo({
  title: 'Para Empresas',
  description: 'Soluções corporativas de alta performance. Segurança, infraestrutura e inteligência para grandes negócios.',
  image: '/og-empresas.png',
  breadcrumbs: [
      { name: 'Home', url: 'https://rocketweb.tech' },
      { name: 'Para Empresas', url: 'https://rocketweb.tech/empresas' }
  ]
});

// --- Scroll Animation (SSR-friendly) ---
const { setupScrollAnimation } = useScrollReveal();

onMounted(() => {
  setupScrollAnimation();
});

// --- Marquee Data ---
const technologies = [
  { name: 'RUST', color: 'bg-orange-600' },
  { name: 'FLUTTER', color: 'bg-blue-400' },
  { name: 'PYTHON', color: 'bg-yellow-400' },
  { name: 'VUE.JS', color: 'bg-green-500' },
  { name: 'POSTGRESQL', color: 'bg-indigo-500' },
  { name: 'DOCKER', color: 'bg-blue-600' },
  { name: 'LINUX', color: 'bg-yellow-600' },
  { name: 'FREEBSD', color: 'bg-red-600' },
  { name: 'ARDUINO', color: 'bg-teal-500' },
  { name: 'REDIS', color: 'bg-red-500' },
  { name: 'SURREALDB', color: 'bg-purple-500' },
];

// --- FAQ Data (UAccordion) ---
const faqItems = [
  {
    label: 'Como funciona o pagamento?',
    content: 'Trabalhamos com flexibilidade. Podemos cobrar por projeto fechado (com início, meio e fim) ou por alocação mensal de especialistas, dependendo do que for melhor para o seu fluxo de caixa.',
    slot: 'item'
  },
  {
    label: 'Vocês atendem empresas de quais setores?',
    content: 'Atendemos Varejo, Saúde, Logística, Financeiro e muito mais. Nossa metodologia se adapta a qualquer negócio que precise de tecnologia segura e rápida para funcionar.',
    slot: 'item'
  },
  {
    label: 'Quanto tempo demora para começar?',
    content: 'Somos rápidos. Após uma conversa inicial para entender seu problema (que leva cerca de 48h), conseguimos iniciar os trabalhos em até 2 semanas.',
    slot: 'item'
  }
];

// --- Solutions Data ---
const solutions = [
  {
    title: 'Sistemas Rápidos e Estáveis',
    description: 'Garantimos que seu site, loja ou aplicativo nunca saia do ar, mesmo nos dias de maior movimento. Preparamos tudo para você crescer sem dores de cabeça.',
    icon: 'i-lucide-zap',
    iconColor: 'text-blue-400',
    glowColor: 'bg-blue-900',
    list: [
      { text: 'Hospedagem segura nas melhores plataformas', dot: 'bg-blue-500' },
      { text: 'Sistemas preparados para alto tráfego', dot: 'bg-blue-500' },
      { text: 'Backup automático e recuperação imediata', dot: 'bg-blue-500' }
    ]
  },
  {
    title: 'Segurança e Proteção de Dados',
    description: 'Protegemos as informações da sua empresa e dos seus clientes contra ataques. Durma tranquilo sabendo que tudo está seguro e dentro da lei (LGPD).',
    icon: 'i-lucide-shield-check',
    iconColor: 'text-red-500',
    glowColor: 'bg-red-900',
    list: [
      { text: 'Testes constantes contra invasões', dot: 'bg-red-500' },
      { text: 'Monitoramento 24 horas por dia', dot: 'bg-red-500' },
      { text: 'Controle total de quem acessa suas informações', dot: 'bg-red-500' }
    ]
  },
  {
    title: 'Relatórios Inteligentes (BI)',
    description: 'Transformamos planilhas confusas e números soltos em relatórios fáceis de entender. Saiba exatamente onde você está ganhando ou perdendo dinheiro.',
    icon: 'i-lucide-bar-chart-3',
    iconColor: 'text-purple-400',
    glowColor: 'bg-purple-900',
    list: [
      { text: 'Organização automática das suas informações', dot: 'bg-purple-500' },
      { text: 'Previsão de vendas e tendências', dot: 'bg-purple-500' },
      { text: 'Painéis visuais para tomada de decisão', dot: 'bg-purple-500' }
    ]
  },
  {
    title: 'Sistemas Sob Medida',
    description: 'Desenvolvemos o software exato que sua operação precisa. Chega de tentar adaptar sua empresa a programas prontos que não funcionam direito.',
    icon: 'i-lucide-code-2',
    iconColor: 'text-green-400',
    glowColor: 'bg-green-900',
    list: [
      { text: 'Sistemas flexíveis que crescem com você', dot: 'bg-green-500' },
      { text: 'Atualização de sistemas antigos', dot: 'bg-green-500' },
      { text: 'Testes rigorosos para evitar erros', dot: 'bg-green-500' }
    ]
  }
];

// --- Methodology Data ---
const methodologySteps = [
  {
    step: '01',
    title: 'Diagnóstico Profundo',
    description: 'Mergulhamos no seu negócio para entender gargalos, riscos de segurança e oportunidades de otimização de infraestrutura.',
    icon: 'i-lucide-search'
  },
  {
    step: '02',
    title: 'Estratégia Blindada',
    description: 'Desenhamos uma arquitetura à prova de falhas, com foco em redundância, segurança corporativa e alta disponibilidade.',
    icon: 'i-lucide-shield-alert'
  },
  {
    step: '03',
    title: 'Execução Ágil',
    description: 'Desenvolvimento e migração com squads dedicadas. Entregas contínuas para você ver valor desde as primeiras semanas.',
    icon: 'i-lucide-rocket'
  },
  {
    step: '04',
    title: 'Escala & Monitoramento',
    description: 'Não entregamos e sumimos. Monitoramos 24/7 e ajustamos a infraestrutura conforme seu negócio cresce.',
    icon: 'i-lucide-activity'
  }
];

// --- Comparison Data ---
const comparisonData = [
  { feature: 'Tempo de Resposta', traditional: '24h a 48h', rocket: 'Imediato (Real-time)', highlight: true, icon: 'i-lucide-clock' },
  { feature: 'Foco em Segurança', traditional: 'Básico / Padrão', rocket: 'Blindagem Enterprise', highlight: true, icon: 'i-lucide-shield-check' },
  { feature: 'Tecnologia', traditional: 'Legada / Monolítica', rocket: 'Modern Stack (Rust/Vue)', highlight: true, icon: 'i-lucide-cpu' },
  { feature: 'Escalabilidade', traditional: 'Limitada / Custo Alto', rocket: 'Automática & Elástica', highlight: true, icon: 'i-lucide-trending-up' },
];


</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#ca000d] selection:text-white relative flex flex-col">
    
    <!-- Background Elements -->
    <div class="fixed inset-0 grid-pattern z-0"></div>
    <div class="fixed top-0 right-0 w-[500px] h-[500px] bg-[#ca000d]/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

    <AppHeader />

    <main class="flex-grow flex flex-col relative z-10">
      <UContainer class="pt-24 lg:pt-52 pb-24 text-center w-full">
        <div class="max-w-2xl mx-auto space-y-6 reveal-on-scroll">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Excelência Operacional <span class="text-primary-500">em Escala</span>
          </h1>
          <p class="text-base sm:text-xl text-gray-400">
            Para organizações que não aceitam o mediano. Integramos inteligência, segurança e performance para construir a infraestrutura digital que sustentará o seu próximo salto de crescimento.
          </p>
          <div class="flex justify-center gap-4">
            <UButton
              size="lg"
              label="Solicitar Orçamento"
              color="primary"
              class="text-white"
              to="/contact"
            />
            <UButton
              size="lg"
              label="Ver Serviços"
              variant="link"
              color="neutral"
              to="/servicos"
              class="text-white hover:no-underline group"
            >
              <template #trailing>
                <UIcon name="i-lucide-arrow-right" class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </template>
            </UButton>
          </div>
        </div>
      </UContainer>

      <!-- Tech Stack Marquee -->
      <div class="bg-black/50 border-y border-white/5 py-8 overflow-hidden relative mt-16 md:mt-32 group reveal-on-scroll" style="transition-delay: 100ms;">
         <div class="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
         <div class="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
         
         <div class="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] w-max">
             <!-- Double the content for seamless loop -->
             <div v-for="i in 2" :key="i" class="flex items-center gap-12 mx-6">
                 <span v-for="tech in technologies" :key="tech.name" class="text-xl md:text-2xl font-bold text-gray-600 flex items-center gap-2">
                     <i :class="['w-3 h-3 rounded-full', tech.color]"></i>
                     {{ tech.name }}
                 </span>
             </div>
         </div>
      </div>

      <!-- Solutions Section -->
      <section id="solutions" class="py-24 px-6 reveal-on-scroll" style="transition-delay: 200ms;">
          <div class="mx-auto max-w-7xl">
              <div class="text-center mb-20">
                  <h2 class="text-primary-500 font-bold tracking-wide uppercase mb-2">O que fazemos por você</h2>
                  <h3 class="text-4xl md:text-5xl font-bold text-white">Soluções para Problemas Reais</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div v-for="sol in solutions" :key="sol.title" class="feature-card rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                      <div :class="['absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -mr-16 -mt-16 transition-all group-hover:opacity-40 opacity-20', sol.glowColor]"></div>
                      <div class="relative z-10">
                          <div class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                              <UIcon :name="sol.icon" :class="['w-7 h-7', sol.iconColor]" />
                          </div>
                          <h4 class="text-2xl font-bold text-white mb-4">{{ sol.title }}</h4>
                          <p class="text-gray-400 mb-6 leading-relaxed">{{ sol.description }}</p>
                          <ul class="space-y-3">
                              <li v-for="(item, idx) in sol.list" :key="idx" class="flex items-center text-gray-300">
                                  <span :class="['w-1.5 h-1.5 rounded-full mr-3', item.dot]"></span>
                                  {{ item.text }}
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <!-- Methodology Section -->
      <section class="py-24 px-6 relative overflow-hidden reveal-on-scroll" style="transition-delay: 300ms;">
        <!-- Background Glow -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-900/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div class="mx-auto max-w-7xl relative z-10">
          <div class="text-center mb-20">
             <h2 class="text-primary-500 font-bold tracking-wide uppercase mb-2">Nosso Processo</h2>
             <h3 class="text-4xl md:text-5xl font-bold text-white">Metodologia de Elite</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="item in methodologySteps" :key="item.step" class="enhanced-card p-8 group relative overflow-hidden rounded-2xl">
               <div class="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-white select-none group-hover:opacity-20 transition-opacity">
                 {{ item.step }}
               </div>
               <div class="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6 group-hover:bg-primary-500/20 transition-colors">
                  <UIcon :name="item.icon" class="w-6 h-6 text-primary-500" />
               </div>
               <h4 class="text-xl font-bold text-white mb-3 relative z-10">{{ item.title }}</h4>
               <p class="text-gray-400 text-sm leading-relaxed relative z-10">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Comparison Section -->
      <section class="py-24 px-6 reveal-on-scroll" style="transition-delay: 400ms;">
        <div class="mx-auto max-w-5xl">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Por que escolher a <span class="text-primary-500">Rocket?</span></h2>
            <p class="text-gray-400 max-w-2xl mx-auto">Compare e veja porque as maiores empresas estão migrando para nossa infraestrutura.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="item in comparisonData" :key="item.feature" class="enhanced-card p-6 md:p-8 rounded-2xl group hover:border-primary-500/30 transition-all">
               <!-- Header with Icon -->
               <div class="flex items-center gap-3 mb-6">
                 <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary-500 group-hover:bg-primary-500/10 transition-colors">
                   <UIcon :name="item.icon" class="w-5 h-5" />
                 </div>
                 <h4 class="font-bold text-lg text-white">{{ item.feature }}</h4>
               </div>

               <!-- Comparison -->
               <div class="space-y-4">
                 <!-- Traditional -->
                 <div class="flex justify-between items-center py-2 border-b border-white/5">
                   <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tradicional</span>
                   <span class="text-sm text-gray-500 line-through decoration-red-500/50">{{ item.traditional }}</span>
                 </div>

                 <!-- Rocket -->
                 <div class="flex justify-between items-center py-2">
                   <span class="text-xs font-bold text-primary-500 uppercase tracking-wider flex items-center gap-1">
                     <UIcon name="i-lucide-rocket" class="w-3 h-3" /> Rocket
                   </span>
                   <span class="text-base font-bold text-white group-hover:text-primary-400 transition-colors">{{ item.rocket }}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-20 reveal-on-scroll" style="transition-delay: 500ms;">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div class="group">
                      <div class="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">+644</div>
                      <div class="text-sm text-gray-500 uppercase tracking-wider">Projetos Entregues</div>
                  </div>
                  <div class="group">
                      <div class="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">99.98%</div>
                      <div class="text-sm text-gray-500 uppercase tracking-wider">Disponibilidade Garantida</div>
                  </div>
                  <div class="group">
                      <div class="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">24/7</div>
                      <div class="text-sm text-gray-500 uppercase tracking-wider">Suporte Especializado</div>
                  </div>
                  <div class="group">
                      <div class="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">+462</div>
                      <div class="text-sm text-gray-500 uppercase tracking-wider">Clientes Atendidos</div>
                  </div>
              </div>
          </div>
      </section>



      <!-- FAQ Section -->
      <section id="faq" class="py-20 px-6">
          <FaqSection :items="faqItems" />
      </section>

      <!-- Final CTA Section -->
      <section class="py-24 px-6 reveal-on-scroll" style="transition-delay: 700ms;">
        <UContainer>
          <BaseCtaSection
            title="Seu projeto exige Excelência Técnica?"
            description="Não deixe sua infraestrutura limitar seu crescimento. Vamos desenhar a arquitetura que levará seu negócio ao próximo nível."
            button-label="Agendar Consultoria Técnica"
            button-to="/contact"
          />
        </UContainer>
      </section>
    </main>

    <AppFooter />

  </div>
</template>

<style scoped>
/* === Background Grid Pattern === */
.grid-pattern {
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  opacity: 1;
  pointer-events: none;
}

/* reveal-on-scroll styles are now in global CSS (main.css) */

/* === New Sections Styles === */


.feature-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%);
    border: 1px solid rgba(255,255,255,0.05);
}

.feature-card:hover {
    transform: translateY(-5px);
    border-color: rgba(202, 0, 13, 0.5);
    box-shadow: 0 20px 40px -10px rgba(202, 0, 13, 0.15);
}

.glow-button {
    position: relative;
    overflow: hidden;
}

.glow-button::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
    transform: rotate(45deg);
    animation: shimmer 3s infinite;
}

@keyframes shimmer {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
}

.text-gradient-red {
    background: linear-gradient(to right, #ffffff, #ca000d);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.animate-marquee {
    animation: marquee 35s linear infinite;
}

@keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
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
/* === ENHANCED CARD === */
.enhanced-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(202, 0, 13, 0.02) 50%, rgba(255, 255, 255, 0.01) 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.enhanced-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(202, 0, 13, 0.15);
  border-color: rgba(202, 0, 13, 0.4);
}
</style>
