<script setup lang="ts">
const stats = [
  {
    label: 'Anos de Inovação',
    value: '6+',
    icon: 'i-lucide-calendar-clock'
  },
  {
    label: 'Projetos Entregues',
    value: '644+',
    icon: 'i-lucide-folder-check'
  },
  {
    label: 'Clientes Atendidos',
    value: '462+',
    icon: 'i-lucide-users'
  },
  {
    label: 'Satisfação dos Clientes',
    value: '99%',
    icon: 'i-lucide-heart-handshake'
  }
];
</script>

<template>
  <UContainer class="mb-32">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div 
        v-for="(stat, index) in stats" 
        :key="index"
        class="group relative bg-[#0a0a0a]/60 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-primary-500/30 transition-all duration-300 text-center overflow-hidden"
      >
        <!-- Background Glow -->
        <div class="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="relative z-10 flex flex-col items-center gap-3">
          <UIcon :name="stat.icon" class="w-8 h-8 text-gray-500 group-hover:text-primary-500 transition-colors duration-300" />
          <span class="text-4xl md:text-5xl font-black text-white tracking-tight">{{ stat.value }}</span>
          <span class="text-sm text-gray-400 font-medium uppercase tracking-wider">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </UContainer>
</template>
