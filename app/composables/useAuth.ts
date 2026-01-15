export const useAuth = () => {
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const csrfCookie = useCsrfCookie();

    // Global user state shared across app
    const user = useState<any>('auth_user', () => null);

    async function login(payload: any) {
        const res = await _submit('/api/auth/login', payload);
        if (res && res.user) {
            user.value = res.user;
        }
        return res;
    }

    async function register(payload: any) {
        const res = await _submit('/api/auth/register', payload);
        if (res && res.user) {
            user.value = res.user;
        }
        return res;
    }

    async function fetchUser() {
        try {
            const res = await $fetch<any>('/api/users/me');
            if (res && res.user) {
                user.value = res.user;
            } else if (res) {
                // Fallback if the API returns the user object directly
                user.value = res;
            }
        } catch (e) {
            user.value = null;
        }
    }

    async function logout() {
        try {
            await $fetch('/api/auth/logout', { method: 'POST' });
        } catch (e) {
            console.error('Logout error', e);
        } finally {
            user.value = null;
            navigateTo('/login');
        }
    }

    async function _submit(endpoint: string, payload: any) {
        isLoading.value = true;
        error.value = null;
        try {
            const res = await $fetch<any>(endpoint, {
                method: 'POST',
                body: payload,
                onResponse({ response }) {
                    if (response._data?.csrf_token) {
                        csrfCookie.value = response._data.csrf_token;
                    }
                }
            });
            return res;
        } catch (e: any) {
            let msg = "Erro na operação.";
            if (e.response?._data?.error) {
                msg = e.response._data.error;
            } else if (e.data?.error) {
                msg = e.data.error;
            } else if (e.message) {
                msg = e.message;
            }

            const status = e.response?.status;
            if (status === 401) msg = "Credenciais inválidas.";
            if (status === 429) msg = "Muitas tentativas. Aguarde.";
            if (status === 409) msg = "Usuário já existe.";

            error.value = msg;

            e.formattedMessage = msg;
            throw e;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        isLoading,
        error,
        user,
        login,
        register,
        logout,
        fetchUser
    };
};
