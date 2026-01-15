<script setup lang="ts">
// --- Layout State ---
// Menu logic handled by AppHeader

const toast = useToast();
const isSubmitting = ref(false);

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
  { label: 'Rocket Fitness', value: 'rocket_fitness' },
  { label: 'Rocket Devel', value: 'rocket_devel' },
  { label: 'Rocket Marketing', value: 'rocket_marketing' },
  { label: 'Rocket Cloud', value: 'rocket_cloud' },
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

// --- FAQ Items ---
const faqItems = [
  {
    label: 'Qual o tempo médio de resposta?',
    content: 'Nossa equipe de suporte técnico e comercial geralmente responde em até 2 horas durante o horário comercial (8h às 18h). Para planos Enterprise, o atendimento é prioritário e 24/7.',
    slot: 'item'
  },
  {
    label: 'Como agendar uma demonstração técnica?',
    content: 'Selecione a opção "Empresa" e no campo "Assunto" escolha "Parceria comercial". Nossa equipe de pré-vendas entrará em contato para agendar uma call e apresentar nossas soluções.',
    slot: 'item'
  },
  {
    label: 'Onde fica a sede da Rocket?',
    content: 'Estamos sediados em São Paulo, SP, mas operamos em modelo Remote-First, atendendo clientes em todo o Brasil e exterior.',
    slot: 'item'
  }
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

const handleSubmit = async () => {
  // Validação básica
  if (!form.nomeCompleto || !form.email || !form.tipoContato || !form.detalhes) {
    toast.add({ title: 'Erro', description: 'Preencha todos os campos obrigatórios.', color: 'neutral' });
    return;
  }

  if (selectedTab.value === 'empresa' && !form.nomeEmpresa) {
    toast.add({ title: 'Erro', description: 'Preencha o nome da empresa.', color: 'neutral' });
    return;
  }

  isSubmitting.value = true;
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        full_name: form.nomeCompleto,
        email: form.email,
        phone: form.telefone || null,
        company_name: selectedTab.value === 'empresa' ? form.nomeEmpresa : null,
        is_company: selectedTab.value === 'empresa',
        contact_type: form.tipoContato,
        message: form.detalhes
      }
    });

    toast.add({ title: 'Sucesso!', description: 'Sua mensagem foi enviada. Entraremos em contato em breve.', color: 'primary' });
    
    // Limpar formulário
    form.nomeCompleto = '';
    form.email = '';
    form.telefone = '';
    form.nomeEmpresa = '';
    form.tipoContato = '';
    form.detalhes = '';
  } catch (e: any) {
    const msg = e.response?._data?.error || 'Erro ao enviar mensagem. Tente novamente.';
    toast.add({ title: 'Erro', description: msg, color: 'neutral' });
  } finally {
    isSubmitting.value = false;
  }
};

useAppSeo({
  title: 'Contato',
  description: 'Entre em contato com a Rocket. Estamos prontos para impulsionar seu negócio com tecnologia de ponta.',
});

