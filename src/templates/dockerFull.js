// templates/dockerFull.js

export const dockerComposeFull = (projectName) => `version: '3.8'

services:
  # ========== BANCOS DE DADOS ==========
  
  # MySQL
  mysql:
    image: mysql:8.0
    container_name: ${projectName}_mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: ${projectName}_db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - app_network
    restart: unless-stopped

  # MariaDB
  mariadb:
    image: mariadb:11
    container_name: ${projectName}_mariadb
    environment:
      MARIADB_ROOT_PASSWORD: root
      MARIADB_DATABASE: ${projectName}_db
    ports:
      - "3307:3306"
    volumes:
      - mariadb_data:/var/lib/mysql
    networks:
      - app_network
    restart: unless-stopped

  # PostgreSQL
  postgres:
    image: postgres:16
    container_name: ${projectName}_postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: root
      POSTGRES_DB: ${projectName}_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app_network
    restart: unless-stopped

  # MongoDB
  mongo:
    image: mongo:7
    container_name: ${projectName}_mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root
      MONGO_INITDB_DATABASE: ${projectName}_db
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    networks:
      - app_network
    restart: unless-stopped

  # Redis (cache)
  redis:
    image: redis:7-alpine
    container_name: ${projectName}_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app_network
    restart: unless-stopped

  # ========== AMBIENTE DEV ==========

  # Node.js Dev Environment
  node_dev:
    image: node:18-alpine
    container_name: ${projectName}_node_dev
    working_dir: /app
    volumes:
      - ./Backend:/app
    ports:
      - "3000:3000"
    depends_on:
      - mysql
      - postgres
      - redis
    networks:
      - app_network
    command: sh -c "npm install && npm run dev"
    restart: unless-stopped

  # Java Dev Environment
  java_dev:
    image: eclipse-temurin:17-jdk-alpine
    container_name: ${projectName}_java_dev
    working_dir: /app
    volumes:
      - ./Backend:/app
      - ~/.m2:/root/.m2
    ports:
      - "8080:8080"
    depends_on:
      - mysql
      - postgres
    networks:
      - app_network
    command: sh -c "./mvnw spring-boot:run"
    restart: unless-stopped

  # PHP Dev Environment
  php_dev:
    image: php:8.2-apache
    container_name: ${projectName}_php_dev
    volumes:
      - ./Backend:/var/www/html
    ports:
      - "8081:80"
    depends_on:
      - mariadb
      - postgres
    networks:
      - app_network
    restart: unless-stopped

  # Python Dev Environment
  python_dev:
    image: python:3.11-slim
    container_name: ${projectName}_python_dev
    working_dir: /app
    volumes:
      - ./Backend:/app
    ports:
      - "5000:5000"
    depends_on:
      - mysql
      - postgres
      - redis
    networks:
      - app_network
    command: sh -c "pip install -r requirements.txt && python app.py"
    restart: unless-stopped

  # C# Dev Environment
  cs_dev:
    image: mcr.microsoft.com/dotnet/sdk:8.0
    container_name: ${projectName}_cs_dev
    working_dir: /app
    volumes:
      - ./Backend:/app
    ports:
      - "5001:5000"
    depends_on:
      - mysql
      - postgres
    networks:
      - app_network
    command: sh -c "dotnet restore && dotnet run"
    restart: unless-stopped

  # ========== GERENCIAMENTO ==========

  # phpMyAdmin (MySQL/MariaDB)
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: ${projectName}_phpmyadmin
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
    ports:
      - "8082:80"
    depends_on:
      - mysql
      - mariadb
    networks:
      - app_network

  # pgAdmin (PostgreSQL)
  pgadmin:
    image: dpage/pgadmin4
    container_name: ${projectName}_pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: root
    ports:
      - "8083:80"
    depends_on:
      - postgres
    networks:
      - app_network

  # Mongo Express (MongoDB)
  mongo_express:
    image: mongo-express
    container_name: ${projectName}_mongo_express
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: root
      ME_CONFIG_MONGODB_SERVER: mongo
    ports:
      - "8084:8081"
    depends_on:
      - mongo
    networks:
      - app_network

  # Redis Commander (Redis GUI)
  redis_commander:
    image: rediscommander/redis-commander
    container_name: ${projectName}_redis_commander
    environment:
      REDIS_HOSTS: local:redis:6379
    ports:
      - "8085:8081"
    depends_on:
      - redis
    networks:
      - app_network

  # Nginx (proxy reverso)
  nginx:
    image: nginx:alpine
    container_name: ${projectName}_nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - node_dev
      - java_dev
      - php_dev
      - python_dev
      - cs_dev
    networks:
      - app_network
    restart: unless-stopped

volumes:
  mysql_data:
  mariadb_data:
  postgres_data:
  mongo_data:
  redis_data:

networks:
  app_network:
    driver: bridge
`