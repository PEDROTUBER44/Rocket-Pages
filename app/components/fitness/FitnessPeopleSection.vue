<script setup lang="ts">
// --- Comparison Table Data ---
const comparisonItems = [
  { 
    feature: 'Acompanhamento de Treino', 
    without: 'Planilhas ou caderno', 
    with: 'App inteligente com AI Coach',
    withHighlight: true
  },
  { 
    feature: 'Análise de Desempenho', 
    without: 'Nenhuma', 
    with: 'Retrospectivas semanais e mensais',
    withHighlight: true
  },
  { 
    feature: 'Monitoramento de Sono', 
    without: '—', 
    with: 'Registro de sono',
    withHighlight: true
  },
  { 
    feature: 'Saúde Mental', 
    without: '—', 
    with: 'Bem-estar integrado',
    withHighlight: true
  },
  { 
    feature: 'Motivação', 
    without: 'Depende de você sozinho', 
    with: 'Gamificação com níveis e medalhas',
    withHighlight: true
  },
  { 
    feature: 'Comunidade', 
    without: 'Isolado', 
    with: 'Rede social fitness com amigos',
    withHighlight: true
  },
  { 
    feature: 'Conteúdo Fitness', 
    without: 'Procurar no YouTube', 
    with: 'Rocket Watch exclusivo',
    withHighlight: true
  },
  { 
    feature: 'Compartilhar Treinos', 
    without: 'Print de tela', 
    with: 'Envio direto para amigos',
    withHighlight: true
  }
];

// --- Features for Individuals ---
const individualFeatures = [
  {
    icon: 'i-lucide-dumbbell',
    title: 'Treinos Inteligentes',
    description: 'Treinos personalizados com progressão automática de carga e exercícios adaptados ao seu nível.',
    color: 'red',
    featured: true
  },
  {
    icon: 'i-lucide-line-chart',
    title: 'Retrospectivas',
    description: 'Análises semanais e mensais do seu desempenho físico com gráficos detalhados e insights.',
    color: 'blue'
  },
  {
    icon: 'i-lucide-moon',
    title: 'Monitoramento de Sono',
    description: 'Acompanhe a qualidade do seu sono e receba recomendações para melhor recuperação muscular.',
    color: 'indigo'
  },
  {
    icon: 'i-lucide-brain',
    title: 'Saúde Mental',
    description: 'Práticas de meditação guiada e acompanhamento do seu bem-estar emocional.',
    color: 'purple'
  },
  {
    icon: 'i-lucide-trophy',
    title: 'Gamificação',
    description: 'Suba de nível, conquiste medalhas, participe de desafios e compare seu progresso com amigos.',
    color: 'amber',
    featured: true
  },
  {
    icon: 'i-lucide-users',
    title: 'Rede Social Fitness',
    description: 'Converse com amigos, compartilhe treinos, envie desafios e motive-se juntos.',
    color: 'green'
  },
  {
    icon: 'i-lucide-play-circle',
    title: 'Rocket Watch',
    description: 'Assista vídeos estilo Reels, poste seus treinos e interaja com a comunidade fitness.',
    color: 'pink',
    featured: true
  },
  {
    icon: 'i-lucide-message-circle',
    title: 'Comunidade Ativa',
    description: 'Participe de grupos, tire dúvidas com outros atletas e encontre parceiros de treino.',
    color: 'cyan'
  }
];
</script>

