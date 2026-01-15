<script setup lang="ts">
// Menu logic handled by AppHeader


// --- SEO Metadata ---
// --- SEO Metadata ---
useAppSeo({
  title: 'Sobre Nós',
  description: 'Conheça a Rocket: Nossa história, valores e a missão de transformar o futuro digital com design e tecnologia de ponta.',
  image: '/og-about.jpg'
});

// Timeline Data
const timelineData = [
  {
    year: '2020',
    title: 'A Inquietação',
    description: 'Em meio à complexidade de sistemas obsoletos, nasceu o questionamento. Duas mentes perceberam que a tecnologia deveria servir ao humano, e não o contrário.',
    ping: false
  },
  {
    year: '2021',
    title: 'A Gênese',
    description: 'Em um quarto modesto, uma visão ambiciosa tomou forma. O desejo de democratizar a excelência tecnológica e tornar o complexo invisível e acessível.',
    ping: false
  },
  {
    year: '2022',
    title: 'A Incubadora',
    description: 'O ano da concepção. Ideias abstratas começaram a se solidificar em produtos tangíveis, desenhando o futuro de nossas soluções.',
    ping: false
  },
  {
    year: '2023',
    title: 'A Materialização',
    description: 'A teoria cedeu lugar à prática. Nosso conhecimento foi forjado no fogo da execução, transformando competência em resultados reais.',
    ping: false
  },
  {
    year: '2024',
    title: 'Maturidade',
    description: 'Atingimos a plenitude operacional. Nossos serviços evoluíram para um estado de arte, onde a qualidade não é diferencial, é premissa.',
    ping: false
  },
  {
    year: '2025',
    title: 'Disrupção',
    description: 'Rompemos com o convencional. Não apenas jogamos o jogo, reescrevemos as regras, desafiando os limites do que a tecnologia pode realizar.',
    ping: false
  },
  {
    year: '2026',
    title: 'O Legado',
    description: 'O mundo transformado para sempre. Não somos apenas observadores do futuro, somos seus arquitetos finais. A excelência como padrão global.',
    ping: true
  }
];


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

    <AppHeader />

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
                        to="/contact"
                        color="primary"
                        class="text-white w-full sm:w-auto justify-center"
                    />
                    <UButton
                        size="xl"
                        label="Nossa Trajetória"
                        variant="ghost"
                        color="neutral"
                        class="text-white hover:bg-transparent w-full sm:w-auto justify-center group"
                        @click="scrollToTrajectory"
                    >
                        <template #trailing>
                            <UIcon name="i-lucide-arrow-right" class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                        </template>
                    </UButton>
                </div>
            </div>
        </UContainer>

        <AboutStats />


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

        <AboutTeam />



        <!-- CTA Section -->
        <UContainer>
          <BaseCtaSection
            title="Sua Próxima Missão Começa Aqui."
            description="Estamos buscando os inconformados. Se você quer construir o que vem a seguir, junte-se à tripulação."
            button-label="Ver Vagas Abertas"
            button-to="/contact"
          />
        </UContainer>

    </main>

    <!-- Global Footer -->
    <AppFooter />


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
