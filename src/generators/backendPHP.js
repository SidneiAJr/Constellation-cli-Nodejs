import { criarArquivo, criarPasta } from '../utils/fileHelper.js'
import path from 'path'

export function gerarBackendPHP(projectName) {
  const base = path.join(projectName, 'Backend')

  const pastas = [
    'app/controller', 'app/model', 'app/service',
    'app/repository', 'app/middleware', 'app/entity',
    'app/dto', 'app/config', 'app/helpers',
    'app/utils', 'app/routes', 'docs', 'public', 'tests'
  ]
  pastas.forEach(p => criarPasta(path.join(base, p)))

  const arquivos = [
    'app/controller/HomeController.php',
    'app/controller/UserController.php',
    'app/controller/AuthController.php',
    'app/model/UserModel.php',
    'app/model/ProductModel.php',
    'app/service/UserService.php',
    'app/service/AuthService.php',
    'app/repository/UserRepository.php',
    'app/middleware/AuthMiddleware.php',
    'app/middleware/ErrorMiddleware.php',
    'app/routes/index.php',
    'app/routes/user.php',
    'app/config/database.php',
    'app/config/env.php',
    'public/index.php',
  ]
  arquivos.forEach(f => criarArquivo(path.join(base, f)))

  // ✅ Conteúdo mínimo para public/index.php
  const indexContent = `<?php
require __DIR__ . '/../vendor/autoload.php';

use Slim\\Factory\\AppFactory;
use App\\Config\\Env;

Env::load();

$app = AppFactory::create();

$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

require __DIR__ . '/../app/routes/index.php';

$app->run();
`
  criarArquivo(path.join(base, 'public/index.php'), indexContent)

  // ✅ Conteúdo para app/config/env.php
  const envContent = `<?php
namespace App\\Config;

use Dotenv\\Dotenv;

class Env
{
    public static function load()
    {
        if (file_exists(__DIR__ . '/../../.env')) {
            $dotenv = Dotenv::createImmutable(__DIR__ . '/../..');
            $dotenv->load();
        }
    }
}
`
  criarArquivo(path.join(base, 'app/config/env.php'), envContent)

  // ✅ composer.json
  const composerJson = {
    name: projectName.toLowerCase().replace(/\s+/g, '-') + '/backend',
    description: `API PHP Slim - ${projectName}`,
    type: 'project',
    require: {
      'php': '>=8.0',
      'slim/slim': '^4.12',
      'slim/psr7': '^1.6',
      'php-di/php-di': '^7.0',
      'firebase/php-jwt': '^6.9',
      'vlucas/phpdotenv': '^5.6'
    },
    'require-dev': {
      'phpunit/phpunit': '^10.0'
    },
    autoload: {
      'psr-4': {
        'App\\': 'app/'
      }
    },
    scripts: {
      test: 'phpunit'
    }
  }

  criarArquivo(
    path.join(base, 'composer.json'),
    JSON.stringify(composerJson, null, 2)
  )

  // ✅ .env
  criarArquivo(
    path.join(base, '.env'),
    `DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=${projectName.toLowerCase()}_db
JWT_SECRET=changeme
APP_ENV=development`
  )

  // ✅ .gitignore
  criarArquivo(
    path.join(base, '.gitignore'),
    `vendor/
.env
*.log
.DS_Store
composer.lock`
  )

  // ✅ README.md
  const readme = `# ${projectName} - Backend PHP Slim

## Como rodar

\`\`\`bash
cd ${projectName}/Backend
composer install
php -S localhost:8080 -t public
\`\`\`

## Endpoints

- GET /api/usuarios
- POST /api/usuarios
- PUT /api/usuarios/{id}
- DELETE /api/usuarios/{id}

## Tecnologias

- PHP 8+
- Slim Framework 4
- PHP-DI (Dependency Injection)
- Firebase JWT
- PHP Dotenv
- PHPUnit para testes
`
  criarArquivo(path.join(base, 'README.md'), readme)
}