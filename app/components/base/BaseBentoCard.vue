<template>
  <div 
    ref="cardRef"
    class="bento-card relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl hover:shadow-primary-500/10"
    :class="[
      featured ? 'md:col-span-2' : 'md:col-span-1',
      vertical ? 'row-span-2' : ''
    ]"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Glow Effect -->
    <div 
      class="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{
        background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(202, 0, 13, 0.15), transparent 40%)`
      }"
    ></div>

    <div class="relative z-10 h-full flex flex-col">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  featured: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  }
})

const cardRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

const handleMouseLeave = () => {
  mouseX.value = 0
  mouseY.value = 0
}
</script>

<style scoped>
.bento-card {
  backdrop-filter: blur(10px);
}
</style>
