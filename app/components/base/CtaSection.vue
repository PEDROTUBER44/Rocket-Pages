<script setup lang="ts">
/**
 * BaseCtaSection - Componente reutilizável para seções CTA (Call to Action)
 * 
 * Props:
 * - title: Título principal (suporta HTML para spans coloridos)
 * - description: Texto descritivo abaixo do título
 * - buttonLabel: Texto do botão de ação
 * - buttonTo: Rota/link do botão (padrão: /contact)
 * - showSecondaryButton: Mostrar botão secundário opcional
 * - secondaryLabel: Texto do botão secundário
 * - secondaryTo: Rota do botão secundário
 */

interface Props {
  title?: string
  description?: string
  buttonLabel?: string
  buttonTo?: string
  showSecondaryButton?: boolean
  secondaryLabel?: string
  secondaryTo?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Pronto para transformar seu futuro?',
  description: 'Entre em contato com nossos especialistas e descubra como o ecossistema Rocket pode acelerar seus resultados.',
  buttonLabel: 'Falar com Consultor',
  buttonTo: '/contact',
  showSecondaryButton: false,
  secondaryLabel: '',
  secondaryTo: ''
})
</script>

<template>
  <section class="cta-section max-w-7xl mx-auto px-6 mb-24">
    <div class="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center border border-white/10">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#ca000d]/20 to-black z-0"></div>
      
      <!-- Grid Pattern Overlay -->
      <div class="absolute inset-0 grid-pattern opacity-10 z-0"></div>
      
      <!-- Content -->
      <div class="relative z-10 max-w-3xl mx-auto space-y-8">
        <!-- Title - suporta HTML via slot ou prop -->
        <h2 class="text-3xl md:text-5xl font-bold text-white">
          <slot name="title">{{ title }}</slot>
        </h2>
        
        <!-- Description -->
        <p class="text-lg text-gray-300">
          <slot name="description">{{ description }}</slot>
        </p>
        
        <!-- Buttons Container -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <!-- Primary CTA Button -->
          <UButton
            class="glow-button py-4 px-10 text-base font-bold bg-[#ca000d] hover:bg-[#b0000b] text-white rounded-full shadow-lg shadow-red-900/20"
            variant="solid"
            :to="buttonTo"
          >
            {{ buttonLabel }}
          </UButton>
          
          <!-- Optional Secondary Button -->
          <UButton
            v-if="showSecondaryButton && secondaryLabel"
            class="py-4 px-10 text-base font-bold text-white rounded-full border border-white/20 hover:bg-white/10"
            variant="ghost"
            :to="secondaryTo"
          >
            {{ secondaryLabel }}
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Grid Pattern Background */
.grid-pattern {
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  pointer-events: none;
}

/* Glow Button Effect */
.glow-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
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
</style>
