export function packageAvancadoTemplate(projectName) {
  return {
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    version: "1.0.0",
    description: `API Node.js avançada - ${projectName}`,
    main: "server.js",
    scripts: {
      start: "node server.js",
      dev: "nodemon server.js",
      test: "jest",
      "test:watch": "jest --watch"
    },
    dependencies: {
      express: "^4.18.2",
      sequelize: "^6.35.0",
      mysql2: "^3.6.0",
      bcrypt: "^5.1.1",
      jsonwebtoken: "^9.0.2",
      dotenv: "^16.3.1",
      cors: "^2.8.5",
      helmet: "^7.1.0",
      "express-rate-limit": "^7.1.5",
      compression: "^1.7.4",
      winston: "^3.11.0",
      joi: "^17.11.0"
    },
    devDependencies: {
      nodemon: "^3.0.1",
      jest: "^29.7.0",
      supertest: "^6.3.3",
      eslint: "^8.51.0"
    }
  }
}