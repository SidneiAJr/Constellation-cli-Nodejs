#!/usr/bin/env node
import inquirer from 'inquirer'
import chalk from 'chalk'
import { mainMenu } from '../src/menus/mainMenu.js'

console.log(chalk.cyan(`
===========================================
  CONSTELLATION CLI CREATE 4.0 Node Edition
  CLI for Dev's | Made in Brasil 🇧🇷
  Create Backend MVC Only
  Empty Files
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