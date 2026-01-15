<template>
  <div class="mb-16 reveal-on-scroll" :class="[centered ? 'text-center' : '']">
    <div v-if="badge" class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-500 text-xs font-semibold tracking-wide mb-4">
      <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
      {{ badge }}
    </div>
    
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
      <slot name="title">{{ title }}</slot>
    </h2>
    
    <p v-if="description" class="text-gray-400 max-w-2xl text-lg leading-relaxed" :class="[centered ? 'mx-auto' : '']">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  badge: {
    type: String,
    default: ''
  },
  centered: {
    type: Boolean,
    default: true
  }
})
</script>
