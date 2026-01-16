<script setup lang="ts">
useSeoMeta({
  title: 'Termos de Uso | Rocket Pages',
  description: 'Leia nossos termos de uso e condições para utilizar os serviços da Rocket Pages.',
})
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white">
    <AppHeader />
    
    <main class="pt-32 pb-20 px-6">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-12">
          Termos de <span class="text-red-500">Uso</span>
        </h1>
        
        <div class="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">1. Aceitação dos Termos</h2>
            <p class="text-gray-300 leading-relaxed">
              Ao acessar e usar os serviços da Rocket Pages, você concorda em cumprir 
              estes termos de uso e todas as leis e regulamentos aplicáveis.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">2. Uso dos Serviços</h2>
            <p class="text-gray-300 leading-relaxed">
              Você concorda em usar nossos serviços apenas para fins legais e de acordo 
              com estes termos. É proibido usar os serviços de maneira que possa danificar, 
              desabilitar ou sobrecarregar nossos sistemas.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">3. Propriedade Intelectual</h2>
            <p class="text-gray-300 leading-relaxed">
              Todo o conteúdo, marcas e materiais disponibilizados através de nossos serviços 
              são de propriedade da Rocket Pages ou de seus licenciadores e são protegidos 
              por leis de propriedade intelectual.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">4. Limitação de Responsabilidade</h2>
            <p class="text-gray-300 leading-relaxed">
              A Rocket Pages não será responsável por quaisquer danos diretos, indiretos, 
              incidentais ou consequenciais decorrentes do uso ou incapacidade de usar nossos serviços.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">5. Modificações</h2>
            <p class="text-gray-300 leading-relaxed">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              As alterações entrarão em vigor imediatamente após sua publicação no site.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">6. Contato</h2>
            <p class="text-gray-300 leading-relaxed">
              Para dúvidas sobre estes termos de uso, entre em contato através da nossa 
              <NuxtLink to="/contact" class="text-red-500 hover:text-red-400 underline">página de contato</NuxtLink>.
            </p>
          </section>
        </div>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>
