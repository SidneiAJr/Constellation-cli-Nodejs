// templates/TemplateUniversal.js
import * as fs from 'fs';
import * as path from 'path';

export function generateUniversalMVC(projectPath, framework, entityName = 'Usuario', orm = 'prisma') {
    switch (framework) {
        case 'typescript': generateTS(projectPath, entityName, orm); generateModels(projectPath, 'typescript', orm); break;
        case 'javascript': generateJS(projectPath, entityName, orm); generateModels(projectPath, 'javascript', orm); break;
        case 'php':        generatePHP(projectPath, entityName); generateModels(projectPath, 'php', null); break;
        case 'java':       generateJavaSpark(projectPath, entityName); generateModels(projectPath, 'java', null); break;
        case 'javaspring': generateJavaSpring(projectPath, entityName); generateModels(projectPath, 'javaspring', null); break;
        case 'csharp':     generateCSharp(projectPath, entityName); generateModels(projectPath, 'csharp', null); break;
        default:
            console.warn(`⚠️  Framework desconhecido: ${framework}`);
    }
}

// ==============================
// TYPESCRIPT
// ==============================
function generateTS(projectPath, entity, orm) {

    // ---- database.config por ORM ----
    const dbConfigs = {
        prisma: `// src/config/database.config.ts
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})
`,
        typeorm: `// src/config/database.config.ts
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
})
`,
        sequelize: `// src/config/database.config.ts
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

export const db = new Sequelize(
  process.env.DB_DATABASE!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    dialect: 'mysql',
    logging: false,
  }
)
`
    }

    // ---- env.config ----
    const envConfig = `// src/config/env.config.ts
import dotenv from 'dotenv'
dotenv.config()

export const {
  PORT,
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  REDIS_HOST,
  REDIS_PORT,
} = process.env
`

    // ---- server.ts ----
    const server = `// server.ts
import 'reflect-metadata'
import express from 'express'
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

// TODO: importe e registre suas rotas aqui
// import { router } from './src/routes/index.routes'
// app.use('/api', router)

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!', version: '1.0.0' })
})

app.listen(PORT, () => {
  console.log(\`🚀 Servidor rodando na porta \${PORT}\`)
})

export default app
`

    // ---- index.routes ----
    const indexRoutes = `// src/routes/index.routes.ts
import { Router } from 'express'
import { router as ${entity.toLowerCase()}Router } from './${entity.toLowerCase()}.routes'

export const router = Router()

router.use('/${entity.toLowerCase()}s', ${entity.toLowerCase()}Router)
`

    // ---- middleware ----
    const authMiddleware = `// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ error: 'Token não fornecido' })
    return
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    ;(req as any).user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}
`

    const errorMiddleware = `// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express'

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  })
}
`

    const repository = `// src/repositories/${entity}Repository.ts

export class ${entity}Repository {

    async create(data: any): Promise<any> {
        // TODO: adicione sua lógica aqui
    }

    async findById(id: number): Promise<any> {
        // TODO: adicione sua lógica aqui
    }

    async findByEmail(email: string): Promise<any> {
        // TODO: adicione sua lógica aqui
    }

    async findByUsername(username: string): Promise<any> {
        // TODO: adicione sua lógica aqui
    }

    async findAll(): Promise<any[]> {
        // TODO: adicione sua lógica aqui
    }

    async update(id: number, data: any): Promise<any> {
        // TODO: adicione sua lógica aqui
    }

    async delete(id: number): Promise<void> {
        // TODO: adicione sua lógica aqui
    }
}
`

    const service = `// src/services/${entity}Service.ts
import { ${entity}Repository } from '../repositories/${entity}Repository'

const repository = new ${entity}Repository()

export class ${entity}Service {

    async create(data: any): Promise<any> {
        return await repository.create(data)
    }

    async findById(id: number): Promise<any> {
        return await repository.findById(id)
    }

    async findByEmail(email: string): Promise<any> {
        return await repository.findByEmail(email)
    }

    async findByUsername(username: string): Promise<any> {
        return await repository.findByUsername(username)
    }

    async findAll(): Promise<any[]> {
        return await repository.findAll()
    }

    async update(id: number, data: any): Promise<any> {
        return await repository.update(id, data)
    }

    async delete(id: number): Promise<void> {
        await repository.delete(id)
    }
}
`

    const controller = `// src/controllers/${entity}Controller.ts
import { Request, Response } from 'express'
import { ${entity}Service } from '../services/${entity}Service'

const service = new ${entity}Service()

export class ${entity}Controller {

    async index(req: Request, res: Response): Promise<void> {
        try {
            const data = await service.findAll()
            res.json(data)
        } catch (err: any) {
            res.status(500).json({ error: err.message })
        }
    }

    async show(req: Request, res: Response): Promise<void> {
        try {
            const data = await service.findById(Number(req.params.id))
            if (!data) { res.status(404).json({ error: 'Não encontrado' }); return }
            res.json(data)
        } catch (err: any) {
            res.status(500).json({ error: err.message })
        }
    }

    async store(req: Request, res: Response): Promise<void> {
        try {
            const data = await service.create(req.body)
            res.status(201).json(data)
        } catch (err: any) {
            res.status(500).json({ error: err.message })
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const data = await service.update(Number(req.params.id), req.body)
            res.json(data)
        } catch (err: any) {
            res.status(500).json({ error: err.message })
        }
    }

    async destroy(req: Request, res: Response): Promise<void> {
        try {
            await service.delete(Number(req.params.id))
            res.status(204).send()
        } catch (err: any) {
            res.status(500).json({ error: err.message })
        }
    }
}
`

    const routes = `// src/routes/${entity.toLowerCase()}.routes.ts
import { Router } from 'express'
import { ${entity}Controller } from '../controllers/${entity}Controller'

export const router = Router()
const controller = new ${entity}Controller()

router.get('/',      (req, res) => controller.index(req, res))
router.get('/:id',   (req, res) => controller.show(req, res))
router.post('/',     (req, res) => controller.store(req, res))
router.put('/:id',   (req, res) => controller.update(req, res))
router.delete('/:id',(req, res) => controller.destroy(req, res))
`

    writeFile(projectPath, 'server.ts', server)
    writeFile(projectPath, 'src/config/database.config.ts', dbConfigs[orm] ?? dbConfigs.prisma)
    writeFile(projectPath, 'src/config/env.config.ts', envConfig)
    writeFile(projectPath, 'src/middleware/auth.middleware.ts', authMiddleware)
    writeFile(projectPath, 'src/middleware/error.middleware.ts', errorMiddleware)
    writeFile(projectPath, `src/repositories/${entity}Repository.ts`, repository)
    writeFile(projectPath, `src/services/${entity}Service.ts`, service)
    writeFile(projectPath, `src/controllers/${entity}Controller.ts`, controller)
    writeFile(projectPath, `src/routes/${entity.toLowerCase()}.routes.ts`, routes)
    writeFile(projectPath, 'src/routes/index.routes.ts', indexRoutes)
}

