import path from 'path'
import { criarArquivo, criarPasta } from '../utils/fileHelper.js'
import { getEstruturaPorArquitetura } from '../templates/estruturasbackend.js'
import { generateUniversalMVC } from '../templates/TemplateUniversal.js'
import { gitignoreGlobal } from '../templates/gitignore.js'
import { tsconfigTemplate } from '../templates/tsconfigTemplate.js'
import { envExample } from '../templates/envTemplate.js'
import { buildPackageJsonJS } from '../depency/packageJsonTemplatesJS.js'
import { buildPackageJsonTS } from '../depency/packageJsonTemplatesTS.js'
import { buildPomXml, buildApplicationProperties } from '../depency/packageJsonTemplatesJava.js'
import { buildCsproj, buildAppSettings } from '../depency/packageJsonTemplatesCS.js'
import { buildComposerJson } from '../depency/packageJsonTemplatesPHP.js'

const frameworkMap = {
  js:   'javascript',
  ts:   'typescript',
  php:  'php',
  java: 'javaspring',
  cs:   'csharp',
}

const nextSteps = {
  js:   'npm install && npm run dev',
  ts:   'npm install && npm run dev',
  java: 'mvn spring-boot:run',
  php:  'composer install && php -S localhost:8080 -t public',
  cs:   'dotnet restore && dotnet run',
}

const configMap = {
  js: (base, projectName, orm) => {
    criarArquivo(path.join(base, 'package.json'),
      JSON.stringify(buildPackageJsonJS(projectName, orm), null, 2))
  },
  ts: (base, projectName, orm) => {
    criarArquivo(path.join(base, 'package.json'),
      JSON.stringify(buildPackageJsonTS(projectName, orm), null, 2))
    criarArquivo(path.join(base, 'tsconfig.json'),
      JSON.stringify(tsconfigTemplate(), null, 2))
  },
  java: (base, projectName) => {
    criarArquivo(path.join(base, 'pom.xml'), buildPomXml(projectName, 'enterprise'))
    criarArquivo(path.join(base, 'src/main/resources/application.properties'),
      buildApplicationProperties(projectName, 'enterprise'))
    criarArquivo(
      path.join(base, 'src/main/java/com/constellation/app/Application.java'),
      `package com.constellation.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`
    )
  },
  php: (base, projectName) => {
    criarArquivo(path.join(base, 'composer.json'),
      JSON.stringify(buildComposerJson(projectName, 'enterprise'), null, 2))
    criarArquivo(path.join(base, 'public/index.php'),
      `<?php\nrequire __DIR__ . '/../vendor/autoload.php';\nuse Slim\\Factory\\AppFactory;\n$app = AppFactory::create();\n$app->addRoutingMiddleware();\n$app->addErrorMiddleware(true, true, true);\n$app->run();`)
  },
  cs: (base, projectName) => {
    criarArquivo(path.join(base, `${projectName}.csproj`),
      buildCsproj(projectName, 'enterprise'))
    criarArquivo(path.join(base, 'appsettings.json'),
      buildAppSettings(projectName))
  },
}

export async function gerarProjeto(projectName, linguagem, arquitetura, orm) {
  const base = path.join(projectName, 'Backend')

  const { pastas, arquivos } = getEstruturaPorArquitetura(linguagem, arquitetura)
  pastas.forEach(p => criarPasta(path.join(base, p)))
  arquivos.forEach(f => criarArquivo(path.join(base, f)))

  generateUniversalMVC(base, frameworkMap[linguagem], 'Usuario', orm)

  configMap[linguagem]?.(base, projectName, orm)

  criarArquivo(path.join(base, '.gitignore'), gitignoreGlobal)
  criarArquivo(path.join(base, '.env'), envExample(linguagem))

  criarArquivo(path.join(base, 'README.md'),
`# ${projectName}

## Como rodar
\`\`\`bash
cd ${projectName}/Backend
${nextSteps[linguagem]}
\`\`\`

## Arquitetura: ${arquitetura.toUpperCase()}${orm ? ` | ORM: ${orm}` : ''}
`)
}