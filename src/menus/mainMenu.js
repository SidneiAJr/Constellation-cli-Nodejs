import inquirer from 'inquirer'
import { mvcMenu } from './mvcMenu.js'

export async function mainMenu(projectName) {
  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Escolha o tipo de projeto:',
      choices: [
        { name: '1 | Estrutura MVC', value: 'mvc' },
      ]
    }
  ])

  if (option === 'mvc') {
    await mvcMenu(projectName)  // ← passando projectName
  }
}