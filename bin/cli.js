#!/usr/bin/env node
import * as readline from 'readline'
import { mainMenu } from '../src/menus/mainMenu.js'

console.clear()

console.log(`
╔═══════════════════════════════════════════╗
║   Albertool | CONSTELLATION CLI 5.0       ║
║   Multi-Architecture | Multi-Language     ║
║   Made in Brasil 🇧🇷  · github: Sidneiajr ║
╠═══════════════════════════════════════════╣
║  🏗️  MVC        🎯 DDD                    ║
║  🧹 Clean       🔷 Hexagonal              ║
╠═══════════════════════════════════════════╣
║  📦 JS · TS · Java · PHP · C#             ║
║  ✨ Gera estrutura + arquivos com código  ║
║  👍 Thanks For Help!  ☕ Pay One Coffee   ║
╚═══════════════════════════════════════════╝
`)

console.log(`
  ⚠️  Generates skeleton only — not production ready.
  ⚠️  Gera esqueleto apenas — não está pronto para produção.

  📄 Read the README before using. / Leia o README antes de usar.

  📦 No package.json generated — install what you need manually.
  📦 Nenhum package.json gerado — instale o que precisar manualmente.

  🔧 For JS/TS: run npm init -y and install your dependencies.
  🔧 Para JS/TS: rode npm init -y e instale suas dependências.

  🔐 No auth by default — implement before exposing routes.
  🔐 Sem autenticação por padrão — implemente antes de expor rotas.

  🗄️  Configure .env before connecting any database.
  🗄️  Configure o .env antes de conectar qualquer banco de dados.

  🧪 No tests generated — write your own.
  🧪 Nenhum teste gerado — escreva os seus.
`)

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve))
}

function validarNome(nome) {
  if (nome.trim() === '') return '❌ Name cannot be empty. / Nome não pode ser vazio.'
  if (/[^a-zA-Z0-9_-]/.test(nome)) return '❌ Use only letters, numbers, - or _ / Use apenas letras, números, - ou _'
  return null
}

let projectName = ''
while (true) {
  projectName = await ask('\n📁 Project name / Nome do projeto: ')
  const erro = validarNome(projectName)
  if (!erro) break
  console.log(erro)
}

rl.close()

await mainMenu(projectName)