<script setup lang="ts">
// Estado para controlar se o menu lateral está aberto
const isOpen = ref(false);

// Itens de navegação do menu desktop
const items = [
  {
    label: "Serviços",
    to: "/servicos",
    icon: "i-lucide-briefcase",
  },
  {
    label: "Recursos",
    to: "/recursos",
    icon: "i-lucide-book-open",
  },
  {
    label: "Empresas",
    to: "/empresas",
    icon: "i-lucide-building-2",
  },
  {
    label: "Sobre Nós",
    to: "/about",
    icon: "i-lucide-info",
  },
];

// Accordion items para menu mobile cascata
const accordionItems = [
  {
    label: "Serviços",
    icon: "i-lucide-briefcase",
    defaultOpen: true,
    slot: "services"
  },
  {
    label: "Navegação",
    icon: "i-lucide-compass",
    slot: "navigation"
  }
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

/* --- Carousel Logic --- */
const currentSlide = ref(0);
const slides = [
  {
    title: "Transformação Digital Acelerada",
    subtitle: "Revolucione seu negócio com soluções tecnológicas sob medida que impulsionam o crescimento e a eficiência.",
    image: "/_nuxt/home/pingo/.gemini/antigravity/brain/711d3a21-86ce-428d-8da7-b5b7ef96b202/uploaded_image_1767890160357.png",
  },
  {
    title: "Inovação Sem Limites",
    subtitle: "Explore novas fronteiras com nossa expertise em desenvolvimento de software de ponta e design intuitivo.",
    image: "/_nuxt/home/pingo/.gemini/antigravity/brain/711d3a21-86ce-428d-8da7-b5b7ef96b202/uploaded_image_1767890160357.png",
  },
  {
    title: "Consultoria Estratégica",
    subtitle: "Nossos especialistas ajudam a definir o melhor caminho para o sucesso do seu produto digital.",
    image: "/_nuxt/home/pingo/.gemini/antigravity/brain/711d3a21-86ce-428d-8da7-b5b7ef96b202/uploaded_image_1767890160357.png",
  },
  {
    title: "Design Que Conecta",
    subtitle: "Interfaces que encantam e fidelizam usuários, transformando visitantes em clientes leais.",
    image: "/_nuxt/home/pingo/.gemini/antigravity/brain/711d3a21-86ce-428d-8da7-b5b7ef96b202/uploaded_image_1767890160357.png",
  },
  {
    title: "Tecnologia de Ponta",
    subtitle: "Utilizamos as stacks mais modernas para garantir performance, segurança e escalabilidade.",
    image: "/_nuxt/home/pingo/.gemini/antigravity/brain/711d3a21-86ce-428d-8da7-b5b7ef96b202/uploaded_image_1767890160357.png",
  },
];

let carouselInterval: ReturnType<typeof setInterval>;

const startAutoplay = () => {
    carouselInterval = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % slides.length;
    }, 4000);
};

const stopAutoplay = () => {
    clearInterval(carouselInterval);
};

onMounted(() => {
    startAutoplay();
});

onUnmounted(() => {
    stopAutoplay();
});

/* --- Swipe Logic --- */
const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e: TouchEvent) => {
    const touch = e.changedTouches[0];
    if (!touch) return;
    touchStartX.value = touch.screenX;
    stopAutoplay();
};

const handleTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0];
    if (!touch) return;
    touchEndX.value = touch.screenX;
    handleSwipe();
    startAutoplay();
};

const handleSwipe = () => {
    if (touchEndX.value < touchStartX.value - 50) {
        // Swipe Left -> Next Slide
        currentSlide.value = (currentSlide.value + 1) % slides.length;
    }
    if (touchEndX.value > touchStartX.value + 50) {
        // Swipe Right -> Prev Slide
        currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
    }
};

/* --- Background Particles Logic --- */
const particles = ref<{ left: string; size: string; delay: string; duration: string }[]>([]);

