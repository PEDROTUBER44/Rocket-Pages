<script setup lang="ts">
// Schema.org - Organization (dados estruturados para organização)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Rocket Pages",
  "url": "https://rocketweb.tech",
  "logo": "https://rocketweb.tech/logo-rocket.webp",
  "description": "Transformação Digital e Inovação Corporativa. Soluções de Desenvolvimento Web, Cloud, Marketing e Fitness.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Portuguese"
  },
  "sameAs": [
    "https://www.linkedin.com/company/rocket-pages",
    "https://www.instagram.com/rocket.pages",
    "https://www.youtube.com/@rocketfitness1",
    "https://www.tiktok.com/@rocketfitness1"
  ]
};

// Schema.org - WebSite (dados estruturados para site com busca)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Rocket Pages",
  "url": "https://rocketweb.tech",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://rocketweb.tech/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(organizationSchema)
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(websiteSchema)
    }
  ]
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
