<script setup lang="ts">
// --- Layout State ---
const isOpen = ref(false);





// --- Scroll to Pricing ---
const pricingSection = ref<HTMLElement | null>(null);

const scrollToPricing = () => {
  pricingSection.value?.scrollIntoView({ behavior: 'smooth' });
};

// --- Page Data ---
const stats = [
  { value: '100%', label: 'Arquivos Seguros' },
  { value: 'Instant', label: 'Sincronização' },
  { value: 'E2E', label: 'Privacidade Total' },
  { value: '10M+', label: 'Usuários Ativos' },
];

const features = [
  {
    icon: 'i-lucide-cloud',
    title: 'Backup Automático',
    description: 'Mantenha suas fotos e documentos salvos automaticamente assim que são criados. Nunca mais perca uma memória importante.'
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Privacidade Garantida',
    description: 'Seus arquivos são criptografados antes de sair do seu dispositivo. Nossa arquitetura Zero-Knowledge garante que apenas você tem a chave.'
  },
  {
    icon: 'i-lucide-share-2',
    title: 'Compartilhamento Fácil',
    description: 'Envie álbuns de fotos ou pastas de projetos com um único link. Controle quem pode visualizar ou editar, com validade e senha.'
  }
];

const securityChecklist = [
  'Criptografia de Ponta-a-Ponta (E2EE)',
  'Autenticação Biométrica no App',
  'Histórico de versões de 30 dias'
];

const personalPlanFeatures = [
  '2 TB de armazenamento',
  'Backup de fotos ilimitado',
  'Acesso Offline',
  'Sem anúncios'
];

const enterprisePlanFeatures = [
  'Armazenamento Ilimitado',
  'Controles Administrativos',
  'Auditoria de Acesso',
  'Drives Compartilhados'
];

const comparisonTable = [
  { feature: 'Armazenamento', personal: '2 TB', enterprise: 'Ilimitado', enterpriseBold: true },
  { feature: 'Recuperação de Arquivos', personal: '30 dias', enterprise: 'Infinito', enterpriseBold: true },
  { feature: 'Suporte', personal: 'Chat', enterprise: 'Gerente de Conta Dedicado', enterpriseBold: true },
  { feature: 'Compartilhamento', personal: 'Links Básicos', enterprise: 'Controle Avançado + Senha', enterpriseHighlight: true },
  { feature: 'Colaboração', personal: '—', enterprise: 'Edição em Tempo Real', enterpriseBold: true }
];

const faqItems = [
  {
    label: 'Meus dados estão realmente seguros?',
    content: 'Absolutamente. Utilizamos criptografia de ponta a ponta. Isso significa que seus arquivos são embaralhados no seu dispositivo e só vocẽ possui a "chave" para desembaralhá-los. Nós nunca temos acesso ao conteúdo dos seus arquivos.',
    slot: 'item'
  },
  {
    label: 'Como funciona o compartilhamento?',
    content: 'Você pode gerar um link seguro para qualquer arquivo ou pasta. Para maior segurança, defina uma data de expiração ou proteja o link com uma senha. O destinatário não precisa ter uma conta Rocket Drive para baixar.',
    slot: 'item'
  },
  {
    label: 'Posso acessar meus arquivos offline?',
    content: 'Sim! Com o aplicativo Rocket Drive para desktop e mobile, você pode marcar pastas inteiras para ficarem disponíveis offline. Qualquer alteração feita será sincronizada assim que você se conectar novamente.',
    slot: 'item'
  }
];

// --- Scroll Animation (SSR-Friendly) ---
const { setupScrollAnimation } = useScrollReveal();

onMounted(() => {
  setupScrollAnimation();
});

useAppSeo({
  title: 'Rocket Cloud: Armazenamento Seguro e Ilimitado na Nuvem',
  description: 'Seu Espaço Digital Seguro e Ilimitado. Criptografia ponta-a-ponta e acesso de qualquer lugar.',
  image: '/og-cloud.png',
  breadcrumbs: [
      { name: 'Home', url: 'https://rocketweb.tech' },
      { name: 'Serviços', url: 'https://rocketweb.tech/servicos' },
      { name: 'Rocket Cloud', url: 'https://rocketweb.tech/services/cloud' }
  ]
});

