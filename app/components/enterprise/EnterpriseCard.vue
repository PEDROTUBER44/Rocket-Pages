<script setup lang="ts">
import type { EnterpriseResponse } from '~/composables/useEnterprises';

const props = defineProps<{
  enterprise: EnterpriseResponse;
  showInteraction?: boolean;
}>();

const emit = defineEmits<{
  interact: [id: string, payload: { checked?: boolean; annotation?: string }];
  view: [id: string];
}>();

const { updateInteraction, isLoading } = useEnterprises();

const localChecked = ref(props.enterprise.user_interaction?.checked || false);
const localAnnotation = ref(props.enterprise.user_interaction?.annotation || '');
const isEditingNote = ref(false);

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

// Toggle check
async function toggleCheck() {
  const newChecked = !localChecked.value;
  const result = await updateInteraction(props.enterprise.id, { checked: newChecked });
  if (result) {
    localChecked.value = newChecked;
    emit('interact', props.enterprise.id, { checked: newChecked });
  }
}

// Save annotation
async function saveAnnotation() {
  const result = await updateInteraction(props.enterprise.id, { annotation: localAnnotation.value });
  if (result) {
    isEditingNote.value = false;
    emit('interact', props.enterprise.id, { annotation: localAnnotation.value });
  }
}

// View details
function viewDetails() {
  emit('view', props.enterprise.id);
}
</script>

<template>
  <UCard 
    :ui="{ 
      base: 'bg-[#0a0a0a]/80 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300',
      body: 'p-5'
    }"
  >
    <div class="flex flex-col gap-4">
      <!-- Header -->
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="text-lg font-bold text-white line-clamp-1">{{ enterprise.fantasy_name || enterprise.name }}</h3>
            <UBadge v-if="enterprise.financial.mei" color="blue" variant="soft" size="xs">MEI</UBadge>
            <UBadge v-if="enterprise.financial.simples_nacional" color="green" variant="soft" size="xs">Simples</UBadge>
          </div>
          <p class="text-sm text-gray-400 line-clamp-1">{{ enterprise.name }}</p>
        </div>
        
        <!-- Check Button (if enabled) -->
        <UButton 
          v-if="showInteraction"
          :icon="localChecked ? 'i-lucide-check-circle' : 'i-lucide-circle'"
          :color="localChecked ? 'primary' : 'gray'"
          variant="ghost"
          size="sm"
          :loading="isLoading"
          @click="toggleCheck"
          class="flex-shrink-0"
        />
      </div>

      <!-- Info Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-hash" class="w-4 h-4 text-gray-500" />
          <span class="text-gray-400">CNPJ:</span>
          <span class="text-white font-mono text-xs">{{ formatCNPJ(enterprise.cnpj) }}</span>
        </div>
        
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-briefcase" class="w-4 h-4 text-gray-500" />
          <span class="text-gray-400">CNAE:</span>
          <span class="text-white text-xs">{{ enterprise.cnae }}</span>
        </div>

        <div v-if="enterprise.address" class="flex items-center gap-2 col-span-1 md:col-span-2">
          <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-gray-500" />
          <span class="text-gray-400 line-clamp-1">
            {{ enterprise.address.city }} - {{ enterprise.address.state }}
          </span>
        </div>

        <div v-if="enterprise.contacts.length > 0" class="flex items-center gap-2 col-span-1 md:col-span-2">
          <UIcon name="i-lucide-phone" class="w-4 h-4 text-gray-500" />
          <div class="flex gap-2 flex-wrap">
            <span 
              v-for="(contact, idx) in enterprise.contacts.slice(0, 2)" 
              :key="idx"
              class="text-white text-xs"
            >
              {{ contact.type === 'email' ? contact.value : formatPhone(contact.value) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Annotation Section (if interaction enabled) -->
      <div v-if="showInteraction" class="border-t border-white/5 pt-3">
        <div v-if="!isEditingNote && !localAnnotation" class="flex items-center justify-center">
          <UButton 
            label="Adicionar Anotação" 
            icon="i-lucide-sticky-note" 
            color="gray" 
            variant="ghost" 
            size="sm"
            @click="isEditingNote = true"
          />
        </div>

        <div v-else-if="isEditingNote" class="space-y-2">
          <UTextarea 
            v-model="localAnnotation" 
            placeholder="Digite sua anotação privada..."
            :rows="3"
            :ui="{ base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' }"
          />
          <div class="flex gap-2 justify-end">
            <UButton label="Cancelar" color="gray" variant="ghost" size="xs" @click="isEditingNote = false" />
            <UButton label="Salvar" color="primary" size="xs" :loading="isLoading" @click="saveAnnotation" />
          </div>
        </div>

        <div v-else class="relative group">
          <div class="bg-white/5 rounded-md p-3 pr-10">
            <p class="text-sm text-gray-300">{{ localAnnotation }}</p>
          </div>
          <UButton 
            icon="i-lucide-pencil" 
            color="gray" 
            variant="ghost" 
            size="xs" 
            class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            @click="isEditingNote = true"
          />
        </div>
      </div>

      <!-- View Details Button -->
      <div class="border-t border-white/5 pt-3">
        <UButton 
          block 
          label="Ver Detalhes" 
          icon="i-lucide-arrow-right" 
          trailing
          color="gray" 
          variant="ghost"
          @click="viewDetails"
        />
      </div>
    </div>
  </UCard>
</template>
