import { criarArquivo, criarPasta } from '../utils/fileHelper.js'
import path from 'path'
import { menuDependencias } from '../menus/DepenciasMenu.js'

export async function gerarBackendTS(projectName) {
  const base = path.join(projectName, 'Backend')

  // Pastas
  const pastas = [
    'app/controller', 'app/model', 'app/service',
    'app/repository', 'app/middleware', 'app/entity',
    'app/dto', 'app/config', 'app/helpers',
    'app/utils', 'app/routes', 'docs', 'public', 'tests'
  ]
  pastas.forEach(p => criarPasta(path.join(base, p)))

  // Arquivos vazios
  const arquivos = [
    'app/controller/HomeController.ts',
    'app/controller/UserController.ts',
    'app/controller/AuthController.ts',
    'app/model/UserModel.ts',
    'app/model/ProductModel.ts',
    'app/service/UserService.ts',
    'app/service/AuthService.ts',
    'app/repository/UserRepository.ts',
    'app/middleware/auth.middleware.ts',
    'app/middleware/error.middleware.ts',
    'app/routes/index.routes.ts',
    'app/routes/user.routes.ts',
    'app/config/database.config.ts',
    'app/config/env.config.ts',
    'server.ts',
  ]
  arquivos.forEach(f => criarArquivo(path.join(base, f)))

  // server.ts
  const serverContent = `import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import userRoutes from './app/routes/user.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' })
})

app.listen(PORT, () => {
  console.log(\`Servidor rodando na porta \${PORT}\`)
})`
  criarArquivo(path.join(base, 'server.ts'), serverContent)

  // Menu de dependências
  const { packageJson, tsconfig, nivel } = await menuDependencias(projectName, 'ts', 'js')

  criarArquivo(path.join(base, 'package.json'), JSON.stringify(packageJson, null, 2))
  criarArquivo(path.join(base, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2))

  // Enterprise extras
  if (nivel === 'enterprise') {
    criarArquivo(path.join(base, '.eslintrc.json'), JSON.stringify({
      extends: 'airbnb-base',
      env: { node: true, jest: true },
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: { 'no-console': 'off' }
    }, null, 2))
    
    criarArquivo(path.join(base, '.prettierrc'), JSON.stringify({
      semi: false,
      singleQuote: true,
      tabWidth: 2
    }, null, 2))
  }

  criarArquivo(path.join(base, '.gitignore'), 'node_modules/\n.env\ndist/')
  criarArquivo(path.join(base, '.env'), `PORT=3000\nDB_HOST=localhost\nDB_USER=root\nDB_PASS=root\nDB_NAME=app_db\nJWT_SECRET=changeme`)
}