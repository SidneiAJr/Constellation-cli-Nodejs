# 🌟 Constellation CLI | Node.js Edition

Gerador de projetos backend completo. Cria estrutura, arquivos de configuração e código base em segundos.

---

## ⚠️ Aviso

> O código gerado é um esqueleto funcional. Cabe ao desenvolvedor implementar a lógica de negócio, testes e segurança conforme necessário.

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

## 📦 Instalação

```bash
git clone https://github.com/sidalbertok/constellation-cli
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
│   ├── controllers/               ← Controller base com CRUD
│   ├── services/                  ← Service conectado ao repository
│   ├── repositories/              ← Repository com métodos prontos
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

Made in Brasil 🇧🇷 · github: Sidneiajr
