import { criarArquivo, criarPasta } from '../utils/fileHelper.js'
import path from 'path'
import { menuDependencias } from '../menus/DepenciasMenu.js'
import { getEstruturaPorArquitetura } from '../templates/estruturasbackend.js'

export async function gerarBackendJS(projectName, arquitetura = 'mvc') {
  const base = path.join(projectName, 'Backend')

  // ============================================
  // 1. PEGA A ESTRUTURA CORRETA (JS + arquitetura)
  // ============================================
  const { pastas, arquivos } = getEstruturaPorArquitetura('js', arquitetura)

  // ============================================
  // 2. CRIA PASTAS E ARQUIVOS VAZIOS
  // ============================================
  pastas.forEach(p => criarPasta(path.join(base, p)))
  arquivos.forEach(f => criarArquivo(path.join(base, f)))

  // ============================================
  // 3. server.js (mínimo para rodar)
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

  criarArquivo(path.join(base, 'server.js'), serverContent)

  // ============================================
  // 4. PERGUNTA NÍVEL DE DEPENDÊNCIA
  // ============================================
  const { packageJson, nivel } = await menuDependencias(projectName, 'js', 'js')

  // ============================================
  // 5. package.json
  // ============================================
  criarArquivo(
    path.join(base, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  )

  // ============================================
  // 6. ENTERPRISE EXTRAS
  // ============================================
  if (nivel === 'enterprise') {
    criarArquivo(path.join(base, '.eslintrc.json'), JSON.stringify({
      extends: 'airbnb-base',
      env: { node: true, jest: true },
      rules: { 'no-console': 'off' }
    }, null, 2))
    
    criarArquivo(path.join(base, '.prettierrc'), JSON.stringify({
      semi: false,
      singleQuote: true,
      tabWidth: 2
    }, null, 2))
  }

  // ============================================
  // 7. ARQUIVOS COMUNS
  // ============================================
  criarArquivo(path.join(base, '.gitignore'), 'node_modules/\n.env\ndist/')
  criarArquivo(path.join(base, '.env'), `PORT=3000\nDB_HOST=localhost\nDB_USER=root\nDB_PASS=root\nDB_NAME=app_db\nJWT_SECRET=changeme`)
}