onMounted(() => {
    startAutoplay();
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
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-gray-200 flex flex-col relative font-sans">
    <!-- Background Effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="grid-bg absolute inset-0"></div>
        <!-- Floating Blobs (Neutral) -->
        <div class="absolute inset-0">
            <div class="floating-blob blob-neutral top-[-10%] left-[-5%] w-[500px] h-[500px]"></div>
            <div class="floating-blob blob-white bottom-[-10%] right-[-5%] w-[400px] h-[400px]"></div>
        </div>
        
        <!-- Particles -->
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
          <UNavigationMenu :items="items" variant="link" class="gap-x-4" />
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
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Criado para quem nasceu fora do
            <span class="text-primary">padrão</span>
          </h1>
          <p class="text-lg sm:text-xl text-gray-400">
            O padrão do mercado é o teto dos outros, aqui é só o ponto de
            partida.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <UButton
              size="xl"
              label="Solicitar Orçamento"
              color="primary"
              class="text-white w-full sm:w-auto justify-center"
              to="/contact"
            />
            <UButton
              size="xl"
              label="Ver Serviços"
              variant="link"
              color="neutral"
              icon="i-lucide-arrow-right"
              trailing
              to="/servicos"
              class="text-white hover:no-underline w-full sm:w-auto justify-center"
            />
          </div>
        </div>

      <!-- Carousel Section -->
       <div class="w-full max-w-6xl mx-auto mt-32 text-left">
            <div 
                class="relative bg-white dark:bg-[#0a0a0a]/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden h-[450px] lg:h-[500px] shadow-2xl cursor-grab active:cursor-grabbing" 
                @mouseenter="stopAutoplay" 
                @mouseleave="startAutoplay"
                @touchstart="handleTouchStart"
                @touchend="handleTouchEnd"
            >
                <!-- Slides Container -->
                <div class="relative w-full h-full">
                    <transition-group name="fade">
                        <div v-for="(slide, index) in slides" :key="index" v-show="currentSlide === index" class="absolute inset-0 flex flex-col-reverse lg:flex-row items-center justify-between lg:p-16">
                             <!-- Left Content (Bottom on Mobile) -->
                             <div class="w-full lg:w-1/2 h-1/2 lg:h-auto flex flex-col justify-center space-y-4 lg:space-y-8 z-20 p-6 lg:p-0">
                                 <h2 class="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                     {{ slide.title }}
                                 </h2>
                                 <p class="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-lg">
                                     {{ slide.subtitle }}
                                 </p>
                                 <div class="flex items-center gap-2 lg:gap-4">
                                     <UButton size="lg" lg:size="xl" label="Saiba Mais" color="primary" variant="solid" class="text-white px-6 lg:px-8" />
                                     <UButton size="lg" lg:size="xl" label="Ver Detalhes" color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" class="px-4 lg:px-6" />
                                 </div>
                             </div>

                             <!-- Right Image (Top on Mobile) -->
                             <div class="relative w-full lg:w-3/5 h-1/2 lg:h-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 z-10">
                                <img :src="slide.image" class="w-full h-full object-cover" alt="Slide Image">
                                <!-- Gradient Mask Desktop -->
                                <div class="hidden lg:block absolute inset-0 bg-gradient-to-r from-white dark:from-[#0a0a0a] via-transparent to-transparent"></div>
                                <!-- Gradient Mask Mobile (Bottom up) -->
                                <div class="lg:hidden absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-transparent to-transparent"></div>
                             </div>
                        </div>
                    </transition-group>
                </div>

            </div>

            <!-- Pagination Dots (Outside) -->
            <div class="flex justify-center mt-6 space-x-3">
                <button
                    v-for="(slide, index) in slides"
                    :key="index"
                        @click="currentSlide = index"
                    :class="[
                        'w-3 h-3 rounded-full transition-all duration-300',
                        currentSlide === index ? 'w-8 bg-primary-500' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    ]"
                    aria-label="Go to slide"
                ></button>
            </div>
       </div>

        <!-- Statistics Section (Redesigned) -->
        <div class="mt-32 max-w-6xl mx-auto text-left">
          <!-- Section Header -->
          <div class="mb-16 max-w-2xl mx-auto text-center">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Números que falam
            </h2>
            <p class="text-gray-500 dark:text-gray-400">
              Resultados que comprovam nossa excelência técnica
            </p>
          </div>

          <!-- Stats Grid -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl shadow-black/5"
          >
            <div
              v-for="(stat, index) in [
                {
                  label: 'Projetos Entregues',
                  value: '236',
                  icon: 'i-lucide-rocket',
                },
                {
                  label: 'Clientes Satisfeitos',
                  value: '+226',
                  icon: 'i-lucide-users',
                },
                {
                  label: 'Anos de Experiência',
                  value: '5',
                  icon: 'i-lucide-award',
                },
                {
                  label: 'Taxa de Sucesso',
                  value: '98%',
                  icon: 'i-lucide-trending-up',
                },
              ]"
              :key="index"
              class="group relative bg-white dark:bg-[#0a0a0a]/60 backdrop-blur-xl p-6 lg:p-12 transition-all duration-500 hover:bg-gray-50 dark:hover:bg-[#0a0a0a]/80 hover:z-20 hover:scale-[1.02] overflow-hidden"
            >
              <!-- Sheen Effect -->
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-20 pointer-events-none"></div>

              <!-- Hover Glow Effect -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-transparent transition-all duration-500"
              ></div>

              <!-- Content -->
              <div class="relative z-10 space-y-4">
                <!-- Icon -->
                <div
                  class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors duration-500"
                >
                  <UIcon
                    :name="stat.icon"
                    class="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-primary-500 dark:group-hover:text-primary-300 transition-colors duration-500"
                  />
                </div>

                <!-- Value -->
                <div
                  class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:scale-105 transition-transform duration-500 origin-left"
                >
                  {{ stat.value }}
                </div>

                <!-- Label -->
                <div
                  class="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 uppercase tracking-wider"
                >
                  {{ stat.label }}
                </div>
              </div>

              <!-- Border Accent -->
              <div
                class="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500/0 to-transparent group-hover:via-primary-500/50 transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>

        <!-- Mission & Vision Section -->
        <div class="mt-24 max-w-6xl mx-auto space-y-12">
            <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
                <!-- Mission Card -->
                <div class="group relative bg-white dark:bg-[#0a0a0a]/60 backdrop-blur-xl p-6 lg:p-10 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-primary-500/30 overflow-hidden">
                    <!-- Sheen Effect -->
                    <div class="absolute inset-0 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-20 pointer-events-none"></div>

                    <!-- Hover Glow -->
                     <div class="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:to-transparent transition-all duration-500 rounded-3xl"></div>

                    <div class="relative z-10 space-y-6">
                         <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors duration-500">
                             <UIcon name="i-lucide-target" class="w-7 h-7 text-primary-600 dark:text-primary-400" />
                         </div>

                         <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                             Nossa Missão
                         </h3>

                         <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                             Criar soluções digitais que realmente façam a diferença para nossos clientes, combinando tecnologia, criatividade e eficiência para impulsionar negócios de forma inovadora e sustentável.
                         </p>
                    </div>
                 </div>

                <!-- Vision Card -->
                <div class="group relative bg-white dark:bg-[#0a0a0a]/60 backdrop-blur-xl p-6 lg:p-10 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-primary-500/30 overflow-hidden">
                    <!-- Sheen Effect -->
                    <div class="absolute inset-0 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 z-20 pointer-events-none"></div>

                    <!-- Hover Glow -->
                     <div class="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:to-transparent transition-all duration-500 rounded-3xl"></div>

                    <div class="relative z-10 space-y-6">
                         <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors duration-500">
                             <UIcon name="i-lucide-eye" class="w-7 h-7 text-primary-600 dark:text-primary-400" />
                         </div>

                         <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                             Nossa Visão
                         </h3>

                         <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                             Enxergar além do presente, combinando tecnologia e propósito para criar o futuro que ainda não existe.
                         </p>
                    </div>
                </div>
            </div>
        </div>
      </UContainer>
        <!-- Why Choose Rocket Section -->
        <div class="mt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
             <div class="text-center mb-16 space-y-4">
                 <h2 class="text-4xl lg:text-5xl font-bold text-white">
                     Por que escolher a <span class="text-primary-500">Rocket?</span>
                 </h2>
                 <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                     Nossos diferenciais que fazem a diferença
                 </p>
                 <div class="w-24 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto rounded-full opacity-80"></div>
             </div>

             <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div 
                    v-for="(item, index) in [
                        {
                            title: 'Inovação Constante',
                            description: 'Sempre na vanguarda das tecnologias mais recentes para entregar soluções que superam expectativas.',
                            icon: 'i-lucide-lightbulb'
                        },
                        {
                            title: 'Atendimento Personalizado',
                            description: 'Cada projeto é único. Oferecemos soluções sob medida que se adaptam perfeitamente às suas necessidades.',
                            icon: 'i-lucide-headset'
                        },
                        {
                            title: 'Soluções Escaláveis',
                            description: 'Pensamos no crescimento do seu negócio. Nossas soluções crescem junto com sua empresa.',
                            icon: 'i-lucide-trending-up'
                        },
                        {
                            title: 'Máxima Segurança',
                            description: 'Seus dados e dos seus clientes estão seguros. Implementamos as melhores práticas de segurança digital.',
                            icon: 'i-lucide-shield-check'
                        }
                    ]"
                    :key="index"
                    class="flex flex-col items-center text-center space-y-4 p-4"
                 >
                    <div class="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-2 shadow-lg shadow-red-900/10">
                         <UIcon :name="item.icon" class="w-8 h-8 text-primary-500" />
                    </div>
                    
                    <h3 class="text-xl font-bold text-white">
                        {{ item.title }}
                    </h3>

                    <p class="text-gray-500 text-sm leading-relaxed max-w-sm">
                        {{ item.description }}
                    </p>
                 </div>
             </div>
        </div>
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
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                @click="isOpen = false"
              />
            </div>

            <!-- Accordion Menu (Cascade) -->
            <div class="flex-1 overflow-y-auto custom-scrollbar space-y-2 px-6">
              <UAccordion 
                :items="accordionItems" 
                :ui="{ 
                  item: 'pt-0 pb-2 text-sm text-white',
                  trigger: 'px-3 py-2 text-gray-300 hover:text-white bg-transparent hover:bg-white/5 font-medium w-full justify-start rounded-md mb-1' 
                }"
              >
                <!-- Services Section -->
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

                <!-- Navigation Section -->
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
              <UButton
                block
                size="lg"
                label="Login"
                to="/login"
                color="primary"
                variant="solid"
                class="text-white"
                @click="isOpen = false"
              />
            </div>
          </div>
        </template>
      </USlideover>
    </ClientOnly>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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

/* === High-End Background Styles === */
.grid-bg {
    background-size: 40px 40px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}

.floating-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    z-index: 0;
    animation: float-slow 20s ease-in-out infinite;
}

.blob-neutral { background: rgba(40, 40, 40, 0.3); }
.blob-white { background: rgba(255,255,255,0.1); }

@keyframes float-slow {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -50px) rotate(10deg); }
    66% { transform: translate(-20px, 20px) rotate(-5deg); }
}

.particle {
    position: absolute;
    background: white;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    animation: rise 10s infinite linear;
}

@keyframes rise {
    0% { transform: translateY(100vh) scale(0); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: translateY(-100px) scale(1); opacity: 0; }
}
</style>
