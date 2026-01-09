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

// --- Solution Cards Data ---
const solutions = [
  {
    icon: 'i-lucide-smartphone',
    title: 'White Label App',
    description: 'Tenha seu próprio aplicativo na Apple Store e Google Play. Personalizado com sua marca, cores e identidade visual.',
    featured: false
  },
  {
    icon: 'i-lucide-users',
    title: 'Gestão Administrativa',
    description: 'CRM completo, controle financeiro, gestão de planos recorrentes e catracas com reconhecimento facial.',
    featured: false
  },
  {
    icon: 'i-lucide-heart-pulse',
    title: 'Integração Wearable',
    description: 'Sincronize dados de Apple Watch, Garmin e Polar. Monitore a frequência cardíaca dos alunos em tempo real.',
    featured: false
  },
  {
    icon: 'i-lucide-video',
    title: 'Rocket Live & VOD',
    description: 'Plataforma de streaming integrada para aulas ao vivo e gravadas. Monetize conteúdo híbrido.',
    featured: false
  },
  {
    icon: 'i-lucide-bot',
    title: 'Smart Coach AI',
    description: 'Inteligência artificial que sugere progressão de cargas e adaptações de treino baseadas no histórico.',
    featured: false
  },
  {
    icon: 'i-lucide-trophy',
    title: 'Gamificação',
    description: 'Ranking, níveis, medalhas e desafios sociais. Aumente a retenção criando uma comunidade competitiva.',
    featured: true
  }
];

// --- Particles for background ---
const particles = ref<{ left: string; size: string; delay: string; duration: string }[]>([]);

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

// --- Bento Effects ---
const setupBentoEffects = () => {
  document.querySelectorAll('.bento-card').forEach(card => {
    (card as HTMLElement).onmousemove = (e: MouseEvent) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    };
  });
};

onMounted(() => {
  // Generate particles
  for (let i = 0; i < 15; i++) {
    particles.value.push({
      left: Math.random() * 100 + '%',
      size: Math.random() * 3 + 1 + 'px',
      delay: Math.random() * 5 + 's',
      duration: Math.random() * 10 + 10 + 's'
    });
  }
  
  // Setup animations
  setupScrollAnimation();
  setupBentoEffects();
});

