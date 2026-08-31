# 🌟 Constellation CLI | Node.js Edition

Gerador de projetos backend completo. Cria estrutura, arquivos de configuração e código base em segundos.

---

## ⚠️ LEIA ANTES DE USAR — IMPORTANTE

> ### 🚨 O Constellation NÃO gera um projeto pronto para produção.
>
> O que ele gera é um **esqueleto universal** — estrutura de pastas, arquivos de configuração e código base genérico que serve como ponto de partida.
>
> **O que você AINDA precisa fazer após gerar:**
> - Implementar toda a lógica de negócio do seu sistema
> - Conectar o banco de dados com suas credenciais reais
> - Implementar autenticação e autorização conforme sua necessidade
> - Escrever os testes da sua aplicação
> - Revisar e adaptar o código gerado para o seu contexto
> - Configurar variáveis de ambiente antes de rodar
>
> ### 🚨 O código gerado é universal e genérico.
>
> Controllers, services e repositories são gerados com métodos `// TODO` — eles compilam e rodam, mas não fazem nada até você implementar.
>
> ### 🚨 O `package.json` gerado é completo e enterprise.
>
> Ele vem com **todas** as dependências de um projeto enterprise — autenticação, filas, cache, websocket, email, PDF, logs, testes, etc. Isso não significa que você precisa de tudo isso. Revise o `package.json` e remova o que não vai usar antes de rodar `npm install`.

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
- ✅ ORM configurável — Prisma, TypeORM, Sequelize, Mongoose
- ✅ Estrutura de pastas e arquivos pronta para uso
- ✅ database.config, env.config, server, middleware e model de Usuario gerados automaticamente
- ✅ package.json / pom.xml / composer.json / .csproj enterprise gerados
- ✅ Interface CLI interativa com menus

---

## 📦 Instalação Global (recomendado)

```bash
npm i -g albertool-constellation
constellation
```

## 📦 Ou clone o repositório

```bash
git clone https://github.com/Sidneiajr/constellation-cli
cd constellation-cli
npm install
node bin/cli.js
```

---

## 🚀 Suporte por linguagem

| Linguagem  | Framework     | ORM disponível              | Arquiteturas               |
|------------|---------------|-----------------------------|----------------------------|
| JavaScript | Express       | Sequelize, Mongoose, Prisma | MVC, DDD, Clean, Hexagonal |
| TypeScript | Express       | Prisma, TypeORM, Sequelize  | MVC, DDD, Clean, Hexagonal |
| Java       | Spring Boot   | JPA (nativo)                | MVC, DDD                   |
| PHP        | Slim          | PDO (nativo)                | MVC, DDD                   |
| C#         | ASP.NET Core  | Entity Framework Core       | MVC, DDD                   |

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

---

## ⚠️ Sobre o package.json gerado

O `package.json` gerado é **intencionalmente completo e enterprise**. Ele inclui dependências para:

- Autenticação JWT e bcrypt
- Filas com BullMQ e RabbitMQ
- Cache com Redis
- WebSocket com Socket.io
- Envio de email com Nodemailer
- Geração de PDF com PDFKit
- Logs com Winston
- Documentação com Swagger
- Testes com Jest
- E muito mais...

> ⚠️ **Você não precisa de tudo isso.** O objetivo é ter tudo disponível caso precise. Antes de rodar `npm install`, abra o `package.json` e remova as dependências que não vai usar. Instalar tudo desnecessariamente aumenta o tamanho do projeto e o tempo de build.

---

## ⚠️ Avisos gerais

> 🔐 **Segurança:** O código gerado não implementa segurança por padrão. Adicione validação, sanitização e autenticação antes de expor qualquer rota.

> 🗄️ **Banco de dados:** As configurações de banco vêm com valores padrão (`localhost`, `root`, sem senha). Nunca suba isso para produção sem alterar.

> 🧪 **Testes:** Nenhum teste é gerado. O `package.json` inclui Jest configurado, mas os testes precisam ser escritos por você.

> 📦 **Dependências:** Versões fixadas na época de geração. Rode `npm audit` e atualize conforme necessário.

> 🏗️ **Arquitetura:** A estrutura de pastas segue o padrão da arquitetura escolhida, mas a separação de responsabilidades precisa ser mantida por você durante o desenvolvimento.

---

Made in Brasil 🇧🇷
EOF