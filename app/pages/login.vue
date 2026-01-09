<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "#ui/types";

// --- Estados ---
const isLogin = ref(true);
const isCaptchaOpen = ref(false);
const form = ref();

// --- Background Particles Logic ---
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

// --- Schemas Independentes ---
const loginCheckSchema = z.object({
  email: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

const registerCheckSchema = z
  .object({
    name: z.string().min(1, "Nome completo é obrigatório"),
    email: z.string().min(1, "Usuário é obrigatório"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const fullLoginSchema = loginCheckSchema.extend({
  captcha: z.string().min(1, "O código de verificação é obrigatório"),
});

const fullRegisterSchema = registerCheckSchema.extend({
  captcha: z.string().min(1, "O código de verificação é obrigatório"),
});

const schema = computed(() =>
  isLogin.value ? fullLoginSchema : fullRegisterSchema,
);
type Schema =
  | z.output<typeof fullLoginSchema>
  | z.output<typeof fullRegisterSchema>;

// --- Estado do Formulário ---
const state = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  captcha: "",
});

// --- Lógica de Tabs ---
// Limpa o form ao trocar de aba
watch(isLogin, () => {
  if (form.value) form.value.clear();
  state.name = "";
  state.email = "";
  state.password = "";
  state.confirmPassword = "";
  state.captcha = "";
  isCaptchaOpen.value = false;
});

// --- Validação Manual ---
async function handleLoginClick() {
  const currentCheckSchema = isLogin.value
    ? loginCheckSchema
    : registerCheckSchema;

  const result = currentCheckSchema.safeParse(state);

  if (result.success) {
    if (form.value) form.value.clear();
    isCaptchaOpen.value = true;
  } else {
    const formattedErrors = result.error.errors.map((err) => ({
      path: err.path[0] as string,
      message: err.message,
    }));

    if (form.value) {
      form.value.setErrors(formattedErrors);
    }
  }
}

async function confirmCaptcha() {
  if (!form.value) return;
  form.value.submit();
}

function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log("🚀 SUCESSO! Dados enviados:", event.data);
  isCaptchaOpen.value = false;
  // Lógica de redirecionamento aqui
}
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-[#050505] text-gray-100 font-sans relative overflow-hidden flex items-center justify-center p-4">
    
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

      <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" class="relative z-10 w-full max-w-[480px]">
          <UCard
            class="w-full backdrop-blur-xl bg-[#0a0a0a]/80 border border-white/10 shadow-2xl rounded-3xl overflow-hidden"
            :ui="{
              base: '',
              background: 'bg-transparent',
              ring: 'ring-0',
              divide: 'divide-none',
              header: { padding: 'p-0' },
              body: { padding: 'p-8 sm:p-10' },
              footer: { padding: 'p-0' }
            }"
          >
            <div class="flex flex-col items-center justify-center mb-8">
               <div class="relative">
                  <img
                    src="/logo-rocket.webp"
                    alt="Rocket Logo"
                    class="h-12 w-auto object-contain relative z-10 opacity-90 hover:opacity-100 transition-opacity"
                  />
               </div>
            </div>

            <div class="grid grid-cols-2 gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 mb-8">
                <UButton
                  block
                  size="xl"
                  label="Entrar"
                  :variant="isLogin ? 'solid' : 'ghost'"
                  :color="isLogin ? 'primary' : 'gray'"
                  @click="isLogin = true"
                  class="rounded-xl font-bold transition-all duration-300"
                  :class="isLogin ? 'text-white shadow-lg shadow-primary-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'"
                  :ui="{ rounded: 'rounded-xl' }"
                />
                <UButton
                  block
                  size="xl"
                  label="Criar Conta"
                  :variant="!isLogin ? 'solid' : 'ghost'"
                  :color="!isLogin ? 'primary' : 'gray'"
                  @click="isLogin = false"
                  class="rounded-xl font-bold transition-all duration-300"
                  :class="!isLogin ? 'text-white shadow-lg shadow-primary-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'"
                  :ui="{ rounded: 'rounded-xl' }"
                />
            </div>

            <div class="space-y-6">
              <UFormField v-if="!isLogin" name="name" class="space-y-2">
                <UInput
                  v-model="state.name"
                  placeholder="Nome Completo"
                  class="w-full"
                  size="xl"
                  icon="i-lucide-user"
                  :ui="{
                    base: 'bg-white/5 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-primary-500 border-0 placeholder-gray-500',
                    rounded: 'rounded-2xl',
                    padding: { xl: 'px-4 py-3' },
                    icon: { leading: { wrapper: 'text-gray-400' } }
                  }"
                />
              </UFormField>

              <UFormField name="email" class="space-y-2">
                <UInput
                  v-model="state.email"
                  placeholder="Seu e-mail de acesso"
                  class="w-full"
                  size="xl"
                   icon="i-lucide-at-sign"
                  :ui="{
                    base: 'bg-white/5 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-primary-500 border-0 placeholder-gray-500',
                    rounded: 'rounded-2xl',
                    padding: { xl: 'px-4 py-3' },
                    icon: { leading: { wrapper: 'text-gray-400' } }
                  }"
                />
              </UFormField>

              <UFormField name="password" class="space-y-2">
                <UInput
                  v-model="state.password"
                  type="password"
                  placeholder="Sua senha segura"
                  class="w-full"
                  size="xl"
                   icon="i-lucide-lock"
                  :ui="{
                    base: 'bg-white/5 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-primary-500 border-0 placeholder-gray-500',
                    rounded: 'rounded-2xl',
                    padding: { xl: 'px-4 py-3' },
                    icon: { leading: { wrapper: 'text-gray-400' } }
                  }"
                />
              </UFormField>

              <UFormField
                v-if="!isLogin"
                name="confirmPassword"
                class="space-y-2"
              >
                <UInput
                  v-model="state.confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  class="w-full"
                  size="xl"
                   icon="i-lucide-lock-keyhole"
                  :ui="{
                    base: 'bg-white/5 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-primary-500 border-0 placeholder-gray-500',
                    rounded: 'rounded-2xl',
                    padding: { xl: 'px-4 py-3' },
                    icon: { leading: { wrapper: 'text-gray-400' } }
                  }"
                />
              </UFormField>

              <UButton
                type="button"
                block
                size="xl"
                color="primary"
                variant="solid"
                class="rounded-2xl font-bold text-lg mt-8 pt-4 pb-4 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300 w-full text-white"
                @click="handleLoginClick"
              >
                 <span class="mr-2">{{ isLogin ? 'Acessar Plataforma' : 'Criar Minha Conta' }}</span>
                 <UIcon name="i-lucide-arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </UButton>
            </div>

            <div class="mt-8 text-center" v-if="isLogin">
                <a href="#" class="text-sm text-gray-500 hover:text-primary-400 transition-colors">Esqueceu sua senha?</a>
            </div>
          </UCard>
      </UForm>

        <Teleport to="body">
          <div
            v-if="isCaptchaOpen"
            class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-0"
          >
            <div
              class="absolute inset-0 bg-[#050505]/90 backdrop-blur-md transition-opacity duration-300"
              @click="isCaptchaOpen = false"
            ></div>

            <div
              class="relative z-[10000] w-full max-w-[380px] bg-[#0c0d0f] rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in ring-1 ring-white/5"
            >
              <div
                class="p-5 border-b border-white/5 flex items-center justify-between bg-[#121315]"
              >
                <div class="flex items-center gap-3">
                     <div class="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center">
                        <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-primary-500" />
                     </div>
                    <h3
                      class="text-sm font-bold text-white uppercase tracking-wider"
                    >
                      Verificação
                    </h3>
                </div>
                <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-heroicons-x-mark-20-solid"
                  class="-my-1 text-gray-400 hover:text-white"
                  @click="isCaptchaOpen = false"
                />
              </div>

              <div class="p-6 space-y-6">
                <div
                  class="rounded-2xl border border-dashed border-white/10 bg-[#08090a] p-5 space-y-4"
                >
                  <div
                    class="flex items-center justify-between text-[11px] font-bold tracking-widest text-gray-500 uppercase"
                  >
                    <span>Código de Segurança</span>
                    <UButton
                      variant="link"
                      padded
                      :ui="{ base: 'p-0 text-primary-500 hover:text-primary-400' }"
                      class="hover:no-underline font-bold text-[10px] gap-1 transition-colors"
                    >
                      Trocar
                      <UIcon name="i-lucide-refresh-cw" class="w-3 h-3" />
                    </UButton>
                  </div>

                  <div
                    class="bg-white rounded-xl h-24 flex items-center justify-center overflow-hidden border border-gray-800 shadow-inner relative"
                  >
                    <div class="absolute inset-0 bg-gray-100 opacity-10" style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 10px 10px;"></div>
                    <img
                      src="/captcha.png"
                      alt="Captcha"
                      class="h-full object-contain scale-110 contrast-125 opacity-90 relative z-10"
                    />
                  </div>

                  <div class="space-y-2">
                      <UInput
                        v-model="state.captcha"
                        placeholder="DIGITE AQUI"
                        class="w-full text-center"
                        size="xl"
                        :ui="{
                          base: 'bg-[#121315] border-0 ring-1 ring-white/10 text-center uppercase tracking-[0.5em] placeholder:text-center placeholder:tracking-normal placeholder:text-gray-700 text-white focus:ring-2 focus:ring-primary-500',
                          rounded: 'rounded-xl',
                          padding: { xl: 'px-4 py-3' }
                        }"
                      />
                  </div>
                </div>

                <UButton
                  block
                  size="xl"
                  label="Confirmar Acesso"
                  color="primary"
                  variant="solid"
                  class="rounded-2xl font-bold text-white shadow-lg shadow-primary-500/20"
                  @click="confirmCaptcha"
                />
              </div>
            </div>
          </div>
        </Teleport>
    </div>
  </UApp>
</template>

<style scoped>
/* --- Background Animation Styles --- */
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
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in { animation: fade-in 0.2s ease-out; }
</style>