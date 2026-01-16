<script setup lang="ts">
useSeoMeta({
  title: 'Política de Cookies | Rocket Pages',
  description: 'Saiba como a Rocket Pages utiliza cookies para melhorar sua experiência.',
})
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white">
    <AppHeader />
    
    <main class="pt-32 pb-20 px-6">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-12">
          Política de <span class="text-red-500">Cookies</span>
        </h1>
        
        <div class="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">1. O que são Cookies?</h2>
            <p class="text-gray-300 leading-relaxed">
              Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo 
              quando você visita nosso site. Eles nos ajudam a proporcionar uma melhor experiência de navegação.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">2. Tipos de Cookies que Usamos</h2>
            <p class="text-gray-300 leading-relaxed mb-4">
              Utilizamos os seguintes tipos de cookies:
            </p>
            <ul class="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento do site.</li>
              <li><strong>Cookies de Desempenho:</strong> Nos ajudam a entender como você usa o site.</li>
              <li><strong>Cookies de Funcionalidade:</strong> Lembram suas preferências e configurações.</li>
              <li><strong>Cookies de Marketing:</strong> Usados para exibir anúncios relevantes.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">3. Google Analytics</h2>
            <p class="text-gray-300 leading-relaxed">
              Utilizamos o Google Analytics para coletar informações sobre como os visitantes 
              usam nosso site. Essas informações são usadas para melhorar nossos serviços.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">4. Gerenciamento de Cookies</h2>
            <p class="text-gray-300 leading-relaxed">
              Você pode controlar e gerenciar cookies através das configurações do seu navegador. 
              No entanto, desabilitar cookies pode afetar a funcionalidade do site.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">5. Atualizações desta Política</h2>
            <p class="text-gray-300 leading-relaxed">
              Podemos atualizar esta política de cookies periodicamente. 
              Recomendamos que você revise esta página regularmente para estar ciente de quaisquer alterações.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">6. Contato</h2>
            <p class="text-gray-300 leading-relaxed">
              Para dúvidas sobre nossa política de cookies, entre em contato através da nossa 
              <NuxtLink to="/contact" class="text-red-500 hover:text-red-400 underline">página de contato</NuxtLink>.
            </p>
          </section>
        </div>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>
