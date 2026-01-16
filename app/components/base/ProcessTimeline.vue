<script setup lang="ts">
/**
 * ProcessTimeline - Timeline de processo/metodologia reutilizável
 * 
 * Props:
 * - steps: Array de passos com title/desc/icon
 * - showNumbers: Mostrar badges numéricas (default: true)
 */

interface Step {
  title: string
  desc: string
  icon: string
}

interface Props {
  steps: Step[]
  showNumbers?: boolean
}

withDefaults(defineProps<Props>(), {
  showNumbers: true
})
</script>

<template>
  <div class="grid md:grid-cols-4 gap-8 relative">
    <!-- Connecting Line (Desktop) -->
    <div class="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-white/10 z-0"></div>
    
    <!-- Connecting Line (Mobile) -->
    <div class="md:hidden absolute top-4 bottom-24 left-1/2 w-px bg-white/10 -translate-x-1/2 z-0"></div>

    <div 
      v-for="(step, index) in steps" 
      :key="index" 
      class="relative z-10 flex flex-col items-center text-center group reveal-on-scroll"
      :style="{ transitionDelay: `${index * 150}ms` }"
    >
      <div class="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#ca000d] transition-all duration-300 relative">
        <UIcon :name="step.icon" class="w-7 h-7 text-white group-hover:text-[#ca000d] transition-colors" />
        
        <!-- Number Badge -->
        <div 
          v-if="showNumbers" 
          class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#ca000d] text-white text-xs font-bold flex items-center justify-center border-2 border-[#050505]"
        >
          {{ index + 1 }}
        </div>
      </div>
      
      <h3 class="text-lg font-bold text-white mb-2">{{ step.title }}</h3>
      <p class="text-sm text-gray-400 max-w-[220px] leading-relaxed">{{ step.desc }}</p>
    </div>
  </div>
</template>
