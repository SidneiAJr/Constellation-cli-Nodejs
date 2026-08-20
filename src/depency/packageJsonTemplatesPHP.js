// src/depency/packageJsonTemplatesPHP.js

export function buildComposerJson(projectName, nivel = 'enterprise') {
  const name = projectName.toLowerCase().replace(/\s+/g, '-')

  const basico = {
    name: `${name}/backend`,
    description: 'API PHP Slim - Básico',
    type: 'project',
    require: {
      'php': '>=8.0',
      'slim/slim': '^4.12',
      'slim/psr7': '^1.6',
      'vlucas/phpdotenv': '^5.6',
      'mysql2': '*'
    },
    'require-dev': {
      'phpunit/phpunit': '^10.0'
    },
    autoload: {
      'psr-4': { 'App\\': 'src/' }
    },
    scripts: {
      test: 'phpunit'
    }
  }

  const avancado = {
    name: `${name}/backend`,
    description: 'API PHP Slim - Avançado',
    type: 'project',
    require: {
      'php': '>=8.1',
      'slim/slim': '^4.12',
      'slim/psr7': '^1.6',
      'php-di/php-di': '^7.0',
      'vlucas/phpdotenv': '^5.6',
      'firebase/php-jwt': '^6.9',
      'respect/validation': '^2.3',
      'illuminate/database': '^10.0',
      'monolog/monolog': '^3.5',
      'ramsey/uuid': '^4.7'
    },
    'require-dev': {
      'phpunit/phpunit': '^10.0',
      'mockery/mockery': '^1.6',
      'fakerphp/faker': '^1.23',
      'squizlabs/php_codesniffer': '^3.7'
    },
    autoload: {
      'psr-4': { 'App\\': 'src/' }
    },
    'autoload-dev': {
      'psr-4': { 'Tests\\': 'tests/' }
    },
    scripts: {
      test: 'phpunit',
      'test:cov': 'phpunit --coverage-html coverage',
      lint: 'phpcs src/'
    }
  }

  const enterprise = {
    name: `${name}/backend`,
    description: 'API PHP Slim - Enterprise',
    type: 'project',
    require: {
      'php': '>=8.2',
      'slim/slim': '^4.12',
      'slim/psr7': '^1.6',
      'php-di/php-di': '^7.0',
      'vlucas/phpdotenv': '^5.6',

      // Auth & Segurança
      'firebase/php-jwt': '^6.9',
      'paragonie/random_compat': '^9.99',
      'tuupola/slim-jwt-auth': '^3.7',

      // ORM & Banco
      'illuminate/database': '^10.0',
      'doctrine/dbal': '^3.7',
      'predis/predis': '^2.2',        // Redis
      'mongodb/mongodb': '^1.16',      // MongoDB

      // Validação
      'respect/validation': '^2.3',
      'rakit/validation': '^1.4',

      // Logs
      'monolog/monolog': '^3.5',
      'graylog2/gelf-php': '^2.0',

      // Utils
      'ramsey/uuid': '^4.7',
      'guzzlehttp/guzzle': '^7.8',    // HTTP Client
      'phpmailer/phpmailer': '^6.8',  // Email
      'league/flysystem': '^3.20',    // File Storage (S3, local)
      'league/csv': '^9.11',          // CSV
      'dompdf/dompdf': '^2.0',        // PDF
      'league/fractal': '^0.20',      // Transformers/Serializers

      // Filas
      'php-enqueue/enqueue': '^0.10',
      'php-enqueue/amqp-bunny': '^0.10',

      // Docs
      'zircote/swagger-php': '^4.7',

      // Cache
      'symfony/cache': '^6.4',

      // Rate Limit
      'nikolaposa/rate-limit': '^4.0'
    },
    'require-dev': {
      'phpunit/phpunit': '^10.0',
      'mockery/mockery': '^1.6',
      'fakerphp/faker': '^1.23',
      'squizlabs/php_codesniffer': '^3.7',
      'phpstan/phpstan': '^1.10',
      'rector/rector': '^0.18',
      'roave/security-advisories': 'dev-latest'
    },
    autoload: {
      'psr-4': { 'App\\': 'src/' }
    },
    'autoload-dev': {
      'psr-4': { 'Tests\\': 'tests/' }
    },
    scripts: {
      test: 'phpunit',
      'test:cov': 'phpunit --coverage-html coverage',
      lint: 'phpcs src/',
      'lint:fix': 'phpcbf src/',
      analyse: 'phpstan analyse src/',
      'swagger:generate': 'openapi ./src --output ./docs/openapi.json'
    },
    config: {
      'optimize-autoloader': true,
      'sort-packages': true
    }
  }

  const niveis = { basico, avancado, enterprise }
  return niveis[nivel] ?? enterprise
}