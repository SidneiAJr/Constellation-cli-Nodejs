import { criarArquivo, criarPasta } from '../utils/fileHelper.js'
import path from 'path'
import { menuDependencias } from '../menus/DepenciasMenu.js'
import { getEstruturaPorArquitetura } from '../templates/estruturasbackend.js'

export async function gerarBackendTS(projectName, arquitetura = 'mvc') {
  const base = path.join(projectName, 'Backend')

  // ============================================
  // 1. PEGA A ESTRUTURA CORRETA (TS + arquitetura)
  // ============================================
  const { pastas, arquivos } = getEstruturaPorArquitetura('ts', arquitetura)

  // ============================================
  // 2. CRIA PASTAS E ARQUIVOS VAZIOS
  // ============================================
  pastas.forEach(p => criarPasta(path.join(base, p)))
  arquivos.forEach(f => criarArquivo(path.join(base, f)))

  // ============================================
  // 3. server.ts
  // ============================================
  const serverContent = `import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' })
})

app.listen(PORT, () => {
  console.log(\`Servidor rodando na porta \${PORT}\`)
})`

  criarArquivo(path.join(base, 'server.ts'), serverContent)

  // ============================================
  // 4. DEPENDÊNCIAS
  // ============================================
  const { packageJson, tsconfig, nivel } = await menuDependencias(projectName, 'ts', 'js')

  criarArquivo(path.join(base, 'package.json'), JSON.stringify(packageJson, null, 2))
  criarArquivo(path.join(base, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2))

  // ============================================
  // 5. ENTERPRISE EXTRAS
  // ============================================
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

  // ============================================
  // 6. ARQUIVOS COMUNS
  // ============================================
  criarArquivo(path.join(base, '.gitignore'), 'node_modules/\n.env\ndist/')
  criarArquivo(path.join(base, '.env'), `PORT=3000\nDB_HOST=localhost\nDB_USER=root\nDB_PASS=root\nDB_NAME=app_db\nJWT_SECRET=changeme`)
}