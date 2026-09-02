import path from 'path'
import { criarArquivo, criarPasta } from '../utils/fileHelper.js'
import { getEstruturaPorArquitetura } from '../templates/estruturasbackend.js'
import { generateUniversalMVC } from '../templates/TemplateUniversal.js'
import { gitignoreGlobal } from '../templates/gitignore.js'
import { tsconfigTemplate } from '../templates/tsconfigTemplate.js'
import { envExample } from '../templates/envTemplate.js'

const frameworkMap = {
  js:   'javascript',
  ts:   'typescript',
  php:  'php',
  java: 'javaspring',
  cs:   'csharp',
}

const nextSteps = {
  js:   'npm init -y && npm install express',
  ts:   'npm init -y && npm install express typescript ts-node-dev',
  java: 'mvn spring-boot:run',
  php:  'composer install && php -S localhost:8080 -t public',
  cs:   'dotnet restore && dotnet run',
}

export async function gerarProjeto(projectName, linguagem, arquitetura) {
  const base = path.join(projectName, 'Backend')

  const { pastas, arquivos } = getEstruturaPorArquitetura(linguagem, arquitetura)
  pastas.forEach(p => criarPasta(path.join(base, p)))
  arquivos.forEach(f => criarArquivo(path.join(base, f)))

  generateUniversalMVC(base, frameworkMap[linguagem], 'Usuario')

  if (linguagem === 'ts') {
    criarArquivo(path.join(base, 'tsconfig.json'),
      JSON.stringify(tsconfigTemplate(), null, 2))
  }

  criarArquivo(path.join(base, '.gitignore'), gitignoreGlobal)
  criarArquivo(path.join(base, '.env'), envExample(linguagem))

  criarArquivo(path.join(base, 'README.md'),
`# ${projectName}

## Como rodar

\`\`\`bash
cd ${projectName}/Backend
${nextSteps[linguagem]}
\`\`\`

## Arquitetura: ${arquitetura.toUpperCase()}

> Instale as dependências que o seu projeto precisar manualmente.
`)
}