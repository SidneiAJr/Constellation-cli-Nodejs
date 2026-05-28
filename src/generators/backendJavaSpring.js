import { criarArquivo, criarPasta } from '../utils/fileHelper.js'
import path from 'path'
import { pomTemplate } from '../templates/pomTemplate.js'
import { menuDependencias } from '../menus/DepenciasMenu.js'

export async function gerarBackendJava(projectName) {
  const base = path.join(projectName, 'Backend')

  // ✅ Estrutura correta Spring Boot
  const pastas = [
    'src/main/java/com/constellation/app/controller',
    'src/main/java/com/constellation/app/model',
    'src/main/java/com/constellation/app/service',
    'src/main/java/com/constellation/app/repository',
    'src/main/java/com/constellation/app/dto',
    'src/main/java/com/constellation/app/config',
    'src/main/java/com/constellation/app/exception',
    'src/main/java/com/constellation/app/utils',
    'src/main/java/com/constellation/app/security',
    'src/main/resources',
    'src/test/java',
    'docs'
  ]
  pastas.forEach(p => criarPasta(path.join(base, p)))

  const javaBase = 'src/main/java/com/constellation/app'
  const arquivos = [
    `${javaBase}/controller/HomeController.java`,
    `${javaBase}/controller/UserController.java`,
    `${javaBase}/controller/AuthController.java`,
    `${javaBase}/model/Usuario.java`,
    `${javaBase}/model/Produto.java`,
    `${javaBase}/model/BaseEntity.java`,
    `${javaBase}/service/UserService.java`,
    `${javaBase}/service/AuthService.java`,
    `${javaBase}/repository/UserRepository.java`,
    `${javaBase}/repository/ProdutoRepository.java`,
    `${javaBase}/dto/UserRequestDTO.java`,
    `${javaBase}/dto/UserResponseDTO.java`,
    `${javaBase}/dto/AuthRequestDTO.java`,
    `${javaBase}/config/SecurityConfig.java`,
    `${javaBase}/config/CorsConfig.java`,
    `${javaBase}/exception/GlobalExceptionHandler.java`,
    `${javaBase}/exception/BusinessException.java`,
    `${javaBase}/utils/JwtUtil.java`,
    `${javaBase}/security/AuthInterceptor.java`,
  ]
  arquivos.forEach(f => criarArquivo(path.join(base, f)))

  // ✅ Application.java (classe principal)
  const mainAppContent = `package com.constellation.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`
  criarArquivo(path.join(base, 'src/main/java/com/constellation/app/Application.java'), mainAppContent)

  // ✅ Pergunta nível de dependência para Java
  const { pomXml, nivel } = await menuDependencias(projectName, 'java', 'java')

  // ✅ pom.xml — dinâmico conforme nível
  criarArquivo(path.join(base, 'pom.xml'), pomXml)

  // ✅ application.properties
  criarArquivo(
    path.join(base, 'src/main/resources/application.properties'),
    `server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/${projectName.toLowerCase()}_db
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
jwt.secret=changeme
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true`
  )

  // ✅ application-dev.properties (opcional)
  if (nivel === 'enterprise') {
    criarArquivo(
      path.join(base, 'src/main/resources/application-dev.properties'),
      `server.port=8081
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true`
    )
  }

  // ✅ .gitignore
  criarArquivo(
    path.join(base, '.gitignore'),
    `target/
.env
*.class
*.jar
.mvn/
!.mvn/wrapper/maven-wrapper.jar
*.log
.DS_Store`
  )

  // ✅ README.md
  const readme = `# ${projectName} - Backend Spring Boot

## Como rodar

\`\`\`bash
cd ${projectName}/Backend
mvn spring-boot:run
\`\`\`

## Endpoints

- GET /api/usuarios
- POST /api/usuarios
- PUT /api/usuarios/{id}
- DELETE /api/usuarios/{id}

## Tecnologias

- Java 17
- Spring Boot 3.2
- Spring Security com JWT
- Spring Data JPA
- MySQL
- Lombok
- Swagger/OpenAPI (http://localhost:8080/swagger-ui.html)

## Nível: ${nivel === 'enterprise' ? '🏢 Enterprise' : '📦 Padrão'}
`
  criarArquivo(path.join(base, 'README.md'), readme)
}