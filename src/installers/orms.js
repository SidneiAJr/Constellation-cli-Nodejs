import { execSync } from 'child_process'

export const ormPackages = {
  prisma:    ['prisma@latest', '@prisma/client@latest'],
  typeorm:   ['typeorm@latest', 'reflect-metadata@latest'],
  sequelize: ['sequelize@latest'],
  mongoose:  ['mongoose@latest'],
  darkstar:  ['@darkstar-cli/orm@latest'],
}

export function installOrm(orm, projectPath) {
  const pkgs = ormPackages[orm]
  if (!pkgs) return

  console.log(`\n📦 Instalando ORM: ${orm}...`)
  try {
    execSync(`cd ${projectPath} && npm install ${pkgs.join(' ')}`, { stdio: 'inherit' })
    console.log(`✅ ${orm} instalado!`)
  } catch {
    console.warn(`⚠️  Falha ao instalar ${orm} — instale manualmente.`)
  }
}