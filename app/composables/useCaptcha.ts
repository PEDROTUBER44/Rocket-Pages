export const useCaptcha = () => {
    const toast = useToast();
    const captchaImage = ref("");
    const captchaId = ref("");
    const captchaInput = ref("");
    const isLoading = ref(false);

    async function fetchCaptcha() {
        isLoading.value = true;
        try {
            const res = await $fetch<{ image: string; captcha_id: string }>('/api/auth/captcha');
            captchaImage.value = res.image;
            captchaId.value = res.captcha_id;
            captchaInput.value = "";
        } catch (e) {
            console.error('Erro ao carregar captcha', e);
            toast.add({ title: 'Erro', description: 'Erro ao carregar verificação de segurança', color: 'primary' });
        } finally {
            isLoading.value = false;
        }
    }

    return {
        captchaImage,
        captchaId,
        captchaInput,
        isLoading,
        fetchCaptcha
    };
};
