import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import { languageMenu } from './languageMenu.js'
import { menuDependencias } from './DepenciasMenu.js'
import { frontendMenu } from './frontendMenu.js'
import { gerarBackendTS } from '../generators/backendTS.js'
import { gerarBackendJS } from '../generators/backendJS.js'
import { gerarBackendJava } from '../generators/backendJavaSpring.js'
import { gerarBackendPHP } from '../generators/backendPHP.js'
import { gerarBackendCs } from '../generators/backendcs.js'

export async function dddMenu(projectName) {
  console.log(chalk.cyan('\n🎯 DDD (Domain-Driven Design) selecionada\n'))

  // 1. Escolhe linguagem
  const linguagem = await languageMenu()

  // 2. Dependências
  let nivel = 'avancado'
  let packageJson = null
  let tsconfig = null

  if (linguagem === 'js' || linguagem === 'ts') {
    const result = await menuDependencias(projectName, linguagem, 'js')
    packageJson = result.packageJson
    tsconfig = result.tsconfig
    nivel = result.nivel
  } else if (linguagem === 'java') {
    await menuDependencias(projectName, 'java', 'java')
  } else if (linguagem === 'cs') {
    await menuDependencias(projectName, 'cs', 'cs')
  }

  // 3. Frontend opcional
  const criarFront = await frontendMenu()

  // 4. Cria o projeto com estrutura DDD
  const spinner = ora('🌀 Gerando estrutura DDD...').start()

  // ✅ Chama o gerador correto passando 'ddd' como arquitetura
  if (linguagem === 'js') {
    await gerarBackendJS(projectName, 'ddd')
  } else if (linguagem === 'ts') {
    await gerarBackendTS(projectName, 'ddd')
  } else if (linguagem === 'java') {
    await gerarBackendJava(projectName, 'ddd')
  } else if (linguagem === 'php') {
    await gerarBackendPHP(projectName, 'ddd')
  } else if (linguagem === 'cs') {
    await gerarBackendCs(projectName, 'ddd')
  }

  spinner.succeed(chalk.green('✅ Backend DDD criado!'))

  // 5. Frontend
  if (criarFront) {
    const spinnerFront = ora('🎨 Criando frontend...').start()
    const { gerarFrontend } = await import('../generators/frontend.js')
    await gerarFrontend(projectName)
    spinnerFront.succeed(chalk.green('✅ Frontend criado!'))
  }

  // 6. Próximos passos
  const passos = {
    js:   `cd ${projectName}/Backend && npm install && npm run dev`,
    ts:   `cd ${projectName}/Backend && npm install && npm run dev`,
    java: `cd ${projectName}/Backend && mvn spring-boot:run`,
    php:  `cd ${projectName}/Backend && composer install && php -S localhost:8080 -t public`,
    cs:   `cd ${projectName}/Backend && dotnet restore && dotnet run`,
  }

  console.log(chalk.yellow(`
🚀 Próximos passos:
   ${passos[linguagem]}

📖 Sobre DDD (Domain-Driven Design):
   - Domain Layer (entidades, value objects, repositórios)
   - Application Layer (use cases, DTOs, commands)
   - Infrastructure Layer (persistência, repositórios concretos)
   - Interfaces Layer (controllers, middleware)

🔗 Documentação: https://martinfowler.com/tags/domain%20driven%20design.html
  `))
}