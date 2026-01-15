export const useCsrfCookie = () => {
    return useCookie('csrf_token', {
        sameSite: 'strict',
        path: '/',
        secure: import.meta.client ? location.protocol === 'https:' : false
    });
};
