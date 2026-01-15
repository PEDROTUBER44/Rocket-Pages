<script setup lang="ts">
const partners = [
  { name: 'Nebula Systems', icon: 'i-lucide-cloud-lightning' },
  { name: 'Quantum Soft', icon: 'i-lucide-box-select' },
  { name: 'Vertex Solutions', icon: 'i-lucide-layers' },
  { name: 'Alpha Dynamics', icon: 'i-lucide-triangle' },
  { name: 'Omni Tech', icon: 'i-lucide-globe-2' }
];
</script>

<template>
  <UContainer class="mb-32">
     <div class="border-t border-b border-white/5 py-12 bg-white/[0.02]">
        <p class="text-center text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">
            Empresas que confiam na nossa tecnologia
        </p>
        
        <div class="flex flex-wrap justify-center gap-12 md:gap-20 opacity-60">
            <div 
                v-for="(partner, index) in partners" 
                :key="index" 
                class="flex items-center gap-3 group grayscale hover:grayscale-0 transition-all duration-500 cursor-default"
            >
                <div class="p-2 bg-white/5 rounded-lg group-hover:bg-primary-500/10 transition-colors">
                    <UIcon :name="partner.icon" class="w-8 h-8 text-white group-hover:text-primary-500 transition-colors" />
                </div>
                <span class="text-xl font-bold text-gray-400 group-hover:text-white transition-colors">{{ partner.name }}</span>
            </div>
        </div>
     </div>
  </UContainer>
</template>
