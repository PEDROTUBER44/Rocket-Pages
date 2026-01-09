<script setup lang="ts">
// --- Layout State ---
const isOpen = ref(false);

const items = [
  { label: "Serviços", to: "/servicos", icon: "i-lucide-briefcase" },
  { label: "Recursos", to: "/recursos", icon: "i-lucide-book-open" },
  { label: "Empresas", to: "/empresas", icon: "i-lucide-building-2" },
  { label: "Sobre Nós", to: "/about", icon: "i-lucide-info" },
];

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

// --- Form State ---
const selectedTab = ref('pessoa');

const form = reactive({
  nomeCompleto: '',
  email: '',
  telefone: '',
  nomeEmpresa: '',
  tipoContato: '',
  detalhes: ''
});

const tiposContato = [
  { label: 'Contratar serviço', value: 'contratar' },
  { label: 'Solicitar orçamento', value: 'orcamento' },
  { label: 'Resolver problema', value: 'problema' },
  { label: 'Parceria comercial', value: 'parceria' },
  { label: 'Dúvida geral', value: 'duvida' },
  { label: 'Outro', value: 'outro' }
];

const tabItems = [
  { label: 'Pessoa Física', value: 'pessoa', icon: 'i-lucide-user' },
  { label: 'Empresa', value: 'empresa', icon: 'i-lucide-building-2' }
];

const contactInfo = [
  { icon: 'i-lucide-mail', label: 'Email', value: 'contato@rocket.com' },
  { icon: 'i-lucide-phone', label: 'Telefone', value: '+55 (11) 99999-9999' },
  { icon: 'i-lucide-map-pin', label: 'Endereço', value: 'São Paulo, SP - Brasil' }
];

// --- Background Particles Logic (Igual ao Login) ---
const particles = ref<{ left: string; size: string; delay: string; duration: string }[]>([]);

onMounted(() => {
    for (let i = 0; i < 20; i++) {
        particles.value.push({
            left: Math.random() * 100 + '%',
            size: Math.random() * 3 + 1 + 'px',
            delay: Math.random() * 5 + 's',
            duration: Math.random() * 10 + 10 + 's'
        });
    }
});

const handleSubmit = () => {
  console.log('Form submitted:', { ...form, tipo: selectedTab.value });
};

useHead({
  title: 'Contato | Rocket'
});

