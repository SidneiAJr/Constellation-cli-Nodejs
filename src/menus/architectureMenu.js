import inquirer from 'inquirer'

export async function architectureMenu() {
  const { arquitetura } = await inquirer.prompt([
    {
      type: 'list',
      name: 'arquitetura',
      message: 'Escolha a arquitetura:',
      choices: [
        { name: '🏗️ MVC (Model-View-Controller)', value: 'mvc' },
        { name: '🎯 DDD (Domain-Driven Design)', value: 'ddd' },
        { name: '🧹 Clean Architecture', value: 'clean' },
        { name: '🔷 Hexagonal (Ports & Adapters)', value: 'hexagonal' },
      ]
    }
  ])
  return arquitetura
}