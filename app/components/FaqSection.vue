<script setup lang="ts">

// Define Props
interface FaqItem {
  label: string;
  content: string;
}

const props = withDefaults(defineProps<{
  items: FaqItem[];
  title?: string;
  description?: string;
  showContactLink?: boolean;
}>(), {
  title: 'Perguntas Frequentes',
  description: 'Tiramos suas dúvidas para você focar no que importa.',
  showContactLink: true
});

// Animation Logic
const rootEl = ref<HTMLElement | null>(null);

const sanitizedItems = computed(() => {
  return props.items.map(item => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { slot, ...rest } = item as any;
    return rest;
  });
});

onMounted(() => {
  if (!rootEl.value) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  observer.observe(rootEl.value);
});
</script>

<template>
  <div ref="rootEl" class="mb-32 max-w-4xl mx-auto relative faq-reveal-on-scroll" style="transition-delay: 200ms;">
     <!-- Gradient Effect -->
     <div class="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent pointer-events-none -mx-20"></div>

     <div class="relative z-10 text-center mb-16">
        <span class="text-primary-500 font-semibold tracking-wider text-sm uppercase mb-3 block">Tire suas dúvidas</span>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">{{ title }}</h2>
        <p class="text-gray-400 max-w-xl mx-auto">{{ description }}</p>
     </div>
     
     <UAccordion 
       :items="sanitizedItems" 
       multiple
       :ui="{
         root: 'flex flex-col gap-4',
         item: 'border border-white/10 rounded-2xl bg-black/40 backdrop-blur-sm overflow-hidden',
         trigger: 'group flex items-center justify-between w-full px-6 py-5 text-left hover:bg-white/5 transition-all focus:outline-none',
         content: 'px-6 pt-4 pb-5 text-gray-400 text-base leading-relaxed border-t border-white/10',
         label: 'text-white font-medium text-base',
         trailingIcon: 'w-5 h-5 text-primary-500 transition-transform duration-200 group-data-[state=open]:rotate-180'
       }"
     />

     <p v-if="showContactLink" class="text-center text-gray-500 mt-12 text-sm">
       Ainda tem dúvidas? 
       <NuxtLink to="/contact" class="text-primary-500 hover:text-primary-400 transition-colors font-medium">Entre em contato conosco</NuxtLink>
     </p>
  </div>
</template>

<style scoped>
.faq-reveal-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1), 
              transform 1s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.faq-reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0) translateZ(0);
}
</style>
