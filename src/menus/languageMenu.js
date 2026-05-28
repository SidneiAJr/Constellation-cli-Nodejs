import inquirer from 'inquirer'

export async function languageMenu() {
  const { linguagem } = await inquirer.prompt([
    {
      type: 'list',
      name: 'linguagem',
      message: 'Escolha a linguagem:',
      choices: [
        { name: '🟡 JavaScript (Node/Express)', value: 'js' },
        { name: '🔵 TypeScript (Node/Express)', value: 'ts' },
        { name: '☕ Java (Spring Boot)', value: 'java' },
        { name: '🐘 PHP (Slim)', value: 'php' },
        { name: '🔷 C# (ASP.NET Core)', value: 'cs' },
      ]
    }
  ])
  return linguagem
}