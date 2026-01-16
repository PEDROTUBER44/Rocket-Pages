/**
 * Composable for scroll reveal animations
 * Content is visible by default for SSR performance.
 * Animation is applied only after JavaScript hydration.
 */
export const useScrollReveal = () => {
    const setupScrollAnimation = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const elements = document.querySelectorAll('.reveal-on-scroll');

        // First, prepare elements for animation (add transform state)
        elements.forEach(el => {
            el.classList.add('will-animate');
        });

        // Force a reflow to ensure the class is applied before observing
        void document.body.offsetHeight;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(el => observer.observe(el));
    };

    return {
        setupScrollAnimation
    };
};