// Estilo Unificado dos Inputs
const inputUiStyle = {
  base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-300',
  icon: { base: 'text-gray-400' },
  rounded: 'rounded-lg'
};
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-gray-100 font-sans relative flex flex-col overflow-x-hidden">
    
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div class="grid-bg absolute inset-0"></div>
        
        <div class="absolute inset-0">
            <!-- Hero Glow Effect -->
            <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-500/5 to-transparent pointer-events-none"></div>
            <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-500/10 blur-[100px] rounded-full pointer-events-none"></div>

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

    <main class="flex-grow relative z-10 pt-20 lg:pt-24 pb-16">
      <UContainer>
        <div class="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24">
          
          <div class="lg:w-1/2 flex flex-col justify-center py-12 lg:py-16">
            <div class="max-w-xl">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 w-fit">
                <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                <span class="text-primary-500 text-sm font-semibold uppercase tracking-wider">Resposta em 24h</span>
              </div>

              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Vamos construir <br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-red-400">algo incrível</span> juntos.
              </h1>
              
              <p class="text-lg text-gray-400 leading-relaxed mb-12">
                Seja para contratar nossos serviços, tirar uma dúvida ou propor uma parceria — estamos prontos para ouvir você.
              </p>

              <div class="space-y-4 mb-10">
                <BaseEnhancedCard 
                  v-for="info in contactInfo" 
                  :key="info.label"
                  :hover-effect="true"
                  class="flex items-center gap-4 !p-4 group cursor-pointer"
                >
                  <div class="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                    <UIcon :name="info.icon" class="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p class="text-gray-500 text-sm">{{ info.label }}</p>
                    <p class="text-white font-medium">{{ info.value }}</p>
                  </div>
                </BaseEnhancedCard>
              </div>

              <!-- Support Status Card -->
              <BaseEnhancedCard :hover-effect="false" class="!p-6 bg-[#0a0a0a]/50 border-primary-500/20 overflow-hidden relative">
                   <div class="absolute inset-0 bg-primary-500/5 animate-pulse" style="animation-duration: 4s;"></div>
                   <div class="relative z-10 flex items-center justify-between">
                       <div class="flex items-center gap-4">
                           <div class="relative">
                               <div class="w-3 h-3 bg-green-500 rounded-full animate-ping absolute inset-0"></div>
                               <div class="w-3 h-3 bg-green-500 rounded-full relative"></div>
                           </div>
                           <div>
                               <div class="text-sm font-bold text-white">Suporte Online</div>
                               <div class="text-xs text-green-400">Tempo de espera: < 5 min</div>
                           </div>
                       </div>
                       <div class="flex -space-x-2">
                            <div class="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#1a1a1a] flex items-center justify-center text-xs text-white cursor-help" title="Atendente 1">JP</div>
                            <div class="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#1a1a1a] flex items-center justify-center text-xs text-white cursor-help" title="Atendente 2">AL</div>
                            <div class="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#1a1a1a] flex items-center justify-center text-xs text-white cursor-help" title="Atendente 3">+5</div>
                       </div>
                   </div>
              </BaseEnhancedCard>

            </div>
          </div>

          <div class="lg:w-1/2 flex items-center">
            <div class="w-full max-w-lg mx-auto">
              
              <BaseEnhancedCard :hover-effect="false" class="!p-8 lg:!p-10 shadow-2xl relative overflow-hidden group">
                
                <div class="grid grid-cols-2 gap-3 bg-[#050505] p-2 rounded-xl border border-white/10 mb-8">
                  <button
                    v-for="tab in tabItems"
                    :key="tab.value"
                    @click="selectedTab = tab.value"
                    class="flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition-all duration-300"
                    :class="selectedTab === tab.value 
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'"
                  >
                    <UIcon :name="tab.icon" class="w-4 h-4" />
                    {{ tab.label }}
                  </button>
                </div>

                <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
                  
                  <UFormGroup name="nomeCompleto" label="Nome Completo" :ui="{ wrapper: 'space-y-1', label: { base: 'text-gray-400 text-sm font-medium ml-1' } }">
                    <UInput 
                      v-model="form.nomeCompleto"
                      icon="i-lucide-user"
                      placeholder="Seu nome"
                      size="lg"
                      class="w-full"
                      :ui="inputUiStyle"
                    />
                  </UFormGroup>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UFormGroup name="email" label="Email Corporativo" :ui="{ wrapper: 'space-y-1', label: { base: 'text-gray-400 text-sm font-medium ml-1' } }">
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
                    
                    <UFormGroup name="telefone" label="Telefone / WhatsApp" :ui="{ wrapper: 'space-y-1', label: { base: 'text-gray-400 text-sm font-medium ml-1' } }">
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
                    <UFormGroup name="nomeEmpresa" label="Nome da Empresa" :ui="{ wrapper: 'space-y-1', label: { base: 'text-gray-400 text-sm font-medium ml-1' } }">
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

                  <UFormGroup name="tipoContato" label="Assunto" :ui="{ wrapper: 'space-y-1', label: { base: 'text-gray-400 text-sm font-medium ml-1' } }">
                    <USelectMenu
                      v-model="form.tipoContato"
                      :options="tiposContato"
                      value-attribute="value"
                      option-attribute="label"
                      placeholder="Selecione uma opção"
                      :searchable="false"
                      size="lg"
                      class="w-full"
                      :ui="{
                        base: inputUiStyle.base,
                        rounded: inputUiStyle.rounded,
                        padding: { sm: 'p-3' }
                      }"
                    />
                  </UFormGroup>

                  <UFormGroup name="detalhes" label="Mensagem" :ui="{ wrapper: 'space-y-1', label: { base: 'text-gray-400 text-sm font-medium ml-1' } }">
                    <UTextarea 
                      v-model="form.detalhes"
                      placeholder="Descreva brevemente o que você precisa..."
                      :rows="4"
                      size="lg"
                      class="w-full"
                      :ui="{
                          base: inputUiStyle.base + ' resize-none',
                          rounded: inputUiStyle.rounded
                      }"
                    />
                  </UFormGroup>

                  <UButton 
                    type="submit"
                    block
                    size="xl"
                    label="Enviar Mensagem"
                    :loading="isSubmitting"
                    class="rounded-lg font-bold text-lg mt-4 shadow-xl shadow-primary-900/20 w-full text-white overflow-hidden group"
                    :ui="{ 
                      base: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 transition-all duration-300 border-none'
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
              </BaseEnhancedCard>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <section class="max-w-4xl mx-auto border-t border-white/5 pt-16">
            <FaqSection :items="faqItems" :show-contact-link="false" />
        </section>

      </UContainer>
    </main>


    <AppFooter />

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

.particle {
    position: absolute;
    background: white;
    border-radius: 50%;
    opacity: 0.1;
    bottom: -10px;
    animation: rise linear infinite;
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