<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "#ui/types";

// --- Estados ---
const isLogin = ref(true);
const isCaptchaOpen = ref(false);
const form = ref();

const toast = useToast();
const { captchaImage, captchaId, fetchCaptcha, isLoading: isLoadingCaptcha } = useCaptcha();
const { login, register, isLoading: isLoadingAuth } = useAuth();

// --- Scroll Animation (same as about.vue) ---
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
    refreshCaptcha();
});

async function refreshCaptcha() {
    state.captcha = "";
    await fetchCaptcha();
}

// --- Schemas Independentes ---
const loginCheckSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

// Reuse same validation logic
const registerCheckSchema = z
  .object({
    name: z.string().min(1, "Nome completo é obrigatório"),
    username: z.string().min(3, "Usuário deve ter no mínimo 3 caracteres"),
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
  username: "",
  password: "",
  confirmPassword: "",
  captcha: "",
});

// --- Lógica de Tabs ---
watch(isLogin, () => {
  if (form.value) form.value.clear();
  state.name = "";
  state.username = "";
  state.password = "";
  state.confirmPassword = "";
  state.captcha = "";
  isCaptchaOpen.value = false;
  if (isLogin.value) {
      refreshCaptcha();
  }
});

// --- Validação Manual ---
async function handleLoginClick() {
  const currentCheckSchema = isLogin.value
    ? loginCheckSchema
    : registerCheckSchema;

  const result = currentCheckSchema.safeParse({
      name: state.name,
      username: state.username,
      password: state.password,
      confirmPassword: state.confirmPassword
  });

  if (result.success) {
    if (form.value) form.value.clear();
    if (!captchaImage.value) await refreshCaptcha();
    isCaptchaOpen.value = true;
  } else {
    const formattedErrors = result.error.issues.map((err) => ({
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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log("🚀 Iniciando submissão do formulário...");
  try {
    const payload = {
        ...event.data,
        captcha_id: captchaId.value,
        captcha_answer: state.captcha
    };

    if (isLogin.value) {
        await login(payload);
        toast.add({ title: 'Bem-vindo!', color: 'primary' });
        setTimeout(() => location.href = "/", 1000);
    } else {
        await register(payload);
        toast.add({ title: 'Conta criada! Redirecionando...', color: 'primary' });
        setTimeout(() => location.reload(), 1500);
    }
    isCaptchaOpen.value = false;

  } catch (error: any) {
    console.error("❌ Erro no login:", error);
    
    // Auth composable sets formattedMessage
    const msg = error.formattedMessage || error.message || "Erro desconhecido";
    const status = error.response?.status;
     
    if (status === 400 && msg.includes("Captcha")) {
         state.password = "";
    }

    toast.add({ title: 'Erro', description: msg, color: 'primary' });
    await refreshCaptcha(); 
  }
}

useAppSeo({
  title: 'Login',
  description: 'Acesse sua conta Rocket Pages.',
  index: false
});
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#ca000d] selection:text-white relative flex items-center justify-center p-4">
    
      <!-- Background Elements -->
      <div class="fixed inset-0 grid-pattern z-0"></div>
      <div class="fixed top-0 right-0 w-[500px] h-[500px] bg-[#ca000d]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" class="relative z-10 w-full max-w-[480px] reveal-on-scroll">
          <UCard
            class="w-full backdrop-blur-xl bg-[#0a0a0a]/80 border border-white/10 shadow-2xl rounded-3xl overflow-hidden bg-transparent ring-0 divide-none"
            :ui="{
              header: 'p-0',
              body: 'p-8 sm:p-10',
              footer: 'p-0'
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
                  :color="isLogin ? 'primary' : 'neutral'"
                  @click="isLogin = true"
                  class="rounded-xl font-bold transition-all duration-300"
                  :class="isLogin ? 'text-white shadow-lg shadow-primary-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'"
                />
                <UButton
                  block
                  size="xl"
                  label="Criar Conta"
                  :variant="!isLogin ? 'solid' : 'ghost'"
                  :color="!isLogin ? 'primary' : 'neutral'"
                  @click="isLogin = false"
                  class="rounded-xl font-bold transition-all duration-300"
                  :class="!isLogin ? 'text-white shadow-lg shadow-primary-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'"
                />
            </div>

            <!-- Extracted Fields Component -->
            <AuthFormFields :state="state" :is-register="!isLogin" />

            <div class="space-y-6 mt-6">
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

          <!-- Extracted Captcha Modal -->
          <AuthCaptchaModal 
            v-model="isCaptchaOpen"
            v-model:code="state.captcha"
            :captcha-image="captchaImage"
            :is-loading-captcha="isLoadingCaptcha"
            :is-loading-submit="isLoadingAuth"
            @refresh="refreshCaptcha"
            @confirm="confirmCaptcha"
          />

      </UForm>
    </div>
  </UApp>
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
</style>