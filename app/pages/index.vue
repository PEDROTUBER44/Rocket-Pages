<script setup lang="ts">
import EnhancedCard from '~/components/base/EnhancedCard.vue'
import BaseBentoCard from '~/components/base/BaseBentoCard.vue'
import SectionHeader from '~/components/base/SectionHeader.vue'
import BackgroundParticles from '~/components/base/BackgroundParticles.vue'

/* --- Carousel Logic --- */
const currentSlide = ref(0);
const slides = [
  {
    title: "Rocket Cloud",
    subtitle: "Soluções em nuvem escaláveis e seguras para impulsionar sua infraestrutura.",
    image: "/card_imgs/card_cloud.avif",
    link: "/services/cloud",
  },
  {
    title: "Rocket Devel",
    subtitle: "Desenvolvimento de software de alta performance e sob medida para o seu negócio.",
    image: "/card_imgs/card_devel.avif",
    link: "/services/devel",
  },
  {
    title: "Rocket Fitness",
    subtitle: "Tecnologia e inovação para transformar o setor de saúde e bem-estar.",
    image: "/card_imgs/card_fitness.avif",
    link: "/services/fitness",
  },
  {
    title: "Rocket Marketing",
    subtitle: "Estratégias digitais inteligentes para alavancar sua marca e resultados.",
    image: "/card_imgs/card_marketing.avif",
    link: "/services/marketing",
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

/* --- Services Data --- */
const services = [
  {
    title: 'Rocket Fitness',
    description: 'Performance humana potencializada por dados e IA.',
    icon: 'i-heroicons-heart',
    color: 'text-red-500',
    bg: 'bg-red-500/20',
    link: '/services/fitness',
    stat: '10k+',
    statLabel: 'Atletas'
  },
  {
    title: 'Rocket Cloud',
    description: 'Infraestrutura invisível, escalabilidade infinita.',
    icon: 'i-heroicons-cloud',
    color: 'text-blue-500',
    bg: 'bg-blue-500/20',
    link: '/services/cloud',
    stat: '99.9%',
    statLabel: 'Uptime'
  },
  {
    title: 'Rocket Devel',
    description: 'Engenharia de software de alta performance.',
    icon: 'i-heroicons-code-bracket',
    color: 'text-green-500',
    bg: 'bg-green-500/20',
    link: '/services/devel',
    stat: '644+',
    statLabel: 'Projetos'
  },
  {
    title: 'Rocket Marketing',
    description: 'Crescimento acelerado por inteligência de dados.',
    icon: 'i-heroicons-rocket-launch',
    color: 'text-purple-500',
    bg: 'bg-purple-500/20',
    link: '/services/marketing',
    stat: '10x',
    statLabel: 'ROI Médio'
  }
];

/* --- Tech Stack --- */
const techStack = [
  { name: 'Vue.js', icon: 'i-logos-vue' },
  { name: 'Nuxt', icon: 'i-logos-nuxt-icon' },
  { name: 'TypeScript', icon: 'i-logos-typescript-icon' },
  { name: 'Tailwind', icon: 'i-logos-tailwindcss-icon' },
  { name: 'Node.js', icon: 'i-logos-nodejs-icon' },
  { name: 'AWS', icon: 'i-logos-aws' },
  { name: 'Docker', icon: 'i-logos-docker-icon' },
  { name: 'PostgreSQL', icon: 'i-logos-postgresql' },
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

onMounted(() => {
    startAutoplay();
    setupScrollAnimation();
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

// Adicionando SEO
useAppSeo({
  title: 'Transformação Digital e Inovação',
  description: 'Somos a Rocket Pages. Revolucionamos seu negócio com soluções tecnológicas sob medida, design de ponta e consultoria estratégica.',
  image: '/og-home.png',
  breadcrumbs: [
    { name: 'Home', url: 'https://rocketweb.tech' }
  ]
});
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#ca000d] selection:text-white relative flex flex-col">
    
    <!-- Background Elements -->
    <div class="fixed inset-0 grid-pattern z-0"></div>
    <div class="fixed top-0 right-0 w-[500px] h-[500px] bg-[#ca000d]/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

    <AppHeader />

    <main class="flex-grow flex flex-col relative z-10">

      <!-- HERO SECTION -->
      <UContainer class="pt-32 lg:pt-52 pb-24 text-center w-full">
        <div class="max-w-2xl mx-auto space-y-6 reveal-on-scroll">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#ca000d] text-xs font-bold uppercase tracking-widest mb-4">
            <span class="w-2 h-2 rounded-full bg-[#ca000d] animate-pulse"></span>
            Bem-vindo ao Futuro
          </div>
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
          >
            Criado para quem nasceu fora do
            <span class="text-gradient">padrão</span>
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
              class="glow-button text-white w-full sm:w-auto justify-center"
              to="/contact"
            />
            <UButton
              size="xl"
              label="Ver Serviços"
              variant="link"
              color="neutral"
              to="/servicos"
              class="text-white hover:no-underline w-full sm:w-auto justify-center group"
            >
              <template #trailing>
                <UIcon name="i-lucide-arrow-right" class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </template>
            </UButton>
          </div>
        </div>

      <!-- Carousel Section -->
       <div class="w-full max-w-6xl mx-auto mt-32 text-left reveal-on-scroll" style="transition-delay: 200ms;">
            <div 
                class="relative bg-white dark:bg-[#0a0a0a]/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden h-[450px] lg:h-[500px] shadow-2xl cursor-grab active:cursor-grabbing" 
                @mouseenter="stopAutoplay" 
                @mouseleave="startAutoplay"
                @touchstart="handleTouchStart"
                @touchend="handleTouchEnd"
            >
                <!-- Slides Container -->
                <div class="relative w-full h-full">
                    <transition name="fade" mode="out-in">
                        <div :key="currentSlide" class="absolute inset-0 flex flex-col-reverse lg:flex-row items-center justify-between lg:p-16">
                             <!-- Left Content (Bottom on Mobile) -->
                             <div class="w-full lg:w-1/2 h-1/2 lg:h-auto flex flex-col justify-center space-y-4 lg:space-y-8 z-20 p-6 lg:p-0">
                                 <h2 class="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                     {{ slides[currentSlide].title }}
                                 </h2>
                                 <p class="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-lg">
                                     {{ slides[currentSlide].subtitle }}
                                 </p>
                                 <div class="flex items-center gap-2 lg:gap-4">
                                     <UButton size="lg" lg:size="xl" label="Saiba Mais" color="primary" variant="solid" class="text-white px-6 lg:px-8" :to="slides[currentSlide].link"/>
                                     <UButton size="lg" lg:size="xl" label="Ver Detalhes" color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" class="px-4 lg:px-6" :to="slides[currentSlide].link"/>
                                 </div>
                             </div>

                             <!-- Right Image (Top on Mobile) -->
                             <div class="relative w-full lg:w-3/5 h-1/2 lg:h-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 z-10">
                                <img :src="slides[currentSlide].image" class="w-full h-full object-cover" alt="Slide Image">
                                <!-- Gradient Mask Desktop -->
                                <div class="hidden lg:block absolute inset-0 bg-gradient-to-r from-white dark:from-[#0a0a0a] via-transparent to-transparent"></div>
                                <!-- Gradient Mask Mobile (Bottom up) -->
                                <div class="lg:hidden absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-transparent to-transparent"></div>
                             </div>
                        </div>
                    </transition>
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
      </UContainer>

      <!-- STATISTICS SECTION -->
      <UContainer class="pb-24">
        <SectionHeader 
          title="Números que falam"
          description="Resultados que comprovam nossa excelência técnica"
          centered
          class="mb-12"
        />

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl shadow-black/5 reveal-on-scroll"
        >
          <div
            v-for="(stat, index) in [
              {
                label: 'Projetos Entregues',
                value: '+644',
                icon: 'i-lucide-rocket',
              },
              {
                label: 'Clientes Satisfeitos',
                value: '+462',
                icon: 'i-lucide-users',
              },
              {
                label: 'Anos de Experiência',
                value: '6',
                icon: 'i-lucide-award',
              },
              {
                label: 'Taxa de Sucesso',
                value: '99%',
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
      </UContainer>

      <!-- SERVICES PREVIEW BENTO GRID -->
      <UContainer class="pb-32">
        <SectionHeader 
          title="Nosso Ecossistema"
          description="Soluções completas para acelerar seu negócio"
          badge="SERVICES"
          centered
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 reveal-on-scroll">
          <BaseBentoCard 
            v-for="(service, index) in services" 
            :key="index"
            class="group relative overflow-hidden min-h-[280px]"
          >
            <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" :class="`from-${service.color.replace('text-', '')}/10 to-transparent`"></div>
            
            <div class="relative z-10 h-full flex flex-col">
              <!-- Icon -->
              <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110', service.bg, service.color]">
                <UIcon :name="service.icon" class="w-6 h-6" />
              </div>
              
              <!-- Title -->
              <h3 class="text-lg font-bold text-white mb-2 group-hover:text-[#ca000d] transition-colors">
                {{ service.title }}
              </h3>
              
              <!-- Description -->
              <p class="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                {{ service.description }}
              </p>
              
              <!-- Stat -->
              <div class="flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                  <div class="text-xl font-bold text-white">{{ service.stat }}</div>
                  <div class="text-xs text-gray-500 uppercase tracking-wider">{{ service.statLabel }}</div>
                </div>
                <NuxtLink :to="service.link" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#ca000d] transition-colors">
                  <UIcon name="i-lucide-arrow-right" class="w-4 h-4 text-white" />
                </NuxtLink>
              </div>
            </div>
          </BaseBentoCard>
        </div>
      </UContainer>

      <!-- MISSION & VISION SECTION -->
      <UContainer class="pb-32">
        <div class="grid md:grid-cols-2 gap-6 lg:gap-8 reveal-on-scroll">
          <!-- Mission Card -->
          <EnhancedCard class="group p-6 lg:p-10">
            <div class="space-y-6">
              <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors duration-500">
                <UIcon name="i-lucide-target" class="w-7 h-7 text-primary-600 dark:text-primary-400" />
              </div>

              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                Nossa Missão
              </h3>

              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                Nossa missão transcende a funcionalidade; ela nasce do desejo profundo de elevar a experiência humana. Não buscamos apenas resolver problemas, mas redefinir o possível, fundindo criatividade com eficiência rigorosa. Existimos para transformar o trabalho e a vida de nossos clientes, criando soluções de uma excelência tão singular que não apenas satisfazem — elas inspiram.
              </p>
            </div>
          </EnhancedCard>

          <!-- Vision Card -->
          <EnhancedCard class="group p-6 lg:p-10">
            <div class="space-y-6">
              <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors duration-500">
                <UIcon name="i-lucide-eye" class="w-7 h-7 text-primary-600 dark:text-primary-400" />
              </div>

              <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                Nossa Visão
              </h3>

              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                Recusamos o conforto da média. Para nós, a mediocridade não é apenas um padrão a evitar, mas um obstáculo ao progresso. Perseguimos um horizonte de excelência absoluta, buscando evocar não apenas satisfação, mas um profundo senso de admiração. Queremos que cada interação desperte a pergunta: "Como vivíamos sem isso antes?", definindo um novo padrão onde o excepcional se torna o essencial.
              </p>
            </div>
          </EnhancedCard>
        </div>
      </UContainer>

      <!-- WHY CHOOSE ROCKET SECTION -->
      <div class="pb-32 max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader 
          title="Por que escolher a Rocket?"
          description="Nossos diferenciais que fazem a diferença"
          centered
        />

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-on-scroll">
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
            class="group relative flex flex-col items-center text-center space-y-4 p-6 transition-transform duration-500 hover:-translate-y-2"
          >
            <div class="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-2 shadow-lg shadow-black/50 group-hover:shadow-primary-500/20 group-hover:border-primary-500/30 transition-all duration-500">
              <!-- Rotating Glow behind icon -->
              <div class="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              
              <UIcon :name="item.icon" class="w-8 h-8 text-primary-500 relative z-10 transform group-hover:scale-110 transition-transform duration-500" />
            </div>
            
            <h3 class="relative z-10 text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
              {{ item.title }}
            </h3>

            <p class="relative z-10 text-gray-500 text-sm leading-relaxed max-w-sm group-hover:text-gray-300 transition-colors duration-300">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- TECH STACK MARQUEE -->
      <div class="pb-32 overflow-hidden relative">
        <SectionHeader 
          title="Tecnologias que Dominamos"
          description="Stack de ponta para resultados extraordinários"
          centered
          class="max-w-7xl mx-auto px-6"
        />

        <div class="relative flex overflow-x-hidden group reveal-on-scroll">
          <!-- Gradient Masks -->
          <div class="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#050505] to-transparent"></div>
          <div class="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#050505] to-transparent"></div>

          <div class="py-12 animate-marquee whitespace-nowrap flex gap-16">
            <!-- Duplicate array for infinite loop -->
            <div v-for="tech in [...techStack, ...techStack]" :key="tech.name + Math.random()" class="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-default">
              <UIcon :name="tech.icon" class="w-10 h-10 grayscale hover:grayscale-0 transition-all duration-300" />
              <span class="text-2xl font-bold opacity-50">{{ tech.name }}</span>
            </div>
          </div>
          
          <div class="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex gap-16">
            <div v-for="tech in [...techStack, ...techStack]" :key="tech.name + Math.random() + 'dup'" class="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-default">
              <UIcon :name="tech.icon" class="w-10 h-10 grayscale hover:grayscale-0 transition-all duration-300" />
              <span class="text-2xl font-bold opacity-50">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA SECTION -->
      <UContainer class="pb-24">
        <BaseCtaSection
          title="Pronto para transformar seu futuro?"
          description="Entre em contato com nossos especialistas e descubra como o ecossistema Rocket pode acelerar seus resultados."
          button-label="Falar com Consultor"
          button-to="/contact"
          :show-secondary-button="true"
          secondary-label="Explorar Serviços"
          secondary-to="/servicos"
          class="reveal-on-scroll"
        />
      </UContainer>

    </main>

    <AppFooter />

  </div>

</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
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
.grid-pattern {
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  opacity: 1;
  pointer-events: none;
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
  box-shadow: 0 0 20px rgba(202, 0, 13, 0.4);
  transition: all 0.3s ease;
}
.glow-button:hover {
  box-shadow: 0 0 35px rgba(202, 0, 13, 0.7);
  transform: scale(1.02);
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

/* === MARQUEE ANIMATION === */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}

@keyframes marquee2 {
  0% { transform: translateX(100%); }
  100% { transform: translateX(0%); }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}

.animate-marquee2 {
  animation: marquee2 40s linear infinite;
}
</style>
