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
  { value: '99.99%', label: 'Uptime Garantido' },
  { value: '50ms', label: 'Latência Global' },
  { value: 'AES-256', label: 'Criptografia Militar' },
  { value: '10TB+', label: 'Dados Processados/dia' },
];

const features = [
  {
    icon: 'i-lucide-zap',
    title: 'Velocidade Hipersônica',
    description: 'Nossa rede CDN distribuída garante que seus arquivos sejam entregues a partir do servidor mais próximo, reduzindo o tempo de carregamento em até 70%.'
  },
  {
    icon: 'i-lucide-lock',
    title: 'Segurança Zero-Knowledge',
    description: 'Nem mesmo nós podemos ver seus arquivos. Criptografia no lado do cliente antes do upload e chaves gerenciadas exclusivamente por você.'
  },
  {
    icon: 'i-lucide-database',
    title: 'API Compatível com S3',
    description: 'Integre facilmente com ferramentas existentes. Mude seu endpoint para o Rocket Cloud e continue usando suas bibliotecas favoritas sem reescrever código.'
  }
];

const securityChecklist = [
  'Autenticação de Dois Fatores (2FA) em todas as contas',
  'Proteção contra ataques DDoS de Camada 7',
  'Logs de auditoria imutáveis para Enterprise'
];

const personalPlanFeatures = [
  '15 GB de armazenamento',
  '2 Usuários',
  'Suporte por E-mail',
  'App Móvel (iOS/Android)'
];

const enterprisePlanFeatures = [
  'Armazenamento Ilimitado',
  'SSO (Single Sign-On) & SAML',
  'SLA Dedicado de 99.99%',
  'API Administrativa Completa'
];

const comparisonTable = [
  { feature: 'Capacidade', personal: '15 GB', enterprise: 'Ilimitado', enterpriseBold: true },
  { feature: 'Histórico de Versões', personal: '30 dias', enterprise: 'Infinito', enterpriseBold: true },
  { feature: 'Suporte Técnico', personal: 'Comunidade', enterprise: 'Gerente de Conta Dedicado', enterpriseBold: true },
  { feature: 'Auditoria (Logs)', personal: '—', enterprise: 'Sim (1 ano)', enterpriseHighlight: true },
  { feature: 'Chaves de Criptografia', personal: 'Gerenciado pela Rocket', enterprise: 'BYOK (Bring Your Own Key)', enterpriseBold: true }
];