// Schema.org FAQ - Melhora visibilidade em buscas
useFAQSchema([
  { question: 'Meus dados estão realmente seguros?', answer: 'Absolutamente. Utilizamos criptografia de ponta a ponta. Isso significa que seus arquivos são embaralhados no seu dispositivo e só você possui a chave para desembaralhá-los. Nós nunca temos acesso ao conteúdo dos seus arquivos.' },
  { question: 'Como funciona o compartilhamento?', answer: 'Você pode gerar um link seguro para qualquer arquivo ou pasta. Para maior segurança, defina uma data de expiração ou proteja o link com uma senha. O destinatário não precisa ter uma conta Rocket Drive para baixar.' },
  { question: 'Posso acessar meus arquivos offline?', answer: 'Sim! Com o aplicativo Rocket Drive para desktop e mobile, você pode marcar pastas inteiras para ficarem disponíveis offline. Qualquer alteração feita será sincronizada assim que você se conectar novamente.' }
]);

// Schema.org Service - Identifica como serviço
useServiceSchema({
  name: 'Rocket Cloud',
  description: 'Armazenamento em nuvem seguro com criptografia ponta-a-ponta, backup automático e acesso de qualquer dispositivo.',
  url: 'https://rocketweb.tech/services/cloud',
  image: 'https://rocketweb.tech/og-cloud.png'
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
    <main class="flex-grow relative z-10 pt-32">
      
      <!-- HERO SECTION -->
      <section class="relative isolate pt-12 lg:pt-16 hero-glow min-h-screen flex items-center">
        <!-- Background Floating Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="floating-element" style="width: 400px; height: 400px; top: 10%; left: -10%;"></div>
          <div class="floating-element" style="width: 300px; height: 300px; bottom: 20%; right: -5%; animation-delay: -5s;"></div>
        </div>

        <div class="mx-auto max-w-7xl px-6 lg:px-8 py-20 relative z-10 text-center lg:text-left lg:flex lg:items-center lg:gap-16">
          <!-- Left Column - Text -->
          <div class="lg:w-1/2 reveal-on-scroll">
            <div class="inline-flex items-center gap-2 rounded-full bg-[#ca000d]/10 px-3 py-1 text-sm font-semibold text-[#ca000d] ring-1 ring-inset ring-[#ca000d]/20 mb-6">
              <span class="animate-pulse">●</span> Novo Rocket Drive 2.0
            </div>
            
            <h1 class="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6">
              Seu Espaço Digital <br/>
              <span class="text-gradient">Seguro e Ilimitado</span>
            </h1>
            
            <p class="mt-6 text-lg leading-8 text-gray-400">
              Armazene fotos, vídeos e documentos com criptografia ponta-a-ponta. Acesse seus arquivos de qualquer dispositivo, a qualquer momento.
            </p>

            <!-- CTA Buttons -->
            <div class="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-x-6 gap-y-4">
              <UButton 
                size="xl" 
                label="Criar Conta Grátis" 
                color="primary" 
                class="glow-button text-white w-full sm:w-auto justify-center"
                icon="i-lucide-arrow-right"
                trailing
                to="/contact"
              />
              <UButton 
                size="xl" 
                label="Ver Recursos" 
                variant="outline" 
                color="neutral" 
                icon="i-lucide-layers"
                class="w-full sm:w-auto border-white/20 hover:bg-white/10 text-white justify-center"
                @click="scrollToPricing"
              />
            </div>

            <!-- Stats Grid (Moved from separate section) -->
            <div class="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
              <div v-for="stat in stats" :key="stat.label">
                  <div class="text-2xl font-bold text-white">{{ stat.value }}</div>
                  <div class="text-xs text-gray-500 uppercase tracking-wide">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Right Column - Interactive Dashboard Mockup -->
          <div class="lg:w-1/2 mt-16 lg:mt-0 relative reveal-on-scroll" style="transition-delay: 200ms;">
             <div class="relative enhanced-card rounded-2xl p-4 border-[#ca000d]/30 animate-float-slow">
                <div class="bg-[#050505] rounded-xl overflow-hidden aspect-[4/3] relative border border-white/5 flex flex-col">
                  <!-- Mockup Header -->
                  <div class="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    <div class="ml-auto text-xs text-gray-500 font-mono">drive.rocket.com</div>
                  </div>
                  
                  <!-- Mockup Body -->
                  <div class="p-6 flex-1 flex flex-col gap-6">
                    <!-- Metrics Row -->
                    <div class="flex gap-4">
                       <div class="flex-1 bg-white/5 rounded-lg p-3 border border-white/5">
                          <div class="text-xs text-gray-500 mb-1">Espaço Usado</div>
                          <div class="text-xl font-bold text-[#ca000d]">24%</div>
                          <div class="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                             <div class="bg-[#ca000d] h-full w-[24%]"></div>
                          </div>
                       </div>
                       <div class="flex-1 bg-white/5 rounded-lg p-3 border border-white/5">
                          <div class="text-xs text-gray-500 mb-1">Total Arquivos</div>
                          <div class="text-xl font-bold text-white">42k</div>
                           <div class="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                             <div class="bg-blue-500 h-full w-[42%]"></div>
                          </div>
                       </div>
                    </div>

                    <!-- Map/Activity Area -->
                    <div class="flex-1 bg-white/5 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center">
                       <div class="absolute inset-0 grid-pattern opacity-20"></div>
                       <!-- Abstract Map Dots -->
                       <div class="relative w-full h-full flex items-center justify-center">
                          <!-- Central Cloud Hub -->
                          <div class="relative z-10 w-24 h-24 flex items-center justify-center">
                            <div class="absolute inset-0 bg-[#ca000d] blur-2xl opacity-20 animate-pulse"></div>
                            <UIcon name="i-lucide-cloud" class="w-16 h-16 text-[#ca000d]" />
                          </div>

                          <span class="absolute top-[30%] left-[20%] w-2 h-2 rounded-full bg-[#ca000d] animate-ping"></span>
                          <span class="absolute top-[30%] left-[20%] w-2 h-2 rounded-full bg-[#ca000d]"></span>
                          
                          <span class="absolute top-[50%] right-[30%] w-2 h-2 rounded-full bg-[#ca000d] animate-ping" style="animation-delay: 1s"></span>
                          <span class="absolute top-[50%] right-[30%] w-2 h-2 rounded-full bg-[#ca000d]"></span>

                          <span class="absolute bottom-[20%] left-[40%] w-2 h-2 rounded-full bg-[#ca000d] animate-ping" style="animation-delay: 2s"></span>
                          <span class="absolute bottom-[20%] left-[40%] w-2 h-2 rounded-full bg-[#ca000d]"></span>
                       </div>
                       <div class="absolute bottom-2 left-2 text-[10px] text-green-500 font-mono">
                          ● Backup Completo
                       </div>
                    </div>
                  </div>
                </div>
             </div>

             <!-- Floating Badge -->
             <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:-left-6 enhanced-card p-4 rounded-xl flex items-center gap-3 animate-float-alt bg-black/90 border border-[#ca000d]/20 w-max max-w-[90vw]">
              <div class="w-10 h-10 rounded-full bg-[#ca000d]/10 flex items-center justify-center text-[#ca000d]">
                <UIcon name="i-lucide-check-circle" class="w-5 h-5" />
              </div>
              <div>
                <div class="text-sm font-bold text-white">Upload Concluído</div>
                <div class="text-xs text-gray-400">Ferias_2024.zip • 4GB</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FEATURES SECTION -->
      <section id="features" class="max-w-7xl mx-auto px-6 py-24">
        <div class="text-center mb-16 reveal-on-scroll">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Salvo. Seguro. Seu.</h2>
          <p class="text-gray-400">A melhor tecnologia de armazenamento pessoal do mundo.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="index" 
            class="enhanced-card p-8 rounded-2xl group reveal-on-scroll"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <div class="w-12 h-12 bg-[#ca000d]/10 rounded-xl flex items-center justify-center mb-6 border border-[#ca000d]/20 group-hover:border-[#ca000d] transition-colors">
              <UIcon :name="feature.icon" class="w-6 h-6 text-[#ca000d]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">{{ feature.title }}</h3>
            <p class="text-gray-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <!-- SECURITY SECTION -->
      <section id="ecosystem" class="max-w-7xl mx-auto px-6 py-24 mb-24">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 reveal-on-scroll">
          <div>
            <h2 class="text-3xl md:text-5xl font-bold mb-4 text-white">Ecossistema de <br>Armazenamento</h2>
            <p class="text-gray-400 max-w-md">Gerencie seus arquivos com ferramentas poderosas e intuitivas.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-4 h-auto lg:h-[600px] reveal-on-scroll">
          
          <!-- File Explorer Widget (Large) -->
          <BaseBentoCard :featured="true" :vertical="true" class="group">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-[#ca000d]/10 flex items-center justify-center text-[#ca000d]">
                  <UIcon name="i-lucide-folder-open" class="w-5 h-5" />
                </div>
                <div class="text-sm font-bold text-white">Meus Arquivos</div>
              </div>
              <UIcon name="i-lucide-more-horizontal" class="text-gray-500" />
            </div>
            
            <div class="flex-1 overflow-hidden relative">
              <div class="space-y-2 relative z-10">
                <!-- Folder Item 1 -->
                <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/item border border-white/5">
                  <div class="flex items-center gap-3">
                     <UIcon name="i-lucide-folder" class="text-yellow-500 w-5 h-5" />
                     <div class="text-sm text-gray-300 group-hover/item:text-white">Projetos 2024</div>
                  </div>
                  <div class="text-xs text-gray-500">2.4 GB</div>
                </div>
                <!-- Folder Item 2 -->
                <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/item border border-white/5">
                  <div class="flex items-center gap-3">
                     <UIcon name="i-lucide-image" class="text-purple-500 w-5 h-5" />
                     <div class="text-sm text-gray-300 group-hover/item:text-white">Fotos Viagem</div>
                  </div>
                  <div class="text-xs text-gray-500">1.8 GB</div>
                </div>
                 <!-- Folder Item 3 -->
                <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/item border border-white/5">
                  <div class="flex items-center gap-3">
                     <UIcon name="i-lucide-file-text" class="text-blue-500 w-5 h-5" />
                     <div class="text-sm text-gray-300 group-hover/item:text-white">Documentos</div>
                  </div>
                  <div class="text-xs text-gray-500">500 MB</div>
                </div>
                 <!-- File Item -->
                <div class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/item border border-white/5">
                  <div class="flex items-center gap-3">
                     <UIcon name="i-lucide-file-spreadsheet" class="text-green-500 w-5 h-5" />
                     <div class="text-sm text-gray-300 group-hover/item:text-white">Financeiro.xlsx</div>
                  </div>
                  <div class="text-xs text-gray-500">24 KB</div>
                </div>
              </div>
              
              <!-- Decoration -->
               <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-20"></div>
            </div>
          </BaseBentoCard>

          <!-- Storage Usage Widget -->
          <BaseBentoCard class="flex flex-col justify-center items-center text-center relative overflow-hidden group">
            <div class="relative w-32 h-32 mb-4 flex items-center justify-center">
              <!-- Circular Progress Mock -->
              <svg class="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="currentColor" stroke-width="8" fill="transparent" class="text-gray-800" />
                <circle cx="64" cy="64" r="56" stroke="currentColor" stroke-width="8" fill="transparent" stroke-dasharray="351.86" stroke-dashoffset="100" class="text-[#ca000d] transition-all duration-1000 group-hover:stroke-dashoffset-50" stroke-linecap="round" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-bold text-white">74%</span>
                <span class="text-[10px] text-gray-400 uppercase">Usado</span>
              </div>
            </div>
            <h3 class="text-lg font-bold text-white mb-1">Armazenamento</h3>
            <p class="text-gray-400 text-xs">1.2 TB de 2 TB utilizados</p>
          </BaseBentoCard>

          <!-- Sync Status Widget -->
          <BaseBentoCard class="flex flex-col justify-center relative overflow-hidden">
             <div class="absolute top-4 right-4 animate-spin-slow">
                <UIcon name="i-lucide-refresh-cw" class="w-5 h-5 text-[#ca000d]" />
             </div>
             <div class="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center text-xl mb-4">
               <UIcon name="i-lucide-check-circle" class="w-6 h-6" />
             </div>
             <h3 class="text-lg font-bold text-white mb-2">Sincronizado</h3>
             <p class="text-gray-400 text-xs mb-3">Último backup há 2 minutos.</p>
             <div class="flex -space-x-2">
               <div class="w-6 h-6 rounded-full bg-gray-700 border border-black"></div>
               <div class="w-6 h-6 rounded-full bg-gray-600 border border-black"></div>
               <div class="w-6 h-6 rounded-full bg-gray-500 border border-black text-[8px] flex items-center justify-center text-white">+3</div>
             </div>
          </BaseBentoCard>

          <!-- Media Gallery Widget (Wide) -->
          <BaseBentoCard class="md:col-span-2 relative group overflow-hidden">
             <div class="flex items-center justify-between mb-4 relative z-10">
               <h3 class="text-lg font-bold text-white">Galeria Inteligente</h3>
               <UButton size="xs" color="gray" variant="ghost" icon="i-lucide-arrow-right" />
             </div>
             
             <div class="grid grid-cols-4 gap-2 relative z-10">
                <div class="aspect-square rounded-lg bg-gray-800 overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                  <div class="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                </div>
                <div class="aspect-square rounded-lg bg-gray-800 overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                   <div class="w-full h-full bg-gradient-to-br from-yellow-500/20 to-red-500/20"></div>
                </div>
                <div class="aspect-square rounded-lg bg-gray-800 overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                   <div class="w-full h-full bg-gradient-to-br from-green-500/20 to-teal-500/20"></div>
                </div>
                <div class="aspect-square rounded-lg bg-gray-800 overflow-hidden hover:scale-105 transition-transform cursor-pointer flex items-center justify-center">
                   <span class="text-xs text-gray-500">+428</span>
                </div>
             </div>
             
             <!-- Glow background -->
             <div class="absolute bottom-[-20%] right-[-10%] w-32 h-32 bg-[#ca000d]/10 blur-2xl rounded-full group-hover:bg-[#ca000d]/20 transition-colors duration-500"></div>
          </BaseBentoCard>

        </div>
      </section>

      <!-- SECURITY SECTION -->
      <section id="security" class="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 reveal-on-scroll">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <!-- Left Content -->
          <div class="lg:w-1/2">
            <div class="text-[#ca000d] font-semibold mb-2 tracking-wider text-sm uppercase">Segurança Primeiro</div>
            <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">Seus dados, sua fortaleza digital.</h2>
            <p class="text-gray-400 text-lg mb-6 leading-relaxed">
              Utilizamos protocolos de criptografia AES-256 e TLS 1.3 em trânsito. Nossa infraestrutura possui certificação ISO 27001 e SOC 2 Tipo II, garantindo conformidade total para dados sensíveis corporativos.
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
                <div class="font-mono text-xs text-gray-500 mb-2">// SECURITY PROTOCOL INITIATED</div>
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
                  <span>Status: <span class="text-green-500">SECURE</span></span>
                  <span>Enc: AES-256-GCM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PRICING SECTION -->
      <section id="pricing" ref="pricingSection" class="max-w-7xl mx-auto px-6 py-24">
        <div class="text-center mb-16 reveal-on-scroll">
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">Escolha seu plano</h2>
          <p class="text-gray-400 text-lg">Comece grátis, expanda quando precisar.</p>
        </div>

        <!-- Pricing Cards -->
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-20 reveal-on-scroll">
          <!-- Personal Plan -->
          <div class="enhanced-card rounded-2xl p-8 flex flex-col hover:border-white/30 transition-all">
            <h3 class="text-2xl font-bold text-white mb-2">Pessoal</h3>
            <p class="text-gray-400 mb-6 h-10">Para suas fotos e arquivos pessoais.</p>
            <div class="text-5xl font-bold text-white mb-8">R$ 0 <span class="text-xl text-gray-500 font-normal">/mês</span></div>
            
            <UButton 
              block 
              size="lg" 
              label="Criar Conta Grátis" 
              variant="outline" 
              color="neutral" 
              class="mb-8 border-white/20 text-white hover:bg-white/10"
              to="/contact"
            />

            <div class="space-y-4">
              <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">O QUE ESTÁ INCLUÍDO</p>
              <ul class="space-y-3 text-sm text-gray-300">
                <li v-for="item in personalPlanFeatures" :key="item" class="flex items-center gap-3">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-[#ca000d]" />
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Enterprise Plan -->
          <div class="enhanced-card rounded-2xl p-8 flex flex-col relative border-[#ca000d]/40 bg-[#0a0a0a]/40">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ca000d] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-[#ca000d]/40 uppercase tracking-widest">
              Recomendado
            </div>
            
            <h3 class="text-2xl font-bold text-white mb-2">Equipes</h3>
            <p class="text-gray-400 mb-6 h-10">Colaboração segura para sua empresa.</p>
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
              <p class="text-xs font-bold text-[#ca000d] uppercase tracking-wider">TUDO DO PESSOAL, MAIS:</p>
              <ul class="space-y-3 text-sm text-white">
                <li v-for="(item, index) in enterprisePlanFeatures" :key="item" class="flex items-center gap-3">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-[#ca000d]" />
                  <span :class="{ 'font-bold': index === 0 }">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Comparison Table -->
        <div class="max-w-5xl mx-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr class="bg-white/5 border-b border-white/10">
                  <th class="p-4 md:p-6 text-sm font-semibold text-white w-1/3">Recurso</th>
                  <th class="p-4 md:p-6 text-sm font-semibold text-white w-1/3 border-l border-white/10 text-center">Pessoal</th>
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
                  <td class="p-4 md:p-6 border-l border-white/10 text-center" :class="{ 'opacity-30': row.personal === '—' }">{{ row.personal }}</td>
                  <td class="p-4 md:p-6 border-l border-white/10 text-center" :class="{ 'text-white font-bold': row.enterpriseBold, 'text-[#ca000d] font-bold': row.enterpriseHighlight }">{{ row.enterprise }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- FAQ SECTION -->
      <section class="max-w-4xl mx-auto px-6 py-12 mb-20">
        <FaqSection :items="faqItems" />
      </section>

      <!-- CTA SECTION -->
      <BaseCtaSection
        title="Comece a guardar suas memórias hoje."
        description="Junte-se a mais de 10.000 pessoas que confiam na Rocket Drive."
        button-label="Criar Conta Grátis"
        button-to="/contact"
        class="reveal-on-scroll"
      />

    </main>

    <!-- FOOTER -->
    <AppFooter />

    <!-- SLIDEOVER -->


  </div>
</template>

<style scoped>
/* === PAGE-SPECIFIC STYLES === */
/* All common styles (grid-pattern, text-gradient, glow-button, enhanced-card, 
   floating-element, animations, etc.) are now in main.css */

/* Particles animation (specific to this page) */
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

/* Mobile adjustments */
@media (max-width: 640px) {
  .animate-float-slow, .animate-float-alt {
    animation-name: float !important;
    animation-duration: 4s !important;
  }
}
</style>
