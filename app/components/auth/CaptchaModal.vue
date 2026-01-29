<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  captchaImage: string;
  isLoadingCaptcha?: boolean;
  isLoadingSubmit?: boolean;
  code: string; 
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:code', value: string): void;
  (e: 'refresh'): void;
  (e: 'confirm'): void;
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const codeValue = computed({
  get: () => props.code,
  set: (val) => emit('update:code', val)
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-0"
    >
      <div
        class="absolute inset-0 bg-[#050505]/90 backdrop-blur-md transition-opacity duration-300"
        @click="isOpen = false"
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
            @click="isOpen = false"
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
                @click="emit('refresh')"
                :ui="{ base: 'p-0 text-primary-500 hover:text-primary-400' }"
                class="hover:no-underline font-bold text-[10px] gap-1 transition-colors cursor-pointer"
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
                v-if="captchaImage"
                :src="captchaImage"
                alt="Captcha"
                class="h-full object-contain scale-110 contrast-125 opacity-90 relative z-10"
              />
               <div v-else class="flex flex-col items-center gap-2">
                  <UIcon name="i-lucide-loader-2" class="animate-spin w-6 h-6 text-primary-500" />
                  <span class="text-gray-500 text-xs font-medium">Carregando...</span>
              </div>
            </div>

            <div class="space-y-2">
                <UInput
                  v-model="codeValue"
                  placeholder="DIGITE AQUI"
                  class="w-full text-center"
                  size="xl"
                  :ui="{
                    base: 'bg-[#121315] border-0 ring-1 ring-white/10 text-center uppercase tracking-[0.5em] placeholder:text-center placeholder:tracking-normal placeholder:text-gray-700 text-white focus:ring-2 focus:ring-primary-500 rounded-xl px-4 py-3'
                  }"
                  @keydown.enter.prevent="emit('confirm')"
                />
            </div>
          </div>

          <UButton
            block
            size="xl"
            label="Confirmar Acesso"
            color="primary"
            variant="solid"
            :loading="isLoadingSubmit"
            class="rounded-2xl font-bold text-white shadow-lg shadow-primary-500/20"
            @click="emit('confirm')"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in { animation: fade-in 0.2s ease-out; }
</style>
