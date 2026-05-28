export function packageEnterpriseTemplate(projectName) {
  return {
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    version: "1.0.0",
    description: `API Node.js Enterprise - ${projectName}`,
    main: "server.js",
    scripts: {
      start: "node server.js",
      dev: "nodemon server.js",
      test: "jest",
      "test:cov": "jest --coverage",
      "test:watch": "jest --watch",
      lint: "eslint src/**/*.js",
      format: "prettier --write src/**/*.js"
    },
    dependencies: {
      express: "^4.18.2",
      cors: "^2.8.5",
      helmet: "^7.1.0",
      compression: "^1.7.4",
      "express-rate-limit": "^7.1.5",
      "express-status-monitor": "^1.3.4",
      sequelize: "^6.35.0",
      mysql2: "^3.6.0",
      pg: "^8.11.3",
      mongodb: "^6.3.0",
      redis: "^4.6.0",
      bcrypt: "^5.1.1",
      jsonwebtoken: "^9.0.2",
      joi: "^17.11.0",
      bull: "^4.11.5",
      "socket.io": "^4.7.2",
      winston: "^3.11.0",
      "swagger-ui-express": "^5.0.0",
      "swagger-jsdoc": "^6.2.8",
      dotenv: "^16.3.1",
      multer: "^1.4.5-lts.1",
      nodemailer: "^6.9.7",
      handlebars: "^4.7.8",
      pdfkit: "^0.14.0"
    },
    devDependencies: {
      nodemon: "^3.0.1",
      jest: "^29.7.0",
      supertest: "^6.3.3",
      eslint: "^8.51.0",
      "eslint-config-airbnb-base": "^15.0.0",
      prettier: "^3.0.3",
      husky: "^8.0.3"
    }
  }
}