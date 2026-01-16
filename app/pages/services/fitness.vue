<script setup lang="ts">
import FitnessPeopleSection from '~/components/fitness/FitnessPeopleSection.vue';
import FitnessGymsSection from '~/components/fitness/FitnessGymsSection.vue';

// --- FAQ Data ---
const faqItems = [
  {
    label: 'O que é o Rocket Fitness?',
    content: 'O Rocket Fitness é o app fitness mais completo do mercado. Oferecemos treinos personalizados com IA, retrospectivas de desempenho, monitoramento de sono, acompanhamento de saúde mental, gamificação com níveis e medalhas, e uma rede social exclusiva para atletas.',
  },
  {
    label: 'O app é gratuito?',
    content: 'Sim! O Rocket Fitness tem uma versão gratuita com funcionalidades básicas. Para acessar recursos premium como retrospectivas detalhadas, gamificação completa e Rocket Watch, oferecemos planos a partir de R$ 9,90/mês.',
  },
  {
    label: 'Como funciona a rede social do app?',
    content: 'Você pode seguir amigos, compartilhar seus treinos, enviar desafios, conversar por chat, e assistir vídeos no Rocket Watch - nossa plataforma de conteúdo estilo Reels focada em fitness.',
  },
  {
    label: 'Sou dono de academia. O Rocket Fitness serve para mim?',
    content: 'Sim! Oferecemos soluções B2B completas: app exclusivo com sua marca, CRM inteligente, gestão de planos, check-in por QR Code, integração com catracas, e gamificação para aumentar a retenção dos seus alunos.',
  },
  {
    label: 'Posso monitorar meu sono e saúde mental?',
    content: 'Sim! O app integra com smartwatches para monitorar a qualidade do sono e oferece recursos de mindfulness e acompanhamento emocional para uma abordagem holística da sua saúde.',
  },
  {
    label: 'Vocês oferecem período de teste?',
    content: 'Sim! Oferecemos 14 dias grátis de todas as funcionalidades premium. Sem necessidade de cartão de crédito para começar.',
  }
];

// --- Active Niche (pessoas or academias) ---
const activeNiche = ref<'pessoas' | 'academias'>('pessoas');

// --- Scroll to sections ---
const pessoasSection = ref<HTMLElement | null>(null);
const academiasSection = ref<HTMLElement | null>(null);

