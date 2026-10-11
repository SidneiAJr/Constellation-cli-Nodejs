// depsMenu.js
import * as readline from 'readline'
import { installOrm } from '../installers/orms.js'
import { installDatabase, setEnv } from '../installers/databases.js'

const orms   = { 1: 'prisma', 2: 'typeorm', 3: 'sequelize', 4: 'mongoose', 5: 'darkstar' }
const bancos = { 1: 'mysql', 2: 'postgres' }

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve))
}

export async function depsMenu(projectPath, orm = null) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  if (!orm) {
    console.log('\n📦 Escolha o ORM / Choose ORM:')
    console.log('1. Prisma')
    console.log('2. TypeORM')
    console.log('3. Sequelize')
    console.log('4. Mongoose')
    console.log('5. Darkstar ORM\n')

    const ormInput = await ask(rl, '> ')
    orm = orms[ormInput]
    if (!orm) { console.log('❌ Opção inválida / Invalid option'); rl.close(); return }
  }

  let banco = null

  if (orm !== 'mongoose' && orm !== 'darkstar') {
    console.log('\n🗄️  Escolha o banco / Choose database:')
    console.log('1. MySQL  (porta 3306)')
    console.log('2. PostgreSQL (porta 5432)\n')

    const dbInput = await ask(rl, '> ')
    banco = bancos[dbInput]
    if (!banco) { console.log('❌ Opção inválida / Invalid option'); rl.close(); return }
  }

  rl.close()

  await installOrm(orm, projectPath)

  if (banco) {
    await installDatabase(banco, projectPath)
    setEnv(banco, projectPath)
  }

  console.log('\n✅ Dependências prontas! / Dependencies ready!')
  console.log('📄 .env configurado com as portas certas!\n')
}