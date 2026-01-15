<template>
  <div 
    class="enhanced-card relative rounded-2xl p-8 transition-all duration-300 overflow-hidden"
    :class="[
      featured ? 'border-primary-500/30' : 'border-white/10 hover:border-primary-500/30',
      hoverEffect ? 'hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/10' : ''
    ]"
  >
    <!-- Featured Badge -->
    <div v-if="featured" class="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
      Destaque
    </div>

    <!-- Sheen Effect on Hover -->
    <div v-if="hoverEffect" class="absolute inset-0 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 z-0 pointer-events-none"></div>

    <!-- Content -->
    <div class="relative z-10">
        <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  featured: {
    type: Boolean,
    default: false
  },
  hoverEffect: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.enhanced-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(202, 0, 13, 0.02) 50%, rgba(255, 255, 255, 0.01) 100%);
  backdrop-filter: blur(10px);
  border-width: 1px;
  border-style: solid;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
</style>
