<script setup lang="ts">
// Estado para controlar se o menu lateral está aberto
const isOpen = ref(false);

// Itens de navegação do menu
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

// Lógica de troca de tema (Dark/Light)
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});

// --- Background Particles Logic ---
const particles = ref<{ left: string; size: string; delay: string; duration: string }[]>([]);

onMounted(() => {
    // Generate particles
    for (let i = 0; i < 20; i++) {
        particles.value.push({
            left: Math.random() * 100 + '%',
            size: Math.random() * 3 + 1 + 'px',
            delay: Math.random() * 5 + 's',
            duration: Math.random() * 10 + 10 + 's'
        });
    }
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

// --- Testimonials Data ---
const testimonials = [
  {
    quote: '"A Rocket resolveu nossos problemas de lentidão. Antes, atualizar o sistema levava dias e parava a operação. Agora tudo acontece em minutos e sem erros."',
    name: 'Carlos Mendes',
    role: 'Diretor de Tecnologia',
    stars: 5,
    border: ''
  },
  {
    quote: '"Segurança era minha maior preocupação. A equipe Rocket fez uma varredura completa e ajustou tudo. Agora estamos 100% seguros e dentro da lei."',
    name: 'Ana Souza',
    role: 'Gerente Geral',
    stars: 5,
    border: 'border-red-900/30 border'
  },
  {
    quote: '"Parceiros estratégicos. Eles não só entregam o código, mas trazem ideias de como usar a tecnologia para vender mais e superar a concorrência."',
    name: 'Roberto Silva',
    role: 'Diretor de Operações',
    stars: 5,
    border: ''
  }
];
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-gray-100 font-sans relative flex flex-col">
    <!-- Background Effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="grid-bg absolute inset-0"></div>
        
        <!-- Floating Blobs (Neutral for Subpages) -->
        <div class="absolute inset-0">
            <div class="floating-blob blob-neutral top-[-10%] left-[-5%] w-[500px] h-[500px]"></div>
            <div class="floating-blob blob-white bottom-[-10%] right-[-5%] w-[400px] h-[400px]"></div>
        </div>

        <!-- Particles -->
        <div class="absolute inset-0">
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
    </div>

    <header
      class="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl"
    >
      <UContainer class="flex h-16 items-center justify-between gap-3">
        <div class="flex items-center gap-2 lg:flex-1">
          <NuxtLink
            to="/"
            class="flex items-center hover:opacity-80 transition-opacity"
          >
            <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-8 w-auto" />
          </NuxtLink>
        </div>

        <div class="hidden lg:flex flex-1 justify-center">
          <UNavigationMenu :items="items" variant="link" />
        </div>

        <div class="flex items-center justify-end gap-2 lg:flex-1">
          <UButton
            label="Login"
            to="/login"
            color="primary"
            variant="solid"
            class="hidden sm:inline-flex text-white"
          />

          <UButton
            icon="i-lucide-menu"
            color="neutral"
            variant="ghost"
            class="lg:hidden"
            aria-label="Menu"
            @click="isOpen = true"
          />
        </div>
      </UContainer>
    </header>

    <main class="flex-grow flex flex-col relative z-10">
      <UContainer class="pt-32 lg:pt-52 pb-24 text-center w-full">
        <div class="max-w-2xl mx-auto space-y-6">
          <h1 class="text-6xl font-extrabold text-white">
            Excelência Operacional <span class="text-primary-500">em Escala</span>
          </h1>
          <p class="text-xl text-gray-400">
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
              icon="i-lucide-arrow-right"
              trailing
              to="/servicos"
              class="text-white hover:no-underline"
            />
          </div>
        </div>
      </UContainer>

      <!-- Tech Stack Marquee -->
      <div class="bg-black/50 border-y border-white/5 py-8 overflow-hidden relative mt-16 md:mt-32 group">
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
      <section id="solutions" class="py-24 px-6">
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

      <!-- Stats Section -->
      <section class="py-20 border-y border-white/5 bg-white/[0.02]">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
              <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div class="group">
                      <div class="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">+120</div>
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
                      <div class="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">50+</div>
                      <div class="text-sm text-gray-500 uppercase tracking-wider">Especialistas Sênior</div>
                  </div>
              </div>
          </div>
      </section>

      <!-- Testimonials Section -->
      <section id="cases" class="py-24 px-6">
          <div class="mx-auto max-w-7xl">
              <h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-16">O que dizem os líderes</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div v-for="t in testimonials" :key="t.name" :class="['glass p-8 rounded-2xl hover:bg-white/5 transition-colors', t.border]">
                      <div class="flex text-yellow-500 mb-4 tracking-widest">★★★★★</div>
                      <p class="text-gray-300 mb-6 italic">{{ t.quote }}</p>
                      <div class="flex items-center gap-4">
                          <div class="w-12 h-12 bg-gray-700/50 rounded-full overflow-hidden flex items-center justify-center">
                              <UIcon name="i-lucide-user" class="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                              <div class="text-white font-bold">{{ t.name }}</div>
                              <div class="text-sm text-gray-500">{{ t.role }}</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <!-- FAQ Section -->
      <section id="faq" class="py-20 px-6 bg-white/5">
          <div class="mx-auto max-w-3xl">
              <h2 class="text-3xl font-bold text-white text-center mb-12">Perguntas Frequentes</h2>

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
          </div>
      </section>

      <!-- Final CTA Section -->
      <section class="relative isolate py-24 bg-gradient-to-b from-black to-primary-900/10 border-t border-white/5 w-full">
          <div class="mx-auto max-w-4xl px-6 lg:px-8 text-center">
              <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-xl">
                  Seu projeto exige <span class="text-gradient-red">Excelência Técnica?</span>
              </h2>
              <p class="mt-6 text-lg leading-8 text-gray-300">
                  Não deixe sua infraestrutura limitar seu crescimento. Vamos desenhar a arquitetura que levará seu negócio ao próximo nível.
              </p>
              <div class="mt-10 flex items-center justify-center gap-x-6">
                  <UButton
                    size="xl"
                    label="Agendar Consultoria Técnica"
                    to="/contact"
                    class="glow-button rounded-md bg-white px-8 py-3.5 text-sm font-bold text-primary-600 shadow-lg hover:bg-gray-100 transition-all"
                    color="neutral"
                    variant="solid"
                  />
              </div>
          </div>
      </section>
    </main>

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
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Cloud Computing</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Cibersegurança</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">DevOps</NuxtLink></li>
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Big Data</NuxtLink></li>
                    </ul>
                </div>

                <!-- Empresa Column -->
                <div>
                    <h4 class="text-white font-bold mb-4">Empresa</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Sobre Nós</NuxtLink></li>
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
                
                <!-- Social Icons -->
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
/* === High-End Background Styles === */
.grid-bg {
    background-size: 50px 50px;
    background-image: 
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}

.floating-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    animation: float-slow 10s infinite ease-in-out;
}

.blob-neutral {
    background: rgba(40, 40, 40, 0.3); /* Neutral Gray */
}

.blob-white {
    background: rgba(255, 255, 255, 0.05);
}

.particle {
    position: absolute;
    background: white;
    border-radius: 50%;
    opacity: 0.1; /* Initial subtle opacity */
    bottom: -10px; /* Start slightly below visibility */
    animation: rise linear infinite;
}

@keyframes float-slow {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-20px, 30px); }
}

@keyframes rise {
    0% { transform: translateY(0) scale(1); opacity: 0; }
    50% { opacity: 0.3; } /* Peak visibility */
    100% { transform: translateY(-100vh) scale(0); opacity: 0; }
}

/* === New Sections Styles === */
.glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
}

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
</style>
