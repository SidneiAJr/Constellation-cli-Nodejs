// templates/devambinete.js

export const dockerComposeDev = (projectName, linguagem) => {
  const base = {
    node: `
  node_app:
    build:
      context: ./Backend
      dockerfile: Dockerfile.node
    container_name: ${projectName}_node
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
    volumes:
      - ./Backend:/app
      - /app/node_modules
    depends_on:
      - mysql
    networks:
      - backend_network`,

    python: `
  python_app:
    build:
      context: ./Backend
      dockerfile: Dockerfile.python
    container_name: ${projectName}_python
    ports:
      - "5000:5000"
    environment:
      FLASK_ENV: development
    volumes:
      - ./Backend:/app
    depends_on:
      - postgres
    networks:
      - backend_network`,

    java: `
  java_app:
    build:
      context: ./Backend
      dockerfile: Dockerfile.java
    container_name: ${projectName}_java
    ports:
      - "8080:8080"
    environment:
      SPRING_PROFILES_ACTIVE: docker
    volumes:
      - ./Backend:/app
      - ~/.m2:/root/.m2
    depends_on:
      - mysql
    networks:
      - backend_network`,

    php: `
  php_app:
    build:
      context: ./Backend
      dockerfile: Dockerfile.php
    container_name: ${projectName}_php
    ports:
      - "8080:80"
    volumes:
      - ./Backend:/var/www/html
    depends_on:
      - mariadb
    networks:
      - backend_network`
  }

  return `version: '3.8'

services:
${base[linguagem] || base.node}

volumes:
  ${linguagem === 'node' ? 'node_modules:' : ''}

networks:
  backend_network:
    driver: bridge
`
}

// Dockerfiles individuais
export const dockerfileNode = `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
`

export const dockerfilePython = `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
`

export const dockerfileJava = `FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline
COPY src ./src
EXPOSE 8080
CMD ["./mvnw", "spring-boot:run"]
`

export const dockerfilePhp = `FROM php:8.2-apache
RUN docker-php-ext-install pdo pdo_mysql
RUN a2enmod rewrite
COPY . /var/www/html/
EXPOSE 80
`