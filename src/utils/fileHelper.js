import fs from 'fs'
import path from 'path'

export function criarPasta(caminho) {
  fs.mkdirSync(caminho, { recursive: true })
}

export function criarArquivo(caminho, conteudo = '') {
  criarPasta(path.dirname(caminho))
  fs.writeFileSync(caminho, conteudo, 'utf8')
}