// ==============================
// JAVASCRIPT
// ==============================
function generateJS(projectPath, entity, orm) {

    // ---- database.config por ORM ----
    const dbConfigs = {
        sequelize: `// src/config/database.config.js
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

export const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
)
`,
        mongoose: `// src/config/database.config.js
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export async function connectDB() {
  try {
    await mongoose.connect(
      \`mongodb://\${process.env.DB_HOST}:\${process.env.DB_PORT}/\${process.env.DB_DATABASE}\`
    )
    console.log('✅ MongoDB conectado')
  } catch (err) {
    console.error('❌ Erro ao conectar MongoDB:', err)
    process.exit(1)
  }
}
`,
        prisma: `// src/config/database.config.js
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})
`
    }

    // ---- env.config ----
    const envConfig = `// src/config/env.config.js
import dotenv from 'dotenv'
dotenv.config()

export const {
  PORT,
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  REDIS_HOST,
  REDIS_PORT,
} = process.env
`

    // ---- server.js ----
    const server = `// server.js
import express from 'express'
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

// TODO: importe e registre suas rotas aqui
// import { router } from './src/routes/index.routes.js'
// app.use('/api', router)

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!', version: '1.0.0' })
})

app.listen(PORT, () => {
  console.log(\`🚀 Servidor rodando na porta \${PORT}\`)
})
`

    // ---- index.routes ----
    const indexRoutes = `// src/routes/index.routes.js
import { Router } from 'express'
import ${entity.toLowerCase()}Router from './${entity.toLowerCase()}.routes.js'

export const router = Router()

router.use('/${entity.toLowerCase()}s', ${entity.toLowerCase()}Router)
`

    // ---- middleware ----
    const authMiddleware = `// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token não fornecido' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}
`

    const errorMiddleware = `// src/middleware/error.middleware.js
export function errorMiddleware(err, req, res, next) {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  })
}
`

    const repository = `// src/repositories/${entity}Repository.js

class ${entity}Repository {

    async create(data) {
        // TODO: adicione sua lógica aqui
    }

    async findById(id) {
        // TODO: adicione sua lógica aqui
    }

    async findByEmail(email) {
        // TODO: adicione sua lógica aqui
    }

    async findByUsername(username) {
        // TODO: adicione sua lógica aqui
    }

    async findAll() {
        // TODO: adicione sua lógica aqui
    }

    async update(id, data) {
        // TODO: adicione sua lógica aqui
    }

    async delete(id) {
        // TODO: adicione sua lógica aqui
    }
}

export default ${entity}Repository
`

    const service = `// src/services/${entity}Service.js
import ${entity}Repository from '../repositories/${entity}Repository.js'

const repository = new ${entity}Repository()

class ${entity}Service {

    async create(data) {
        return await repository.create(data)
    }

    async findById(id) {
        return await repository.findById(id)
    }

    async findByEmail(email) {
        return await repository.findByEmail(email)
    }

    async findByUsername(username) {
        return await repository.findByUsername(username)
    }

    async findAll() {
        return await repository.findAll()
    }

    async update(id, data) {
        return await repository.update(id, data)
    }

    async delete(id) {
        await repository.delete(id)
    }
}

export default ${entity}Service
`

    const controller = `// src/controllers/${entity}Controller.js
import ${entity}Service from '../services/${entity}Service.js'

const service = new ${entity}Service()

class ${entity}Controller {

    async index(req, res) {
        try {
            const data = await service.findAll()
            res.json(data)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async show(req, res) {
        try {
            const data = await service.findById(Number(req.params.id))
            if (!data) return res.status(404).json({ error: 'Não encontrado' })
            res.json(data)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async store(req, res) {
        try {
            const data = await service.create(req.body)
            res.status(201).json(data)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async update(req, res) {
        try {
            const data = await service.update(Number(req.params.id), req.body)
            res.json(data)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    async destroy(req, res) {
        try {
            await service.delete(Number(req.params.id))
            res.status(204).send()
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

export default ${entity}Controller
`

    const routes = `// src/routes/${entity.toLowerCase()}.routes.js
import { Router } from 'express'
import ${entity}Controller from '../controllers/${entity}Controller.js'

const router = Router()
const controller = new ${entity}Controller()

router.get('/',       (req, res) => controller.index(req, res))
router.get('/:id',    (req, res) => controller.show(req, res))
router.post('/',      (req, res) => controller.store(req, res))
router.put('/:id',    (req, res) => controller.update(req, res))
router.delete('/:id', (req, res) => controller.destroy(req, res))

export default router
`

    writeFile(projectPath, 'server.js', server)
    writeFile(projectPath, 'src/config/database.config.js', dbConfigs[orm] ?? dbConfigs.sequelize)
    writeFile(projectPath, 'src/config/env.config.js', envConfig)
    writeFile(projectPath, 'src/middleware/auth.middleware.js', authMiddleware)
    writeFile(projectPath, 'src/middleware/error.middleware.js', errorMiddleware)
    writeFile(projectPath, `src/repositories/${entity}Repository.js`, repository)
    writeFile(projectPath, `src/services/${entity}Service.js`, service)
    writeFile(projectPath, `src/controllers/${entity}Controller.js`, controller)
    writeFile(projectPath, `src/routes/${entity.toLowerCase()}.routes.js`, routes)
    writeFile(projectPath, 'src/routes/index.routes.js', indexRoutes)
}

