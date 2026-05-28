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

  const spinner = ora('✨ Criando estrutura...').start()

  // ✅ Passa o projectName para o menuDependencias!
  if (opcao === 'js') {
    const { packageJson, nivel } = await menuDependencias(projectName, 'js', 'js')
    await gerarBackendJS(projectName, packageJson, nivel)
  } 
  else if (opcao === 'ts') {
    const { packageJson, tsconfig, nivel } = await menuDependencias(projectName, 'ts', 'js')
    await gerarBackendTS(projectName, packageJson, tsconfig, nivel)
  }
  else if (opcao === 'java') {
    const { pomXml } = await menuDependencias(projectName, 'java', 'java')
    await gerarBackendJava(projectName, pomXml)
  }
  else if (opcao === 'php') {
    await gerarBackendPHP(projectName)
  }
  else if (opcao === 'cs') {
    const { csproj } = await menuDependencias(projectName, 'cs', 'cs')
    await gerarBackendCs(projectName, csproj)
  }

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