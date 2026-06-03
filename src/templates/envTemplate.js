// templates/envTemplate.js

export const envExample = (linguagem = 'js') => {
  const base = {
    js: `# Server
PORT=
NODE_ENV=

# Database
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

# Security
JWT_SECRET=
JWT_EXPIRES_IN=

# Optional
REDIS_HOST=
REDIS_PORT=
`,

    ts: `# Server
PORT=
NODE_ENV=

# Database
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

# Security
JWT_SECRET=
JWT_EXPIRES_IN=

# Optional
REDIS_HOST=
REDIS_PORT=
`,

    java: `# Server
server.port=
server.servlet.context-path=

# Database
spring.datasource.url=
spring.datasource.username=
spring.datasource.password=
spring.datasource.driver-class-name=

# JPA
spring.jpa.hibernate.ddl-auto=
spring.jpa.show-sql=

# Security
jwt.secret=
jwt.expiration=

# Optional
spring.profiles.active=
`,

    php: `# Environment
APP_ENV=
APP_DEBUG=

# Database
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

# Security
JWT_SECRET=
JWT_ALGO=

# Optional
REDIS_HOST=
REDIS_PORT=
`,

    cs: `# Server
ASPNETCORE_ENVIRONMENT=
ASPNETCORE_URLS=

# Database
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

# Security
JWT_SECRET=
JWT_ISSUER=
JWT_AUDIENCE=

# Logging
LOG_LEVEL=
`
  }

  return base[linguagem] || base.js
}

// .env.example (igual, sem valores)
export const envExampleOnly = (linguagem = 'js') => {
  return envExample(linguagem)
}