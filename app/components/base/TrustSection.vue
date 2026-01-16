<script setup lang="ts">
/**
 * TrustSection - Seção "Por que Rocket?" reutilizável
 * 
 * Props:
 * - title: Título da seção
 * - description: Descrição opcional
 * - items: Array de items com title/desc/icon
 */

interface TrustItem {
  title: string
  desc: string
  icon: string
}

interface Props {
  title?: string
  description?: string
  items: TrustItem[]
}

withDefaults(defineProps<Props>(), {
  title: 'Por que a Rocket?',
  description: ''
})
</script>

<template>
  <div class="mb-32">
    <!-- Header -->
    <div class="text-center mb-16 reveal-on-scroll">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        <slot name="title">{{ title }}</slot>
      </h2>
      <p v-if="description" class="text-gray-400">{{ description }}</p>
    </div>

    <!-- Cards Grid -->
    <div class="grid md:grid-cols-3 gap-8">
      <BaseEnhancedCard 
        v-for="(item, index) in items" 
        :key="item.title"
        class="p-8 rounded-2xl group reveal-on-scroll"
        :style="{ transitionDelay: `${index * 100}ms` }"
      >
        <div class="w-12 h-12 bg-[#ca000d]/10 rounded-xl flex items-center justify-center mb-6 border border-[#ca000d]/20 group-hover:border-[#ca000d] transition-colors">
          <UIcon :name="item.icon" class="w-6 h-6 text-[#ca000d]" />
        </div>
        <h3 class="text-xl font-bold text-white mb-3">{{ item.title }}</h3>
        <p class="text-gray-400 leading-relaxed">{{ item.desc }}</p>
      </BaseEnhancedCard>
    </div>
  </div>
</template>
