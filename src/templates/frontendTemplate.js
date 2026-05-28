export function frontendHtmlTemplate(projectName) {
  return `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - API Tester</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>🚀 ${projectName}</h1>
        <h2>Teste da API</h2>

        <div class="card">
            <h3>➕ Criar Usuário</h3>
            <form id="userForm">
                <input type="text" id="name" placeholder="Nome" required>
                <input type="email" id="email" placeholder="Email" required>
                <button type="submit">Salvar</button>
            </form>
        </div>

        <div class="card">
            <h3>📋 Lista de Usuários</h3>
            <div class="actions">
                <button id="loadUsers">🔄 Carregar Usuários</button>
            </div>
            <div id="usersList">
                <p>Clique em "Carregar Usuários" para ver os dados</p>
            </div>
        </div>
    </div>
    <script src="api.js"></script>
    <script src="app.js"></script>
</body>
</html>`
}


export function frontendApiTemplate(apiUrl = 'http://localhost:3000') {
  return `// API Client
const API_URL = '${apiUrl}';

export const api = {
    // Listar todos os usuários
    async getUsers() {
        const response = await fetch(\`\${API_URL}/api/users\`);
        if (!response.ok) throw new Error('Erro ao carregar usuários');
        return response.json();
    },

    // Criar usuário
    async createUser(user) {
        const response = await fetch(\`\${API_URL}/api/users\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        if (!response.ok) throw new Error('Erro ao criar usuário');
        return response.json();
    },

    // Deletar usuário
    async deleteUser(id) {
        const response = await fetch(\`\${API_URL}/api/users/\${id}\`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erro ao deletar usuário');
        return response.json();
    }
};`
}

export function frontendAppTemplate() {
  return `import { api } from './api.js';

// DOM Elements
const userForm = document.getElementById('userForm');
const loadUsersBtn = document.getElementById('loadUsers');
const usersList = document.getElementById('usersList');

// Carregar usuários
async function loadUsers() {
    try {
        usersList.innerHTML = '<p>Carregando...</p>';
        const users = await api.getUsers();
        
        if (users.length === 0) {
            usersList.innerHTML = '<p>Nenhum usuário cadastrado</p>';
            return;
        }

        const table = document.createElement('table');
        table.innerHTML = \`
            <thead>
                <tr><th>ID</th><th>Nome</th><th>Email</th><th>Ações</th></tr>
            </thead>
            <tbody>
                \${users.map(user => \`
                    <tr>
                        <td>\${user.id}</td>
                        <td>\${user.name}</td>
                        <td>\${user.email}</td>
                        <td><button class="delete-btn" data-id="\${user.id}">Excluir</button></td>
                    </tr>
                \`).join('')}
            </tbody>
        \`;
        
        usersList.innerHTML = '';
        usersList.appendChild(table);

        // Adiciona eventos de delete
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = btn.dataset.id;
                await deleteUser(id);
            });
        });
    } catch (error) {
        usersList.innerHTML = \`<p class="error">Erro: \${error.message}</p>\`;
    }
}

// Criar usuário
async function createUser(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        await api.createUser({ name, email });
        alert('Usuário criado com sucesso!');
        userForm.reset();
        loadUsers();
    } catch (error) {
        alert(\`Erro: \${error.message}\`);
    }
}

// Deletar usuário
async function deleteUser(id) {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    
    try {
        await api.deleteUser(id);
        alert('Usuário deletado!');
        loadUsers();
    } catch (error) {
        alert(\`Erro: \${error.message}\`);
    }
}

// Event Listeners
userForm.addEventListener('submit', createUser);
loadUsersBtn.addEventListener('click', loadUsers);

// Carrega usuários automaticamente ao iniciar
loadUsers();`
}