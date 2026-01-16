<script setup lang="ts">
useSeoMeta({
  title: 'Política de Privacidade | Rocket Pages',
  description: 'Conheça nossa política de privacidade e saiba como tratamos seus dados pessoais.',
})
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white">
    <AppHeader />
    
    <main class="pt-32 pb-20 px-6">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-12">
          Política de <span class="text-red-500">Privacidade</span>
        </h1>
        
        <div class="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">1. Introdução</h2>
            <p class="text-gray-300 leading-relaxed">
              A Rocket Pages está comprometida em proteger a privacidade dos nossos usuários. 
              Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">2. Informações Coletadas</h2>
            <p class="text-gray-300 leading-relaxed">
              Coletamos informações que você nos fornece diretamente, como nome, email e dados de contato 
              quando você utiliza nossos serviços ou entra em contato conosco.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">3. Uso das Informações</h2>
            <p class="text-gray-300 leading-relaxed">
              Utilizamos suas informações para fornecer e melhorar nossos serviços, 
              comunicar-nos com você e enviar atualizações relevantes sobre nossos produtos.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">4. Proteção de Dados</h2>
            <p class="text-gray-300 leading-relaxed">
              Implementamos medidas de segurança técnicas e organizacionais para proteger 
              suas informações contra acesso não autorizado, alteração ou destruição.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">5. Seus Direitos</h2>
            <p class="text-gray-300 leading-relaxed">
              Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. 
              Entre em contato conosco para exercer esses direitos.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-white mb-4">6. Contato</h2>
            <p class="text-gray-300 leading-relaxed">
              Para dúvidas sobre esta política de privacidade, entre em contato através da nossa 
              <NuxtLink to="/contact" class="text-red-500 hover:text-red-400 underline">página de contato</NuxtLink>.
            </p>
          </section>
        </div>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>
