<script setup lang="ts">
// --- Trust Items Data (Why Rocket Fitness) ---
const trustItems = [
  {
    icon: 'i-lucide-smartphone',
    title: 'App Completo',
    desc: 'Tudo em um só lugar: treinos, retrospectivas, sono, saúde mental, gamificação e rede social fitness.'
  },
  {
    icon: 'i-lucide-users',
    title: '2M+ Usuários Ativos',
    desc: 'Uma comunidade vibrante que se motiva, compartilha treinos e cresce junto todos os dias.'
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Dados Seguros',
    desc: 'Conformidade total com LGPD e criptografia de ponta para proteger seus dados de saúde.'
  }
];

// --- Solution Cards Data (For Gyms) ---
const solutions = [
  {
    icon: 'i-lucide-users',
    title: 'CRM Inteligente',
    description: 'Gestão completa de alunos, recuperação automática de inativos e comunicação segmentada.',
    featured: false
  },
  {
    icon: 'i-lucide-video',
    title: 'Rocket Live & VOD',
    description: 'Aulas ao vivo e gravadas para seus alunos treinarem em casa com sua metodologia.',
    featured: false,
    badge: 'Em breve'
  },
  {
    icon: 'i-lucide-bot',
    title: 'Smart Coach AI',
    description: 'IA que monta treinos, sugere progressão de cargas e adapta exercícios ao perfil do aluno.',
    featured: false,
    badge: 'Em breve'
  },
  {
    icon: 'i-lucide-trophy',
    title: 'Gamificação',
    description: 'Rankings, níveis, medalhas e desafios sociais. Aumente a retenção criando uma comunidade competitiva.',
    featured: true
  },
  {
    icon: 'i-lucide-message-circle',
    title: 'Rede Social Interna',
    description: 'Seus alunos interagem, compartilham treinos e se motivam sem sair do seu ecossistema.',
    featured: false
  }
];

// --- Security Checklist ---
const securityChecklist = [
  'Criptografia AES-256 em todos os dados',
  'Conformidade total com LGPD',
  'Backups automáticos diários',
  'Autenticação de dois fatores'
];
</script>

