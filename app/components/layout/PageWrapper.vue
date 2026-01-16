<script setup lang="ts">
/**
 * PageWrapper - Componente de layout base para todas as páginas públicas
 * 
 * Encapsula:
 * - Background com grid pattern
 * - Blobs decorativos (glow effects)
 * - Header e Footer
 * - Estrutura flex-col consistente
 * 
 * Props:
 * - showBlueBlob: Mostrar blob azul secundário (default: true)
 * - mainClass: Classes adicionais para o main element
 */

interface Props {
  showBlueBlob?: boolean
  mainClass?: string
}

withDefaults(defineProps<Props>(), {
  showBlueBlob: true,
  mainClass: ''
})
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-[#ca000d] selection:text-white relative flex flex-col">
    
    <!-- Background Elements -->
    <div class="fixed inset-0 grid-pattern z-0"></div>
    <div class="fixed top-0 right-0 w-[500px] h-[500px] bg-[#ca000d]/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div v-if="showBlueBlob" class="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-grow relative z-10" :class="mainClass">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />

  </div>
</template>
