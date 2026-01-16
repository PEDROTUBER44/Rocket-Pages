<script setup lang="ts">
/**
 * TechMarquee - Banner de logos animado infinito
 * 
 * Props:
 * - items: Array de tecnologias/ferramentas com name/icon
 * - title: Título opcional
 * - description: Descrição opcional
 */

interface TechItem {
  name: string
  icon: string
}

interface Props {
  items: TechItem[]
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  description: ''
})
</script>

<template>
  <div class="mb-32 overflow-hidden relative">
    <!-- Optional Header -->
    <BaseSectionHeader 
      v-if="title"
      :title="title" 
      :description="description"
      class="text-center mb-16"
    />
    
    <div class="relative flex overflow-x-hidden group">
      <!-- Gradient Masks -->
      <div class="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#050505] to-transparent"></div>
      <div class="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#050505] to-transparent"></div>

      <!-- First Track -->
      <div class="py-12 animate-marquee whitespace-nowrap flex gap-16">
        <div 
          v-for="tech in [...items, ...items]" 
          :key="tech.name + Math.random()" 
          class="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-default"
        >
          <UIcon :name="tech.icon" class="w-10 h-10 grayscale hover:grayscale-0 transition-all duration-300" />
          <span class="text-2xl font-bold opacity-50">{{ tech.name }}</span>
        </div>
      </div>
      
      <!-- Second Track (for seamless loop) -->
      <div class="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex gap-16">
        <div 
          v-for="tech in [...items, ...items]" 
          :key="tech.name + Math.random() + 'dup'" 
          class="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-default"
        >
          <UIcon :name="tech.icon" class="w-10 h-10 grayscale hover:grayscale-0 transition-all duration-300" />
          <span class="text-2xl font-bold opacity-50">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