// Estilo Unificado dos Inputs (Baseado no seu Login.vue)
const inputUiStyle = {
  base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all duration-300',
  icon: { base: 'text-gray-400' },
  rounded: 'rounded-lg'
};
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-gray-100 font-sans relative flex flex-col overflow-x-hidden">
    
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="grid-bg absolute inset-0"></div>
        
        <div class="absolute inset-0">
            <div class="floating-blob blob-neutral top-[-10%] left-[-5%] w-[500px] h-[500px]"></div>
            <div class="floating-blob blob-white bottom-[-10%] right-[-5%] w-[400px] h-[400px]"></div>
        </div>

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
          <UButton label="Login" to="/login" color="primary" variant="solid" class="hidden sm:inline-flex text-white font-bold" />
          <UButton icon="i-lucide-menu" color="neutral" variant="ghost" class="lg:hidden" aria-label="Menu" @click="isOpen = true" />
        </div>
      </UContainer>
    </header>

    <main class="flex-grow relative z-10 pt-20 lg:pt-24 pb-16">
      <div class="flex flex-col lg:flex-row">
        
        <div class="lg:w-1/2 flex flex-col justify-center px-6 lg:px-16 py-12 lg:py-16">
          <div class="max-w-lg">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
              <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span class="text-red-500 text-sm font-semibold uppercase tracking-wider">Resposta em 24h</span>
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Vamos construir <br/>
              <span class="text-red-600">algo incrível</span> juntos.
            </h1>
            
            <p class="text-lg text-gray-400 leading-relaxed mb-12">
              Seja para contratar nossos serviços, tirar uma dúvida ou propor uma parceria — estamos prontos para ouvir você.
            </p>

            <div class="space-y-4">
              <div 
                v-for="info in contactInfo" 
                :key="info.label"
                class="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors group"
              >
                <div class="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <UIcon :name="info.icon" class="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">{{ info.label }}</p>
                  <p class="text-white font-medium">{{ info.value }}</p>
                </div>
              </div>
            </div>

            <div class="flex gap-4 mt-10">
              <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/30 transition-all">
                <UIcon name="i-lucide-linkedin" class="w-4 h-4" />
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/30 transition-all">
                <UIcon name="i-lucide-instagram" class="w-4 h-4" />
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/30 transition-all">
                <UIcon name="i-lucide-twitter" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div class="lg:w-1/2 px-6 lg:px-16 py-12 lg:py-16 flex items-center">
          <div class="w-full max-w-lg mx-auto">
            
            <div class="backdrop-blur-xl bg-[#0a0a0a]/60 border border-white/10 rounded-2xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              
              <div class="grid grid-cols-2 gap-1 bg-[#050505] p-1.5 rounded-xl border border-white/10 mb-8">
                <button
                  v-for="tab in tabItems"
                  :key="tab.value"
                  @click="selectedTab = tab.value"
                  class="flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all duration-300"
                  :class="selectedTab === tab.value 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'"
                >
                  <UIcon :name="tab.icon" class="w-4 h-4" />
                  {{ tab.label }}
                </button>
              </div>

              <form @submit.prevent="handleSubmit" class="flex flex-col gap-8">
                
                <UFormGroup name="nomeCompleto" :ui="{ wrapper: 'space-y-1' }">
                  <UInput 
                    v-model="form.nomeCompleto"
                    icon="i-lucide-user"
                    placeholder="Seu nome completo"
                    size="lg"
                    class="w-full"
                    :ui="inputUiStyle"
                  />
                </UFormGroup>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <UFormGroup name="email" :ui="{ wrapper: 'space-y-1' }">
                    <UInput 
                      v-model="form.email"
                      type="email"
                      icon="i-lucide-mail"
                      placeholder="seu@email.com"
                      size="lg"
                      class="w-full"
                      :ui="inputUiStyle"
                    />
                  </UFormGroup>
                  
                  <UFormGroup name="telefone" :ui="{ wrapper: 'space-y-1' }">
                    <UInput 
                      v-model="form.telefone"
                      type="tel"
                      icon="i-lucide-phone"
                      placeholder="(00) 00000-0000"
                      size="lg"
                      class="w-full"
                      :ui="inputUiStyle"
                    />
                  </UFormGroup>
                </div>

                <div v-if="selectedTab === 'empresa'" class="animate-fade-in">
                  <UFormGroup name="nomeEmpresa" :ui="{ wrapper: 'space-y-1' }">
                    <UInput 
                      v-model="form.nomeEmpresa"
                      icon="i-lucide-building"
                      placeholder="Nome da sua empresa"
                      size="lg"
                      class="w-full"
                      :ui="inputUiStyle"
                    />
                  </UFormGroup>
                </div>

                <UFormGroup name="tipoContato" :ui="{ wrapper: 'space-y-1' }">
                  <USelectMenu
                    v-model="form.tipoContato"
                    :options="tiposContato"
                    option-attribute="label"
                    value-attribute="value"
                    size="lg"
                    class="w-full"
                    :ui-menu="{
                      background: 'bg-[#0c0d0f] backdrop-blur-xl',
                      ring: 'ring-1 ring-white/10',
                      option: { 
                        active: 'bg-red-600 text-white',
                        color: 'text-gray-300'
                      }
                    }"
                  >
                    <template #default="{ open }">
                      <button
                        type="button"
                        class="relative w-full text-left rounded-lg py-2.5 pl-10 pr-10 shadow-sm transition-all duration-300 outline-none flex items-center h-[42px]"
                        :class="[
                          open ? 'ring-1 ring-red-500 border-red-500' : 'border-white/10 ring-0',
                          'bg-white/5 border text-white'
                        ]"
                      >
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <UIcon name="i-lucide-message-circle" class="w-5 h-5 text-gray-400" />
                        </span>
                        
                        <span class="block truncate text-sm" :class="!form.tipoContato ? 'text-gray-500' : 'text-white'">
                          {{ form.tipoContato ? tiposContato.find(t => t.value === form.tipoContato)?.label : 'Selecione uma opção' }}
                        </span>

                        <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <UIcon name="i-heroicons-chevron-down-20-solid" class="w-5 h-5 text-gray-400" />
                        </span>
                      </button>
                    </template>
                  </USelectMenu>
                </UFormGroup>

                <UFormGroup name="detalhes" :ui="{ wrapper: 'space-y-1' }">
                  <UTextarea 
                    v-model="form.detalhes"
                    placeholder="Descreva brevemente o que você precisa..."
                    :rows="4"
                    size="lg"
                    class="w-full"
                    :ui="{
                        ...inputUiStyle,
                        padding: { lg: 'p-3' }
                    }"
                    resize
                  />
                </UFormGroup>

                <UButton 
                  type="submit"
                  block
                  size="xl"
                  label="Enviar Mensagem"
                  class="rounded-lg font-bold text-lg mt-8 shadow-none w-full text-white overflow-hidden group"
                  :ui="{ 
                    base: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 transition-all duration-300 border-none'
                  }"
                >
                  <template #trailing>
                    <UIcon name="i-lucide-arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </template>
                </UButton>
              </form>

              <p class="text-center text-gray-500 text-xs mt-6 flex items-center justify-center gap-2">
                <UIcon name="i-lucide-shield-check" class="w-3 h-3" />
                Seus dados estão seguros e protegidos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-black border-t border-white/10 pt-20 pb-10 relative z-20">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div class="col-span-2 md:col-span-1">
            <NuxtLink to="/" class="flex items-center mb-6">
              <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-10 w-auto" />
            </NuxtLink>
            <p class="text-gray-500 text-sm leading-relaxed">
              Impulsionando a inovação corporativa através de tecnologia de ponta.
            </p>
          </div>
          <div>
            <h4 class="text-white font-bold mb-4">Soluções</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Cloud Computing</NuxtLink></li>
              <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Cibersegurança</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-bold mb-4">Empresa</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Sobre Nós</NuxtLink></li>
              <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Carreiras</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-bold mb-4">Legal</h4>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Privacidade</NuxtLink></li>
              <li><NuxtLink to="#" class="hover:text-red-500 transition-colors">Termos de Uso</NuxtLink></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-500">© 2025 Rocket Enterprise Inc.</p>
          <div class="flex gap-6">
            <UIcon name="i-lucide-linkedin" class="w-5 h-5 text-gray-500 hover:text-white transition-colors cursor-pointer" />
            <UIcon name="i-lucide-twitter" class="w-5 h-5 text-gray-500 hover:text-white transition-colors cursor-pointer" />
            <UIcon name="i-lucide-instagram" class="w-5 h-5 text-gray-500 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>

    <ClientOnly>
      <USlideover v-model:open="isOpen" side="left" :ui="{ content: '!w-[280px] !max-w-[280px] !flex-none' }">
        <template #content>
          <div class="flex flex-col h-full bg-[#0a0a0a] border-r border-white/10 w-full">
            <div class="flex items-center justify-between p-6 mb-2">
              <img src="/logo-rocket.webp" alt="Rocket Logo" class="h-7 w-auto" />
              <UButton icon="i-lucide-x" color="neutral" variant="ghost" @click="isOpen = false" />
            </div>
            <div class="flex-1 overflow-y-auto px-6">
               <div class="space-y-4">
                  <NuxtLink to="/servicos" class="block text-gray-400 hover:text-white">Serviços</NuxtLink>
                  <NuxtLink to="/recursos" class="block text-gray-400 hover:text-white">Recursos</NuxtLink>
                  <NuxtLink to="/empresas" class="block text-gray-400 hover:text-white">Empresas</NuxtLink>
                  <NuxtLink to="/about" class="block text-gray-400 hover:text-white">Sobre Nós</NuxtLink>
               </div>
            </div>
          </div>
        </template>
      </USlideover>
    </ClientOnly>
  </div>
</template>

<style scoped>
/* --- Efeitos de Fundo (Copiados do Login) --- */
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

.blob-neutral { background: rgba(40, 40, 40, 0.3); }
.blob-white { background: rgba(255, 255, 255, 0.05); }

.particle {
    position: absolute;
    background: white;
    border-radius: 50%;
    opacity: 0.1;
    bottom: -10px;
    animation: rise linear infinite;
}

@keyframes float-slow {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-20px, 30px); }
}

@keyframes rise {
    0% { transform: translateY(0) scale(1); opacity: 0; }
    50% { opacity: 0.3; }
    100% { transform: translateY(-100vh) scale(0); opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 0.3s ease-out; }
</style>