useHead({
  title: 'Rocket Fitness - Soluções Digitais para Academias'
});
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#ca000d] selection:text-white relative flex flex-col">
    
    <!-- Background Particles -->
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
    <main class="flex-grow relative z-10">
      
      <!-- HERO SECTION -->
      <div class="relative isolate pt-12 lg:pt-16 hero-glow min-h-screen flex items-center">
        <!-- Background Floating Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="floating-element" style="width: 400px; height: 400px; top: 10%; left: -10%;"></div>
          <div class="floating-element" style="width: 300px; height: 300px; bottom: 20%; right: -5%; animation-delay: -5s;"></div>
          <div class="grid-pattern"></div>
        </div>

        <div class="mx-auto max-w-7xl px-6 lg:px-8 py-20 relative z-10 text-center lg:text-left lg:flex lg:items-center lg:gap-16">
          <!-- Left Column - Text -->
          <div class="lg:w-1/2">
            <div class="inline-flex items-center gap-2 rounded-full bg-[#ca000d]/10 px-3 py-1 text-sm font-semibold text-[#ca000d] ring-1 ring-inset ring-[#ca000d]/20 mb-6">
              <span class="animate-pulse">●</span> Novo Rocket System 2.0
            </div>
            <h1 class="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6">
              Sua academia <br/>
              <span class="text-gradient-red">conectada ao futuro.</span>
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-400">
              Plataformas digitais de alta performance para academias, boxes de Crossfit e personal trainers. Transforme suor em dados e dados em resultados.
            </p>
            <div class="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <UButton size="lg" label="Agendar Demo Gratuita" color="primary" class="glow-button text-white" to="/contact" />
              <UButton size="lg" label="Ver recursos" variant="link" color="neutral" icon="i-lucide-arrow-right" trailing to="#solucoes" class="text-white hover:no-underline" />
            </div>

            <!-- Stats Grid -->
            <div class="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              <div>
                <div class="text-2xl font-bold text-white">500+</div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">Academias</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-white">1M+</div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">Treinos/Mês</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-white">98%</div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">Retenção</div>
              </div>
            </div>
          </div>

          <!-- Right Column - Floating Card -->
          <div class="lg:w-1/2 mt-16 lg:mt-0 relative">
            <div class="relative enhanced-card rounded-2xl p-4 border-[#ca000d]/30 animate-float-slow">
              <div class="bg-neutral-900 rounded-xl overflow-hidden aspect-[4/3] relative border border-white/5">
                <div class="absolute inset-0 bg-gradient-to-tr from-[#ca000d]/20 to-transparent opacity-50"></div>
                <div class="p-6 space-y-4">
                  <div class="flex justify-between items-center">
                    <div class="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
                    <div class="h-8 w-8 bg-[#ca000d] rounded-full flex items-center justify-center text-white">
                      <UIcon name="i-lucide-user" class="w-4 h-4" />
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mt-8">
                    <div class="h-24 bg-black/50 rounded-lg border border-white/10 p-3 relative overflow-hidden">
                      <div class="text-gray-400 text-xs">Calorias</div>
                      <div class="text-2xl font-bold text-white mt-1">840 <span class="text-[#ca000d] text-sm">kcal</span></div>
                      <UIcon name="i-lucide-flame" class="absolute bottom-2 right-2 text-[#ca000d]/20 w-8 h-8" />
                    </div>
                    <div class="h-24 bg-black/50 rounded-lg border border-white/10 p-3 relative overflow-hidden">
                      <div class="text-gray-400 text-xs">Treinos</div>
                      <div class="text-2xl font-bold text-white mt-1">12 <span class="text-green-500 text-sm">↑</span></div>
                      <UIcon name="i-lucide-dumbbell" class="absolute bottom-2 right-2 text-gray-700/50 w-8 h-8" />
                    </div>
                  </div>
                  <div class="h-32 bg-black/50 rounded-lg border border-white/10 mt-4 flex items-end justify-between p-4 gap-2">
                    <div class="w-full bg-[#ca000d]/20 h-[40%] rounded-t"></div>
                    <div class="w-full bg-[#ca000d]/20 h-[70%] rounded-t"></div>
                    <div class="w-full bg-[#ca000d]/20 h-[50%] rounded-t"></div>
                    <div class="w-full bg-[#ca000d] h-[90%] rounded-t shadow-[0_0_15px_rgba(202,0,13,0.5)]"></div>
                    <div class="w-full bg-[#ca000d]/20 h-[60%] rounded-t"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Floating Badge -->
            <div class="absolute -bottom-10 -left-10 enhanced-card p-4 rounded-xl flex items-center gap-3 animate-float-alt bg-black/80">
              <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <UIcon name="i-lucide-check" class="w-5 h-5" />
              </div>
              <div>
                <div class="text-sm font-bold">Meta Batida</div>
                <div class="text-xs text-gray-400">Série Concluída</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SOLUTIONS SECTION -->
      <section id="solucoes" class="py-24 relative">
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ca000d]/50 to-transparent"></div>

        <UContainer>
          <div class="mx-auto max-w-2xl text-center mb-16">
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Soluções <span class="text-[#ca000d]">Completas</span>
            </h2>
            <p class="text-gray-400">
              Ferramentas integradas para cobrir cada aspecto do seu negócio fitness, desde a recepção até o aplicativo no bolso do aluno.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="(solution, index) in solutions" 
              :key="index" 
              class="enhanced-card rounded-2xl p-8 group cursor-pointer"
              :class="{ 'border-[#ca000d]/30 relative overflow-hidden': solution.featured }"
            >
              <div v-if="solution.featured" class="absolute top-0 right-0 bg-[#ca000d] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Destaque</div>
              <div class="w-14 h-14 rounded-xl bg-[#ca000d]/10 flex items-center justify-center mb-6 group-hover:bg-[#ca000d] transition-colors duration-300">
                <UIcon :name="solution.icon" class="w-7 h-7 text-[#ca000d] group-hover:text-white transition-colors" />
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ solution.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">{{ solution.description }}</p>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- ECOSYSTEM / BENTO GRID SECTION -->
      <section class="py-24 relative bg-[#0a0a0a]">
        <UContainer>
          <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 reveal-on-scroll">
            <div>
              <h2 class="text-3xl md:text-5xl font-bold mb-4 text-white">Ecossistema <br>Integrado</h2>
              <p class="text-gray-400 max-w-md">Uma visão profunda de como nossos módulos se conectam para maximizar resultados.</p>
            </div>
            <UButton variant="link" color="neutral" label="Explorar todas as features" icon="i-lucide-arrow-right" trailing class="text-white hover:text-[#ca000d] hover:no-underline" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-4 h-auto lg:h-[600px] reveal-on-scroll">
            
            <!-- Large Card - 2x2 -->
            <div class="bento-card md:col-span-2 lg:col-span-2 row-span-2 rounded-3xl p-8 flex flex-col justify-between group">
              <div>
                <div class="w-12 h-12 bg-[#ca000d]/20 text-[#ca000d] rounded-xl flex items-center justify-center text-xl mb-6">
                  <UIcon name="i-lucide-dumbbell" class="w-6 h-6" />
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">Experiência do Aluno</h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  Ofereça treinos em vídeo, check-in por QR Code e gamificação. Aumente a retenção oferecendo uma experiência digital premium que leva sua marca no bolso do aluno.
                </p>
              </div>
              <div class="mt-8 relative h-48 bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt="App Preview">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white font-mono text-xs flex gap-2">
                  <span class="bg-[#ca000d] px-2 py-1 rounded">iOS</span>
                  <span class="bg-white/10 px-2 py-1 rounded">Android</span>
                </div>
              </div>
            </div>

            <!-- Medium Card - Financeiro -->
            <div class="bento-card md:col-span-1 rounded-3xl p-6 flex flex-col justify-center">
              <UIcon name="i-lucide-file-text" class="w-8 h-8 text-[#ca000d] mb-4" />
              <h3 class="text-lg font-bold text-white mb-2">Financeiro</h3>
              <p class="text-gray-400 text-xs">Recorrência automática e emissão de NFe simplificada.</p>
            </div>

            <!-- Medium Card - CRM with glow -->
            <div class="bento-card md:col-span-1 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden">
              <div class="absolute -right-4 -top-4 w-24 h-24 bg-[#ca000d]/20 blur-xl rounded-full"></div>
              <UIcon name="i-lucide-pie-chart" class="w-8 h-8 text-white mb-4" />
              <h3 class="text-lg font-bold text-white mb-2">CRM</h3>
              <p class="text-gray-400 text-xs">Automação de mensagens para recuperação de inativos.</p>
            </div>

            <!-- Horizontal Card - Acesso Biométrico -->
            <div class="bento-card md:col-span-2 rounded-3xl p-6 flex items-center justify-between gap-6">
              <div class="max-w-[60%]">
                <h3 class="text-xl font-bold text-white mb-2">Acesso Biométrico</h3>
                <p class="text-gray-400 text-sm">Integração nativa com catracas e reconhecimento facial.</p>
              </div>
              <div class="w-16 h-16 rounded-full border-2 border-[#ca000d] border-dashed animate-spin-slow flex items-center justify-center">
                <UIcon name="i-lucide-fingerprint" class="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- TRAINING SECTION -->
      <section class="py-24 bg-black relative overflow-hidden">
        <div class="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#ca000d]/5 to-transparent pointer-events-none"></div>
        <UContainer class="flex flex-col lg:flex-row items-center gap-16">
          <div class="lg:w-1/2">
            <h2 class="text-3xl font-bold text-white mb-6">Treinos prescritos na velocidade da luz.</h2>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="flex-none w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                  <UIcon name="i-lucide-zap" class="w-5 h-5 text-[#ca000d]" />
                </div>
                <div>
                  <h4 class="font-bold text-white">Montagem Rápida</h4>
                  <p class="text-gray-400 text-sm mt-1">Biblioteca com +2000 exercícios em vídeo 4K.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex-none w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                  <UIcon name="i-lucide-pie-chart" class="w-5 h-5 text-[#ca000d]" />
                </div>
                <div>
                  <h4 class="font-bold text-white">Anamnese Digital</h4>
                  <p class="text-gray-400 text-sm mt-1">Avaliação física integrada que gera gráficos.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:w-1/2 w-full">
            <div class="enhanced-card p-2 rounded-3xl border border-gray-800 bg-gray-900/50">
              <div class="grid grid-cols-2 gap-2">
                <div class="bg-black p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=100&h=100" class="w-12 h-12 rounded-full object-cover border-2 border-[#ca000d]" alt="User">
                  <div>
                    <div class="text-white font-bold text-sm">Sarah C.</div>
                    <div class="text-xs text-green-400">Treinando</div>
                  </div>
                </div>
                <div class="bg-black p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100" class="w-12 h-12 rounded-full object-cover" alt="User">
                  <div>
                    <div class="text-white font-bold text-sm">Pedro A.</div>
                    <div class="text-xs text-gray-500">Ausente</div>
                  </div>
                </div>
                <div class="col-span-2 bg-[#ca000d]/10 p-4 rounded-2xl border border-[#ca000d]/30 flex justify-between items-center">
                  <div>
                    <div class="text-xs text-[#ca000d] font-bold uppercase">Retenção Mensal</div>
                    <div class="text-2xl font-bold text-white">94.5%</div>
                  </div>
                  <div class="h-10 w-24 flex items-end gap-1">
                    <div class="w-full bg-[#ca000d]/50 h-[40%] rounded-sm"></div>
                    <div class="w-full bg-[#ca000d]/50 h-[60%] rounded-sm"></div>
                    <div class="w-full bg-[#ca000d]/50 h-[50%] rounded-sm"></div>
                    <div class="w-full bg-[#ca000d] h-[80%] rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- CTA SECTION -->
      <section class="relative isolate py-24 bg-gradient-to-b from-black to-[#ca000d]/10">
        <UContainer class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Comece a transformação hoje.
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Junte-se a mais de 500 academias que modernizaram sua gestão e experiência do aluno com a Rocket Fitness.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <UButton size="lg" label="Falar com Consultor" color="neutral" variant="solid" class="glow-button bg-white text-[#ca000d] font-bold hover:bg-gray-200" to="/contact" />
            <UButton size="lg" label="Ver planos e preços" variant="link" color="neutral" icon="i-lucide-arrow-right" trailing class="text-white hover:text-[#ca000d] hover:no-underline" />
          </div>
        </UContainer>
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
                        <li><NuxtLink to="/services/cloud" class="hover:text-red-500 transition-colors">Cloud Computing</NuxtLink></li>
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
/* === PARTICLES ANIMATION === */
.particle {
  position: fixed;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: floatUp linear infinite;
}

@keyframes floatUp {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  20% { opacity: 0.5; }
  80% { opacity: 0.5; }
  100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
}

/* === FLOATING ELEMENTS === */
.floating-element {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(202, 0, 13, 0.15), rgba(255, 68, 68, 0.05));
  animation: float-slow 20s ease-in-out infinite;
  filter: blur(40px);
  z-index: 0;
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  25% { transform: translateY(-30px) translateX(20px) rotate(5deg); }
  50% { transform: translateY(20px) translateX(-15px) rotate(-3deg); }
  75% { transform: translateY(-10px) translateX(25px) rotate(7deg); }
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-alt {
  animation: float-slow 8s ease-in-out infinite;
}

/* === HERO GLOW === */
.hero-glow {
  background: radial-gradient(circle at center, rgba(202, 0, 13, 0.15) 0%, transparent 70%);
}

/* === GRID PATTERN === */
.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  background-image: 
    linear-gradient(rgba(202, 0, 13, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(202, 0, 13, 0.3) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: -1;
}

/* === ENHANCED CARD === */
.enhanced-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(202, 0, 13, 0.02) 50%, rgba(255, 255, 255, 0.01) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.enhanced-card:hover {
  transform: translateY(-10px) scale(1.01);
  box-shadow: 0 20px 50px rgba(202, 0, 13, 0.15);
  border-color: rgba(202, 0, 13, 0.4);
}

/* === BENTO CARD === */
.bento-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;
}

.bento-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(202, 0, 13, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
}

/* === GLOW BUTTON === */
.glow-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.glow-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.glow-button:hover::before {
  left: 100%;
}

.glow-button:hover {
  box-shadow: 0 0 20px rgba(202, 0, 13, 0.6);
}

/* === TEXT GRADIENT === */
.text-gradient-red {
  background: linear-gradient(to right, #ca000d, #ff4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* === REVEAL ON SCROLL === */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* === SPIN SLOW === */
.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
