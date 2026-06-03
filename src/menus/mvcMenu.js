import chalk from 'chalk'
import ora from 'ora'
import inquirer from 'inquirer'
import path from 'path'
import { fileURLToPath } from 'url'
import { menuDependencias } from './DepenciasMenu.js'
import { gerarBackendJS } from '../generators/backendJS.js'
import { gerarBackendJava } from '../generators/backendJavaSpring.js'
import { gerarBackendPHP } from '../generators/backendPHP.js'
import { gerarBackendCs } from '../generators/backendcs.js'
import { gerarBackendTS } from '../generators/backendTS.js'
import { gerarFrontend } from '../generators/frontend.js'
import { gitignoreGlobal } from '../templates/gitignore.js'
import { databaseInit } from '../templates/sqlTeste.js'
import { criarArquivo } from '../utils/fileHelper.js'

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

  const spinner = ora('✨ Criando backend...').start()

  // Gera o backend conforme linguagem escolhida
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

  spinner.succeed(chalk.green('✅ Backend criado com sucesso!'))

  // ============================================
  // EXTRAS NA RAIZ (foda-se)
  // ============================================

  // .gitignore global
  criarArquivo(path.join(projectName, '.gitignore'), gitignoreGlobal)

  // init.sql (banco de teste)
  criarArquivo(path.join(projectName, 'init.sql'), databaseInit(projectName, 'mysql'))

  // Docker (se o usuário quiser)
  const { usarDocker } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'usarDocker',
      message: '🐳 Criar docker-compose.yml com MySQL, PostgreSQL, Redis e phpMyAdmin?',
      default: false
    }
  ])

  if (usarDocker) {
    const { dockerComposeFull } = await import('../templates/dockerFull.js')
    criarArquivo(path.join(projectName, 'docker-compose.yml'), dockerComposeFull(projectName))
    console.log(chalk.green('✅ docker-compose.yml criado!'))
    console.log(chalk.yellow('   Para subir: docker-compose up -d'))
  }

  // ============================================
  // PERGUNTA SE QUER FRONTEND
  // ============================================
  const { querFrontend } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'querFrontend',
      message: '🎨 Criar frontend de teste (HTML + JS + API client)?',
      default: false
    }
  ])

  if (querFrontend) {
    const spinnerFront = ora('📦 Criando frontend...').start()
    await gerarFrontend(projectName)
    spinnerFront.succeed(chalk.green('✅ Frontend criado!'))
  }

  // ============================================
  // PRÓXIMOS PASSOS
  // ============================================
  let passosFront = ''
  if (querFrontend) {
    passosFront = `\n   cd ${projectName}/Frontend && npx live-server`
  }

  const passos = {
    js:   `cd ${projectName}/Backend && npm install && npm run dev`,
    ts:   `cd ${projectName}/Backend && npm install && npm run dev`,
    java: `cd ${projectName}/Backend && mvn spring-boot:run`,
    php:  `cd ${projectName}/Backend && composer install && php -S localhost:8080 -t public`,
    cs:   `cd ${projectName}/Backend && dotnet restore && dotnet run`,
  }

  console.log(chalk.yellow(`
🚀 Próximos passos:
   ${passos[opcao]}${passosFront}
  `))
}