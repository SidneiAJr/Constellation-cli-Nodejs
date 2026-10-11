> [!WARNING]
> ### ⚠️ About the generated architectures — MVC, DDD, Clean and Hexagonal
>
> The folder structures and code organization are based on **reference literature** — books, articles and conventions widely used in the dev community.
>
> They **may vary** depending on the company, team, country or school of thought. There is no "official" or universally correct implementation of DDD, Clean Architecture or Hexagonal — what Constellation generates is a common and functional interpretation, not an absolute standard.
>
> **Use as a starting point, not as the final truth.** Adapt the structure to your team's conventions.

# 🌟 Constellation CLI | Node.js Edition

Full backend project generator. Creates folder structure, config files and base code in seconds.

---

## ⚠️ READ BEFORE USING — IMPORTANT

> ### 🚨 Constellation does NOT generate a production-ready project.
>
> What it generates is a **universal skeleton** — folder structure and generic base code as a starting point.
>
> **What you STILL need to do after generating:**
> - Implement all business logic
> - Connect the database with your real credentials
> - Implement authentication and authorization before exposing any route
> - Write your own tests
> - Review and adapt the generated code to your context
> - Configure environment variables before running

> ### 🚨 The generated code is universal and generic.
>
> Controllers, services and repositories are generated with `// TODO` methods — they compile and run, but do nothing until you implement them.

> ### 📦 A basic package.json is generated automatically
>
> Constellation generates a `package.json` with `name`, `version`, `scripts` (start/dev) and `"type": "module"` ready to go.
>
> Install only what your project actually needs after generating:
> ```bash
> npm install express
> # add what you need
> ```

> ### 🚨 Dependencies are always installed at `@latest`.
>
> When using the built-in installer, all packages are pulled at their **latest** version at the time of generation. This means:
> - Breaking changes may occur if a package releases a major version
> - Always check the installed versions after generation
> - Pin your versions in `package.json` before going to production
> - Run `npm audit` after installing

---

## Tela | Menu

<img width="340" height="293" alt="image" src="https://github.com/user-attachments/assets/a1a18dea-cbb1-46c0-ba81-5f013968757d" />

---

## 🧰 Available Technologies

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" height="45" title="JavaScript"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="45" title="TypeScript"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" height="45" title="Java"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" height="45" title="PHP"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" height="45" title="C#"/>
</p>

---

## ✨ Features

- ✅ 5 languages — JavaScript, TypeScript, Java, PHP, C#
- ✅ 4 architectures — MVC, DDD, Clean Architecture, Hexagonal
- ✅ Folder structure and files ready to use
- ✅ `package.json` basic generated automatically
- ✅ database.config, env.config, server, middleware and Usuario model generated automatically
- ✅ Interactive CLI with numbered menus (no arrow keys — safe on any terminal)
- ✅ Built-in ORM installer — Prisma, TypeORM, Sequelize, Mongoose, Darkstar ORM
- ✅ Built-in database driver installer — MySQL, PostgreSQL
- ✅ `.env` auto-configured with correct ports (MySQL: 3306 / PostgreSQL: 5432)
- ✅ All packages installed at `@latest`

---

## 📦 Installation | Usage

**Install globally (recommended):**
```bash
npm i -g constellation-cli-albertool
constellation
```

**Or run directly without installing:**
```bash
npx constellation-cli-albertool
```

**Aliases also available:**
```bash
cs
cs-new
```

---

## 🚀 Language support

| Language   | Framework     | Architectures              |
|------------|---------------|----------------------------|
| JavaScript | Express       | MVC, DDD, Clean, Hexagonal |
| TypeScript | Express       | MVC, DDD, Clean, Hexagonal |
| Java       | Spring Boot   | MVC, DDD                   |
| PHP        | Slim          | MVC, DDD                   |
| C#         | ASP.NET Core  | MVC, DDD                   |

---

## 🏗️ Supported Architectures

| Architecture | Description                    | Available for          |
|--------------|--------------------------------|------------------------|
| MVC          | Model-View-Controller          | JS, TS, Java, PHP, C#  |
| DDD          | Domain-Driven Design           | JS, TS, Java, PHP, C#  |
| Clean        | Clean Architecture (Uncle Bob) | JS, TS                 |
| Hexagonal    | Ports & Adapters               | JS, TS                 |

---

## 📁 What is generated automatically

```
Backend/
├── package.json                   ← Basic (name, version, scripts, type: module)
├── server.ts / server.js          ← Express configured and ready
├── src/
│   ├── config/
│   │   ├── database.config        ← DB connection (varies by ORM)
│   │   └── env.config             ← Exports environment variables
│   ├── controllers/               ← Base CRUD controller (TODO methods)
│   ├── services/                  ← Service connected to repository (TODO methods)
│   ├── repositories/              ← Repository with base methods (TODO methods)
│   ├── models/                    ← Usuario model (usuario, email, senha)
│   ├── routes/                    ← Registered routes and index.routes
│   └── middleware/
│       ├── auth.middleware         ← JWT verification
│       └── error.middleware        ← Global error handler
├── .env                           ← Variables ready to fill
├── .gitignore
└── README.md
```

---

## ⚠️ General Warnings

> 🔐 **Security:** The generated code does not implement security by default. Add validation, sanitization and authentication before exposing any route.

> 🗄️ **Database:** DB configs come with default values (`localhost`, `root`, no password). Never push this to production without changing them.

> 🧪 **Tests:** No tests are generated — write your own.

> 📦 **Dependencies:** A basic `package.json` is generated. Install only what your project needs.

> 🏗️ **Architecture:** The folder structure follows the chosen architecture pattern, but the separation of concerns must be maintained by you during development.

> ⚡ **Latest versions:** All packages are installed at `@latest`. Pin your versions in `package.json` before going to production and always run `npm audit`.

---

## 📋 Changelog

### v5.0.3f — Fix · _current_
- `package.json` basic re-introduced — generated automatically with name, version, scripts and `"type": "module"`
- README updated to reflect the change
- Version bumped to **5.0.3f** — this release is a direct descendant of the original **Constellation Coffee Edition 3.5** Bash script (`.sh`), which already generated full project structures for JS, TS, Java, PHP and Angular/React. The Node.js CLI rewrite preserved the same philosophy and progressively extended it across the 4.x and 5.x lines.

### v5.0.1f — Fix
- README updated to English
- Added built-in ORM and database installer
- `.env` auto-configured with correct ports
- Removed `package.json` generation — install dependencies manually _(reverted in v5.0.3f)_
- All dependencies installed at `@latest`

---

Made with ❤️ by Albertão 🇧🇷