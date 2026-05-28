import chalk from 'chalk'
import ora from 'ora'
import inquirer from 'inquirer'
import { menuDependencias } from './DepenciasMenu.js'
import { gerarBackendJS } from '../generators/backendJS.js'
import { gerarBackendJava } from '../generators/backendJavaSpring.js'
import { gerarBackendPHP } from '../generators/backendPHP.js'
import { gerarBackendCs } from '../generators/backendcs.js'
import { gerarBackendTS } from '../generators/backendts.js'

export async function mvcMenu(projectName) {
  const { opcao } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: '🎯 Escolha o backend:',
      choices: [
        { name: '🟡 Backend JS (Express)', value: 'js' },
        { name: '🔵 Backend TS (Express)', value: 'ts' },
        { name: '☕ Backend Java (Spring Boot)', value: 'java' },
        { name: '🐘 Backend PHP (Slim)', value: 'php' },
        { name: '🔷 Backend C# (ASP.NET Core)', value: 'cs' },
      ]
    }
  ])

  // ✅ Só pergunta nível se for JS ou TS
  let nivel = 'avancado' // padrão
  if (opcao === 'js' || opcao === 'ts') {
    nivel = await menuDependencias()
  }

  const spinner = ora('✨ Criando estrutura...').start()

  // Passa o nível para os geradores JS/TS
  if (opcao === 'js') await gerarBackendJS(projectName, nivel)
  if (opcao === 'ts') await gerarBackendTS(projectName, nivel)
  if (opcao === 'java') await gerarBackendJava(projectName)
  if (opcao === 'php') await gerarBackendPHP(projectName)
  if (opcao === 'cs') await gerarBackendCs(projectName)

  spinner.succeed(chalk.green('✅ Projeto criado com sucesso!'))

  const passos = {
    js:   `cd ${projectName}/Backend && npm install && npm run dev`,
    ts:   `cd ${projectName}/Backend && npm install && npm run dev`,
    java: `cd ${projectName}/Backend && mvn spring-boot:run`,
    php:  `cd ${projectName}/Backend && composer install && php -S localhost:8080 -t public`,
    cs:   `cd ${projectName}/Backend && dotnet restore && dotnet run`,
  }

  console.log(chalk.yellow(`
🚀 Próximos passos:
   ${passos[opcao]}
  `))
}