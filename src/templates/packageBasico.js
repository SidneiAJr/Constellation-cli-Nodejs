export function packageBasicoTemplate(projectName) {
  return {
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    version: "1.0.0",
    description: `API Node.js - ${projectName}`,
    main: "server.js",
    scripts: {
      start: "node server.js",
      dev: "nodemon server.js"
    },
    dependencies: {
      express: "^4.18.2",
      mysql2: "^3.6.0",
      dotenv: "^16.3.1",
      cors: "^2.8.5"
    },
    devDependencies: {
      nodemon: "^3.0.1"
    }
  }
}