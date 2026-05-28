export function pomEnterpriseTemplate(projectName) {
  const artifactId = projectName.toLowerCase().replace(/\s+/g, '-')
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>

    <groupId>com.constellation</groupId>
    <artifactId>${artifactId}</artifactId>
    <version>1.0.0</version>
    <name>${projectName}</name>
    <description>Projeto Enterprise completo</description>

    <properties>
        <java.version>17</java.version>
        <spring-cloud.version>2023.0.0</spring-cloud.version>
        <jwt.version>0.11.5</jwt.version>
        <testcontainers.version>1.19.3</testcontainers.version>
    </properties>

    <!-- TODO: Adicionar dependencies do seu XML gigante aqui -->
    <dependencies>
        <!-- Coloca todas as dependências que você mandou -->
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>\${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>com.google.cloud.tools</groupId>
                <artifactId>jib-maven-plugin</artifactId>
                <version>3.4.0</version>
                <configuration>
                    <to>
                        <image>constellation/\${project.artifactId}:latest</image>
                    </to>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`
}