// ==============================
// PHP
// ==============================
function generatePHP(projectPath, entity) {

    const dbConfig = `<?php
namespace App\\Config;

class Database {
    private static ?\\PDO $conn = null;

    public static function getConnection(): \\PDO {
        if (self::$conn === null) {
            $dsn = sprintf(
                'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
                $_ENV['DB_HOST'],
                $_ENV['DB_PORT'] ?? '3306',
                $_ENV['DB_DATABASE']
            );
            self::$conn = new \\PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);
            self::$conn->setAttribute(\\PDO::ATTR_ERRMODE, \\PDO::ERRMODE_EXCEPTION);
            self::$conn->setAttribute(\\PDO::ATTR_DEFAULT_FETCH_MODE, \\PDO::FETCH_ASSOC);
        }
        return self::$conn;
    }
}
`

    const envConfig = `<?php
namespace App\\Config;

use Dotenv\\Dotenv;

class Env {
    public static function load(): void {
        if (file_exists(__DIR__ . '/../../.env')) {
            $dotenv = Dotenv::createImmutable(__DIR__ . '/../..');
            $dotenv->load();
        }
    }

    public static function get(string $key, mixed $default = null): mixed {
        return $_ENV[$key] ?? $default;
    }
}
`

    const repository = `<?php
namespace App\\Repositories;

class ${entity}Repository
{
    public function create(array $data): mixed
    {
        // TODO: adicione sua lógica aqui
    }

    public function findById(int $id): mixed
    {
        // TODO: adicione sua lógica aqui
    }

    public function findByEmail(string $email): mixed
    {
        // TODO: adicione sua lógica aqui
    }

    public function findByUsername(string $username): mixed
    {
        // TODO: adicione sua lógica aqui
    }

    public function findAll(): array
    {
        // TODO: adicione sua lógica aqui
        return [];
    }

    public function update(int $id, array $data): mixed
    {
        // TODO: adicione sua lógica aqui
    }

    public function delete(int $id): void
    {
        // TODO: adicione sua lógica aqui
    }
}
`

    const service = `<?php
namespace App\\Services;

use App\\Repositories\\${entity}Repository;

class ${entity}Service
{
    private ${entity}Repository $repository;

    public function __construct()
    {
        $this->repository = new ${entity}Repository();
    }

    public function create(array $data): mixed
    {
        return $this->repository->create($data);
    }

    public function findById(int $id): mixed
    {
        return $this->repository->findById($id);
    }

    public function findByEmail(string $email): mixed
    {
        return $this->repository->findByEmail($email);
    }

    public function findByUsername(string $username): mixed
    {
        return $this->repository->findByUsername($username);
    }

    public function findAll(): array
    {
        return $this->repository->findAll();
    }

    public function update(int $id, array $data): mixed
    {
        return $this->repository->update($id, $data);
    }

    public function delete(int $id): void
    {
        $this->repository->delete($id);
    }
}
`

    const controller = `<?php
namespace App\\Controllers;

use App\\Services\\${entity}Service;
use Psr\\Http\\Message\\ResponseInterface as Response;
use Psr\\Http\\Message\\ServerRequestInterface as Request;

class ${entity}Controller
{
    private ${entity}Service $service;

    public function __construct()
    {
        $this->service = new ${entity}Service();
    }

    public function index(Request $request, Response $response): Response
    {
        try {
            $data = $this->service->findAll();
            $response->getBody()->write(json_encode($data));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (\\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }

    public function show(Request $request, Response $response, array $args): Response
    {
        try {
            $data = $this->service->findById((int) $args['id']);
            $response->getBody()->write(json_encode($data));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (\\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }

    public function store(Request $request, Response $response): Response
    {
        try {
            $body = (array) $request->getParsedBody();
            $data = $this->service->create($body);
            $response->getBody()->write(json_encode($data));
            return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
        } catch (\\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }

    public function update(Request $request, Response $response, array $args): Response
    {
        try {
            $body = (array) $request->getParsedBody();
            $data = $this->service->update((int) $args['id'], $body);
            $response->getBody()->write(json_encode($data));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (\\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }

    public function destroy(Request $request, Response $response, array $args): Response
    {
        try {
            $this->service->delete((int) $args['id']);
            return $response->withStatus(204);
        } catch (\\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
}
`

    writeFile(projectPath, 'src/config/database.php', dbConfig)
    writeFile(projectPath, 'src/config/env.php', envConfig)
    writeFile(projectPath, `app/Repositories/${entity}Repository.php`, repository)
    writeFile(projectPath, `app/Services/${entity}Service.php`, service)
    writeFile(projectPath, `app/Controllers/${entity}Controller.php`, controller)
}

