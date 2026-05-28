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

export async function cleanMenu(projectName) {
  console.log(chalk.cyan('\n🧹 Clean Architecture selecionada\n'))

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

  // 4. Cria o projeto com estrutura Clean Architecture
  const spinner = ora('🌀 Gerando estrutura Clean Architecture...').start()

  // ✅ Chama o gerador correto passando 'clean' como arquitetura
  if (linguagem === 'js') {
    await gerarBackendJS(projectName, 'clean')
  } else if (linguagem === 'ts') {
    await gerarBackendTS(projectName, 'clean')
  } else if (linguagem === 'java') {
    await gerarBackendJava(projectName, 'clean')
  } else if (linguagem === 'php') {
    await gerarBackendPHP(projectName, 'clean')
  } else if (linguagem === 'cs') {
    await gerarBackendCs(projectName, 'clean')
  }

  spinner.succeed(chalk.green('✅ Backend Clean Architecture criado!'))

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

📖 Sobre Clean Architecture:
   - Entities (camada central – regras de negócio)
   - Use Cases (casos de uso da aplicação)
   - Interfaces (gateways, presenters, controllers)
   - Frameworks (banco de dados, web, UI)

🔗 Documentação: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
  `))
}