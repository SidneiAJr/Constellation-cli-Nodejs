import inquirer from 'inquirer'
import { mvcMenu } from './mvcMenu.js'
import { dddMenu } from './dddMenu.js'
import { cleanMenu } from './cleanMenu.js'
import { hexagonalMenu } from './hexagonalMenu.js'

export async function mainMenu(projectName) {
  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Escolha o tipo de arquitetura:',
      choices: [
        { name: '🏗️ 1 | MVC (Model-View-Controller)', value: 'mvc' },
        { name: '🎯 2 | DDD (Domain-Driven Design)', value: 'ddd' },
        { name: '🧹 3 | Clean Architecture', value: 'clean' },
        { name: '🔷 4 | Hexagonal (Ports & Adapters)', value: 'hexagonal' },
      ]
    }
  ])

  // Chama o menu específico da arquitetura escolhida
  if (option === 'mvc') {
    await mvcMenu(projectName)
  } else if (option === 'ddd') {
    await dddMenu(projectName)
  } else if (option === 'clean') {
    await cleanMenu(projectName)
  } else if (option === 'hexagonal') {
    await hexagonalMenu(projectName)
  }
}