// ==============================
// JAVA SPARK
// ==============================
function generateJavaSpark(projectPath, entity) {
    const base = 'src/main/java/com/example'

    const dbConfig = `package com.example.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConfig {
    private static Connection connection;

    public static Connection getConnection() throws SQLException {
        if (connection == null || connection.isClosed()) {
            String url = String.format("jdbc:mysql://%s:%s/%s?useSSL=false&serverTimezone=UTC",
                System.getenv("DB_HOST"),
                System.getenv("DB_PORT") != null ? System.getenv("DB_PORT") : "3306",
                System.getenv("DB_DATABASE")
            );
            connection = DriverManager.getConnection(
                url,
                System.getenv("DB_USER"),
                System.getenv("DB_PASSWORD")
            );
        }
        return connection;
    }
}
`

    const repository = `package com.example.repositories;

public class ${entity}Repository {

    public Object create(Object data) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object findById(int id) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object findByEmail(String email) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object findByUsername(String username) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public java.util.List<Object> findAll() {
        // TODO: adicione sua lógica aqui
        return new java.util.ArrayList<>();
    }

    public Object update(int id, Object data) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public void delete(int id) {
        // TODO: adicione sua lógica aqui
    }
}
`

    const service = `package com.example.services;

import com.example.repositories.${entity}Repository;

public class ${entity}Service {

    private final ${entity}Repository repository = new ${entity}Repository();

    public Object create(Object data) { return repository.create(data); }
    public Object findById(int id) { return repository.findById(id); }
    public Object findByEmail(String email) { return repository.findByEmail(email); }
    public Object findByUsername(String username) { return repository.findByUsername(username); }
    public java.util.List<Object> findAll() { return repository.findAll(); }
    public Object update(int id, Object data) { return repository.update(id, data); }
    public void delete(int id) { repository.delete(id); }
}
`

    const controller = `package com.example.controllers;

import com.example.services.${entity}Service;
import com.google.gson.Gson;
import spark.Request;
import spark.Response;

public class ${entity}Controller {

    private final ${entity}Service service = new ${entity}Service();
    private final Gson gson = new Gson();

    public Object index(Request req, Response res) {
        try {
            res.type("application/json");
            return gson.toJson(service.findAll());
        } catch (Exception e) {
            res.status(500);
            return gson.toJson(new ErrorResponse(e.getMessage()));
        }
    }

    public Object show(Request req, Response res) {
        try {
            res.type("application/json");
            int id = Integer.parseInt(req.params(":id"));
            return gson.toJson(service.findById(id));
        } catch (Exception e) {
            res.status(500);
            return gson.toJson(new ErrorResponse(e.getMessage()));
        }
    }

    public Object store(Request req, Response res) {
        try {
            res.type("application/json");
            res.status(201);
            return gson.toJson(service.create(req.body()));
        } catch (Exception e) {
            res.status(500);
            return gson.toJson(new ErrorResponse(e.getMessage()));
        }
    }

    public Object update(Request req, Response res) {
        try {
            res.type("application/json");
            int id = Integer.parseInt(req.params(":id"));
            return gson.toJson(service.update(id, req.body()));
        } catch (Exception e) {
            res.status(500);
            return gson.toJson(new ErrorResponse(e.getMessage()));
        }
    }

    public Object destroy(Request req, Response res) {
        try {
            int id = Integer.parseInt(req.params(":id"));
            service.delete(id);
            res.status(204);
            return "";
        } catch (Exception e) {
            res.status(500);
            return gson.toJson(new ErrorResponse(e.getMessage()));
        }
    }

    record ErrorResponse(String error) {}
}
`

    writeFile(projectPath, `${base}/config/DatabaseConfig.java`, dbConfig)
    writeFile(projectPath, `${base}/repositories/${entity}Repository.java`, repository)
    writeFile(projectPath, `${base}/services/${entity}Service.java`, service)
    writeFile(projectPath, `${base}/controllers/${entity}Controller.java`, controller)
}

