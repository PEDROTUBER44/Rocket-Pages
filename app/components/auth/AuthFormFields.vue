<script setup lang="ts">
interface AuthState {
  name: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

const props = defineProps<{
  state: AuthState;
  isRegister?: boolean;
}>();
</script>

<template>
  <div class="space-y-6">
    <UFormField v-if="isRegister" name="name" class="space-y-2">
      <UInput
        v-model="state.name"
        placeholder="Nome Completo"
        class="w-full"
        size="xl"
        icon="i-lucide-user"
        :ui="{
          base: 'bg-white/5 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-primary-500 border-0 placeholder-gray-500 rounded-2xl px-4 py-3',
          leading: 'text-gray-400'
        }"
      />
    </UFormField>

    <UFormField name="username" class="space-y-2">
      <UInput
        v-model="state.username"
        placeholder="Usuário"
        class="w-full"
        size="xl"
        icon="i-lucide-user"
        :ui="{
          base: 'bg-white/5 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-primary-500 border-0 placeholder-gray-500 rounded-2xl px-4 py-3',
          leading: 'text-gray-400'
        }"
      />
    </UFormField>

    <UFormField name="password" class="space-y-2">
      <UInput
        v-model="state.password"
        type="password"
        placeholder="Sua senha segura"
        class="w-full"
        size="xl"
        icon="i-lucide-lock"
        :ui="{
          base: 'bg-white/5 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-primary-500 border-0 placeholder-gray-500 rounded-2xl px-4 py-3',
          leading: 'text-gray-400'
        }"
      />
    </UFormField>

    <UFormField
      v-if="isRegister"
      name="confirmPassword"
      class="space-y-2"
    >
      <UInput
        v-model="state.confirmPassword"
        type="password"
        placeholder="Confirme sua senha"
        class="w-full"
        size="xl"
        icon="i-lucide-lock-keyhole"
        :ui="{
          base: 'bg-white/5 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-primary-500 border-0 placeholder-gray-500 rounded-2xl px-4 py-3',
          leading: 'text-gray-400'
        }"
      />
    </UFormField>
  </div>
</template>
