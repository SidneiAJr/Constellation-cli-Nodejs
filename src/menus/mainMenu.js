// mainMenu.js
import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import { gerarProjeto } from './gerarProjeto.js'

const proximosPassos = {
  js:   'cd Backend && npm init -y && npm install express',
  ts:   'cd Backend && npm init -y && npm install express typescript ts-node-dev',
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

  const spinner = ora('✨ Gerando projeto...').start()
  await gerarProjeto(projectName, linguagem, arquitetura)
  spinner.succeed(chalk.green(`✅ Projeto "${projectName}" criado!`))

  console.log(chalk.yellow(`
🚀 Próximos passos:
   cd ${projectName}/${proximosPassos[linguagem]}
  `))
}