// ==============================
// JAVA SPRING
// ==============================
function generateJavaSpring(projectPath, entity) {
    const base = 'src/main/java/com/constellation'

    const dbConfig = `package com.constellation.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

// As configurações de banco vêm do application.properties
// DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD
@Configuration
@EnableJpaRepositories(basePackages = "com.constellation")
@EnableTransactionManagement
public class DatabaseConfig {
    // Spring Boot auto-configura o DataSource via application.properties
}
`

    const repository = `package com.constellation.infrastructure.repository;

import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class ${entity}Repository {

    public Object create(Object data) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object findById(int id) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object findByEmail(String email) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public Object findByUsername(String username) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public List<Object> findAll() {
        // TODO: adicione sua lógica aqui
        return new java.util.ArrayList<>();
    }

    public Object update(int id, Object data) {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public void delete(int id) {
        // TODO: adicione sua lógica aqui
    }
}
`

    const service = `package com.constellation.application.service;

import com.constellation.infrastructure.repository.${entity}Repository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ${entity}Service {

    private final ${entity}Repository repository = new ${entity}Repository();

    public Object create(Object data) { return repository.create(data); }
    public Object findById(int id) { return repository.findById(id); }
    public Object findByEmail(String email) { return repository.findByEmail(email); }
    public Object findByUsername(String username) { return repository.findByUsername(username); }
    public List<Object> findAll() { return repository.findAll(); }
    public Object update(int id, Object data) { return repository.update(id, data); }
    public void delete(int id) { repository.delete(id); }
}
`

    const controller = `package com.constellation.interfaces.controller;

import com.constellation.application.service.${entity}Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/${entity.toLowerCase()}s")
public class ${entity}Controller {

    private final ${entity}Service service = new ${entity}Service();

    @GetMapping
    public ResponseEntity<?> index() {
        try {
            return ResponseEntity.ok(service.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable int id) {
        try {
            Object data = service.findById(id);
            if (data == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> store(@RequestBody Object body) {
        try {
            return ResponseEntity.status(201).body(service.create(body));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Object body) {
        try {
            return ResponseEntity.ok(service.update(id, body));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable int id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
`

    writeFile(projectPath, `${base}/infrastructure/config/DatabaseConfig.java`, dbConfig)
    writeFile(projectPath, `${base}/infrastructure/repository/${entity}Repository.java`, repository)
    writeFile(projectPath, `${base}/application/service/${entity}Service.java`, service)
    writeFile(projectPath, `${base}/interfaces/controller/${entity}Controller.java`, controller)
}

