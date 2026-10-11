// mainMenu.js
import * as readline from 'readline'
import { gerarProjeto } from './gerarProjeto.js'
import { depsMenu } from './depsMenu.js'

const arquiteturas = { 1: 'mvc', 2: 'ddd', 3: 'clean', 4: 'hexagonal' }
const linguagens   = { 1: 'js',  2: 'ts',  3: 'java',  4: 'php', 5: 'cs' }

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve))
}

export async function mainMenu(projectName) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  console.log('\n🏗️  Escolha a arquitetura / Choose architecture:')
  console.log('1. MVC')
  console.log('2. DDD')
  console.log('3. Clean')
  console.log('4. Hexagonal\n')

  const archInput = await ask(rl, '> ')
  const arquitetura = arquiteturas[archInput]
  if (!arquitetura) { console.log('❌ Opção inválida / Invalid option'); rl.close(); return }

  console.log('\n🌐 Escolha a linguagem / Choose language:')
  console.log('1. JavaScript (Node/Express)')
  console.log('2. TypeScript (Node/Express)')
  console.log('3. Java (Spring Boot)')
  console.log('4. PHP (Slim)')
  console.log('5. C# (ASP.NET Core)\n')

  const langInput = await ask(rl, '> ')
  const linguagem = linguagens[langInput]
  if (!linguagem) { console.log('❌ Opção inválida / Invalid option'); rl.close(); return }

  let orm = null

  if (linguagem === 'js' || linguagem === 'ts') {
    console.log('\n📦 Escolha o ORM / Choose ORM:')
    console.log('1. Prisma')
    console.log('2. TypeORM')
    console.log('3. Sequelize')
    console.log('4. Mongoose')
    console.log('5. Darkstar ORM\n')

    const ormInput = await ask(rl, '> ')
    const orms = { 1: 'prisma', 2: 'typeorm', 3: 'sequelize', 4: 'mongoose', 5: 'darkstar' }
    orm = orms[ormInput]
    if (!orm) { console.log('❌ Opção inválida / Invalid option'); rl.close(); return }
  }

  const instalar = await ask(rl, '\n📥 Instalar dependências agora? / Install dependencies now? (s/n): ')

  rl.close()

  console.log('\n✨ Gerando projeto... / Generating project...')
  await gerarProjeto(projectName, linguagem, arquitetura, orm)

  if ((instalar.toLowerCase() === 's' || instalar.toLowerCase() === 'y') &&
      (linguagem === 'js' || linguagem === 'ts')) {
    await depsMenu(`${projectName}/Backend`, orm)
  }

  console.log(`\n✅ Projeto "${projectName}" criado! / Project created!`)
  console.log(`\n🚀 Próximos passos / Next steps:\n   cd ${projectName}/Backend\n`)
}