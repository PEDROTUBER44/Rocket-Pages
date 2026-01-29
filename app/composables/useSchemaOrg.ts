/**
 * Composable para gerenciamento centralizado de Schema.org
 * Suporta Organization, FAQPage, BreadcrumbList e WebSite schemas
 */

export interface FAQItem {
    question: string;
    answer: string;
}

export interface BreadcrumbItem {
    name: string;
    url: string;
}

export interface OrganizationOptions {
    name?: string;
    url?: string;
    logo?: string;
    description?: string;
    sameAs?: string[];
    contactPoint?: {
        telephone: string;
        contactType: string;
        areaServed?: string;
        availableLanguage?: string[];
    };
    address?: {
        streetAddress?: string;
        addressLocality: string;
        addressRegion: string;
        addressCountry: string;
    };
}

export interface WebSiteOptions {
    name?: string;
    url?: string;
    searchUrl?: string;
}

/**
 * Gera Schema Organization para identificar a empresa
 */
export const useOrganizationSchema = (options?: OrganizationOptions) => {
    const config = useRuntimeConfig();
    const siteUrl = config.public?.siteUrl || 'https://rocketweb.tech';

    const defaultOptions: OrganizationOptions = {
        name: 'Rocket',
        url: siteUrl,
        logo: `${siteUrl}/logo-rocket.webp`,
        description: 'Transformação digital e inovação corporativa. Desenvolvimento Web, Apps, Cloud e Marketing Digital.',
        sameAs: [
            'https://www.linkedin.com/company/rocketpages',
            'https://www.instagram.com/rocketpages',
            'https://github.com/rocketpages'
        ],
        contactPoint: {
            telephone: '+55-11-99999-9999',
            contactType: 'customer service',
            areaServed: 'BR',
            availableLanguage: ['Portuguese', 'English']
        },
        address: {
            addressLocality: 'São Paulo',
            addressRegion: 'SP',
            addressCountry: 'BR'
        }
    };

    const merged = { ...defaultOptions, ...options };

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: merged.name,
        url: merged.url,
        logo: merged.logo,
        description: merged.description,
        sameAs: merged.sameAs,
        contactPoint: merged.contactPoint ? {
            '@type': 'ContactPoint',
            ...merged.contactPoint
        } : undefined,
        address: merged.address ? {
            '@type': 'PostalAddress',
            ...merged.address
        } : undefined
    };

    useHead({
        script: [{
            type: 'application/ld+json',
            children: JSON.stringify(schema)
        }]
    });

    return schema;
};

/**
 * Gera Schema WebSite com SearchAction para busca interna
 */
export const useWebSiteSchema = (options?: WebSiteOptions) => {
    const config = useRuntimeConfig();
    const siteUrl = config.public?.siteUrl || 'https://rocketweb.tech';

    const schema: Record<string, any> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: options?.name || 'Rocket',
        url: options?.url || siteUrl
    };

    // Adiciona SearchAction se URL de busca fornecida
    if (options?.searchUrl) {
        schema.potentialAction = {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: options.searchUrl
            },
            'query-input': 'required name=search_term_string'
        };
    }

    useHead({
        script: [{
            type: 'application/ld+json',
            children: JSON.stringify(schema)
        }]
    });

    return schema;
};

/**
 * Gera Schema FAQPage para páginas com perguntas frequentes
 */
export const useFAQSchema = (items: FAQItem[]) => {
    if (!items || items.length === 0) return null;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
            }
        }))
    };

    useHead({
        script: [{
            type: 'application/ld+json',
            children: JSON.stringify(schema)
        }]
    });

    return schema;
};

/**
 * Gera Schema BreadcrumbList para navegação estruturada
 */
export const useBreadcrumbSchema = (items: BreadcrumbItem[]) => {
    if (!items || items.length === 0) return null;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    };

    useHead({
        script: [{
            type: 'application/ld+json',
            children: JSON.stringify(schema)
        }]
    });

    return schema;
};

/**
 * Gera Schema Service para páginas de serviços
 */
export const useServiceSchema = (options: {
    name: string;
    description: string;
    provider?: string;
    url: string;
    image?: string;
    areaServed?: string;
}) => {
    const config = useRuntimeConfig();
    const siteUrl = config.public?.siteUrl || 'https://rocketweb.tech';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: options.name,
        description: options.description,
        provider: {
            '@type': 'Organization',
            name: options.provider || 'Rocket',
            url: siteUrl
        },
        url: options.url,
        image: options.image,
        areaServed: options.areaServed || 'BR'
    };

    useHead({
        script: [{
            type: 'application/ld+json',
            children: JSON.stringify(schema)
        }]
    });

    return schema;
};
