import inquirer from 'inquirer'

export async function estruturaMenu(pastasExemplo, arquivosExemplo) {
  console.log(chalk.cyan('\n📁 Estrutura que será criada:'))
  console.log(chalk.gray(pastasExemplo.slice(0, 5).join(', ') + '...'))
  console.log(chalk.gray(arquivosExemplo.slice(0, 5).join(', ') + '...'))

  const { confirmar } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmar',
      message: 'Confirmar estrutura?',
      default: true
    }
  ])
  return confirmar
}