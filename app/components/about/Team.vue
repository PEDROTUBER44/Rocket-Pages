<script setup lang="ts">
const team = [
  {
    name: 'Pedro Rosendo',
    role: 'Fundador & Programador',
    description: 'Com 5 anos de experiência, lidera a visão tecnológica transformando desafios complexos em soluções elegantes.',
    gradient: 'from-blue-600 to-cyan-500',
    icon: 'i-lucide-code-2'
  },
  {
    name: 'Yasmin Melo',
    role: 'Consultora de SEO & Marketing',
    description: 'Especialista em impulsionar marcas e maximizar resultados através de estratégias digitais inteligentes.',
    gradient: 'from-pink-500 to-rose-500',
    icon: 'i-lucide-trending-up'
  }
];
</script>

<template>
  <UContainer class="mb-32">
    <div class="text-center mb-16 space-y-4">
      <h2 class="text-4xl font-bold text-white tracking-tight">
        Quem <span class="text-primary-500">Pilota</span>
      </h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        Mentes brilhantes unidas por uma obsessão: excelência.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div 
        v-for="(member, index) in team" 
        :key="index"
        class="group relative bg-[#0a0a0a]/60 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-2"
      >
        <!-- Top Gradient / Avatar Area -->
        <div class="h-32 w-full relative overflow-hidden">
             <div :class="`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`"></div>
             <!-- Icon Avatar -->
             <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl bg-[#18181b] border border-white/10 flex items-center justify-center p-1 shadow-xl z-10 group-hover:scale-110 transition-transform duration-300">
                <div :class="`w-full h-full rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center`">
                    <UIcon :name="member.icon" class="w-8 h-8 text-white" />
                </div>
             </div>
        </div>

        <div class="pt-12 pb-8 px-6 text-center space-y-3">
          <div>
            <h3 class="text-xl font-bold text-white">{{ member.name }}</h3>
            <p class="text-primary-500 text-sm font-medium uppercase tracking-wide">{{ member.role }}</p>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            {{ member.description }}
          </p>
          

        </div>
      </div>
    </div>
  </UContainer>
</template>
