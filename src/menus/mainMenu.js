// mainMenu.js
import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import { gerarProjeto } from './gerarProjeto.js'

const proximosPassos = {
  js:   'cd Backend && npm install && npm run dev',
  ts:   'cd Backend && npm install && npm run dev',
  java: 'cd Backend && mvn spring-boot:run',
  php:  'cd Backend && composer install && php -S localhost:8080 -t public',
  cs:   'cd Backend && dotnet restore && dotnet run',
}

export async function mainMenu(projectName) {
  const { arquitetura } = await inquirer.prompt([{
    type: 'list',
    name: 'arquitetura',
    message: '🏗️  Escolha a arquitetura:',
    choices: [
      { name: '🏗️  MVC',      value: 'mvc'       },
      { name: '🎯  DDD',       value: 'ddd'       },
      { name: '🧹  Clean',     value: 'clean'     },
      { name: '🔷  Hexagonal', value: 'hexagonal' },
    ]
  }])

  const { linguagem } = await inquirer.prompt([{
    type: 'list',
    name: 'linguagem',
    message: '🌐 Escolha a linguagem:',
    choices: [
      { name: '🟡 JavaScript (Node/Express)', value: 'js'   },
      { name: '🔵 TypeScript (Node/Express)', value: 'ts'   },
      { name: '☕ Java (Spring Boot)',         value: 'java' },
      { name: '🐘 PHP (Slim)',                 value: 'php'  },
      { name: '🔷 C# (ASP.NET Core)',          value: 'cs'   },
    ]
  }])

  // pergunta ORM só pra JS e TS
  let orm = null
  if (linguagem === 'js' || linguagem === 'ts') {
    const ormChoices = linguagem === 'ts'
      ? [
          { name: '🟦 Prisma    — type-safe, moderno', value: 'prisma'    },
          { name: '🔷 TypeORM   — decorators, migrations', value: 'typeorm'   },
          { name: '🟡 Sequelize — clássico, maduro',   value: 'sequelize' },
        ]
      : [
          { name: '🟡 Sequelize — SQL clássico',       value: 'sequelize' },
          { name: '🍃 Mongoose  — MongoDB nativo',      value: 'mongoose'  },
          { name: '🟦 Prisma    — type-safe, moderno',  value: 'prisma'    },
        ]

    const res = await inquirer.prompt([{
      type: 'list',
      name: 'orm',
      message: '🗄️  Escolha o ORM:',
      choices: ormChoices
    }])
    orm = res.orm
  }

  const spinner = ora('✨ Gerando projeto...').start()
  await gerarProjeto(projectName, linguagem, arquitetura, orm)
  spinner.succeed(chalk.green(`✅ Projeto "${projectName}" criado!`))

  console.log(chalk.yellow(`
🚀 Próximos passos:
   cd ${projectName}/${proximosPassos[linguagem]}
  `))
}