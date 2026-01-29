export default defineNuxtPlugin((nuxtApp) => {
    const unauthorizedCount = useState<number>('unauthorized_count', () => 0);

    // Patch global $fetch to intercept 401s
    const originalFetch = globalThis.$fetch;

    globalThis.$fetch = originalFetch.create({
        async onResponseError(context) {
            const { response } = context;
            if (response.status === 401) {
                unauthorizedCount.value++;

                if (import.meta.dev) {
                    console.log(`[Auth Interceptor] 401 detected. Count: ${unauthorizedCount.value}`);
                }

                if (unauthorizedCount.value >= 3) {
                    if (import.meta.dev) {
                        console.warn('[Auth Interceptor] 401 limit reached (3). Auto-logging out.');
                    }

                    // Reset count to prevent loops
                    unauthorizedCount.value = 0;

                    // Execute logout logic
                    const { logout } = useAuth();
                    await logout();
                }
            }
            // Chain original handler if needed, but custom create extends options, 
            // unfortunately chaining onResponseError of previous instance is not automatic in options.
            // But usually there isn't one on the base instance.
        }
    });
});
