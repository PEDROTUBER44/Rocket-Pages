<script setup lang="ts">
/**
 * StatsSection - Seção de estatísticas reutilizável
 * 
 * Props:
 * - stats: Array de estatísticas com value/label/icon
 * - variant: 'standalone' (com bordas) ou 'inline' (minimalista)
 */

interface Stat {
  value: string
  label: string
  icon?: string
}

interface Props {
  stats: Stat[]
  variant?: 'standalone' | 'inline'
}

withDefaults(defineProps<Props>(), {
  variant: 'standalone'
})
</script>

<template>
  <div 
    class="w-full"
    :class="variant === 'standalone' ? 'py-10 mb-24 border-y border-white/5 bg-white/[0.02]' : ''"
  >
    <div 
      class="grid divide-white/10"
      :class="[
        variant === 'standalone' ? 'grid-cols-2 md:grid-cols-4 divide-x max-w-7xl mx-auto' : 'grid-cols-2 md:grid-cols-4 gap-4'
      ]"
    >
      <div 
        v-for="stat in stats" 
        :key="stat.label" 
        class="flex flex-col items-center justify-center text-center group transition-colors"
        :class="variant === 'standalone' ? 'p-4' : ''"
      >
        <UIcon 
          v-if="stat.icon" 
          :name="stat.icon" 
          class="w-6 h-6 text-[#ca000d] mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" 
        />
        <div class="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-[#ca000d] transition-colors">
          {{ stat.value }}
        </div>
        <div class="text-xs md:text-sm text-gray-400 font-medium group-hover:text-white transition-colors uppercase tracking-wide">
          {{ stat.label }}
        </div>
      </div>
    </div>
  </div>
</template>
