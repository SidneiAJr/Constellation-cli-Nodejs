import { criarArquivo, criarPasta } from '../utils/fileHelper.js'
import path from 'path'
import { getEstruturaPorArquitetura } from '../templates/estruturasbackend.js'

export async function gerarBackendPHP(projectName, arquitetura = 'mvc') {
  const base = path.join(projectName, 'Backend')

  // ============================================
  // 1. PEGA A ESTRUTURA CORRETA (PHP + arquitetura)
  // ============================================
  const { pastas, arquivos } = getEstruturaPorArquitetura('php', arquitetura)

  // ============================================
  // 2. CRIA PASTAS E ARQUIVOS
  // ============================================
  pastas.forEach(p => criarPasta(path.join(base, p)))
  arquivos.forEach(f => criarArquivo(path.join(base, f)))

  // ============================================
  // 3. public/index.php (se não existir na estrutura, cria)
  // ============================================
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

  // ============================================
  // 4. app/config/env.php
  // ============================================
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

  // ============================================
  // 5. composer.json
  // ============================================
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

  // ============================================
  // 6. .env
  // ============================================
  criarArquivo(
    path.join(base, '.env'),
    `DB_HOST=localhost
DB_USER=
DB_PASS=
DB_NAME=${projectName.toLowerCase()}_db
JWT_SECRET=changeme
APP_ENV=development`
  )

  // ============================================
  // 7. .gitignore
  // ============================================
  criarArquivo(
    path.join(base, '.gitignore'),
    `vendor/
.env
*.log
.DS_Store
composer.lock`
  )

  // ============================================
  // 8. README.md
  // ============================================
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