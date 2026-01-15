<template>
    <footer class="bg-black border-t border-white/10 pt-20 pb-10 relative z-20">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <!-- Brand Column -->
                <div class="col-span-2 md:col-span-1">
                    <NuxtLink to="/" class="flex items-center mb-6" aria-label="Ir para página inicial">
                        <img src="/logo-rocket.webp" alt="Logo Rocket Pages - Transformação Digital" class="h-10 w-auto" loading="lazy" />
                    </NuxtLink>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        Impulsionando a inovação corporativa através de tecnologia de ponta, segurança e performance.
                    </p>
                </div>

                <!-- Soluções Column -->
                <div>
                    <h4 class="text-white font-bold mb-4">Soluções</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><NuxtLink to="/services/cloud" class="hover:text-red-500 transition-colors">Rocket Cloud</NuxtLink></li>
                        <li><NuxtLink to="/services/fitness" class="hover:text-red-500 transition-colors">Rocket Fitness</NuxtLink></li>
                        <li><NuxtLink to="/services/devel" class="hover:text-red-500 transition-colors">Rocket Devel</NuxtLink></li>
                        <li><NuxtLink to="/services/marketing" class="hover:text-red-500 transition-colors">Rocket Marketing</NuxtLink></li>
                    </ul>
                </div>

                <!-- Empresa Column -->
                <div>
                    <h4 class="text-white font-bold mb-4">Empresa</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><NuxtLink to="/about" class="hover:text-red-500 transition-colors">Sobre Nós</NuxtLink></li>
                        <li><NuxtLink to="/servicos" class="hover:text-red-500 transition-colors">Serviços</NuxtLink></li>
                        <li><NuxtLink to="/empresas" class="hover:text-red-500 transition-colors">Para Empresas</NuxtLink></li>
                        <li><NuxtLink to="/contact" class="hover:text-red-500 transition-colors">Contato</NuxtLink></li>
                    </ul>
                </div>

                <!-- Legal Column -->
                <div>
                    <h4 class="text-white font-bold mb-4">Legal</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><NuxtLink to="/privacidade" class="hover:text-red-500 transition-colors">Privacidade</NuxtLink></li>
                        <li><NuxtLink to="/termos" class="hover:text-red-500 transition-colors">Termos de Uso</NuxtLink></li>
                        <li><NuxtLink to="/cookies" class="hover:text-red-500 transition-colors">Política de Cookies</NuxtLink></li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-sm text-gray-500">© 2025 Rocket Enterprise Inc. Todos os direitos reservados.</p>
                
                <!-- Social Icons -->
                <div class="flex gap-6">
                    <NuxtLink 
                        to="https://www.instagram.com/rocket.fitness" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="text-gray-500 hover:text-white transition-colors"
                        aria-label="Seguir no Instagram"
                    >
                        <span class="sr-only">Instagram</span>
                        <UIcon name="i-lucide-instagram" class="w-5 h-5"/>
                    </NuxtLink>
                    <NuxtLink 
                        to="https://www.youtube.com/@rocketfitness1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="text-gray-500 hover:text-white transition-colors"
                        aria-label="Inscrever no YouTube"
                    >
                        <span class="sr-only">YouTube</span>
                        <UIcon name="i-simple-icons-youtube" class="w-5 h-5"/>
                    </NuxtLink>
                    <NuxtLink 
                        to="https://www.tiktok.com/@rocketfitness1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="text-gray-500 hover:text-white transition-colors"
                        aria-label="Seguir no TikTok"
                    >
                        <span class="sr-only">TikTok</span>
                        <UIcon name="i-simple-icons-tiktok" class="w-5 h-5"/>
                    </NuxtLink>

                </div>
            </div>
            
             <div class="mt-6 text-center">
                <p class="text-xs text-gray-600 italic">
                    "Porque dele, e por meio dele, e para ele são todas as coisas. A ele seja a glória para sempre. Amém!" (Rm 11:36)
                </p>
            </div>
        </div>
    </footer>
</template>
