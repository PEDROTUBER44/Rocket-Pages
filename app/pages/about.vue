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

// --- SEO Metadata ---
useHead({
  title: 'Sobre Nós | Rocket',
  meta: [
    { 
      name: 'description', 
      content: 'Conheça a Rocket: Nossa história, valores e a missão de transformar o futuro digital com design e tecnologia de ponta.' 
    }
  ]
});

// Timeline Data
const timelineData = [
  {
    year: '2020',
    title: 'Ignição',
    description: 'O início de tudo. Uma equipe enxuta com uma visão massiva: eliminar a lacuna entre design e engenharia.',
    ping: false
  },
  {
    year: '2023',
    title: 'Decolagem',
    description: 'Primeiros marcos significativos. Expansão da equipe e entrega de projetos que desafiaram nossa própria capacidade.',
    ping: false
  },
  {
    year: '2025',
    title: 'Órbita',
    description: 'Estabilidade e escala. Consolidação da nossa metodologia proprietária e reconhecimento no mercado enterprise.',
    ping: true
  },
  {
    year: '2027',
    title: 'Horizonte',
    description: 'O futuro é agora. Integração total de IA e expansão para novos mercados globais.',
    ping: false
  }
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

// Scroll Functionality
const trajectorySection = ref<HTMLElement | null>(null);

const scrollToTrajectory = () => {
    trajectorySection.value?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-gray-100 font-sans relative flex flex-col">
    <!-- Background Effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="grid-bg absolute inset-0"></div>
        
        <!-- Floating Blobs (Neutral/Brand Mix) -->
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

    <!-- Global Header -->
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
          <UNavigationMenu :items="items" variant="link" class="gap-x-4"/>
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

    <main class="flex-grow relative z-10 pt-32 lg:pt-52 pb-24">
        
        <!-- Hero Section -->
        <UContainer class="text-center w-full mb-24 md:mb-40">
            <div class="max-w-2xl mx-auto space-y-6 animate-fade-in">

                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                    Forjamos o 
                    <span class="text-primary-500">Futuro Digital.</span>
                </h1>
                
                <p class="text-lg sm:text-xl text-gray-400">
                    Não apenas seguimos tendências. Nós as criamos com uma fusão implacável de design visionário e engenharia de alta performance.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <UButton
                        size="xl"
                        label="Explore Nossas Vagas"
                        color="primary"
                        class="text-white w-full sm:w-auto justify-center"
                    />
                    <UButton
                        size="xl"
                        label="Nossa Trajetória"
                        variant="ghost"
                        color="neutral"
                        class="text-white hover:bg-white/5 w-full sm:w-auto justify-center"
                        icon="i-lucide-arrow-right"
                        trailing
                        @click="scrollToTrajectory"
                    />
                </div>
            </div>
        </UContainer>

        <!-- Values Section -->
        <UContainer class="mb-40">
            <div class="text-center mb-16 space-y-4">
                 <h2 class="text-4xl font-bold text-white tracking-tight">
                     O DNA <span class="text-primary-500">Rocket</span>
                 </h2>
                 <p class="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                     Os princípios inegociáveis que nos impulsionam.
                 </p>
             </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Card 1 -->
                <div class="group relative bg-[#0a0a0a]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary-500/30 overflow-hidden">
                    <!-- Sheen -->
                    <div class="absolute inset-0 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 z-20 pointer-events-none"></div>
                    
                    <div class="relative z-10">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-primary-500/20 transition-all">
                            <UIcon name="i-lucide-crosshair" class="w-7 h-7 text-primary-500" />
                        </div>
                        <h3 class="text-xl font-bold text-white mb-4">Precisão</h3>
                        <p class="text-gray-400 leading-relaxed">Cada pixel conta. Cada linha de código tem um propósito. Não aceitamos o "suficiente".</p>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="group relative bg-[#0a0a0a]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 z-20 pointer-events-none"></div>
                    
                    <div class="relative z-10">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-blue-500/20 transition-all">
                            <UIcon name="i-lucide-zap" class="w-7 h-7 text-blue-500" />
                        </div>
                        <h3 class="text-xl font-bold text-white mb-4">Velocidade</h3>
                        <p class="text-gray-400 leading-relaxed">Entregamos valor rápido. Iteramos, aprendemos e evoluímos em tempo recorde.</p>
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="group relative bg-[#0a0a0a]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/30 overflow-hidden">
                    <div class="absolute inset-0 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 z-20 pointer-events-none"></div>
                    
                    <div class="relative z-10">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-purple-500/20 transition-all">
                            <UIcon name="i-lucide-globe" class="w-7 h-7 text-purple-500" />
                        </div>
                        <h3 class="text-xl font-bold text-white mb-4">Impacto</h3>
                        <p class="text-gray-400 leading-relaxed">Construímos para escalar. Soluções robustas prontas para conquistar mercados globais.</p>
                    </div>
                </div>
            </div>
        </UContainer>

        <!-- Timeline Section (Redesigned with Flexbox for Perfect Alignment) -->
        <section ref="trajectorySection" class="py-24 relative overflow-hidden">
             <UContainer>
                <div class="text-center mb-32 space-y-4">
                    <h2 class="text-4xl lg:text-5xl font-bold text-white tracking-tight animate-fade-in">Trajetória <span class="text-primary-500">Explosiva</span></h2>
                    <p class="text-gray-400 text-lg max-w-2xl mx-auto">De um escritório compartilhado para a dominação global.</p>
                </div>

                <div class="relative max-w-7xl mx-auto">
                    <!-- Central Spine (Desktop) -->
                    <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#333] to-transparent -translate-x-1/2 z-0"></div>
                   
                    <!-- Mobile Line (Left) -->
                    <div class="md:hidden absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#333] to-transparent z-0"></div>

                    <div class="space-y-12">
                        <div 
                            v-for="(item, index) in timelineData" 
                            :key="index"
                            class="relative"
                        >
                            <!-- DESKTOP LAYOUT (Flexbox Row) -->
                            <div class="hidden md:flex items-center w-full">
                                
                                <!-- LEFT COLUMN -->
                                <div class="flex-1 pr-12 flex justify-end">
                                    <!-- If Even: CONTENT CARD -->
                                    <div v-if="index % 2 === 0" class="relative group max-w-lg w-full">
                                        <div class="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-900 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                                        <div class="relative bg-[#18181b] border border-white/10 p-8 rounded-2xl hover:border-primary-500/50 transition duration-300">
                                            <h3 class="text-2xl font-bold text-white mb-2">{{ item.title }}</h3>
                                            <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
                                        </div>
                                    </div>
                                    
                                    <!-- If Odd: YEAR TEXT -->
                                    <div v-if="index % 2 !== 0" class="flex items-center">
                                       <span class="text-6xl font-black text-white/5 select-none">{{ item.year }}</span>
                                    </div>
                                </div>

                                <!-- CENTER COLUMN (Spine & Dot) -->
                                <div class="relative flex justify-center items-center w-16 shrink-0 h-16">
                                     <!-- Connectors -->
                                     <div v-if="index % 2 === 0" class="absolute right-1/2 w-12 h-px bg-primary-500/30 translate-x-[-8px]"></div>
                                     <div v-if="index % 2 !== 0" class="absolute left-1/2 w-12 h-px bg-primary-500/30 translate-x-[8px]"></div>

                                     <!-- Dot -->
                                     <div 
                                        class="w-4 h-4 rounded-full border border-gray-600 bg-[#050505] z-10 box-content p-1 transition-all duration-500"
                                        :class="item.ping ? 'border-primary-500 shadow-[0_0_20px_rgba(202,0,13,0.5)] scale-125' : 'group-hover:scale-110 group-hover:border-primary-500'"
                                     >
                                         <div class="w-full h-full bg-primary-500 rounded-full" :class="item.ping ? 'animate-pulse' : ''"></div>
                                     </div>
                                </div>

                                <!-- RIGHT COLUMN -->
                                <div class="flex-1 pl-12 flex justify-start">
                                    <!-- If Even: YEAR TEXT -->
                                    <div v-if="index % 2 === 0" class="flex items-center">
                                       <span class="text-6xl font-black text-white/5 select-none">{{ item.year }}</span>
                                    </div>

                                    <!-- If Odd: CONTENT CARD -->
                                    <div v-if="index % 2 !== 0" class="relative group max-w-lg w-full">
                                        <div class="absolute -inset-0.5 bg-gradient-to-l from-primary-500 to-primary-900 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                                        <div class="relative bg-[#18181b] border border-white/10 p-8 rounded-2xl hover:border-primary-500/50 transition duration-300">
                                            <h3 class="text-2xl font-bold text-white mb-2">{{ item.title }}</h3>
                                            <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <!-- MOBILE LAYOUT -->
                            <div class="md:hidden flex flex-col pl-12 relative">
                                <span class="text-5xl font-black text-white mb-4 block">{{ item.year }}</span>
                                <div class="group relative w-full">
                                    <div class="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-900 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                                    <div class="relative bg-[#18181b] border border-white/10 p-6 rounded-2xl">
                                        <h3 class="text-xl font-bold text-white mb-2">{{ item.title }}</h3>
                                        <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
                                    </div>
                                </div>
                                <!-- Mobile Dot -->
                                <div class="absolute left-5 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-500 border border-gray-900 box-content shadow-[0_0_10px_rgba(202,0,13,0.5)] z-10"></div>
                            </div>

                        </div>
                    </div>
                </div>
             </UContainer>
        </section>

        <!-- CTA Section -->
        <UContainer>
            <div class="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] p-10 md:p-20 text-center group hover:border-primary-500/30 transition-all duration-500">
                 <!-- Background Effects -->
                 <div class="grid-bg absolute inset-0 opacity-30"></div>
                 <div class="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent opacity-50"></div>
                 <div class="absolute w-full h-full top-0 left-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/30 via-transparent to-transparent blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                 
                 <!-- Sheen -->
                 <div class="absolute inset-0 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 z-20 pointer-events-none"></div>

                 <div class="relative z-10 max-w-2xl mx-auto space-y-8">
                     <h2 class="text-4xl lg:text-5xl font-bold text-white leading-tight">
                        Sua Próxima Missão <br/>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Começa Aqui.</span>
                     </h2>
                     <p class="text-gray-400 text-lg md:text-xl font-light">
                        Estamos buscando os inconformados. Se você quer construir o que vem a seguir, junte-se à tripulação.
                     </p>
                     
                     <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <UButton
                            size="xl"
                            label="Ver Vagas Abertas"
                            color="primary"
                            class="w-full sm:w-auto font-bold shadow-2xl shadow-primary-900/40 hover:shadow-primary-900/60 text-white transition-all transform hover:-translate-y-1"
                        />
                         <UButton
                            size="xl"
                            label="Conhecer Benefícios"
                            variant="ghost"
                            color="neutral"
                             class="text-white hover:bg-white/10 w-full sm:w-auto justify-center border border-white/10 hover:border-white/20"
                             trailing
                        />
                    </div>
                 </div>
            </div>
        </UContainer>

    </main>

    <!-- Global Footer -->
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
.grid-bg {
    background-size: 40px 40px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}

.floating-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.3;
    animation: float-slow 20s ease-in-out infinite;
}

.blob-neutral { background: rgba(40, 40, 40, 0.3); }
.blob-white { background: rgba(255,255,255,0.05); }
.blob-red { background: #ca000d; }

.particle {
    position: absolute;
    background: white;
    border-radius: 50%;
    opacity: 0; 
    animation: rise linear infinite;
    pointer-events: none;
}

@keyframes float-slow {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -50px) rotate(10deg); }
    66% { transform: translate(-20px, 20px) rotate(-5deg); }
}

@keyframes rise {
    0% { transform: translateY(100vh) scale(0); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: translateY(-100px) scale(1); opacity: 0; }
}

@keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
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
