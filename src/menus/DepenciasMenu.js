import inquirer from 'inquirer'
import { packageBasicoTemplate } from '../templates/packageBasico.js'
import { packageAvancadoTemplate } from '../templates/packageAvancado.js'
import { packageEnterpriseTemplate } from '../templates/packageEnterprise.js'
import { tsconfigTemplate } from '../templates/tsconfigTemplate.js'
import { pomEnterpriseTemplate } from '../templates/pomEnterpriseTemplate.js'
import { csprojEnterpriseTemplate } from '../templates/csprojEnterpriseTemplate.js'

export async function menuDependencias(projectName, linguagem = 'js', backendType = 'js') {
  // Se for Java ou C#, pergunta nível (mas os templates são fixos por enquanto)
  if (backendType === 'java') {
    // Java Spring usa pom.xml enterprise
    return { 
      pomXml: pomEnterpriseTemplate(projectName),
      nivel: 'enterprise'
    }
  }
  
  if (backendType === 'cs') {
    // C# ASP.NET Core usa csproj enterprise
    return { 
      csproj: csprojEnterpriseTemplate(projectName),
      nivel: 'enterprise'
    }
  }

  // Para JS/TS, menu normal
  const { nivel } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nivel',
      message: '📦 Escolha o nível de dependências:',
      choices: [
        { name: '📦 BÁSICO (Express + MySQL2)\n      • API simples, CRUD básico\n', value: 'basico' },
        { name: '🚀 AVANÇADO (+ JWT, Bcrypt, Sequelize, Winston)\n      • API profissional com segurança\n', value: 'avancado' },
        { name: '🏢 ENTERPRISE (+ Redis, Bull, Socket.io, Swagger, PDFKit)\n      • API nível Netflix\n', value: 'enterprise' },
      ]
    }
  ])

  let packageJson
  if (nivel === 'basico') packageJson = packageBasicoTemplate(projectName)
  else if (nivel === 'avancado') packageJson = packageAvancadoTemplate(projectName)
  else packageJson = packageEnterpriseTemplate(projectName)

  let tsconfig = null
  if (linguagem === 'ts') tsconfig = tsconfigTemplate()

  return { packageJson, tsconfig, nivel }
}