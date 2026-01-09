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
const particles = ref<
  { left: string; size: string; delay: string; duration: string }[]
>([]);

onMounted(() => {
  // Generate particles
  for (let i = 0; i < 20; i++) {
    particles.value.push({
      left: Math.random() * 100 + "%",
      size: Math.random() * 3 + 1 + "px",
      delay: Math.random() * 5 + "s",
      duration: Math.random() * 10 + 10 + "s",
    });
  }
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
</script>

<template>
  <div
    class="min-h-screen bg-[#050505] text-gray-100 font-sans relative flex flex-col"
  >
    <!-- Background Effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="grid-bg absolute inset-0"></div>

      <!-- Floating Blobs (Neutral for Subpages) -->
      <div class="absolute inset-0">
        <div
          class="floating-blob blob-neutral top-[-10%] left-[-5%] w-[500px] h-[500px]"
        ></div>
        <div
          class="floating-blob blob-white bottom-[-10%] right-[-5%] w-[400px] h-[400px]"
        ></div>
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
            animationDuration: p.duration,
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
      <!-- Hero Section -->
      <UContainer class="pt-32 lg:pt-52 pb-24 text-center w-full">
        <div class="max-w-2xl mx-auto space-y-6">
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
              icon="i-lucide-arrow-right"
              trailing
              to="#beneficios"
              class="text-white hover:no-underline"
            />
          </div>
        </div>
      </UContainer>

      <!-- Affiliate Benefits Section -->
      <section id="beneficios" class="py-24 px-6">
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
              class="group relative bg-[#0a0a0a]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary-500/30 overflow-hidden text-center"
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

      <!-- How It Works Section -->
      <section class="py-24 px-6 relative">
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
              class="relative z-10 flex flex-col items-center text-center"
            >
              <div 
                :class="[
                  'w-24 h-24 rounded-full bg-[#0a0a0a] flex items-center justify-center mb-6 shadow-lg',
                  step.active ? 'border-2 border-primary-500 shadow-primary-500/30' : 'border-2 border-white/20'
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

      <!-- Revenue Simulator Section -->
      <section class="py-24 px-6">
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
                  >
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
                <div class="stats-card bg-black/40 border border-primary-500/40 rounded-xl p-8 text-center backdrop-blur-xl animate-float">
                  <p class="text-gray-400 text-sm uppercase tracking-wider mb-2">Seu Faturamento Mensal</p>
                  <div class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2">
                    {{ calculatedRevenue }}
                  </div>
                  <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wide">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Recorrente
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- FAQ Section -->
      <section class="py-24 px-6 relative">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent pointer-events-none"></div>
        
        <UContainer class="max-w-4xl relative z-10">
          <div class="text-center mb-16">
            <span class="text-primary-500 font-semibold tracking-wider text-sm uppercase mb-3 block">Tire suas dúvidas</span>
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Dúvidas Frequentes</h2>
            <p class="text-gray-400 max-w-xl mx-auto">Respostas para as perguntas mais comuns sobre nosso programa de afiliados.</p>
          </div>
          
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
          
          <p class="text-center text-gray-500 mt-12 text-sm">
            Ainda tem dúvidas? 
            <NuxtLink to="/contact" class="text-primary-500 hover:text-primary-400 transition-colors font-medium">Entre em contato conosco</NuxtLink>
          </p>
        </UContainer>
      </section>

      <!-- Final CTA Section -->
      <section class="py-24 px-6">
        <UContainer>
          <div class="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center border border-white/10">
            <div class="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-black z-0"></div>
            <div class="absolute inset-0 grid-bg opacity-10 z-0"></div>
            
            <div class="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 class="text-3xl md:text-5xl font-bold text-white">Pronto para a Independência Financeira?</h2>
              <p class="text-lg text-gray-300">Não deixe dinheiro na mesa. Cada dia que você espera é um cliente que outro afiliado está convertendo.</p>
              
              <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <UButton
                  class="glow-button py-4 px-10 text-base font-bold bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg shadow-primary-900/20"
                  variant="solid"
                  to="/contact"
                >
                  Cadastrar Agora
                </UButton>
              </div>
            </div>
          </div>
        </UContainer>
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
              Impulsionando a inovação corporativa através de tecnologia de
              ponta, segurança e performance.
            </p>
          </div>

          <!-- Soluções Column -->
          <div>
            <h4 class="text-white font-bold mb-4">Soluções</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <NuxtLink to="#" class="hover:text-red-500 transition-colors"
                  >Cloud Computing</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="#" class="hover:text-red-500 transition-colors"
                  >Cibersegurança</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="#" class="hover:text-red-500 transition-colors"
                  >DevOps</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="#" class="hover:text-red-500 transition-colors"
                  >Big Data</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Empresa Column -->
          <div>
            <h4 class="text-white font-bold mb-4">Empresa</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <NuxtLink to="#" class="hover:text-red-500 transition-colors"
                  >Sobre Nós</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="#" class="hover:text-red-500 transition-colors"
                  >Carreiras</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="#" class="hover:text-red-500 transition-colors"
                  >Blog</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="#" class="hover:text-red-500 transition-colors"
                  >Imprensa</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Legal Column -->
          <div>
            <h4 class="text-white font-bold mb-4">Legal</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>
                <NuxtLink to="#" class="hover:text-red-500 transition-colors"
                  >Privacidade</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="#" class="hover:text-red-500 transition-colors"
                  >Termos de Uso</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="#" class="hover:text-red-500 transition-colors"
                  >Compliance</NuxtLink
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom Section -->
        <div
          class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-sm text-gray-500">
            © 2025 Rocket Enterprise Inc. Todos os direitos reservados.
          </p>

          <!-- Social Icons -->
          <div class="flex gap-6">
            <NuxtLink
              to="#"
              class="text-gray-500 hover:text-white transition-colors"
            >
              <span class="sr-only">LinkedIn</span>
              <UIcon name="i-lucide-linkedin" class="w-5 h-5" />
            </NuxtLink>
            <NuxtLink
              to="#"
              class="text-gray-500 hover:text-white transition-colors"
            >
              <span class="sr-only">Twitter</span>
              <UIcon name="i-lucide-twitter" class="w-5 h-5" />
            </NuxtLink>
            <NuxtLink
              to="#"
              class="text-gray-500 hover:text-white transition-colors"
            >
              <span class="sr-only">Instagram</span>
              <UIcon name="i-lucide-instagram" class="w-5 h-5" />
            </NuxtLink>
          </div>
        </div>

        <div class="mt-6 text-center">
          <p class="text-xs text-gray-600 italic">
            "Porque dele, e por meio dele, e para ele são todas as coisas. A ele
            seja a glória para sempre. Amém!" (Rm 11:36)
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
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-20px, 30px);
  }
}

@keyframes rise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  } /* Peak visibility */
  100% {
    transform: translateY(-100vh) scale(0);
    opacity: 0;
  }
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