<template>
  <div class="relative">
      <!-- ============================================== -->
      <!-- PARA PESSOAS SECTION                           -->
      <!-- ============================================== -->
      <section class="py-24 relative bg-[#0a0a0a]">
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ca000d]/50 to-transparent"></div>
        
        <UContainer>
          <BaseSectionHeader 
            title="Para Pessoas" 
            description="Tudo que você precisa para transformar sua vida fitness em uma só plataforma."
            class="text-center mb-16"
          >
            <template #title>
              Para <span class="text-[#ca000d]">Pessoas</span>
            </template>
          </BaseSectionHeader>

          <!-- Bento Grid for Individual Features -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px] reveal-on-scroll">
            
            <!-- Training Card (Featured - spans 2 cols) -->
            <BaseBentoCard class="lg:col-span-2 group relative overflow-hidden bg-gradient-to-br from-[#ca000d]/10 to-transparent">
              <div class="flex flex-col h-full">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 rounded-xl bg-[#ca000d]/20 flex items-center justify-center group-hover:bg-[#ca000d] transition-colors">
                    <UIcon name="i-lucide-dumbbell" class="w-6 h-6 text-[#ca000d] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white">Treinos Inteligentes</h3>
                    <p class="text-gray-400 text-xs">Foco principal do app</p>
                  </div>
                </div>
                <p class="text-gray-400 text-sm flex-1">Treinos personalizados com progressão automática de carga e exercícios adaptados ao seu nível.</p>
                <div class="flex gap-2 mt-4">
                  <span class="px-2 py-1 bg-[#ca000d]/20 text-[#ca000d] text-xs rounded-full">AI Coach</span>
                  <span class="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-full">+500 exercícios</span>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Retrospectives Card -->
            <BaseBentoCard class="group relative overflow-hidden">
              <div class="absolute -right-6 -top-6 w-20 h-20 bg-blue-500/20 blur-2xl rounded-full"></div>
              <div class="flex flex-col h-full relative z-10">
                <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                  <UIcon name="i-lucide-line-chart" class="w-5 h-5 text-blue-400" />
                </div>
                <h3 class="text-lg font-bold text-white mb-2">Retrospectivas</h3>
                <p class="text-gray-400 text-xs flex-1">Análises semanais e mensais do seu desempenho físico.</p>
                <div class="flex items-end gap-1 h-10 mt-2">
                  <div class="flex-1 bg-blue-500/30 rounded-t h-[40%]"></div>
                  <div class="flex-1 bg-blue-500/40 rounded-t h-[60%]"></div>
                  <div class="flex-1 bg-blue-500/50 rounded-t h-[45%]"></div>
                  <div class="flex-1 bg-blue-500 rounded-t h-[80%]"></div>
                  <div class="flex-1 bg-blue-500/60 rounded-t h-[70%]"></div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Sleep Card -->
            <BaseBentoCard class="group relative overflow-hidden">
              <div class="absolute -right-6 -bottom-6 w-20 h-20 bg-indigo-500/20 blur-2xl rounded-full"></div>
              <div class="flex flex-col h-full relative z-10">
                <div class="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-3">
                  <UIcon name="i-lucide-moon" class="w-5 h-5 text-indigo-400" />
                </div>
                <h3 class="text-lg font-bold text-white mb-2">Sono</h3>
                <p class="text-gray-400 text-xs flex-1">Monitore a qualidade do sono para melhor recuperação.</p>
                <div class="flex items-center gap-2 mt-2">
                  <div class="text-2xl font-bold text-indigo-400">7.5h</div>
                  <span class="text-xs text-green-400">+12%</span>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Mental Health Card -->
            <BaseBentoCard class="group relative overflow-hidden">
              <div class="absolute -left-6 -top-6 w-20 h-20 bg-purple-500/20 blur-2xl rounded-full"></div>
              <div class="flex flex-col h-full relative z-10">
                <div class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                  <UIcon name="i-lucide-brain" class="w-5 h-5 text-purple-400" />
                </div>
                <h3 class="text-lg font-bold text-white mb-2">Saúde Mental</h3>
                <p class="text-gray-400 text-xs flex-1">Bem-estar e acompanhamento de bem-estar emocional.</p>
                <div class="flex gap-1 mt-2">
                  <span class="text-lg">😌</span>
                  <span class="text-lg">🧘</span>
                  <span class="text-lg">💪</span>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Gamification Card (Featured - spans 2 cols) -->
            <BaseBentoCard class="lg:col-span-2 group relative overflow-hidden bg-gradient-to-br from-amber-900/20 to-transparent">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <UIcon name="i-lucide-trophy" class="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-white">Gamificação</h3>
                      <p class="text-gray-400 text-xs">Níveis, medalhas e desafios</p>
                    </div>
                  </div>
                  <p class="text-gray-400 text-sm mb-4">Suba de nível, conquiste medalhas, participe de desafios e compare seu progresso com amigos.</p>
                  <div class="flex items-center gap-4">
                    <div class="flex gap-1">
                      <span class="text-2xl">🥇</span>
                      <span class="text-2xl">🏆</span>
                      <span class="text-2xl">⭐</span>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between text-xs mb-1">
                        <span class="text-gray-400">Nível 12</span>
                        <span class="text-amber-400">75%</span>
                      </div>
                      <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div class="h-full w-[75%] bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Social Network Card -->
            <BaseBentoCard class="group relative overflow-hidden">
              <div class="absolute -right-6 -top-6 w-20 h-20 bg-green-500/20 blur-2xl rounded-full"></div>
              <div class="flex flex-col h-full relative z-10">
                <div class="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                  <UIcon name="i-lucide-users" class="w-5 h-5 text-green-400" />
                </div>
                <h3 class="text-lg font-bold text-white mb-2">Rede Social</h3>
                <p class="text-gray-400 text-xs flex-1">Converse, compartilhe treinos e motive amigos.</p>
                <div class="flex -space-x-2 mt-2">
                  <div class="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-[#0a0a0a]"></div>
                  <div class="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-[#0a0a0a]"></div>
                  <div class="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-[#0a0a0a]"></div>
                  <div class="w-7 h-7 rounded-full bg-white/10 border-2 border-[#0a0a0a] flex items-center justify-center text-xs text-white">+99</div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Rocket Watch Card (Featured - spans 2 cols) -->
            <BaseBentoCard class="lg:col-span-2 group relative overflow-hidden bg-gradient-to-br from-pink-900/20 to-transparent">
              <div class="flex items-start gap-4 h-full">
                <div class="w-24 h-full rounded-xl bg-black/50 border border-white/10 flex items-center justify-center relative overflow-hidden">
                  <UIcon name="i-lucide-play" class="w-8 h-8 text-pink-400 relative z-10" />
                  <div class="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent"></div>
                </div>
                <div class="flex-1 flex flex-col">
                  <div class="flex items-center gap-2 mb-2">
                    <UIcon name="i-lucide-play-circle" class="w-5 h-5 text-pink-400" />
                    <h3 class="text-xl font-bold text-white">Rocket Watch</h3>
                  </div>
                  <p class="text-gray-400 text-sm flex-1">Assista vídeos estilo Reels, poste seus treinos e interaja com a comunidade fitness.</p>
                  <div class="flex items-center gap-4 mt-3">
                    <div class="flex items-center gap-1 text-xs text-gray-400">
                      <UIcon name="i-lucide-heart" class="w-4 h-4 text-pink-400" />
                      <span>12.5k</span>
                    </div>
                    <div class="flex items-center gap-1 text-xs text-gray-400">
                      <UIcon name="i-lucide-message-circle" class="w-4 h-4" />
                      <span>324</span>
                    </div>
                    <div class="flex items-center gap-1 text-xs text-gray-400">
                      <UIcon name="i-lucide-share-2" class="w-4 h-4" />
                      <span>Compartilhar</span>
                    </div>
                  </div>
                </div>
              </div>
            </BaseBentoCard>

            <!-- Community Card -->
            <BaseBentoCard class="group relative overflow-hidden">
              <div class="absolute -left-6 -bottom-6 w-20 h-20 bg-cyan-500/20 blur-2xl rounded-full"></div>
              <div class="flex flex-col h-full relative z-10">
                <div class="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-3">
                  <UIcon name="i-lucide-message-circle" class="w-5 h-5 text-cyan-400" />
                </div>
                <h3 class="text-lg font-bold text-white mb-2">Comunidade</h3>
                <p class="text-gray-400 text-xs flex-1">Grupos, dúvidas e parceiros de treino.</p>
                <div class="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <span class="text-cyan-400 font-bold">2.3k</span>
                  <span>ativos agora</span>
                </div>
              </div>
            </BaseBentoCard>

          </div>

          <!-- CTA for Pessoas -->
          <div class="text-center mt-16 reveal-on-scroll">
            <UButton 
              size="xl" 
              label="Baixar App Grátis" 
              color="primary" 
              class="glow-button text-white" 
              icon="i-lucide-download"
              trailing
              to="/contact"
            />
            <p class="text-gray-500 text-sm mt-4">Disponível para iOS e Android</p>
          </div>
        </UContainer>
      </section>

      <!-- ============================================== -->
      <!-- COMPARISON TABLE SECTION                       -->
      <!-- ============================================== -->
      <section class="py-24 relative bg-black">
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ca000d]/50 to-transparent"></div>
        
        <UContainer>
          <BaseSectionHeader 
            title="A Diferença é Clara" 
            description="Veja como o Rocket Fitness transforma sua jornada fitness."
            class="text-center mb-16"
          >
            <template #title>
              A Diferença é <span class="text-[#ca000d]">Clara</span>
            </template>
          </BaseSectionHeader>

          <!-- Comparison Table -->
          <div class="max-w-4xl mx-auto reveal-on-scroll">
            <div class="rounded-2xl border border-white/10 overflow-hidden bg-[#0a0a0a]">
              <!-- Table Header -->
              <div class="grid grid-cols-3 bg-[#111] border-b border-white/10">
                <div class="p-5 text-gray-400 font-semibold">Recurso</div>
                <div class="p-5 text-center text-gray-500 font-semibold border-l border-white/10">Sem Rocket Fitness</div>
                <div class="p-5 text-center font-bold border-l border-white/10">
                  <span class="text-[#ca000d]">Com Rocket Fitness</span>
                </div>
              </div>
              
              <!-- Table Rows -->
              <div 
                v-for="(item, index) in comparisonItems" 
                :key="index"
                class="grid grid-cols-3 border-b border-white/5 last:border-b-0 group hover:bg-white/[0.02] transition-colors"
              >
                <div class="p-5 text-white font-medium flex items-center">
                  {{ item.feature }}
                </div>
                <div class="p-5 text-center text-gray-500 border-l border-white/10 flex items-center justify-center">
                  <span v-if="item.without === '—'" class="text-gray-600">—</span>
                  <span v-else>{{ item.without }}</span>
                </div>
                <div class="p-5 text-center border-l border-white/10 flex items-center justify-center">
                  <span 
                    :class="item.withHighlight ? 'text-[#ca000d] font-semibold' : 'text-white'"
                  >
                    {{ item.with }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Bottom CTA -->
            <div class="text-center mt-10">
              <UButton 
                size="xl" 
                label="Fazer a Diferença Agora" 
                color="primary" 
                class="glow-button text-white" 
                icon="i-lucide-rocket"
                trailing
                to="/contact"
              />
            </div>
          </div>
        </UContainer>
      </section>

      <!-- ============================================== -->
      <!-- PRICING SECTION - PESSOAS FÍSICAS (B2C)      -->
      <!-- ============================================== -->
      <section class="py-24 relative">
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ca000d]/50 to-transparent"></div>
        
        <UContainer>
          <BaseSectionHeader 
            title="Planos para Pessoas" 
            description="Acesso completo ao app com treinos personalizados, acompanhamento e muito mais."
            class="text-center mb-16"
          >
            <template #title>
              Planos para <span class="text-[#ca000d]">Pessoas</span>
            </template>
          </BaseSectionHeader>

          <!-- B2C Pricing Cards -->
          <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto reveal-on-scroll">
            
            <!-- Mensal -->
            <BaseEnhancedCard class="p-8 flex flex-col text-center group">
              <div class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 mx-auto">
                <UIcon name="i-lucide-calendar" class="w-4 h-4 text-gray-400" />
                <span class="text-sm text-gray-400">Mensal</span>
              </div>
              
              <h3 class="text-2xl font-bold text-white mb-4">Plano Avulso</h3>
              <div class="mb-6">
                <span class="text-5xl font-bold text-white">R$ 14,90</span>
                <span class="text-gray-400 text-lg">/mês</span>
              </div>
              
              <ul class="space-y-3 text-sm text-gray-300 mb-8 text-left">
                <li class="flex items-center gap-3">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-[#ca000d] flex-shrink-0" />
                  Acesso a todos os treinos
                </li>
                <li class="flex items-center gap-3">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-[#ca000d] flex-shrink-0" />
                  Acompanhamento de progresso
                </li>
                <li class="flex items-center gap-3">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-[#ca000d] flex-shrink-0" />
                  Cancele quando quiser
                </li>
              </ul>
              
              <div class="mt-auto">
                <UButton 
                  block 
                  size="lg" 
                  label="Assinar Agora" 
                  class="bg-[#ca000d] hover:bg-[#a80009] text-white font-bold border-none shadow-lg shadow-[#ca000d]/30 hover:shadow-[#ca000d]/50 transition-all"
                  to="/contact"
                />
              </div>
            </BaseEnhancedCard>

            <!-- Anual -->
            <BaseEnhancedCard class="p-8 flex flex-col text-center group relative" :featured="true">
              <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ca000d] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-[#ca000d]/40 uppercase tracking-widest">
                Economia de 33%
              </div>
              
              <div class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#ca000d]/10 border border-[#ca000d]/20 mb-6 mx-auto">
                <UIcon name="i-lucide-star" class="w-4 h-4 text-[#ca000d]" />
                <span class="text-sm text-[#ca000d] font-semibold">Melhor Valor</span>
              </div>
              
              <h3 class="text-2xl font-bold text-white mb-4">Plano Anual</h3>
              <div class="mb-2">
                <span class="text-5xl font-bold text-white">R$ 9,90</span>
                <span class="text-gray-400 text-lg">/mês</span>
              </div>
              <p class="text-gray-500 text-sm mb-6">Cobrado anualmente (R$ 118,80/ano)</p>
              
              <ul class="space-y-3 text-sm text-white mb-8 text-left">
                <li class="flex items-center gap-3">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-[#ca000d] flex-shrink-0" />
                  Acesso a todos os treinos
                </li>
                <li class="flex items-center gap-3">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-[#ca000d] flex-shrink-0" />
                  Acompanhamento de progresso
                </li>
                <li class="flex items-center gap-3">
                  <UIcon name="i-lucide-check" class="w-4 h-4 text-[#ca000d] flex-shrink-0" />
                  Cancele quando quiser
                </li>
              </ul>
              
              <div class="mt-auto">
                <UButton 
                  block 
                  size="lg" 
                  label="Assinar Agora" 
                  class="bg-[#ca000d] hover:bg-[#a80009] text-white font-bold border-none shadow-lg shadow-[#ca000d]/30 hover:shadow-[#ca000d]/50 transition-all"
                  to="/contact"
                />
              </div>
            </BaseEnhancedCard>
          </div>
        </UContainer>
      </section>
  </div>
</template>

<style scoped>
/* Copied styles to ensure stability if isolated */
.glow-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.glow-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.glow-button:hover::before {
  left: 100%;
}

.glow-button:hover {
  box-shadow: 0 0 20px rgba(202, 0, 13, 0.6);
}

/* reveal-on-scroll styles are now in global CSS (main.css) */
</style>
