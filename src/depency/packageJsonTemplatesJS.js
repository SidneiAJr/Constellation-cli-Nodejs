// src/depency/packageJsonTemplatesJS.js

const scripts = {
  start: 'node server.js',
  dev: 'nodemon server.js',
  test: 'jest',
  'test:cov': 'jest --coverage',
  'test:watch': 'jest --watch',
  lint: 'eslint src/**/*.js',
  format: 'prettier --write src/**/*.js'
}

const coreDependencies = {
  express: '^4.18.2',
  cors: '^2.8.5',
  helmet: '^7.1.0',
  compression: '^1.7.4',
  'express-rate-limit': '^7.1.5',
  'express-status-monitor': '^1.3.4',
  bcrypt: '^5.1.1',
  jsonwebtoken: '^9.0.2',
  joi: '^17.11.0',
  yup: '^1.4.0',
  bull: '^4.11.5',
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
  moment: '^2.29.4',
  multer: '^1.4.5-lts.1',
  nodemailer: '^6.9.7',
  handlebars: '^4.7.8',
  pdfkit: '^0.14.0',
  'csv-writer': '^1.6.0'
}

const coreDevDependencies = {
  nodemon: '^3.0.1',
  jest: '^29.7.0',
  supertest: '^6.3.3',
  nock: '^13.4.0',
  eslint: '^8.51.0',
  'eslint-config-airbnb-base': '^15.0.0',
  prettier: '^3.0.3',
  husky: '^8.0.3'
}

// SEQUELIZE
export function buildPackageJsonJS_Sequelize(projectName) {
  return {
    name: projectName.toLowerCase(),
    version: '1.0.0',
    description: 'API Node.js Enterprise - JavaScript + Sequelize',
    main: 'server.js',
    scripts,
    dependencies: {
      ...coreDependencies,
      sequelize: '^6.35.0',
      mysql2: '^3.6.0',
      pg: '^8.11.3',
      'pg-hstore': '^2.3.4',
      redis: '^4.6.0',
    },
    devDependencies: {
      ...coreDevDependencies,
      'sequelize-cli': '^6.6.2',
    }
  }
}

// MONGOOSE
export function buildPackageJsonJS_Mongoose(projectName) {
  return {
    name: projectName.toLowerCase(),
    version: '1.0.0',
    description: 'API Node.js Enterprise - JavaScript + Mongoose',
    main: 'server.js',
    scripts,
    dependencies: {
      ...coreDependencies,
      mongoose: '^8.0.3',
      redis: '^4.6.0',
    },
    devDependencies: {
      ...coreDevDependencies,
    }
  }
}

// PRISMA
export function buildPackageJsonJS_Prisma(projectName) {
  return {
    name: projectName.toLowerCase(),
    version: '1.0.0',
    description: 'API Node.js Enterprise - JavaScript + Prisma',
    main: 'server.js',
    scripts: {
      ...scripts,
      'prisma:generate': 'prisma generate',
      'prisma:migrate': 'prisma migrate dev',
      'prisma:studio': 'prisma studio',
    },
    dependencies: {
      ...coreDependencies,
      '@prisma/client': '^5.22.0',
      prisma: '^5.22.0',
      mysql2: '^3.6.0',
      pg: '^8.11.3',
      redis: '^4.6.0',
      '@redis/client': '^1.5.14',
    },
    devDependencies: {
      ...coreDevDependencies,
    }
  }
}

// SELECTOR
export function buildPackageJsonJS(projectName, orm = 'sequelize') {
  const builders = {
    sequelize: buildPackageJsonJS_Sequelize,
    mongoose:  buildPackageJsonJS_Mongoose,
    prisma:    buildPackageJsonJS_Prisma,
  }

  const builder = builders[orm] ?? buildPackageJsonJS_Sequelize
  return builder(projectName)
}