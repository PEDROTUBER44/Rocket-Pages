// Types
export interface Contact {
    type: string;
    value: string;
}

export interface Owner {
    name: string;
    role: string;
}

export interface Address {
    street_type: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    zip: string;
    city: string;
    state: string;
}

export interface FinancialInfo {
    capital?: number;
    mei: boolean;
    simples_nacional: boolean;
    opening_date?: string;
}

export interface UserInteraction {
    checked: boolean;
    annotation?: string;
    updated_at: string;
}

export interface EnterpriseResponse {
    id: string;
    cnpj: string;
    name: string;
    fantasy_name: string;
    legal_nature: string;
    cnae: string;
    cnae_description: string;
    financial: FinancialInfo;
    contacts: Contact[];
    owner?: Owner;
    address: Address;
    user_interaction?: UserInteraction;
}

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    total: number;
    has_more: boolean;
}

export interface SearchParams {
    q?: string;
    filter_checked?: boolean;
    filter_has_annotation?: boolean;
    page?: number;
    limit?: number;
}

export const useEnterprises = () => {
    const csrfCookie = useCsrfCookie();
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // Fetch enterprises with pagination
    async function fetchEnterprises(page: number = 0, limit: number = 20): Promise<PaginatedResponse<EnterpriseResponse> | null> {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await $fetch<PaginatedResponse<EnterpriseResponse>>('/api/enterprise_informations', {
                method: 'GET',
                params: { page, limit }
            });
            return response;
        } catch (e: any) {
            error.value = e.response?._data?.error || 'Erro ao buscar empresas';
            console.error('Fetch enterprises error:', e);
            return null;
        } finally {
            isLoading.value = false;
        }
    }

    // Search enterprises with filters
    async function searchEnterprises(params: SearchParams): Promise<PaginatedResponse<EnterpriseResponse> | null> {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await $fetch<PaginatedResponse<EnterpriseResponse>>('/api/enterprise_informations/search', {
                method: 'GET',
                params: {
                    q: params.q || undefined,
                    filter_checked: params.filter_checked || false,
                    filter_has_annotation: params.filter_has_annotation || false,
                    page: params.page || 0,
                    limit: params.limit || 20
                }
            });
            return response;
        } catch (e: any) {
            error.value = e.response?._data?.error || 'Erro ao buscar empresas';
            console.error('Search enterprises error:', e);
            return null;
        } finally {
            isLoading.value = false;
        }
    }

    // Get single enterprise by ID
    async function getEnterprise(id: string): Promise<EnterpriseResponse | null> {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await $fetch<EnterpriseResponse>(`/api/enterprise_informations/${id}`, {
                method: 'GET'
            });
            return response;
        } catch (e: any) {
            error.value = e.response?._data?.error || 'Erro ao buscar empresa';
            console.error('Get enterprise error:', e);
            return null;
        } finally {
            isLoading.value = false;
        }
    }

    // Update user interaction (check/annotation)
    async function updateInteraction(
        enterpriseId: string,
        payload: { checked?: boolean; annotation?: string }
    ): Promise<UserInteraction | null> {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await $fetch<UserInteraction>(`/api/enterprise_informations/${enterpriseId}/interact`, {
                method: 'PATCH',
                headers: {
                    'X-CSRF-Token': csrfCookie.value || ''
                },
                body: payload
            });
            return response;
        } catch (e: any) {
            error.value = e.response?._data?.error || 'Erro ao atualizar interação';
            console.error('Update interaction error:', e);
            return null;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        isLoading,
        error,
        fetchEnterprises,
        searchEnterprises,
        getEnterprise,
        updateInteraction
    };
};
