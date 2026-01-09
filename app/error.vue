<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <UApp>
    <div
      class="min-h-screen flex flex-col items-center justify-center bg-[#08090a] text-center px-4"
    >
      <p class="text-primary font-bold tracking-wide uppercase">404</p>
      <h1
        class="mt-4 text-5xl font-extrabold text-white tracking-tight sm:text-6xl"
      >
        Pagina não encontrada
      </h1>
      <p class="mt-6 text-lg leading-7 text-gray-400">
        A página que você está procurando não existe.
      </p>
      <div class="mt-10 flex justify-center gap-x-6">
        <UButton
          label="Voltar para o Inicio"
          size="lg"
          color="primary"
          class="text-white"
          @click="handleError"
        />
      </div>
    </div>
  </UApp>
</template>
