import { criarArquivo, criarPasta } from '../utils/fileHelper.js'
import path from 'path'

export async function gerarFrontend(projectName) {
  const base = path.join(projectName, 'Frontend')

  criarPasta(base)

  // index.html (estrutura mínima)
  const html = `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - Frontend</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <h1>${projectName}</h1>
        <p>← seu código aqui →</p>
    </div>
    <script src="api.js"></script>
    <script src="app.js"></script>
</body>
</html>`

  // style.css (vazio)
  const css = `/* Seu CSS aqui */`

  // api.js (client fetch)
  const api = `// API Client
const API_URL = 'http://localhost:3000';

export const api = {
    async getUsers() {
        const response = await fetch(\`\${API_URL}/api/users\`);
        return response.json();
    },

    async createUser(user) {
        const response = await fetch(\`\${API_URL}/api/users\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        return response.json();
    },

    async deleteUser(id) {
        const response = await fetch(\`\${API_URL}/api/users/\${id}\`, {
            method: 'DELETE'
        });
        return response.json();
    }
};`

  // app.js (vazio com comentário)
  const app = `// App principal
import { api } from './api.js';

// ← seu código aqui

console.log('🚀 Frontend rodando!');`

  criarArquivo(path.join(base, 'index.html'), html)
  criarArquivo(path.join(base, 'style.css'), css)
  criarArquivo(path.join(base, 'api.js'), api)
  criarArquivo(path.join(base, 'app.js'), app)
}