// ==============================
// C#
// ==============================
function generateCSharp(projectPath, entity) {

    const dbConfig = `using Microsoft.EntityFrameworkCore;

namespace MeuBackend.Config;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // TODO: adicione seus DbSets aqui
    // public DbSet<${entity}> ${entity}s { get; set; }
}
`

    const programCs = `using MeuBackend.Config;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Database
var connectionString = $"Server={Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost"};" +
    $"Port={Environment.GetEnvironmentVariable("DB_PORT") ?? "3306"};" +
    $"Database={Environment.GetEnvironmentVariable("DB_DATABASE") ?? "app_db"};" +
    $"User={Environment.GetEnvironmentVariable("DB_USER") ?? "root"};" +
    $"Password={Environment.GetEnvironmentVariable("DB_PASSWORD") ?? ""};";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.MapGet("/", () => new { message = "API funcionando!", version = "1.0.0" });

app.Run();
`

    const repository = `namespace MeuBackend.Repositories;

public class ${entity}Repository
{
    public async Task<object?> Create(object data)
    {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public async Task<object?> FindById(int id)
    {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public async Task<object?> FindByEmail(string email)
    {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public async Task<object?> FindByUsername(string username)
    {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public async Task<List<object>> FindAll()
    {
        // TODO: adicione sua lógica aqui
        return new List<object>();
    }

    public async Task<object?> Update(int id, object data)
    {
        // TODO: adicione sua lógica aqui
        return null;
    }

    public async Task Delete(int id)
    {
        // TODO: adicione sua lógica aqui
    }
}
`

    const service = `using MeuBackend.Repositories;

namespace MeuBackend.Services;

public class ${entity}Service
{
    private readonly ${entity}Repository _repository = new();

    public async Task<object?> Create(object data) => await _repository.Create(data);
    public async Task<object?> FindById(int id) => await _repository.FindById(id);
    public async Task<object?> FindByEmail(string email) => await _repository.FindByEmail(email);
    public async Task<object?> FindByUsername(string username) => await _repository.FindByUsername(username);
    public async Task<List<object>> FindAll() => await _repository.FindAll();
    public async Task<object?> Update(int id, object data) => await _repository.Update(id, data);
    public async Task Delete(int id) => await _repository.Delete(id);
}
`

    const controller = `using MeuBackend.Services;
using Microsoft.AspNetCore.Mvc;

namespace MeuBackend.Controllers;

[ApiController]
[Route("api/${entity.toLowerCase()}s")]
public class ${entity}Controller : ControllerBase
{
    private readonly ${entity}Service _service = new();

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        try { return Ok(await _service.FindAll()); }
        catch (Exception ex) { return StatusCode(500, ex.Message); }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Show(int id)
    {
        try
        {
            var data = await _service.FindById(id);
            if (data == null) return NotFound();
            return Ok(data);
        }
        catch (Exception ex) { return StatusCode(500, ex.Message); }
    }

    [HttpPost]
    public async Task<IActionResult> Store([FromBody] object body)
    {
        try { return StatusCode(201, await _service.Create(body)); }
        catch (Exception ex) { return StatusCode(500, ex.Message); }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] object body)
    {
        try { return Ok(await _service.Update(id, body)); }
        catch (Exception ex) { return StatusCode(500, ex.Message); }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Destroy(int id)
    {
        try { await _service.Delete(id); return NoContent(); }
        catch (Exception ex) { return StatusCode(500, ex.Message); }
    }
}
`

    writeFile(projectPath, 'Config/AppDbContext.cs', dbConfig)
    writeFile(projectPath, 'Program.cs', programCs)
    writeFile(projectPath, `Repositories/${entity}Repository.cs`, repository)
    writeFile(projectPath, `Services/${entity}Service.cs`, service)
    writeFile(projectPath, `Controllers/${entity}Controller.cs`, controller)
}

