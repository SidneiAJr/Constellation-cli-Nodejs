import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import path from 'path'

export const dbPackages = {
  mysql:    'mysql2@latest',
  postgres: 'pg@latest',
}

export const dbEnv = {
  mysql: `# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=

# Security
JWT_SECRET=
JWT_EXPIRES_IN=7d

# Optional
REDIS_HOST=localhost
REDIS_PORT=6379
`,
  postgres: `# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_DATABASE=

# Security
JWT_SECRET=
JWT_EXPIRES_IN=7d

# Optional
REDIS_HOST=localhost
REDIS_PORT=6379
`,
}

export function installDatabase(db, projectPath) {
  const pkg = dbPackages[db]
  if (!pkg) return

  console.log(`\n🗄️  Instalando driver: ${db}...`)
  try {
    execSync(`cd ${projectPath} && npm install ${pkg}`, { stdio: 'inherit' })
    console.log(`✅ ${db} driver instalado!`)
  } catch {
    console.warn(`⚠️  Falha ao instalar ${db} — instale manualmente.`)
  }
}

export function setEnv(db, projectPath) {
  const env = dbEnv[db]
  if (!env) return

  const envPath = path.join(projectPath, '.env')
  writeFileSync(envPath, env, 'utf8')
  console.log(`✅ .env configurado para ${db}!`)
}