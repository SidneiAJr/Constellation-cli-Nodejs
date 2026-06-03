import { criarArquivo, criarPasta } from '../utils/fileHelper.js'
import path from 'path'
import { menuDependencias } from '../menus/DepenciasMenu.js'
import { getEstruturaPorArquitetura } from '../templates/estruturasbackend.js'

export async function gerarBackendJava(projectName, arquitetura = 'mvc') {
  const base = path.join(projectName, 'Backend')

  // ============================================
  // 1. PEGA A ESTRUTURA CORRETA (JAVA + arquitetura)
  // ============================================
  const { pastas, arquivos } = getEstruturaPorArquitetura('java', arquitetura)

  // ============================================
  // 2. CRIA PASTAS E ARQUIVOS
  // ============================================
  pastas.forEach(p => criarPasta(path.join(base, p)))
  arquivos.forEach(f => criarArquivo(path.join(base, f)))

  // ============================================
  // 3. Application.java (classe principal) - se não existir na estrutura
  // ============================================
  const mainAppContent = `package com.constellation.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`

  // Só cria se o arquivo não foi incluído na estrutura
  const appPath = path.join(base, 'src/main/java/com/constellation/app/Application.java')
  if (!arquivos.includes('src/main/java/com/constellation/app/Application.java')) {
    criarArquivo(appPath, mainAppContent)
  }

  // ============================================
  // 4. PERGUNTA NÍVEL DE DEPENDÊNCIA PARA JAVA
  // ============================================
  const { pomXml, nivel } = await menuDependencias(projectName, 'java', 'java')

  // ============================================
  // 5. pom.xml — dinâmico conforme nível
  // ============================================
  criarArquivo(path.join(base, 'pom.xml'), pomXml)

  // ============================================
  // 6. application.properties
  // ============================================
  criarArquivo(
    path.join(base, 'src/main/resources/application.properties'),
    `server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/${projectName.toLowerCase()}_db
spring.datasource.username=
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
jwt.secret=changeme
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true`
  )

  // ============================================
  // 7. application-dev.properties (opcional - enterprise)
  // ============================================
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

  // ============================================
  // 8. .gitignore
  // ============================================
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

  // ============================================
  // 9. README.md
  // ============================================
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

## Arquitetura: ${arquitetura.toUpperCase()}
## Nível: ${nivel === 'enterprise' ? '🏢 Enterprise' : '📦 Padrão'}
`
  criarArquivo(path.join(base, 'README.md'), readme)
}