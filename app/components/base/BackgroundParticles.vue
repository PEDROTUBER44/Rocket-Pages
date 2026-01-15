<template>
  <div class="fixed inset-0 pointer-events-none z-0">
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
</template>

<script setup lang="ts">
const particles = ref<{ left: string; size: string; delay: string; duration: string }[]>([])

onMounted(() => {
  for (let i = 0; i < 15; i++) {
    particles.value.push({
      left: Math.random() * 100 + '%',
      size: Math.random() * 3 + 1 + 'px',
      delay: Math.random() * 5 + 's',
      duration: Math.random() * 10 + 10 + 's'
    })
  }
})
</script>

<style scoped>
.particle {
  position: fixed;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: floatUp linear infinite;
}

@keyframes floatUp {
  0% { transform: translateY(100vh) scale(1); opacity: 0; }
  20% { opacity: 0.5; }
  80% { opacity: 0.3; }
  100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
}
</style>
