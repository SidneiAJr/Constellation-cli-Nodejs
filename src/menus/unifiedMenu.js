import inquirer from 'inquirer'
import { menuDependencias } from './DepenciasMenu.js'
import { frontendMenu } from './frontendMenu.js'

export async function unifiedMenu(projectName, arquitetura) {
  // 1. Escolhe linguagem
  const { linguagem } = await inquirer.prompt([
    {
      type: 'list',
      name: 'linguagem',
      message: 'Escolha a linguagem:',
      choices: [
        { name: 'JavaScript', value: 'js' },
        { name: 'TypeScript', value: 'ts' },
        { name: 'Java', value: 'java' },
        { name: 'PHP', value: 'php' },
        { name: 'C#', value: 'cs' },
      ]
    }
  ])

  // 2. Dependências (só JS/TS)
  let nivel = 'avancado'
  if (linguagem === 'js' || linguagem === 'ts') {
    const result = await menuDependencias(projectName, linguagem, 'js')
    nivel = result.nivel
  }

  // 3. Frontend opcional
  const criarFront = await frontendMenu()

  // 4. Gera tudo (passando arquitetura e linguagem)
  await gerarBackendPorArquitetura(projectName, arquitetura, linguagem, nivel)

  if (criarFront) {
    await gerarFrontend(projectName)
  }

  console.log(chalk.green(`\n✅ Projeto ${arquitetura} criado com sucesso!`))
}