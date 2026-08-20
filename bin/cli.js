#!/usr/bin/env node
import inquirer from 'inquirer'
import chalk from 'chalk'
import { mainMenu } from '../src/menus/mainMenu.js'

console.clear()

console.log(chalk.cyan(`
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
`))

const { projectName } = await inquirer.prompt([{
  type: 'input',
  name: 'projectName',
  message: '📁 Nome do seu projeto:',
  validate: (v) => {
    if (v.trim() === '') return 'Nome não pode ser vazio'
    if (/[^a-zA-Z0-9_-]/.test(v)) return 'Use apenas letras, números, - ou _'
    return true
  }
}])

await mainMenu(projectName)