const scrollToNiche = (niche: 'pessoas' | 'academias') => {
  activeNiche.value = niche;
  if (niche === 'pessoas') {
    pessoasSection.value?.scrollIntoView({ behavior: 'smooth' });
  } else {
    academiasSection.value?.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- Scroll Animation (SSR-Friendly) ---
const { setupScrollAnimation } = useScrollReveal();

// --- Scroll to Pricing ---
// Improved logic: Scroll to the section corresponding to the active niche
const scrollToPricing = () => {
  if (activeNiche.value === 'pessoas') {
    pessoasSection.value?.scrollIntoView({ behavior: 'smooth' });
  } else {
    academiasSection.value?.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  setupScrollAnimation();
});

useAppSeo({
  title: 'Rocket Fitness',
  description: 'O app fitness completo: treinos, retrospectivas, sono, saúde mental, gamificação e rede social. Também para academias.',
  image: '/og-fitness.png',
  breadcrumbs: [
      { name: 'Home', url: 'https://rocketweb.tech' },
      { name: 'Serviços', url: 'https://rocketweb.tech/servicos' },
      { name: 'Rocket Fitness', url: 'https://rocketweb.tech/services/fitness' }
  ]
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
    <main class="flex-grow relative z-10">
      
      <!-- HERO SECTION -->
      <div class="relative isolate pt-12 lg:pt-16 hero-glow min-h-screen flex items-center">
        <!-- Background Floating Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="floating-element" style="width: 400px; height: 400px; top: 10%; left: -10%;"></div>
          <div class="floating-element" style="width: 300px; height: 300px; bottom: 20%; right: -5%; animation-delay: -5s;"></div>
        </div>

        <div class="mx-auto max-w-7xl px-6 lg:px-8 py-20 relative z-10 text-center lg:text-left lg:flex lg:items-center lg:gap-16">
          <!-- Left Column - Text -->
          <div class="lg:w-1/2 reveal-on-scroll">
            <div class="inline-flex items-center gap-2 rounded-full bg-[#ca000d]/10 px-3 py-1 text-sm font-semibold text-[#ca000d] ring-1 ring-inset ring-[#ca000d]/20 mb-6">
              <span class="animate-pulse">●</span> Rocket Fitness 2.0
            </div>
            <h1 class="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6">
              Seu treino, <br/>
              <span class="text-gradient">sua evolução.</span>
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-400">
              O app fitness mais completo: treinos inteligentes, retrospectivas de desempenho, monitoramento de sono, saúde mental, gamificação e rede social. Para pessoas e academias.
            </p>
            
            <!-- Main CTAs -->
            <div class="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <UButton 
                size="xl" 
                label="Baixar o App" 
                color="primary" 
                class="glow-button text-white w-full sm:w-auto justify-center font-bold px-10 py-4 text-lg shadow-xl shadow-[#ca000d]/20 ring-1 ring-white/10" 
                icon="i-lucide-download"
                trailing
                to="/contact" 
              />
              <UButton 
                size="xl" 
                label="Ver Planos" 
                variant="ghost" 
                color="white" 
                icon="i-lucide-arrow-right"
                trailing
                class="w-full sm:w-auto text-white justify-center font-bold px-10 py-4 text-lg hover:bg-white/10 transition-all"
                @click="scrollToPricing" 
              />
            </div>

            <!-- Niche Selector (Segmented Control) -->
            <div class="mt-12 flex flex-col items-center lg:items-start gap-3">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] pl-1">Selecione seu perfil</span>
              <div class="p-1 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex relative w-full max-w-md sm:w-auto">
                <button 
                  @click="scrollToNiche('pessoas')"
                  class="flex-1 sm:flex-none sm:w-40 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 relative z-10"
                  :class="activeNiche === 'pessoas' ? 'bg-[#ca000d] text-white shadow-lg shadow-[#ca000d]/25' : 'text-gray-400 hover:text-white hover:bg-white/5'"
                >
                  <UIcon name="i-lucide-user" class="w-4 h-4" />
                  Para Pessoas
                </button>
                <button 
                  @click="scrollToNiche('academias')"
                  class="flex-1 sm:flex-none sm:w-44 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 relative z-10"
                  :class="activeNiche === 'academias' ? 'bg-[#ca000d] text-white shadow-lg shadow-[#ca000d]/25' : 'text-gray-400 hover:text-white hover:bg-white/5'"
                >
                  <UIcon name="i-lucide-building-2" class="w-4 h-4" />
                  Para Academias
                </button>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="mt-10 grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
              <div>
                <div class="text-2xl font-bold text-white">2M+</div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">Usuários</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-white">10M+</div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">Treinos</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-white">500+</div>
                <div class="text-xs text-gray-500 uppercase tracking-wide">Academias</div>
              </div>
            </div>
          </div>

          <!-- Right Column - Floating Card -->
          <div class="lg:w-1/2 mt-16 lg:mt-0 relative reveal-on-scroll" style="transition-delay: 200ms;">
            <div class="relative enhanced-card rounded-2xl p-4 border-[#ca000d]/30 animate-float-slow">
              <div class="bg-neutral-900 rounded-xl overflow-hidden aspect-[4/3] relative border border-white/5">
                <div class="absolute inset-0 bg-gradient-to-tr from-[#ca000d]/20 to-transparent opacity-50"></div>
                <div class="p-6 space-y-4">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                      <div class="h-10 w-10 bg-gradient-to-br from-[#ca000d] to-[#ff4444] rounded-full flex items-center justify-center text-white font-bold">R</div>
                      <div>
                        <div class="text-white font-bold text-sm">Rocket Fitness</div>
                        <div class="text-xs text-gray-500">Nível 12 · 🔥 Streak 7 dias</div>
                      </div>
                    </div>
                    <div class="flex gap-1">
                      <span class="text-xl">🥇</span>
                      <span class="text-xl">🏆</span>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mt-4">
                    <div class="h-24 bg-black/50 rounded-lg border border-white/10 p-3 relative overflow-hidden">
                      <div class="text-gray-400 text-xs">Calorias Hoje</div>
                      <div class="text-2xl font-bold text-white mt-1">840 <span class="text-[#ca000d] text-sm">kcal</span></div>
                      <UIcon name="i-lucide-flame" class="absolute bottom-2 right-2 text-[#ca000d]/20 w-8 h-8" />
                    </div>
                    <div class="h-24 bg-black/50 rounded-lg border border-white/10 p-3 relative overflow-hidden">
                      <div class="text-gray-400 text-xs">Treinos Semana</div>
                      <div class="text-2xl font-bold text-white mt-1">5 <span class="text-green-500 text-sm">↑</span></div>
                      <UIcon name="i-lucide-dumbbell" class="absolute bottom-2 right-2 text-gray-700/50 w-8 h-8" />
                    </div>
                  </div>
                  <div class="h-24 bg-black/50 rounded-lg border border-white/10 flex items-end justify-between p-4 gap-2">
                    <div class="w-full bg-[#ca000d]/20 h-[40%] rounded-t"></div>
                    <div class="w-full bg-[#ca000d]/20 h-[70%] rounded-t"></div>
                    <div class="w-full bg-[#ca000d]/20 h-[50%] rounded-t"></div>
                    <div class="w-full bg-[#ca000d] h-[90%] rounded-t shadow-[0_0_15px_rgba(202,0,13,0.5)]"></div>
                    <div class="w-full bg-[#ca000d]/20 h-[60%] rounded-t"></div>
                    <div class="w-full bg-[#ca000d]/30 h-[75%] rounded-t"></div>
                    <div class="w-full bg-[#ca000d]/40 h-[85%] rounded-t"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Floating Badge -->
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:-left-6 enhanced-card p-4 rounded-xl flex items-center gap-3 animate-float-alt bg-black/90 border border-[#ca000d]/20 w-max max-w-[90vw]">
              <div class="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                <UIcon name="i-lucide-trophy" class="w-5 h-5" />
              </div>
              <div>
                <div class="text-sm font-bold">Nível 12 Alcançado!</div>
                <div class="text-xs text-gray-400">+500 XP conquistados</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTIONS (Separated) -->
      <div ref="pessoasSection" id="para-pessoas">
        <FitnessPeopleSection />
      </div>

      <div ref="academiasSection" id="para-academias">
        <FitnessGymsSection />
      </div>

      <!-- FAQ SECTION -->
      <section class="py-24">
        <UContainer class="max-w-4xl">
          <FaqSection 
            :items="faqItems" 
            description="Tudo o que você precisa saber sobre o Rocket Fitness." 
          />
        </UContainer>
      </section>

      <!-- CTA SECTION -->
      <BaseCtaSection
        title="Comece sua evolução hoje."
        description="Junte-se a mais de 2 milhões de pessoas que transformaram seus treinos, monitoram seu progresso e fazem parte da maior comunidade fitness do país."
        button-label="Baixar App Grátis"
        button-to="/contact"
        class="reveal-on-scroll"
      />

    </main>

    <!-- FOOTER -->
    <AppFooter />

  </div>
</template>

<style scoped>
/* === PAGE-SPECIFIC STYLES === */
/* All common styles (grid-pattern, text-gradient, glow-button, enhanced-card,
   floating-element, hero-glow, animations, etc.) are now in main.css */

/* No page-specific styles needed */
</style>
