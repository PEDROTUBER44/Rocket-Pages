<script setup lang="ts">
import type { EnterpriseResponse, PaginatedResponse } from '~/composables/useEnterprises';

const props = defineProps<{
  showInteraction?: boolean;
}>();

const emit = defineEmits<{
  viewEnterprise: [id: string];
}>();

const { fetchEnterprises, isLoading } = useEnterprises();

const enterprises = ref<EnterpriseResponse[]>([]);
const currentPage = ref(0);
const totalEntries = ref(0);
const hasMore = ref(false);

// Load enterprises
async function loadEnterprises(page: number = 0) {
  const result = await fetchEnterprises(page, 20);
  if (result) {
    enterprises.value = result.data;
    currentPage.value = result.page;
    totalEntries.value = result.total;
    hasMore.value = result.has_more;
  }
}

// Pagination handlers
function nextPage() {
  if (hasMore.value) {
    loadEnterprises(currentPage.value + 1);
  }
}

function prevPage() {
  if (currentPage.value > 0) {
    loadEnterprises(currentPage.value - 1);
  }
}

// Handle interaction updates
function handleInteract(id: string, payload: any) {
  // Find and update locally
  const enterprise = enterprises.value.find(e => e.id === id);
  if (enterprise && enterprise.user_interaction) {
    if (payload.checked !== undefined) {
      enterprise.user_interaction.checked = payload.checked;
    }
    if (payload.annotation !== undefined) {
      enterprise.user_interaction.annotation = payload.annotation;
    }
  }
}

// Handle view details
function handleView(id: string) {
  emit('viewEnterprise', id);
}

// Load on mount
onMounted(() => {
  loadEnterprises();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="isLoading && enterprises.length === 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <USkeleton v-for="i in 6" :key="i" class="h-64 rounded-2xl" />
    </div>

    <!-- Empty State -->
    <div v-else-if="enterprises.length === 0 && !isLoading" class="text-center py-16">
      <UIcon name="i-lucide-building-2" class="w-16 h-16 mx-auto mb-4 text-gray-600" />
      <h3 class="text-xl font-bold text-white mb-2">Nenhuma empresa encontrada</h3>
      <p class="text-gray-400">Não há empresas disponíveis no momento.</p>
    </div>

    <!-- Enterprises Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <EnterpriseCard
        v-for="enterprise in enterprises"
        :key="enterprise.id"
        :enterprise="enterprise"
        :show-interaction="showInteraction"
        @interact="handleInteract"
        @view="handleView"
      />
    </div>

    <!-- Pagination -->
    <div v-if="totalEntries > 0" class="flex items-center justify-between border-t border-white/10 pt-6">
      <div class="text-sm text-gray-400">
        Página {{ currentPage + 1 }} • Total: {{ totalEntries }} empresas
      </div>
      
      <div class="flex gap-2">
        <UButton 
          icon="i-lucide-chevron-left" 
          color="gray" 
          variant="ghost"
          :disabled="currentPage === 0 || isLoading"
          @click="prevPage"
        >
          Anterior
        </UButton>
        <UButton 
          icon="i-lucide-chevron-right" 
          trailing
          color="gray" 
          variant="ghost"
          :disabled="!hasMore || isLoading"
          @click="nextPage"
        >
          Próxima
        </UButton>
      </div>
    </div>
  </div>
</template>