<template>
  <div class="relative">
      <!-- TRUST SECTION (WHY ROCKET FITNESS) -->
      <section id="trust" class="py-24 relative">
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ca000d]/50 to-transparent"></div>
        
        <UContainer>
          <BaseSectionHeader 
            title="Por que Rocket Fitness?" 
            description="O app que une treino, saúde mental, gamificação e comunidade em uma só experiência."
            class="text-center mb-16"
          />

          <div class="grid md:grid-cols-3 gap-8">
            <BaseEnhancedCard 
              v-for="(item, index) in trustItems" 
              :key="item.title"
              class="p-8 rounded-2xl group reveal-on-scroll"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              <div class="w-12 h-12 bg-[#ca000d]/10 rounded-xl flex items-center justify-center mb-6 border border-[#ca000d]/20 group-hover:border-[#ca000d] transition-colors">
                <UIcon :name="item.icon" class="w-6 h-6 text-[#ca000d]" />
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ item.title }}</h3>
              <p class="text-gray-400 leading-relaxed">{{ item.desc }}</p>
            </BaseEnhancedCard>
          </div>
        </UContainer>
      </section>

      <!-- SOLUTIONS SECTION -->
      <section id="solucoes" class="py-24 relative bg-[#0a0a0a]">
        <UContainer>
          <BaseSectionHeader 
            title="Soluções para Academias" 
            description="Tudo que sua academia precisa: CRM, gestão, streaming e gamificação para reter seus alunos."
            class="text-center mb-16"
          />

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BaseEnhancedCard 
              v-for="(solution, index) in solutions" 
              :key="index" 
              class="p-8 rounded-2xl group cursor-pointer reveal-on-scroll"
              :featured="solution.featured"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              <!-- Badge Em Breve -->
              <div v-if="solution.badge" class="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wide">
                {{ solution.badge }}
              </div>
              
              <div class="w-14 h-14 rounded-xl bg-[#ca000d]/10 flex items-center justify-center mb-6 group-hover:bg-[#ca000d] transition-colors duration-300">
                <UIcon :name="solution.icon" class="w-7 h-7 text-[#ca000d] group-hover:text-white transition-colors" />
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ solution.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">{{ solution.description }}</p>
            </BaseEnhancedCard>
          </div>
        </UContainer>
      </section>

      <!-- ECOSYSTEM / BENTO GRID SECTION -->
      <section class="py-24 relative">
        <UContainer>
          <BaseSectionHeader 
            title="Ecossistema Integrado" 
            description="Uma visão profunda de como nossos módulos se conectam para maximizar resultados."
            class="mb-12"
            :centered="false"
          >
            <template #title>
              Ecossistema <span class="text-[#ca000d]">Integrado</span>
            </template>
          </BaseSectionHeader>

          <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[140px] reveal-on-scroll">

            <!-- Analytics Card with Chart (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <UIcon name="i-lucide-bar-chart-3" class="w-5 h-5 text-[#ca000d]" />
                    <h3 class="text-lg font-bold text-white">Analytics</h3>
                  </div>
                  <p class="text-gray-500 text-xs">Dados em tempo real</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-white">847</div>
                  <div class="text-xs text-green-400">+12% hoje</div>
                </div>
              </div>
              <div class="flex items-end justify-between gap-1 h-12 mt-auto">
                <div class="flex-1 bg-[#ca000d]/20 rounded-t h-[30%] group-hover:bg-[#ca000d]/40 transition-all"></div>
                <div class="flex-1 bg-[#ca000d]/20 rounded-t h-[50%] group-hover:bg-[#ca000d]/40 transition-all"></div>
                <div class="flex-1 bg-[#ca000d]/20 rounded-t h-[70%] group-hover:bg-[#ca000d]/40 transition-all"></div>
                <div class="flex-1 bg-[#ca000d]/20 rounded-t h-[45%] group-hover:bg-[#ca000d]/40 transition-all"></div>
                <div class="flex-1 bg-[#ca000d]/20 rounded-t h-[60%] group-hover:bg-[#ca000d]/40 transition-all"></div>
                <div class="flex-1 bg-[#ca000d]/20 rounded-t h-[80%] group-hover:bg-[#ca000d]/40 transition-all"></div>
                <div class="flex-1 bg-[#ca000d] rounded-t h-[95%] shadow-[0_0_20px_rgba(202,0,13,0.5)]"></div>
              </div>
            </BaseBentoCard>

            <!-- CRM Card with Avatar Stack (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
              <div class="absolute -right-8 -top-8 w-32 h-32 bg-[#ca000d]/10 blur-3xl rounded-full group-hover:bg-[#ca000d]/20 transition-colors"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-2 mb-3">
                  <UIcon name="i-lucide-users" class="w-5 h-5 text-[#ca000d]" />
                  <h3 class="text-lg font-bold text-white">CRM Inteligente</h3>
                </div>
                <p class="text-gray-400 text-xs mb-4">Recuperação automática de inativos</p>
                <div class="flex items-center justify-between">
                  <div class="flex -space-x-2">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-[#0a0a0a] flex items-center justify-center text-xs text-white font-bold">A</div>
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-[#0a0a0a] flex items-center justify-center text-xs text-white font-bold">M</div>
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-[#0a0a0a] flex items-center justify-center text-xs text-white font-bold">J</div>
                    <div class="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0a0a0a] flex items-center justify-center text-xs text-white">+42</div>
                  </div>
                  <div class="text-xs text-gray-400">
                    <span class="text-green-400 font-bold">94%</span> reativados
                  </div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Financeiro Card -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden">
              <div class="flex items-start justify-between">
                <div>
                  <div class="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3">
                    <UIcon name="i-lucide-wallet" class="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 class="text-lg font-bold text-white mb-1">Financeiro</h3>
                  <p class="text-gray-400 text-xs">Recorrência + NFe automática</p>
                </div>
                <div class="text-right">
                  <div class="text-xs text-gray-500 mb-1">Receita mensal</div>
                  <div class="text-lg font-bold text-emerald-400">R$ 127k</div>
                </div>
              </div>
            </BaseBentoCard>


            <!-- Streaming Card (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-transparent">
              <!-- Badge Em Breve -->
              <div class="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wide z-10">
                Em breve
              </div>
              <div class="flex items-center gap-4 h-full">
                <div class="w-16 h-16 rounded-xl bg-purple-500/20 flex items-center justify-center relative">
                  <UIcon name="i-lucide-play" class="w-8 h-8 text-purple-400" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-white mb-1">Rocket Live & VOD</h3>
                  <p class="text-gray-400 text-xs mb-2">Streaming de aulas integrado</p>
                  <div class="flex gap-2">
                    <span class="text-xs text-purple-400">Aulas ao vivo</span>
                    <span class="text-xs text-gray-600">•</span>
                    <span class="text-xs text-gray-400">Gravadas</span>
                  </div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Gamificação Card (spans 2 cols) -->
            <BaseBentoCard class="md:col-span-2 group relative overflow-hidden bg-gradient-to-br from-amber-900/20 to-transparent">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <UIcon name="i-lucide-trophy" class="w-5 h-5 text-amber-400" />
                    <h3 class="text-lg font-bold text-white">Gamificação</h3>
                  </div>
                  <p class="text-gray-400 text-xs">Rankings e desafios</p>
                </div>
                <div class="flex gap-1">
                  <div class="w-6 h-6 rounded bg-amber-500/20 flex items-center justify-center">
                    <span class="text-xs">🥇</span>
                  </div>
                  <div class="w-6 h-6 rounded bg-gray-500/20 flex items-center justify-center">
                    <span class="text-xs">🥈</span>
                  </div>
                  <div class="w-6 h-6 rounded bg-orange-700/20 flex items-center justify-center">
                    <span class="text-xs">🥉</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full w-[75%] bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"></div>
                </div>
                <span class="text-xs text-amber-400 font-bold">Nível 12</span>
              </div>
            </BaseBentoCard>

          </div>
        </UContainer>
      </section>

      <!-- TRAINING SECTION -->
      <section class="py-24 bg-black relative overflow-hidden">
        <div class="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#ca000d]/5 to-transparent pointer-events-none"></div>
        <UContainer class="flex flex-col lg:flex-row items-center gap-16">
          <div class="lg:w-1/2 reveal-on-scroll">
            <h2 class="text-3xl font-bold text-white mb-6">Treinos prescritos na velocidade da luz.</h2>
            <div class="space-y-6">

              <div class="flex gap-4">
                <div class="flex-none w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                  <UIcon name="i-lucide-brain" class="w-5 h-5 text-[#ca000d]" />
                </div>
                <div>
                  <h4 class="font-bold text-white">AI Coach</h4>
                  <p class="text-gray-400 text-sm mt-1">Sugestões inteligentes de progressão de carga.</p>
                </div>
              </div>



              <div class="flex gap-4">
                <div class="flex-none w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                  <UIcon name="i-lucide-calendar-days" class="w-5 h-5 text-[#ca000d]" />
                </div>
                <div>
                  <h4 class="font-bold text-white">Periodização Automática</h4>
                  <p class="text-gray-400 text-sm mt-1">Ciclos de treino organizados automaticamente por macrociclos.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:w-1/2 w-full reveal-on-scroll" style="transition-delay: 200ms;">
            <div class="enhanced-card p-2 rounded-3xl border border-gray-800 bg-gray-900/50">
              <div class="grid grid-cols-2 gap-2">
                <div class="bg-black p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=100&h=100" class="w-12 h-12 rounded-full object-cover border-2 border-[#ca000d]" alt="User">
                  <div>
                    <div class="text-white font-bold text-sm">Sarah C.</div>
                    <div class="text-xs text-green-400">Treinando</div>
                  </div>
                </div>
                <div class="bg-black p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100" class="w-12 h-12 rounded-full object-cover" alt="User">
                  <div>
                    <div class="text-white font-bold text-sm">Pedro A.</div>
                    <div class="text-xs text-gray-500">Ausente</div>
                  </div>
                </div>
                <div class="col-span-2 bg-[#ca000d]/10 p-4 rounded-2xl border border-[#ca000d]/30 flex justify-between items-center">
                  <div>
                    <div class="text-xs text-[#ca000d] font-bold uppercase">Retenção Mensal</div>
                    <div class="text-2xl font-bold text-white">94.5%</div>
                  </div>
                  <div class="h-10 w-24 flex items-end gap-1">
                    <div class="w-full bg-[#ca000d]/50 h-[40%] rounded-sm"></div>
                    <div class="w-full bg-[#ca000d]/50 h-[60%] rounded-sm"></div>
                    <div class="w-full bg-[#ca000d]/50 h-[50%] rounded-sm"></div>
                    <div class="w-full bg-[#ca000d] h-[80%] rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- SECURITY SECTION -->
      <section id="security" class="py-24 relative reveal-on-scroll">
        <UContainer>
          <div class="flex flex-col lg:flex-row items-center gap-16">
            <!-- Left Content -->
            <div class="lg:w-1/2">
              <div class="text-[#ca000d] font-semibold mb-2 tracking-wider text-sm uppercase">Segurança Primeiro</div>
              <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">Seus dados, protegidos como ouro.</h2>
              <p class="text-gray-400 text-lg mb-6 leading-relaxed">
                Utilizamos protocolos de criptografia AES-256 e estamos em total conformidade com a LGPD. Seus dados e os dados dos seus alunos estão sempre protegidos.
              </p>
              <ul class="space-y-4 mb-8">
                <li v-for="item in securityChecklist" :key="item" class="flex items-start gap-3 text-gray-300">
                  <UIcon name="i-lucide-check" class="w-6 h-6 text-[#ca000d] mt-0.5 flex-shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            
            <!-- Right Visual -->
            <div class="lg:w-1/2 w-full">
              <div class="relative rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-1">
                <div class="bg-[#0a0a0a] rounded-xl p-8 overflow-hidden relative group">
                  <div class="font-mono text-xs text-gray-500 mb-2">// SECURITY PROTOCOL ACTIVE</div>
                  <div class="space-y-2 mb-8">
                    <div class="h-2 w-3/4 bg-white/10 rounded"></div>
                    <div class="h-2 w-1/2 bg-white/10 rounded"></div>
                    <div class="h-2 w-5/6 bg-[#ca000d]/20 rounded animate-pulse"></div>
                  </div>
                  
                  <div class="flex justify-center py-8">
                    <div class="relative transition-transform duration-500 group-hover:scale-110">
                      <div class="absolute inset-0 bg-[#ca000d]/30 blur-2xl rounded-full transition-all duration-500 group-hover:bg-[#ca000d]/50 group-hover:blur-3xl"></div>
                      <UIcon name="i-lucide-shield-check" class="w-32 h-32 text-[#ca000d] relative z-10" />
                    </div>
                  </div>
                  
                  <div class="flex justify-between items-center text-xs text-gray-400 mt-4 pt-4 border-t border-white/10">
                    <span>Status: <span class="text-green-500">SEGURO</span></span>
                    <span>Enc: AES-256</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UContainer>
      </section>

      <!-- PRICING SECTION - ACADEMIAS (B2B) -->
      <section id="pricing" class="py-24 bg-[#0a0a0a]">
        <UContainer>
          <BaseSectionHeader 
            title="Planos para Academias" 
            description="Escolha o plano ideal para o tamanho da sua academia e escale conforme você cresce."
            class="text-center mb-16"
          >
            <template #title>
              Planos para <span class="text-[#ca000d]">Academias</span>
            </template>
          </BaseSectionHeader>

          <!-- B2B Pricing Cards - 3 Tiers -->
          <div class="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16 reveal-on-scroll">
            
            <!-- 100 Alunos -->
            <BaseEnhancedCard class="p-8 flex flex-col text-center group">
              <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#ca000d]/10 flex items-center justify-center group-hover:bg-[#ca000d]/20 transition-colors">
                <UIcon name="i-lucide-users" class="w-8 h-8 text-[#ca000d]" />
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Starter</h3>
              <p class="text-gray-400 mb-4 text-sm">Até 100 alunos</p>
              <div class="text-4xl font-bold text-white mb-2">R$ 900</div>
              <p class="text-gray-500 text-sm mb-8">/mês</p>
              
              <div class="mt-auto">
                <UButton 
                  block 
                  size="lg" 
                  label="Contratar Agora" 
                  class="bg-[#ca000d] hover:bg-[#a80009] text-white font-bold border-none shadow-lg shadow-[#ca000d]/30 hover:shadow-[#ca000d]/50 transition-all"
                  to="/contact"
                />
              </div>
              
              <p class="text-xs text-gray-500 mt-4">Ideal para academias iniciantes</p>
            </BaseEnhancedCard>

            <!-- 1000 Alunos -->
            <BaseEnhancedCard class="p-8 flex flex-col text-center group relative" :featured="true">
              <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ca000d] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-[#ca000d]/40 uppercase tracking-widest">
                Mais Popular
              </div>
              
              <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#ca000d]/20 flex items-center justify-center group-hover:bg-[#ca000d]/30 transition-colors">
                <UIcon name="i-lucide-building-2" class="w-8 h-8 text-[#ca000d]" />
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Professional</h3>
              <p class="text-gray-400 mb-4 text-sm">Até 1.000 alunos</p>
              <div class="text-4xl font-bold text-white mb-2">R$ 7.000</div>
              <p class="text-gray-500 text-sm mb-8">/mês</p>
              
              <div class="mt-auto">
                <UButton 
                  block 
                  size="lg" 
                  label="Contratar Agora" 
                  class="bg-[#ca000d] hover:bg-[#a80009] text-white font-bold border-none shadow-lg shadow-[#ca000d]/30 hover:shadow-[#ca000d]/50 transition-all"
                  to="/contact"
                />
              </div>
              
              <p class="text-xs text-gray-500 mt-4">Para academias em crescimento</p>
            </BaseEnhancedCard>

            <!-- 5000 Alunos -->
            <BaseEnhancedCard class="p-8 flex flex-col text-center group">
              <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#ca000d]/10 flex items-center justify-center group-hover:bg-[#ca000d]/20 transition-colors">
                <UIcon name="i-lucide-crown" class="w-8 h-8 text-[#ca000d]" />
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p class="text-gray-400 mb-4 text-sm">Até 5.000 alunos</p>
              <div class="text-4xl font-bold text-white mb-2">R$ 30.000</div>
              <p class="text-gray-500 text-sm mb-8">/mês</p>
              
              <div class="mt-auto">
                <UButton 
                  block 
                  size="lg" 
                  label="Contratar Agora" 
                  class="bg-[#ca000d] hover:bg-[#a80009] text-white font-bold border-none shadow-lg shadow-[#ca000d]/30 hover:shadow-[#ca000d]/50 transition-all"
                  to="/contact"
                />
              </div>
              
              <p class="text-xs text-gray-500 mt-4">Solução completa para grandes redes</p>
            </BaseEnhancedCard>
          </div>

          <!-- +5000 Alunos - Consultoria Enterprise -->
          <div class="max-w-4xl mx-auto reveal-on-scroll mt-8">
            <div class="enterprise-card-wrapper relative rounded-2xl p-[2px] overflow-hidden">
              <!-- Animated gradient border -->
              <div class="absolute inset-0 bg-gradient-to-r from-[#ca000d] via-[#ff4444] to-[#ca000d] animate-gradient-x opacity-80"></div>
              
              <!-- Card Content -->
              <div class="relative bg-[#0a0a0a] rounded-2xl p-8 lg:p-12 overflow-hidden">
                <!-- Background glow effects -->
                <div class="absolute top-0 right-0 w-64 h-64 bg-[#ca000d]/20 blur-[100px] rounded-full pointer-events-none"></div>
                <div class="absolute bottom-0 left-0 w-48 h-48 bg-[#ff4444]/10 blur-[80px] rounded-full pointer-events-none"></div>
                
                <div class="relative z-10 flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
                  <!-- Icon with animated ring -->
                  <div class="flex-shrink-0 relative">
                    <div class="absolute inset-0 -m-2 rounded-3xl border-2 border-[#ca000d]/30 animate-pulse"></div>
                    <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#ca000d] to-[#ff4444] flex items-center justify-center shadow-2xl shadow-[#ca000d]/40 relative">
                      <UIcon name="i-lucide-building" class="w-12 h-12 text-white" />
                      <!-- Sparkle effect -->
                      <div class="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                  
                  <!-- Content -->
                  <div class="flex-1">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ca000d]/10 border border-[#ca000d]/30 text-[#ca000d] text-xs font-bold uppercase tracking-wider mb-4">
                      <UIcon name="i-lucide-crown" class="w-3 h-3" />
                      Enterprise
                    </div>
                    <h3 class="text-3xl lg:text-4xl font-bold text-white mb-3">
                      Mais de <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#ca000d] to-[#ff4444]">5.000</span> Alunos?
                    </h3>
                    <p class="text-gray-400 text-lg leading-relaxed max-w-xl">
                      Soluções sob medida para grandes redes. Suporte dedicado 24/7, integrações personalizadas, SLA garantido e condições especiais de pagamento.
                    </p>
                    
                    <!-- Features mini list -->
                    <div class="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
                      <div class="flex items-center gap-2 text-sm text-gray-300">
                        <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-[#ca000d]" />
                        Gerente Dedicado
                      </div>
                      <div class="flex items-center gap-2 text-sm text-gray-300">
                        <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-[#ca000d]" />
                        SLA 99.9%
                      </div>
                      <div class="flex items-center gap-2 text-sm text-gray-300">
                        <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-[#ca000d]" />
                        API Ilimitada
                      </div>
                    </div>
                  </div>
                  
                  <!-- CTA Button -->
                  <div class="flex-shrink-0">
                    <UButton 
                      size="xl" 
                      label="Solicitar Proposta" 
                      class="enterprise-cta-btn bg-gradient-to-r from-[#ca000d] to-[#a80009] hover:from-[#ff4444] hover:to-[#ca000d] text-white font-bold border-none shadow-xl shadow-[#ca000d]/40 hover:shadow-[#ca000d]/60 transition-all duration-300 px-10 py-4 text-lg"
                      icon="i-lucide-arrow-right"
                      trailing
                      to="/contact"
                    />
                    <p class="text-center text-xs text-gray-500 mt-3">Resposta em até 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UContainer>
      </section>
  </div>
</template>

<style scoped>
/* reveal-on-scroll styles are now in global CSS (main.css) */

.enhanced-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(202, 0, 13, 0.02) 50%, rgba(255, 255, 255, 0.01) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.enhanced-card:hover {
  transform: translateY(-10px) scale(1.01);
  box-shadow: 0 20px 50px rgba(202, 0, 13, 0.15);
  border-color: rgba(202, 0, 13, 0.4);
}

@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

.enterprise-card-wrapper {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.enterprise-card-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 60px rgba(202, 0, 13, 0.25);
}

.enterprise-cta-btn {
  position: relative;
  overflow: hidden;
}

.enterprise-cta-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s;
}

.enterprise-cta-btn:hover::before {
  left: 100%;
}
</style>
