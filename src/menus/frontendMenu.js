import inquirer from 'inquirer'

export async function frontendMenu() {
  const { criarFront } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'criarFront',
      message: 'Criar frontend de teste (HTML + JS + API client)?',
      default: false
    }
  ])
  return criarFront
}