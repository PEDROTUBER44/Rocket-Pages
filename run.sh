#!/bin/sh

# O comando 'set -e' faz o script parar imediatamente se algum comando falhar.
# Isso evita tentar rodar o servidor se a instalação der erro.
set -e

DIR="node_modules"

echo "========================================="
echo "🔄 Iniciando processo de limpeza e setup"
echo "========================================="

# 1. Verifica e remove node_modules
if [ -d "$DIR" ]; then
  echo "🗑️  Pasta '$DIR' encontrada. Removendo..."
  rm -rf "$DIR"
  echo "✅ Limpeza concluída."
else
  echo "ℹ️  Pasta '$DIR' não existe. Pulando limpeza."
fi

# 2. Instala dependências
echo "-----------------------------------------"
echo "📦 Instalando dependências (pnpm install)..."
pnpm install

# 3. Roda o servidor
echo "-----------------------------------------"
echo "🚀 Iniciando servidor (pnpm run dev --force)..."
pnpm run dev --force
