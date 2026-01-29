import type { BreadcrumbItem } from './useSchemaOrg';

export interface AppSeoOptions {
    title: string;
    description?: string;
    image?: string;
    /**
     * Caminho relativo (ex: '/servicos') ou absoluto.
     * Se não informado, tenta usar a rota atual.
     */
    path?: string;
    /**
     * Tipo de cartão do Twitter. Padrão: 'summary_large_image'
     */
    twitterCard?: 'summary_large_image' | 'summary';
    /**
     * Tipo OpenGraph (website, article, etc). Padrão: 'website'
     */
    type?: 'website' | 'article' | 'profile';
    /**
     * Se false, adiciona meta noindex/nofollow. Padrão: true
     */
    index?: boolean;
    /**
     * Lista de breadcrumbs para Schema.org BreadcrumbList
     */
    breadcrumbs?: BreadcrumbItem[];
    /**
     * Data de publicação (para artigos)
     */
    publishedTime?: string;
    /**
     * Data de modificação (para artigos)
     */
    modifiedTime?: string;
}

export const useAppSeo = (options: AppSeoOptions) => {
    const {
        title,
        description,
        image,
        path,
        twitterCard = 'summary_large_image',
        type = 'website',
        index = true,
        breadcrumbs,
        publishedTime,
        modifiedTime,
    } = options;

    const route = useRoute();
    const config = useRuntimeConfig();

    // URL Base do site (definida no nuxt.config ou fallback)
    const siteUrl = config.public?.siteUrl || 'https://rocketweb.tech';

    // Título final (padrão: "Título | Rocket")
    // Se o título já contém "Rocket" (ex: "Rocket Fitness"), não adiciona sufixo
    const siteName = 'Rocket';
    const fullTitle = title.toLowerCase().includes('rocket') ? title : `${title} | ${siteName}`;

    // Descrição Padrão
    const defaultDesc = 'Transforme seu negócio com soluções digitais de alta performance. Desenvolvimento Web, Apps e Design que geram resultados.';
    const finalDesc = description || defaultDesc;

    // Imagem (OG)
    // Se image começar com http, usa ela. Se não, resolve com siteUrl.
    // Fallback para uma imagem padrão se não fornecida.
    const defaultImage = '/og-default.png'; // Imagem padrão OG para redes sociais
    const rawImage = image || defaultImage;
    const ogImage = rawImage.startsWith('http')
        ? rawImage
        : `${siteUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

    // URL Canônica
    const currentPath = path || route.path;
    // Remove slash final se existir para consistência, exceto raiz
    const cleanPath = currentPath !== '/' && currentPath.endsWith('/')
        ? currentPath.slice(0, -1)
        : currentPath;

    const canonicalUrl = `${siteUrl}${cleanPath}`;

    // Robots
    const robotsValue = index ? 'index, follow' : 'noindex, nofollow';

    // Monta objeto de meta tags
    const seoMetaConfig: Record<string, any> = {
        title: fullTitle,
        description: finalDesc,

        // Open Graph
        ogTitle: fullTitle,
        ogDescription: finalDesc,
        ogImage: ogImage,
        ogUrl: canonicalUrl,
        ogType: type,
        ogSiteName: siteName,
        ogLocale: 'pt_BR',

        // Twitter
        twitterCard: twitterCard,
        twitterTitle: fullTitle,
        twitterDescription: finalDesc,
        twitterImage: ogImage,
        twitterSite: '@rocket',

        // Robots
        robots: robotsValue,
    };

    // Adiciona datas de artigo se fornecidas
    if (type === 'article') {
        if (publishedTime) {
            seoMetaConfig.articlePublishedTime = publishedTime;
        }
        if (modifiedTime) {
            seoMetaConfig.articleModifiedTime = modifiedTime;
        }
    }

    // Aplica Meta Tags
    useSeoMeta(seoMetaConfig);

    // Configuração do useHead
    const headConfig: {
        link: { rel: string; href: string }[];
        htmlAttrs: { lang: string };
        script?: { type: string; children: string }[];
    } = {
        link: [
            { rel: 'canonical', href: canonicalUrl }
        ],
        htmlAttrs: {
            lang: 'pt-BR'
        }
    };

    // Adicionar Breadcrumb Schema se fornecido
    if (breadcrumbs && breadcrumbs.length > 0) {
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }))
        };

        headConfig.script = [{
            type: 'application/ld+json',
            children: JSON.stringify(breadcrumbSchema)
        }];
    }

    useHead(headConfig);

    return {
        fullTitle,
        canonicalUrl
    };
};
