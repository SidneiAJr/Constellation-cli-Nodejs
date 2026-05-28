import inquirer from 'inquirer'
import { packageBasicoTemplate } from '../templates/packageBasico.js'
import { packageAvancadoTemplate } from '../templates/packageAvancado.js'
import { packageEnterpriseTemplate } from '../templates/packageEnterprise.js'
import { tsconfigTemplate } from '../templates/tsconfigTemplate.js'
import { pomTemplate } from '../templates/pomTemplate.js'
import { pomEnterpriseTemplate } from '../templates/pomTemplateEnterprise.js'
import { csprojEnterpriseTemplate } from '../templates/csprojEnterpriseTemplate.js'

export async function menuDependencias(projectName, linguagem = 'js', backendType = 'js') {
  
  // Java
  if (backendType === 'java') {
    const pomXml = pomEnterpriseTemplate(projectName)
    return { pomXml, nivel: 'enterprise' }
  }
  
  // C#
  if (backendType === 'cs') {
    const csproj = csprojEnterpriseTemplate(projectName)
    return { csproj, nivel: 'enterprise' }
  }

  // JS / TS - mostra menu
  const { nivel } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nivel',
      message: '📦 Escolha o nível de dependências:',
      choices: [
        { name: '📦 BÁSICO (Express + MySQL2)', value: 'basico' },
        { name: '🚀 AVANÇADO (+ JWT, Bcrypt, Sequelize, Winston)', value: 'avancado' },
        { name: '🏢 ENTERPRISE (+ Redis, Bull, Socket.io, Swagger, PDFKit)', value: 'enterprise' },
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