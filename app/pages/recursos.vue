<script setup lang="ts">
// Menu logic handled by AppHeader

// --- Scroll Animation (same as servicos.vue) ---
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
  setupScrollAnimation();
});

// --- Affiliate Benefits Data ---
const affiliateBenefits = [
  {
    title: 'Comissão de 80%',
    description: 'Receba a maior fatia do mercado em cada mensalidade paga pelo seu indicado.',
    icon: 'i-lucide-circle-dollar-sign'
  },
  {
    title: 'Cookie de 90 Dias',
    description: 'Seu indicado clicou hoje mas comprou mês que vem? A comissão é sua.',
    icon: 'i-lucide-clock'
  },
  {
    title: 'Dashboard Pro',
    description: 'Métricas em tempo real, mapas de calor e relatórios de conversão.',
    icon: 'i-lucide-bar-chart-3'
  }
];

// --- How It Works Steps ---
const steps = [
  {
    number: 1,
    title: 'Cadastro Gratuito',
    description: 'Preencha o formulário em menos de 2 minutos. Aprovação imediata para perfis qualificados.',
    active: true
  },
  {
    number: 2,
    title: 'Pegue seu Link',
    description: 'Acesse materiais de marketing prontos e use seu link exclusivo de rastreamento.',
    active: false
  },
  {
    number: 3,
    title: 'Receba Pix/Transferência',
    description: 'Acompanhe as vendas e saque seus 80% assim que o pagamento for confirmado.',
    active: false
  }
];

// --- Revenue Simulator ---
const userCount = ref(50);
const ticketPrice = 150;
const commission = 0.80;

const calculatedRevenue = computed(() => {
  return (userCount.value * ticketPrice * commission).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  });
});

// --- New Sections Data ---
const targetAudience = [
  {
    title: 'Influenciadores Tech',
    description: 'Monetize sua audiência fiel indicando produtos que resolvem problemas reais.',
    icon: 'i-lucide-smartphone',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10'
  },
  {
    title: 'Software Houses',
    description: 'Amplie seu portfólio oferecendo nossa infraestrutura como White Label ou parceria.',
    icon: 'i-lucide-code-2',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Consultores de TI',
    description: 'Agregue valor à sua consultoria com soluções enterprise prontas para uso.',
    icon: 'i-lucide-briefcase',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10'
  },
  {
    title: 'Agências Digitais',
    description: 'Ofereça performance web e apps de alta conversão para seus clientes.',
    icon: 'i-lucide-rocket',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  }
];

const platformTools = [
  {
    title: 'Marketing Kit',
    description: 'Banners, copys e vídeos de alta conversão prontos para uso.',
    icon: 'i-lucide-palette'
  },
  {
    title: 'Link Builder',
    description: 'Crie links profundos para qualquer página e rastreie a origem.',
    icon: 'i-lucide-link'
  },
  {
    title: 'Real-time Analytics',
    description: 'Acompanhe cliques, leads e conversões ao vivo no seu dashboard.',
    icon: 'i-lucide-activity'
  },
  {
    title: 'Gerente Dedicado',
    description: 'Suporte estratégico via WhatsApp para Top Afiliados.',
    icon: 'i-lucide-headset'
  }
];



// --- FAQ Items ---
const faqItems = [
  {
    label: 'Como funciona o pagamento?',
    content: 'Nós processamos os pagamentos automaticamente. Assim que seu indicado paga a mensalidade, 80% do valor é creditado na sua carteira Rocket. Você pode solicitar o saque via PIX ou transferência bancária a qualquer momento (valor mínimo de R$ 100,00).',
    slot: 'item'
  },
  {
    label: 'Preciso pagar para ser afiliado?',
    content: 'Absolutamente não. O programa de parceria da Rocket Enterprise é 100% gratuito. Nós fornecemos todo o material de marketing e links de rastreamento sem custo algum.',
    slot: 'item'
  },
  {
    label: 'Como funciona o rastreamento (Cookies)?',
    content: 'Utilizamos tecnologia de rastreamento "First-Click". Isso significa que se um usuário clicar no seu link, um cookie de 90 dias é instalado. Mesmo que ele feche o navegador e volte semanas depois para comprar, a comissão é sua.',
    slot: 'item'
  }
];

// Scroll Functionality
const benefitsSection = ref<HTMLElement | null>(null);

const scrollToBenefits = () => {
  benefitsSection.value?.scrollIntoView({ behavior: 'smooth' });
};