// ==============================
// HELPER
// ==============================
function writeFile(projectPath, filePath, content) {
    const fullPath = path.join(projectPath, filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf-8');
}

// ==============================
// MODELS UNIVERSAIS
// ==============================

function generateModels(projectPath, framework, orm) {
    switch (framework) {
        case 'typescript': generateModelTS(projectPath, orm); break;
        case 'javascript': generateModelJS(projectPath, orm); break;
        case 'php':        generateModelPHP(projectPath); break;
        case 'javaspring': generateModelJavaSpring(projectPath); break;
        case 'java':       generateModelJavaSpark(projectPath); break;
        case 'csharp':     generateModelCS(projectPath); break;
    }
}

function generateModelTS(projectPath, orm) {
    const models = {
        typeorm: `// src/models/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    usuario: string

    @Column({ unique: true, length: 150 })
    email: string

    @Column()
    senha: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
`,
        prisma: `// prisma/schema.prisma
// TODO: rode "npx prisma migrate dev" após configurar o .env

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id        Int      @id @default(autoincrement())
  usuario   String   @db.VarChar(100)
  email     String   @unique @db.VarChar(150)
  senha     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("usuarios")
}
`,
        sequelize: `// src/models/Usuario.ts
import { DataTypes, Model, Optional } from 'sequelize'
import { db } from '../config/database.config'

interface UsuarioAttributes {
    id: number
    usuario: string
    email: string
    senha: string
}

interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id'> {}

export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes>
    implements UsuarioAttributes {
    public id!: number
    public usuario!: string
    public email!: string
    public senha!: string
}

Usuario.init({
    id:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    usuario: { type: DataTypes.STRING(100), allowNull: false },
    email:   { type: DataTypes.STRING(150), allowNull: false, unique: true },
    senha:   { type: DataTypes.STRING, allowNull: false },
}, {
    sequelize: db,
    tableName: 'usuarios',
})
`
    }

    if (orm === 'prisma') {
        writeFile(projectPath, 'prisma/schema.prisma', models.prisma)
    } else {
        writeFile(projectPath, 'src/models/Usuario.ts', models[orm] ?? models.typeorm)
    }
}

function generateModelJS(projectPath, orm) {
    const models = {
        sequelize: `// src/models/Usuario.js
import { DataTypes } from 'sequelize'
import { db } from '../config/database.config.js'

export const Usuario = db.define('Usuario', {
    id:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    usuario: { type: DataTypes.STRING(100), allowNull: false },
    email:   { type: DataTypes.STRING(150), allowNull: false, unique: true },
    senha:   { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'usuarios',
    timestamps: true,
})
`,
        mongoose: `// src/models/Usuario.js
import mongoose from 'mongoose'

const UsuarioSchema = new mongoose.Schema({
    usuario: { type: String, required: true, maxlength: 100 },
    email:   { type: String, required: true, unique: true, maxlength: 150 },
    senha:   { type: String, required: true },
}, {
    timestamps: true,
    collection: 'usuarios',
})

export const Usuario = mongoose.model('Usuario', UsuarioSchema)
`,
        prisma: `// prisma/schema.prisma
// TODO: rode "npx prisma migrate dev" após configurar o .env

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id        Int      @id @default(autoincrement())
  usuario   String   @db.VarChar(100)
  email     String   @unique @db.VarChar(150)
  senha     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("usuarios")
}
`
    }

    if (orm === 'prisma') {
        writeFile(projectPath, 'prisma/schema.prisma', models.prisma)
    } else {
        writeFile(projectPath, 'src/models/Usuario.js', models[orm] ?? models.sequelize)
    }
}

function generateModelPHP(projectPath) {
    const model = `<?php
namespace App\\Models;

use App\\Config\\Database;

class Usuario
{
    public ?int $id;
    public string $usuario;
    public string $email;
    public string $senha;

    public function __construct(
        string $usuario,
        string $email,
        string $senha,
        ?int $id = null
    ) {
        $this->id      = $id;
        $this->usuario = $usuario;
        $this->email   = $email;
        $this->senha   = $senha;
    }

    public static function fromArray(array $data): self
    {
        return new self(
            $data['usuario'],
            $data['email'],
            $data['senha'],
            $data['id'] ?? null
        );
    }

    public function toArray(): array
    {
        return [
            'id'      => $this->id,
            'usuario' => $this->usuario,
            'email'   => $this->email,
        ];
    }
}
`
    writeFile(projectPath, 'app/Models/Usuario.php', model)
}

function generateModelJavaSpring(projectPath) {
    const model = `package com.constellation.domain.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String usuario;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String senha;

    public Usuario() {}

    public Usuario(String usuario, String email, String senha) {
        this.usuario = usuario;
        this.email   = email;
        this.senha   = senha;
    }

    public Long getId() { return id; }
    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}
`
    writeFile(projectPath, 'src/main/java/com/constellation/domain/entity/Usuario.java', model)
}

function generateModelJavaSpark(projectPath) {
    const model = `package com.example.models;

public class Usuario {
    private Long id;
    private String usuario;
    private String email;
    private String senha;

    public Usuario() {}

    public Usuario(String usuario, String email, String senha) {
        this.usuario = usuario;
        this.email   = email;
        this.senha   = senha;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}
`
    writeFile(projectPath, 'src/main/java/com/example/models/Usuario.java', model)
}

function generateModelCS(projectPath) {
    const model = `namespace MeuBackend.Models;

public class Usuario
{
    public int Id { get; set; }
    public string Usuario { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
`
    writeFile(projectPath, 'Models/Usuario.cs', model)
}