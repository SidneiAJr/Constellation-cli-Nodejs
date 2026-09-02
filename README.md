> [!WARNING]
> ### ⚠️ Sobre as arquiteturas geradas — MVC, DDD, Clean e Hexagonal
>
> As estruturas de pastas e a organização do código gerado são baseadas em **literaturas de referência** — livros, artigos e convenções amplamente usadas na comunidade de desenvolvimento.
>
> Isso significa que **podem variar** dependendo da empresa, do time, do país ou da escola de pensamento. Não existe uma implementação "oficial" ou universalmente correta de DDD, Clean Architecture ou Hexagonal — o que o Constellation gera é uma interpretação comum e funcional, não um padrão absoluto.
>
> **Use como ponto de partida, não como verdade definitiva.** Adapte a estrutura conforme as convenções do seu time ou projeto.

# 🌟 Constellation CLI | Node.js Edition

Gerador de projetos backend completo. Cria estrutura, arquivos de configuração e código base em segundos.

---

## ⚠️ LEIA ANTES DE USAR — IMPORTANTE

> ### 🚨 O Constellation NÃO gera um projeto pronto para produção.
>
> O que ele gera é um **esqueleto universal** — estrutura de pastas e código base genérico que serve como ponto de partida.
>
> **O que você AINDA precisa fazer após gerar:**
> - Rodar `npm init -y` e instalar as dependências que o seu projeto precisar
> - Implementar toda a lógica de negócio do seu sistema
> - Conectar o banco de dados com suas credenciais reais
> - Implementar autenticação e autorização conforme sua necessidade
> - Escrever os testes da sua aplicação
> - Revisar e adaptar o código gerado para o seu contexto
> - Configurar variáveis de ambiente antes de rodar

> ### 🚨 O código gerado é universal e genérico.
>
> Controllers, services e repositories são gerados com métodos `// TODO` — eles compilam e rodam, mas não fazem nada até você implementar.

> ### 📦 package.json não é mais gerado — v5.0.1f
>
> A partir desta versão, o Constellation **não gera mais o `package.json`** automaticamente.
> Instale apenas o que o seu projeto realmente precisar:
> ```bash
> npm init -y
> npm install express
> # adicione o que precisar
> ```

---

## Tela | Menu

<img width="340" height="293" alt="image" src="https://github.com/user-attachments/assets/a1a18dea-cbb1-46c0-ba81-5f013968757d" />

---

## 🧰 Tecnologias Disponíveis

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" height="45" title="JavaScript"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="45" title="TypeScript"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" height="45" title="Java"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" height="45" title="PHP"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" height="45" title="C#"/>
</p>

---

## ✨ Funcionalidades

- ✅ 5 linguagens — JavaScript, TypeScript, Java, PHP, C#
- ✅ 4 arquiteturas — MVC, DDD, Clean Architecture, Hexagonal
- ✅ Estrutura de pastas e arquivos pronta para uso
- ✅ database.config, env.config, server, middleware e model de Usuario gerados automaticamente
- ✅ Interface CLI interativa com menus

---

## 📦 Instalação | Uso

**Instalar globalmente (recomendado):**
```bash
npm i -g constellation-cli-albertool
constellation
```

**Ou rodar direto sem instalar:**
```bash
npx constellation-cli-albertool
```

---

## 🚀 Suporte por linguagem

| Linguagem  | Framework     | Arquiteturas               |
|------------|---------------|----------------------------|
| JavaScript | Express       | MVC, DDD, Clean, Hexagonal |
| TypeScript | Express       | MVC, DDD, Clean, Hexagonal |
| Java       | Spring Boot   | MVC, DDD                   |
| PHP        | Slim          | MVC, DDD                   |
| C#         | ASP.NET Core  | MVC, DDD                   |

---

## 🏗️ Arquiteturas suportadas

| Arquitetura | Descrição                      | Disponível para        |
|-------------|--------------------------------|------------------------|
| MVC         | Model-View-Controller          | JS, TS, Java, PHP, C#  |
| DDD         | Domain-Driven Design           | JS, TS, Java, PHP, C#  |
| Clean       | Clean Architecture (Uncle Bob) | JS, TS                 |
| Hexagonal   | Ports & Adapters               | JS, TS                 |

---

## 📁 O que é gerado automaticamente

```
Backend/
├── server.ts / server.js          ← Express configurado e pronto
├── src/
│   ├── config/
│   │   ├── database.config        ← Conexão com banco (varia por ORM)
│   │   └── env.config             ← Exporta variáveis de ambiente
│   ├── controllers/               ← Controller base com CRUD (métodos TODO)
│   ├── services/                  ← Service conectado ao repository (métodos TODO)
│   ├── repositories/              ← Repository com métodos prontos (métodos TODO)
│   ├── models/                    ← Model de Usuario (usuario, email, senha)
│   ├── routes/                    ← Rotas registradas e index.routes
│   └── middleware/
│       ├── auth.middleware         ← JWT verificado
│       └── error.middleware        ← Handler global de erros
├── .env                           ← Variáveis prontas pra preencher
├── .gitignore
└── README.md
```

> **package.json não é gerado.** Rode `npm init -y` e instale o que precisar.

---

## ⚠️ Avisos gerais

> 🔐 **Segurança:** O código gerado não implementa segurança por padrão. Adicione validação, sanitização e autenticação antes de expor qualquer rota.

> 🗄️ **Banco de dados:** As configurações de banco vêm com valores padrão (`localhost`, `root`, sem senha). Nunca suba isso para produção sem alterar.

> 🧪 **Testes:** Nenhum teste é gerado — escreva os seus.

> 📦 **Dependências:** Nenhum `package.json` é gerado. Instale apenas o que o seu projeto precisar.

> 🏗️ **Arquitetura:** A estrutura de pastas segue o padrão da arquitetura escolhida, mas a separação de responsabilidades precisa ser mantida por você durante o desenvolvimento.

---

## 📋 Changelog

### v5.0.1f — Fix · _atual_
- Correção no README gerado
- Removido suporte a `package.json` — instale as dependências manualmente

---

Made with ❤️ by Albertão 🇧🇷