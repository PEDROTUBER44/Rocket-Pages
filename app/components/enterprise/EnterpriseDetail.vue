<script setup lang="ts">
import type { EnterpriseResponse } from '~/composables/useEnterprises';

const props = defineProps<{
  enterpriseId?: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { getEnterprise, isLoading } = useEnterprises();

const enterprise = ref<EnterpriseResponse | null>(null);

// Format CNPJ
const formatCNPJ = (cnpj: string) => {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

// Format phone
const formatPhone = (phone: string) => {
  if (phone.startsWith('+55')) {
    const cleaned = phone.replace('+55', '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
  }
  return phone;
};

// Format currency
const formatCurrency = (value?: number) => {
  if (!value) return 'N/A';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// Load enterprise
async function loadEnterprise() {
  if (props.enterpriseId) {
    const result = await getEnterprise(props.enterpriseId);
    if (result) {
      enterprise.value = result;
    }
  }
}

watch(() => props.enterpriseId, () => {
  if (props.enterpriseId) {
    loadEnterprise();
  }
}, { immediate: true });
</script>

<template>
  <UModal :model-value="!!enterpriseId" @update:model-value="emit('close')">
    <UCard :ui="{ base: 'bg-[#0a0a0a] border border-white/10', body: 'p-6' }">
      <!-- Loading -->
      <div v-if="isLoading" class="space-y-4">
        <USkeleton class="h-8 w-3/4" />
        <USkeleton class="h-4 w-1/2" />
        <USkeleton class="h-32" />
      </div>

      <!-- Content -->
      <div v-else-if="enterprise" class="space-y-6">
        <!-- Header -->
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-white mb-2">{{ enterprise.fantasy_name || enterprise.name }}</h2>
            <p class="text-sm text-gray-400">{{ enterprise.name }}</p>
          </div>
          <UButton icon="i-lucide-x" color="gray" variant="ghost" @click="emit('close')" />
        </div>

        <!-- Badges -->
        <div class="flex gap-2">
          <UBadge v-if="enterprise.financial.mei" color="blue" variant="soft">MEI</UBadge>
          <UBadge v-if="enterprise.financial.simples_nacional" color="green" variant="soft">Simples Nacional</UBadge>
        </div>

        <!-- Info Sections -->
        <div class="space-y-6">
          <!-- Basic Info -->
          <div class="border-b border-white/10 pb-4">
            <h3 class="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <UIcon name="i-lucide-info" class="w-4 h-4" />
              Informações Básicas
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span class="text-gray-400">CNPJ:</span>
                <p class="text-white font-mono mt-1">{{ formatCNPJ(enterprise.cnpj) }}</p>
              </div>
              <div>
                <span class="text-gray-400">Natureza Jurídica:</span>
                <p class="text-white mt-1">{{ enterprise.legal_nature }}</p>
              </div>
              <div>
                <span class="text-gray-400">CNAE:</span>
                <p class="text-white mt-1">{{ enterprise.cnae }}</p>
              </div>
              <div>
                <span class="text-gray-400">Descrição CNAE:</span>
                <p class="text-white mt-1">{{ enterprise.cnae_description }}</p>
              </div>
            </div>
          </div>

          <!-- Financial Info -->
          <div class="border-b border-white/10 pb-4">
            <h3 class="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <UIcon name="i-lucide-dollar-sign" class="w-4 h-4" />
              Informações Financeiras
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span class="text-gray-400">Capital Social:</span>
                <p class="text-white mt-1">{{ formatCurrency(enterprise.financial.capital) }}</p>
              </div>
              <div>
                <span class="text-gray-400">Data de Abertura:</span>
                <p class="text-white mt-1">{{ enterprise.financial.opening_date || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <!-- Address -->
          <div class="border-b border-white/10 pb-4">
            <h3 class="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4" />
              Endereço
            </h3>
            <div class="text-sm text-white space-y-1">
              <p>{{ enterprise.address.street_type }} {{ enterprise.address.street }}, {{ enterprise.address.number }}</p>
              <p v-if="enterprise.address.complement">{{ enterprise.address.complement }}</p>
              <p>{{ enterprise.address.neighborhood }}</p>
              <p>{{ enterprise.address.city }} - {{ enterprise.address.state }}</p>
              <p class="text-gray-400">CEP: {{ enterprise.address.zip }}</p>
            </div>
          </div>

          <!-- Contacts -->
          <div class="border-b border-white/10 pb-4" v-if="enterprise.contacts.length > 0">
            <h3 class="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <UIcon name="i-lucide-phone" class="w-4 h-4" />
              Contatos
            </h3>
            <div class="space-y-2">
              <div 
                v-for="(contact, idx) in enterprise.contacts" 
                :key="idx"
                class="flex items-center gap-2 text-sm"
              >
                <UBadge :color="contact.type === 'email' ? 'blue' : 'green'" variant="soft" size="xs">
                  {{ contact.type }}
                </UBadge>
                <span class="text-white">
                  {{ contact.type === 'email' ? contact.value : formatPhone(contact.value) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Owner -->
          <div v-if="enterprise.owner">
            <h3 class="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <UIcon name="i-lucide-user" class="w-4 h-4" />
              Proprietário/Sócio
            </h3>
            <div class="text-sm">
              <p class="text-white font-medium">{{ enterprise.owner.name }}</p>
              <p class="text-gray-400 mt-1">{{ enterprise.owner.role }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="text-center py-8">
        <UIcon name="i-lucide-alert-circle" class="w-12 h-12 mx-auto mb-4 text-red-500" />
        <p class="text-white">Erro ao carregar detalhes da empresa</p>
      </div>
    </UCard>
  </UModal>
</template>
