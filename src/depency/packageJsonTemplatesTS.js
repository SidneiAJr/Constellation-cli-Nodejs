// src/depency/packageJsonTemplatesTS.js

const scripts = {
  build: 'tsc',
  start: 'node dist/server.js',
  dev: 'ts-node-dev src/server.ts',
  test: 'jest',
  'test:cov': 'jest --coverage',
  'test:watch': 'jest --watch',
  lint: 'eslint src/**/*.ts',
  format: 'prettier --write src/**/*.ts',
  'type-check': 'tsc --noEmit'
}

const coreDepencies = {
  express: '^4.18.2',
  cors: '^2.8.5',
  helmet: '^7.1.0',
  compression: '^1.7.4',
  'express-rate-limit': '^7.1.5',
  'express-status-monitor': '^1.3.4',
  bcrypt: '^5.1.1',
  jsonwebtoken: '^9.0.2',
  zod: '^3.22.4',
  'class-validator': '^0.14.0',
  'class-transformer': '^0.5.1',
  'reflect-metadata': '^0.1.13',
  bullmq: '^5.0.0',
  amqplib: '^0.10.3',
  'socket.io': '^4.7.2',
  winston: '^3.11.0',
  morgan: '^1.10.0',
  'swagger-ui-express': '^5.0.0',
  'swagger-jsdoc': '^6.2.8',
  dotenv: '^16.3.1',
  uuid: '^9.0.1',
  axios: '^1.6.0',
  lodash: '^4.17.21',
  dayjs: '^1.11.10',
  multer: '^1.4.5-lts.1',
  nodemailer: '^6.9.7',
  handlebars: '^4.7.8',
  pdfkit: '^0.14.0',
  'csv-writer': '^1.6.0'
}

const coreDevDependencies = {
  typescript: '^5.2.2',
  'ts-node-dev': '^2.0.0',
  '@types/node': '^20.8.0',
  '@types/express': '^4.17.20',
  '@types/bcrypt': '^5.0.1',
  '@types/jsonwebtoken': '^9.0.3',
  '@types/cors': '^2.8.17',
  '@types/compression': '^1.7.5',
  '@types/morgan': '^1.9.9',
  '@types/multer': '^1.4.11',
  '@types/nodemailer': '^6.4.14',
  '@types/lodash': '^4.14.200',
  '@types/amqplib': '^0.10.4',
  '@types/uuid': '^9.0.7',
  '@types/jest': '^29.5.5',
  '@types/supertest': '^2.0.16',
  'ts-jest': '^29.1.1',
  jest: '^29.7.0',
  supertest: '^6.3.3',
  nock: '^13.4.0',
  eslint: '^8.51.0',
  '@typescript-eslint/eslint-plugin': '^6.7.4',
  '@typescript-eslint/parser': '^6.7.4',
  prettier: '^3.0.3',
  husky: '^8.0.3',
  'lint-staged': '^15.0.0'
}

// ============================================
// PRISMA
// ============================================
export function buildPackageJsonTS_Prisma(projectName) {
  return {
    name: projectName.toLowerCase(),
    version: '1.0.0',
    description: 'API Node.js Enterprise - TypeScript + Prisma',
    main: 'dist/server.js',
    scripts: {
      ...scripts,
      'prisma:generate': 'prisma generate',
      'prisma:migrate': 'prisma migrate dev',
      'prisma:studio': 'prisma studio',
    },
    dependencies: {
      ...coreDepencies,
      // ORM
      '@prisma/client': '^5.22.0',
      prisma: '^5.22.0',
      // Banco
      mysql2: '^3.6.0',
      pg: '^8.11.3',
      mongodb: '^6.3.0',
      redis: '^4.6.0',
      '@redis/client': '^1.5.14',
    },
    devDependencies: {
      ...coreDevDependencies,
    }
  }
}

// ============================================
// TYPEORM
// ============================================
export function buildPackageJsonTS_TypeORM(projectName) {
  return {
    name: projectName.toLowerCase(),
    version: '1.0.0',
    description: 'API Node.js Enterprise - TypeScript + TypeORM',
    main: 'dist/server.js',
    scripts,
    dependencies: {
      ...coreDepencies,
      // ORM
      typeorm: '^0.3.19',
      // Banco
      mysql2: '^3.6.0',
      pg: '^8.11.3',
      mongodb: '^6.3.0',
      redis: '^4.6.0',
      '@redis/client': '^1.5.14',
    },
    devDependencies: {
      ...coreDevDependencies,
      '@types/pg': '^8.10.9',
    }
  }
}

// ============================================
// SEQUELIZE
// ============================================
export function buildPackageJsonTS_Sequelize(projectName) {
  return {
    name: projectName.toLowerCase(),
    version: '1.0.0',
    description: 'API Node.js Enterprise - TypeScript + Sequelize',
    main: 'dist/server.js',
    scripts,
    dependencies: {
      ...coreDepencies,
      // ORM
      sequelize: '^6.35.0',
      'sequelize-typescript': '^2.1.6',
      // Banco
      mysql2: '^3.6.0',
      pg: '^8.11.3',
      'pg-hstore': '^2.3.4',
      redis: '^4.6.0',
      '@redis/client': '^1.5.14',
    },
    devDependencies: {
      ...coreDevDependencies,
      '@types/sequelize': '^4.28.20',
      '@types/pg': '^8.10.9',
    }
  }
}

// ============================================
// SELECTOR — chama a função certa pelo orm escolhido
// ============================================
export function buildPackageJsonTS(projectName, orm = 'prisma') {
  const builders = {
    prisma:    buildPackageJsonTS_Prisma,
    typeorm:   buildPackageJsonTS_TypeORM,
    sequelize: buildPackageJsonTS_Sequelize,
  }

  const builder = builders[orm] ?? buildPackageJsonTS_Prisma
  return builder(projectName)
}