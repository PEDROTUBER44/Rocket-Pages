<script setup lang="ts">
import type { EnterpriseResponse, SearchParams } from '~/composables/useEnterprises';

const emit = defineEmits<{
  search: [results: EnterpriseResponse[], total: number];
}>();

const { searchEnterprises, isLoading } = useEnterprises();

const searchQuery = ref('');
const filterChecked = ref(false);
const filterHasAnnotation = ref(false);

// Perform search
async function performSearch() {
  const params: SearchParams = {
    q: searchQuery.value || undefined,
    filter_checked: filterChecked.value,
    filter_has_annotation: filterHasAnnotation.value,
    page: 0,
    limit: 20
  };

  const result = await searchEnterprises(params);
  if (result) {
    emit('search', result.data, result.total);
  }
}

// Clear filters
function clearFilters() {
  searchQuery.value = '';
  filterChecked.value = false;
  filterHasAnnotation.value = false;
  performSearch();
}

// Watch for changes
watch([searchQuery, filterChecked, filterHasAnnotation], () => {
  performSearch();
});
</script>

<template>
  <div class="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
    <div class="flex flex-col gap-4">
      <!-- Search Input -->
      <div class="flex-1">
        <UInput 
          v-model="searchQuery"
          icon="i-lucide-search"
          size="lg"
          placeholder="Buscar por nome, CNPJ, cidade..."
          :loading="isLoading"
          :ui="{ 
            base: 'bg-white/5 border-white/10 text-white placeholder:text-gray-500',
            leadingIcon: 'text-gray-400'
          }"
        />
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-3">
        <div class="text-sm text-gray-400 font-medium">Filtros:</div>
        
        <UCheckbox 
          v-model="filterChecked" 
          label="Apenas Marcadas"
          :ui="{ 
            base: 'text-white',
            label: 'text-sm text-gray-300'
          }"
        />
        
        <UCheckbox 
          v-model="filterHasAnnotation" 
          label="Com Anotações"
          :ui="{ 
            base: 'text-white',
            label: 'text-sm text-gray-300'
          }"
        />

        <UButton 
          v-if="searchQuery || filterChecked || filterHasAnnotation"
          label="Limpar Filtros" 
          icon="i-lucide-x" 
          color="gray" 
          variant="ghost" 
          size="xs"
          @click="clearFilters"
          class="ml-auto"
        />
      </div>
    </div>
  </div>
</template>
