#!/usr/bin/env node
import inquirer from 'inquirer'
import chalk from 'chalk'
import { mainMenu } from '../src/menus/mainMenu.js'

console.log(chalk.cyan(`
===========================================
  Albertool| CONSTELLATION CLI 4.0N
  Multi-Architecture | Multi-Language
  Made in Brasil 🇧🇷
===========================================
  🏗️ MVC      | 🎯 DDD
  🧹 Clean    | 🔷 Hexagonal
===========================================
  📦 Generate complete projects in seconds
  🚀 Backend + Frontend (optional)
  👍Thanks For Help!
  ☕Pay One Coffe
===========================================
`))

const { projectName } = await inquirer.prompt([
  {
    type: 'input',
    name: 'projectName',
    message: 'Nome do seu projeto:',
    validate: (v) => v.trim() !== '' || 'Nome não pode ser vazio'
  }
])

await mainMenu(projectName)