useAppSeo({
  title: 'Programa de Afiliados',
  description: 'Seja parceiro da Rocket. Indique soluções enterprise e ganhe comissões recorrentes. Programa de afiliados B2B líder de mercado.',
  image: '/og-default.png',
  breadcrumbs: [
      { name: 'Home', url: 'https://rocketweb.tech' },
      { name: 'Afiliados', url: 'https://rocketweb.tech/recursos' }
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
      <!-- Hero Section -->
      <UContainer class="pt-32 lg:pt-52 pb-24 text-center w-full">
        <div class="max-w-2xl mx-auto space-y-6 reveal-on-scroll">
          <h1 class="text-6xl font-extrabold text-white">
            Programa de <span class="text-primary-500">Afiliados</span>
          </h1>
          <p class="text-xl text-gray-400">
            A plataforma de afiliados mais agressiva do mercado. Indique soluções enterprise e construa uma carteira de renda recorrente vitalícia com comissões de até 80%.
          </p>
          <div class="flex justify-center gap-4">
            <UButton
              size="lg"
              label="Começar a Faturar"
              color="primary"
              class="text-white"
              to="/contact"
            />
            <UButton
              size="lg"
              label="Saiba Mais"
              variant="link"
              color="neutral"
              class="text-white hover:no-underline group"
              @click="scrollToBenefits"
            >
              <template #trailing>
                <UIcon name="i-lucide-arrow-right" class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
              </template>
            </UButton>
          </div>
        </div>
      </UContainer>

      <!-- Target Audience Section -->
      <section class="py-24 px-6 md:px-12 reveal-on-scroll" style="transition-delay: 100ms;">
        <UContainer>
          <div class="text-center mb-16">
             <span class="text-primary-500 font-semibold tracking-wider text-sm uppercase mb-3 block">Para quem é?</span>
             <h2 class="text-3xl font-bold text-white">Parceiros Ideais</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(target, i) in targetAudience" :key="i" class="enhanced-card p-6 rounded-2xl hover:-translate-y-1 transition-all duration-500 group">
               <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-500', target.bg, target.color]">
                 <UIcon :name="target.icon" class="w-6 h-6" />
               </div>
               <h3 class="text-lg font-bold text-white mb-2">{{ target.title }}</h3>
               <p class="text-sm text-gray-400 leading-relaxed">{{ target.description }}</p>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- Affiliate Benefits Section -->
      <!-- Affiliate Benefits Section -->
      <section id="beneficios" ref="benefitsSection" class="py-24 px-6 md:px-12 scroll-mt-24 reveal-on-scroll" style="transition-delay: 200ms;">
        <UContainer>
          <div class="text-center mb-16 space-y-4">
            <h2 class="text-4xl font-bold text-white tracking-tight">
              Benefícios <span class="text-primary-500">Exclusivos</span>
            </h2>
            <p class="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              Vantagens que transformam sua indicação em receita real.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              v-for="benefit in affiliateBenefits" 
              :key="benefit.title" 
              class="group relative enhanced-card p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden text-center"
            >
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 z-20 pointer-events-none"></div>
              <div class="relative z-10">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-primary-500/20 transition-all">
                  <UIcon :name="benefit.icon" class="w-7 h-7 text-primary-500" />
                </div>
                <h3 class="text-xl font-bold text-white mb-4">{{ benefit.title }}</h3>
                <p class="text-gray-400 leading-relaxed">{{ benefit.description }}</p>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- Platform Tools Section -->
      <section class="py-24 px-6 relative overflow-hidden reveal-on-scroll" style="transition-delay: 300ms;">
         <!-- Background Glow -->
         <div class="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none"></div>

         <UContainer>
            <div class="flex flex-col lg:flex-row items-center gap-16 relative z-10">
               <div class="lg:w-1/2 space-y-8">
                  <h2 class="text-3xl md:text-4xl font-bold text-white leading-tight">
                    Tudo o que você precisa para <span class="text-primary-500">Vender Mais</span>
                  </h2>
                  <p class="text-gray-400 text-lg">
                    Não te deixamos na mão. Nossa plataforma fornece infraestrutura completa de marketing e dados para você focar apenas em trazer tráfego.
                  </p>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                     <div v-for="(tool, i) in platformTools" :key="i" class="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                        <div class="mt-1 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                           <UIcon :name="tool.icon" class="w-5 h-5 text-gray-300" />
                        </div>
                        <div>
                           <h4 class="text-white font-bold mb-1">{{ tool.title }}</h4>
                           <p class="text-xs text-gray-500 leading-relaxed">{{ tool.description }}</p>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div class="lg:w-1/2 relative">
                  <!-- Abstract Dashboard Visual -->
                  <div class="enhanced-card p-6 rounded-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                     <div class="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                        <div class="space-y-1">
                           <div class="h-2 w-24 bg-white/10 rounded-full"></div>
                           <div class="h-2 w-16 bg-white/5 rounded-full"></div>
                        </div>
                        <div class="h-8 w-8 rounded-full bg-primary-500/20"></div>
                     </div>
                     <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="h-32 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-end">
                            <span class="text-[10px] text-gray-500 mb-1">Clicks</span>
                            <span class="text-2xl font-bold text-white">1,240</span>
                        </div>
                        <div class="h-32 rounded-xl bg-primary-500/10 border border-primary-500/20 p-4 flex flex-col justify-end">
                            <span class="text-[10px] text-gray-500 mb-1">Comissão</span>
                            <span class="text-2xl font-bold text-primary-500">R$ 4.2k</span>
                        </div>
                     </div>
                     <div class="space-y-3">
                        <div class="h-12 w-full bg-white/5 rounded-lg"></div>
                        <div class="h-12 w-full bg-white/5 rounded-lg"></div>
                     </div>
                  </div>
               </div>
            </div>
         </UContainer>
      </section>

      <!-- How It Works Section -->
      <section class="py-24 px-6 relative reveal-on-scroll" style="transition-delay: 400ms;">
        <UContainer>
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-white">Como Iniciar sua Jornada</h2>
            <p class="text-gray-400 mt-2">Três passos simples para começar a lucrar.</p>
          </div>
          
          <div class="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Connection Line (Desktop only) -->
            <div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent z-0"></div>

            <div 
              v-for="step in steps" 
              :key="step.number" 
              class="relative z-10 flex flex-col items-center text-center group"
            >
              <div 
                :class="[
                  'w-24 h-24 rounded-full bg-[#0a0a0a] flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:scale-110',
                  step.active ? 'border-2 border-primary-500 shadow-primary-500/30' : 'border-2 border-white/20 group-hover:border-primary-500/50'
                ]"
              >
                <span class="text-3xl font-bold text-white">{{ step.number }}</span>
              </div>
              <h3 class="text-xl font-semibold text-white mb-3">{{ step.title }}</h3>
              <p class="text-gray-500 px-4">{{ step.description }}</p>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- Testimonials Section -->


      <!-- Revenue Simulator Section -->
      <section class="py-24 px-6 reveal-on-scroll" style="transition-delay: 500ms;">
        <UContainer class="max-w-5xl">
          <div class="relative bg-[#0a0a0a]/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div class="text-center md:text-left mb-8">
              <h2 class="text-3xl font-bold text-white">Simulador de Receita</h2>
              <p class="text-gray-400">Baseado no plano Enterprise (R$ 150,00/mês)</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div class="space-y-8">
                <div>
                  <div class="flex justify-between mb-4">
                    <span class="text-gray-400 font-semibold uppercase tracking-wider text-sm">Usuários Ativos</span>
                    <span class="text-2xl font-bold text-white">{{ userCount }}</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="500" 
                    step="5" 
                    v-model="userCount"
                    class="slider-rocket w-full"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                    <span class="block text-gray-500 text-xs mb-1">Comissão</span>
                    <span class="text-primary-500 font-bold text-xl">80%</span>
                  </div>
                  <div class="p-4 rounded-lg bg-white/5 border border-white/10">
                    <span class="block text-gray-500 text-xs mb-1">Pagamento</span>
                    <span class="text-white font-bold text-xl">D+1</span>
                  </div>
                </div>
              </div>

              <div class="relative">
                <div class="stats-card bg-black/40 border border-primary-500/40 rounded-xl p-6 sm:p-8 text-center backdrop-blur-xl animate-float">
                  <p class="text-gray-400 text-sm uppercase tracking-wider mb-2">Seu Faturamento Mensal</p>
                  <div class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2">
                    {{ calculatedRevenue }}
                  </div>
                  <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-bold uppercase tracking-wide">
                    <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                    Recorrente
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- FAQ Section -->
      <section class="py-24 px-6">
        <FaqSection 
          :items="faqItems" 
          title="Dúvidas Frequentes"
          description="Respostas para as perguntas mais comuns sobre nosso programa de afiliados."
        />
      </section>

      <!-- Final CTA Section -->
      <section class="py-24 px-6 reveal-on-scroll" style="transition-delay: 700ms;">
        <UContainer>
          <BaseCtaSection
            title="Pronto para a Independência Financeira?"
            description="Não deixe dinheiro na mesa. Cada dia que você espera é um cliente que outro afiliado está convertendo."
            button-label="Cadastrar Agora"
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

/* === New Styles for Recursos === */
.enhanced-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(202, 0, 13, 0.02) 50%, rgba(255, 255, 255, 0.01) 100%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.enhanced-card:hover {
    border-color: rgba(202, 0, 13, 0.4);
    box-shadow: 0 20px 50px rgba(202, 0, 13, 0.1);
}

.stats-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(4px);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    cursor: pointer;
}
.stats-card:hover {
    border-color: rgba(202, 0, 13, 0.3);
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-2px);
}

.input-rocket {
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease-in-out;
    color: white;
}
.input-rocket:focus {
    outline: none;
    border-color: #ca000d;
    background-color: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 0 1px #ca000d;
}

/* Custom Select Arrow */
select.input-rocket {
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
}
select.input-rocket option {
    background-color: #1a1a1a;
    color: white;
}

.glow-button {
    position: relative;
    overflow: hidden;
}
.glow-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s;
}
.glow-button:hover::after {
    transform: translateX(100%);
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

/* Range Slider Styling */
.slider-rocket {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
}
.slider-rocket::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #ca000d;
  cursor: pointer;
  margin-top: -10px;
  box-shadow: 0 0 15px rgba(202, 0, 13, 0.8);
  border: 2px solid #ffffff;
}
.slider-rocket::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
.slider-rocket::-moz-range-thumb {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #ca000d;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(202, 0, 13, 0.8);
  border: 2px solid #ffffff;
}
.slider-rocket::-moz-range-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

/* Text Gradient */
.text-gradient-red {
  background: linear-gradient(to right, #ca000d, #ff1f1f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Float Animation */
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
