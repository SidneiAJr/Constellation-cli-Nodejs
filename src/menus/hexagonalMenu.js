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

export async function hexagonalMenu(projectName) {
  console.log(chalk.cyan('\n🔷 Hexagonal Architecture (Ports & Adapters) selecionada\n'))

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

  // 4. Cria o projeto com estrutura Hexagonal
  const spinner = ora('🌀 Gerando estrutura Hexagonal...').start()

  // ✅ Chama o gerador correto passando 'hexagonal' como arquitetura
  if (linguagem === 'js') {
    await gerarBackendJS(projectName, 'hexagonal')
  } else if (linguagem === 'ts') {
    await gerarBackendTS(projectName, 'hexagonal')
  } else if (linguagem === 'java') {
    await gerarBackendJava(projectName, 'hexagonal')
  } else if (linguagem === 'php') {
    await gerarBackendPHP(projectName, 'hexagonal')
  } else if (linguagem === 'cs') {
    await gerarBackendCs(projectName, 'hexagonal')
  }

  spinner.succeed(chalk.green('✅ Backend Hexagonal criado!'))

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

📖 Sobre arquitetura Hexagonal (Ports & Adapters):
   - Core/Domain (entidades e regras de negócio)
   - Ports/Incoming (interfaces para receber dados)
   - Ports/Outgoing (interfaces para acessar externo)
   - Adapters/Incoming (Controllers, Middleware)
   - Adapters/Outgoing (Repositories, APIs externas)

🔗 Documentação: https://herbertograca.com/2017/09/14/hexagonal-architecture/
  `))
}