const faqItems = [
  {
    label: 'Meus dados estão realmente seguros?',
    content: 'Sim. Utilizamos uma arquitetura de "Zero Knowledge". Seus arquivos são criptografados no seu dispositivo antes de serem enviados para nossos servidores. Nem mesmo nossos engenheiros podem acessar o conteúdo dos seus arquivos.',
    slot: 'item'
  },
  {
    label: 'Como funciona a migração do S3?',
    content: 'Nossa API é 100% compatível com o protocolo S3. Basta alterar as credenciais de acesso e a URL do endpoint no seu código atual. Oferecemos também uma ferramenta CLI para migração de buckets em massa.',
    slot: 'item'
  },
  {
    label: 'Posso cancelar o plano Enterprise?',
    content: 'Os contratos Enterprise são anuais, mas oferecemos um período de avaliação (Proof of Concept) de 30 dias sem compromisso para garantir que nossa solução atende às suas necessidades.',
    slot: 'item'
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
  title: 'Rocket Cloud - Infraestrutura Escalável'
})
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#ca000d] selection:text-white relative flex flex-col">
    
    <!-- Background Elements -->
    <div class="fixed inset-0 grid-pattern z-0"></div>
    <div class="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#ca000d]/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#ca000d]/5 rounded-full blur-[100px] pointer-events-none"></div>
    
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
    <main class="flex-grow relative z-10 pt-32">
      
      <!-- HERO SECTION -->
      <section class="max-w-7xl mx-auto px-6 text-center mb-20">
        <!-- Animated Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#ca000d] mb-8 animate-float">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ca000d] opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-[#ca000d]"></span>
          </span>
          Nova Infraestrutura v3.0 Disponível
        </div>
        
        <!-- Title -->
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
          A Nuvem Inteligente <br/>
          <span class="text-gradient">Sem Limites de Escala</span>
        </h1>
        
        <!-- Subtitle -->
        <p class="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Armazenamento de objetos de alta performance, compatível com S3, projetado para desenvolvedores e empresas que exigem soberania de dados e latência zero.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <UButton 
            size="xl" 
            label="Começar Gratuitamente" 
            color="primary" 
            class="glow-button text-white w-full sm:w-auto"
            icon="i-lucide-arrow-right"
            trailing
            to="/contact"
          />
          <UButton 
            size="xl" 
            label="Ler Documentação API" 
            variant="outline" 
            color="neutral" 
            icon="i-lucide-terminal"
            class="w-full sm:w-auto border-white/20 hover:bg-white/10 text-white"
          />
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-8 bg-[#050505]/50 backdrop-blur-sm">
          <div v-for="stat in stats" :key="stat.label">
            <div class="text-3xl font-bold text-white mb-1">{{ stat.value }}</div>
            <div class="text-sm text-gray-400">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <!-- FEATURES SECTION -->
      <section id="features" class="max-w-7xl mx-auto px-6 py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Arquitetura de Próxima Geração</h2>
          <p class="text-gray-400">Construído sobre os pilares do Rocket Design System para máxima eficiência.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="index" 
            class="glass-panel p-8 rounded-xl group"
          >
            <div class="w-12 h-12 bg-[#ca000d]/10 rounded-lg flex items-center justify-center mb-6 border border-[#ca000d]/20 group-hover:border-[#ca000d] transition-colors">
              <UIcon :name="feature.icon" class="w-6 h-6 text-[#ca000d]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">{{ feature.title }}</h3>
            <p class="text-gray-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <!-- SECURITY SECTION -->
      <section id="security" class="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
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
              <div class="bg-[#0a0a0a] rounded-xl p-8 overflow-hidden relative">
                <div class="font-mono text-xs text-gray-500 mb-2">// SECURITY PROTOCOL INITIATED</div>
                <div class="space-y-2 mb-8">
                  <div class="h-2 w-3/4 bg-white/10 rounded"></div>
                  <div class="h-2 w-1/2 bg-white/10 rounded"></div>
                  <div class="h-2 w-5/6 bg-[#ca000d]/20 rounded animate-pulse"></div>
                </div>
                
                <div class="flex justify-center py-8">
                  <div class="relative">
                    <div class="absolute inset-0 bg-[#ca000d]/30 blur-2xl rounded-full"></div>
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
      <section id="pricing" class="max-w-7xl mx-auto px-6 py-24">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">Escolha sua infraestrutura</h2>
          <p class="text-gray-400 text-lg">Planos flexíveis que crescem junto com seus dados.</p>
        </div>

        <!-- Pricing Cards -->
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto mb-20">
          <!-- Personal Plan -->
          <div class="glass-panel rounded-2xl p-8 flex flex-col hover:border-white/30 transition-all">
            <h3 class="text-2xl font-bold text-white mb-2">Pessoal</h3>
            <p class="text-gray-400 mb-6 h-10">Ideal para backups pessoais e portfólios.</p>
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
          <div class="glass-panel rounded-2xl p-8 flex flex-col relative border-[#ca000d]/40 bg-[#0a0a0a]/40">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ca000d] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-[#ca000d]/40 uppercase tracking-widest">
              Recomendado
            </div>
            
            <h3 class="text-2xl font-bold text-white mb-2">Enterprise Cloud</h3>
            <p class="text-gray-400 mb-6 h-10">Potência total para organizações.</p>
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
        <div class="max-w-5xl mx-auto overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <table class="w-full text-left border-collapse">
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
      </section>

      <!-- FAQ SECTION -->
      <section class="max-w-4xl mx-auto px-6 py-12 mb-20">
        <h2 class="text-3xl font-bold text-white mb-8 text-center">Perguntas Frequentes</h2>
        
        <UAccordion 
          :items="faqItems" 
          multiple
          :ui="{
            root: 'flex flex-col gap-4',
            item: 'border border-white/10 rounded-2xl bg-black/40 backdrop-blur-sm overflow-hidden',
            trigger: 'group flex items-center justify-between w-full px-6 py-5 text-left hover:bg-white/5 transition-all focus:outline-none',
            content: 'px-6 pt-4 pb-5 text-gray-400 text-base leading-relaxed border-t border-white/10',
            label: 'text-white font-medium text-base',
            trailingIcon: 'w-5 h-5 text-primary-500 transition-transform duration-200 group-data-[state=open]:rotate-180'
          }"
        />
      </section>

      <!-- CTA SECTION -->
      <section class="max-w-7xl mx-auto px-6 mb-24">
        <div class="glass-panel rounded-2xl p-8 md:p-12 text-center bg-gradient-to-r from-[#ca000d]/20 to-transparent relative overflow-hidden">
          <div class="absolute inset-0 grid-pattern-cta opacity-10 pointer-events-none"></div>
          <h2 class="text-3xl font-bold text-white mb-4 relative z-10">Pronto para transformar seu armazenamento?</h2>
          <p class="text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">Junte-se a mais de 10.000 empresas que confiam na Rocket Cloud.</p>
          
          <form class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10" @submit.prevent>
            <input 
              type="email" 
              placeholder="Digite seu e-mail corporativo" 
              class="flex-1 bg-[#050505] text-white border border-white/20 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ca000d] focus:border-transparent transition-all placeholder-gray-600"
            >
            <UButton 
              type="submit" 
              label="Começar Agora" 
              color="neutral" 
              variant="solid" 
              class="bg-white text-[#ca000d] hover:bg-gray-100 font-bold shadow-lg"
              to="/contact"
            />
          </form>
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
                        <li><NuxtLink to="/services/cloud" class="hover:text-blue-500 transition-colors">Cloud Computing</NuxtLink></li>
                        <li><NuxtLink to="/services/devel" class="hover:text-red-500 transition-colors">Desenvolvimento</NuxtLink></li>
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
  background-size: 50px 50px;
  background-image: linear-gradient(rgba(202, 0, 13, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(202, 0, 13, 0.15) 1px, transparent 1px);
  mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 80%);
  opacity: 0.2;
  pointer-events: none;
}

.grid-pattern-cta {
  background-size: 50px 50px;
  background-image: linear-gradient(rgba(202, 0, 13, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(202, 0, 13, 0.15) 1px, transparent 1px);
}

/* === GLASS PANEL === */
.glass-panel {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(202, 0, 13, 0.02) 50%, rgba(255, 255, 255, 0.01) 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-panel:hover {
  border-color: rgba(202, 0, 13, 0.3);
  transform: translateY(-5px);
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
  box-shadow: 0 0 15px rgba(202, 0, 13, 0.3);
  transition: all 0.3s ease;
}
.glow-button:hover {
  box-shadow: 0 0 25px rgba(202, 0, 13, 0.6);
}

/* === FLOAT ANIMATION === */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
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
