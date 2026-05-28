// templates/estruturasbackend.js

// ============================================
// MVC - JavaScript
// ============================================
export const pastasMVC_JS = [
  'app/controller', 'app/model', 'app/service',
  'app/repository', 'app/middleware', 'app/entity',
  'app/dto', 'app/config', 'app/helpers',
  'app/utils', 'app/routes', 'docs', 'public', 'tests'
]

export const arquivosMVC_JS = [
  'app/controller/HomeController.js',
  'app/controller/UserController.js',
  'app/controller/AuthController.js',
  'app/model/UserModel.js',
  'app/model/ProductModel.js',
  'app/service/UserService.js',
  'app/service/AuthService.js',
  'app/repository/UserRepository.js',
  'app/middleware/auth.middleware.js',
  'app/middleware/error.middleware.js',
  'app/routes/index.routes.js',
  'app/routes/user.routes.js',
  'app/config/database.config.js',
  'app/config/env.config.js',
]

// ============================================
// MVC - TypeScript
// ============================================
export const pastasMVC_TS = [
  'app/controller', 'app/model', 'app/service',
  'app/repository', 'app/middleware', 'app/entity',
  'app/dto', 'app/config', 'app/helpers',
  'app/utils', 'app/routes', 'docs', 'public', 'tests'
]

export const arquivosMVC_TS = [
  'app/controller/HomeController.ts',
  'app/controller/UserController.ts',
  'app/controller/AuthController.ts',
  'app/model/UserModel.ts',
  'app/model/ProductModel.ts',
  'app/service/UserService.ts',
  'app/service/AuthService.ts',
  'app/repository/UserRepository.ts',
  'app/middleware/auth.middleware.ts',
  'app/middleware/error.middleware.ts',
  'app/routes/index.routes.ts',
  'app/routes/user.routes.ts',
  'app/config/database.config.ts',
  'app/config/env.config.ts',
]

// ============================================
// DDD (Domain-Driven Design) - JavaScript
// ============================================
export const pastasDDD_JS = [
  'domain/entities', 'domain/valueObjects', 'domain/repositories',
  'domain/services', 'domain/events', 'domain/exceptions',
  'application/useCases', 'application/dtos', 'application/queries',
  'application/commands', 'application/handlers', 'application/validators',
  'application/mappers', 'application/services',
  'infrastructure/persistence', 'infrastructure/repositories',
  'infrastructure/services', 'infrastructure/messaging', 'infrastructure/cache',
  'infrastructure/logging', 'infrastructure/config', 'infrastructure/utils',
  'interfaces/controllers', 'interfaces/middleware', 'interfaces/routes',
  'interfaces/validators', 'interfaces/serializers', 'interfaces/docs',
  'shared/constants', 'shared/types', 'shared/helpers',
  'tests/unit', 'tests/integration', 'tests/e2e',
  'docs'
]

export const arquivosDDD_JS = [
  'domain/entities/User.js',
  'domain/entities/Product.js',
  'domain/entities/BaseEntity.js',
  'domain/valueObjects/Email.js',
  'domain/valueObjects/Password.js',
  'domain/repositories/UserRepositoryInterface.js',
  'domain/repositories/ProductRepositoryInterface.js',
  'domain/services/UserDomainService.js',
  'domain/exceptions/DomainException.js',
  'application/dtos/CreateUserDTO.js',
  'application/dtos/UpdateUserDTO.js',
  'application/dtos/UserResponseDTO.js',
  'application/useCases/CreateUserUseCase.js',
  'application/useCases/GetUserUseCase.js',
  'application/useCases/ListUsersUseCase.js',
  'application/useCases/DeleteUserUseCase.js',
  'application/useCases/UpdateUserUseCase.js',
  'application/validators/CreateUserValidator.js',
  'application/mappers/UserMapper.js',
  'infrastructure/repositories/UserRepository.js',
  'infrastructure/repositories/ProductRepository.js',
  'infrastructure/persistence/database.js',
  'infrastructure/config/env.js',
  'infrastructure/logging/logger.js',
  'interfaces/controllers/UserController.js',
  'interfaces/controllers/AuthController.js',
  'interfaces/middleware/auth.middleware.js',
  'interfaces/middleware/error.middleware.js',
  'interfaces/routes/index.routes.js',
  'interfaces/routes/user.routes.js',
  'interfaces/validators/validateRequest.js',
  'server.js'
]

// ============================================
// DDD - TypeScript
// ============================================
export const pastasDDD_TS = [...pastasDDD_JS]
export const arquivosDDD_TS = arquivosDDD_JS.map(f => f.replace('.js', '.ts'))

// ============================================
// Clean Architecture - JavaScript
// ============================================
export const pastasClean_JS = [
  'entities', 'useCases', 'interfaces/repositories',
  'interfaces/services', 'interfaces/presenters', 'gateways/repositories',
  'gateways/services', 'presenters', 'controllers', 'frameworks/database',
  'frameworks/web', 'frameworks/logging', 'frameworks/auth', 'utils', 'config', 'tests', 'docs'
]

export const arquivosClean_JS = [
  'entities/User.js', 'entities/Product.js', 'entities/BaseEntity.js',
  'useCases/CreateUserUseCase.js', 'useCases/GetUserUseCase.js',
  'useCases/ListUsersUseCase.js', 'useCases/UpdateUserUseCase.js', 'useCases/DeleteUserUseCase.js',
  'interfaces/repositories/UserRepositoryInterface.js',
  'interfaces/repositories/ProductRepositoryInterface.js',
  'interfaces/presenters/UserPresenterInterface.js',
  'gateways/repositories/UserRepository.js', 'gateways/repositories/ProductRepository.js',
  'presenters/UserPresenter.js', 'controllers/UserController.js', 'controllers/AuthController.js',
  'frameworks/database/mysql.js', 'frameworks/web/express.js', 'frameworks/auth/jwt.js',
  'frameworks/logging/winston.js', 'config/env.js', 'config/database.js', 'server.js'
]

// ============================================
// Clean Architecture - TypeScript
// ============================================
export const pastasClean_TS = [...pastasClean_JS]
export const arquivosClean_TS = arquivosClean_JS.map(f => f.replace('.js', '.ts'))

// ============================================
// Hexagonal Architecture - JavaScript
// ============================================
export const pastasHexagonal_JS = [
  'core/domain/entities', 'core/domain/valueObjects', 'core/domain/exceptions', 'core/domain/events',
  'core/ports/incoming', 'core/ports/outgoing',
  'adapters/incoming/controllers', 'adapters/incoming/middleware', 'adapters/incoming/validators',
  'adapters/outgoing/repositories', 'adapters/outgoing/services', 'adapters/outgoing/messaging', 'adapters/outgoing/cache',
  'application/services', 'application/dtos', 'application/mappers',
  'infrastructure/config', 'infrastructure/logging', 'infrastructure/utils',
  'tests', 'docs'
]

export const arquivosHexagonal_JS = [
  'core/domain/entities/User.js', 'core/domain/entities/Product.js',
  'core/domain/valueObjects/Email.js', 'core/domain/valueObjects/Password.js',
  'core/domain/exceptions/DomainException.js',
  'core/ports/incoming/UserServicePort.js', 'core/ports/incoming/AuthServicePort.js',
  'core/ports/outgoing/UserRepositoryPort.js', 'core/ports/outgoing/ProductRepositoryPort.js',
  'core/ports/outgoing/EmailServicePort.js', 'core/ports/outgoing/CacheServicePort.js',
  'adapters/incoming/controllers/UserController.js', 'adapters/incoming/controllers/AuthController.js',
  'adapters/incoming/middleware/auth.middleware.js', 'adapters/incoming/middleware/error.middleware.js',
  'adapters/incoming/validators/validateRequest.js',
  'adapters/outgoing/repositories/UserRepository.js', 'adapters/outgoing/repositories/ProductRepository.js',
  'adapters/outgoing/services/EmailService.js', 'adapters/outgoing/cache/RedisCache.js',
  'application/services/UserApplicationService.js',
  'application/dtos/CreateUserDTO.js', 'application/dtos/UserResponseDTO.js',
  'application/mappers/UserMapper.js',
  'infrastructure/config/env.js', 'infrastructure/logging/logger.js',
  'server.js'
]

// ============================================
// Hexagonal Architecture - TypeScript
// ============================================
export const pastasHexagonal_TS = [...pastasHexagonal_JS]
export const arquivosHexagonal_TS = arquivosHexagonal_JS.map(f => f.replace('.js', '.ts'))

// ============================================
// MVC - PHP
// ============================================
export const pastasMVC_PHP = [
  'app/controller', 'app/model', 'app/service',
  'app/repository', 'app/middleware', 'app/entity',
  'app/dto', 'app/config', 'app/helpers',
  'app/utils', 'app/routes', 'docs', 'public', 'tests'
]

export const arquivosMVC_PHP = [
  'app/controller/HomeController.php',
  'app/controller/UserController.php',
  'app/controller/AuthController.php',
  'app/model/UserModel.php',
  'app/model/ProductModel.php',
  'app/service/UserService.php',
  'app/service/AuthService.php',
  'app/repository/UserRepository.php',
  'app/middleware/AuthMiddleware.php',
  'app/middleware/ErrorMiddleware.php',
  'app/routes/index.php',
  'app/routes/user.php',
  'app/config/database.php',
  'app/config/env.php',
  'public/index.php',
]

// ============================================
// DDD - PHP
// ============================================
export const pastasDDD_PHP = [
  'src/Domain/Entity', 'src/Domain/ValueObject', 'src/Domain/Repository',
  'src/Domain/Service', 'src/Domain/Event', 'src/Domain/Exception',
  'src/Application/UseCase', 'src/Application/DTO', 'src/Application/Query',
  'src/Application/Command', 'src/Application/Handler', 'src/Application/Validator',
  'src/Application/Mapper', 'src/Application/Service',
  'src/Infrastructure/Persistence', 'src/Infrastructure/Repository',
  'src/Infrastructure/Service', 'src/Infrastructure/Messaging',
  'src/Infrastructure/Cache', 'src/Infrastructure/Logging', 'src/Infrastructure/Config',
  'src/Interfaces/Controller', 'src/Interfaces/Middleware', 'src/Interfaces/Routes',
  'src/Interfaces/Validator', 'src/Interfaces/Serializer',
  'tests/Unit', 'tests/Integration', 'docs', 'public'
]

export const arquivosDDD_PHP = [
  'src/Domain/Entity/User.php', 'src/Domain/Entity/Product.php',
  'src/Domain/ValueObject/Email.php', 'src/Domain/ValueObject/Password.php',
  'src/Domain/Repository/UserRepositoryInterface.php',
  'src/Domain/Service/UserDomainService.php', 'src/Domain/Exception/DomainException.php',
  'src/Application/DTO/CreateUserDTO.php', 'src/Application/DTO/UserResponseDTO.php',
  'src/Application/UseCase/CreateUserUseCase.php', 'src/Application/UseCase/GetUserUseCase.php',
  'src/Application/UseCase/ListUsersUseCase.php', 'src/Application/Validator/CreateUserValidator.php',
  'src/Application/Mapper/UserMapper.php',
  'src/Infrastructure/Repository/UserRepository.php', 'src/Infrastructure/Persistence/Database.php',
  'src/Infrastructure/Config/env.php', 'src/Infrastructure/Logging/Logger.php',
  'src/Interfaces/Controller/UserController.php', 'src/Interfaces/Controller/AuthController.php',
  'src/Interfaces/Middleware/AuthMiddleware.php', 'src/Interfaces/Routes/index.php',
  'src/Interfaces/Routes/user.php', 'public/index.php'
]

// ============================================
// Clean e Hexagonal para PHP (fallback para MVC)
// ============================================
export const pastasClean_PHP = [...pastasMVC_PHP]
export const arquivosClean_PHP = [...arquivosMVC_PHP]
export const pastasHexagonal_PHP = [...pastasMVC_PHP]
export const arquivosHexagonal_PHP = [...arquivosMVC_PHP]

// ============================================
// MVC - C#
// ============================================
export const pastasMVC_CS = [
  'Controllers', 'Models', 'Services',
  'Repositories', 'Middleware', 'DTOs',
  'Config', 'Utils', 'Exceptions', 'docs'
]

export const arquivosMVC_CS = [
  'Controllers/HomeController.cs', 'Controllers/UserController.cs', 'Controllers/AuthController.cs',
  'Models/User.cs', 'Models/Product.cs', 'Models/BaseEntity.cs',
  'Services/UserService.cs', 'Services/AuthService.cs',
  'Repositories/UserRepository.cs', 'Repositories/ProductRepository.cs',
  'DTOs/UserRequestDTO.cs', 'DTOs/UserResponseDTO.cs', 'DTOs/AuthRequestDTO.cs',
  'Middleware/AuthMiddleware.cs', 'Middleware/ErrorMiddleware.cs',
  'Config/DatabaseConfig.cs', 'Config/JwtConfig.cs', 'Utils/JwtUtil.cs',
  'Program.cs', 'appsettings.json',
]

// ============================================
// DDD - C#
// ============================================
export const pastasDDD_CS = [
  'src/Domain/Entities', 'src/Domain/ValueObjects', 'src/Domain/Repositories',
  'src/Domain/Services', 'src/Domain/Events', 'src/Domain/Exceptions',
  'src/Application/UseCases', 'src/Application/DTOs', 'src/Application/Queries',
  'src/Application/Commands', 'src/Application/Handlers', 'src/Application/Validators',
  'src/Application/Mappers', 'src/Application/Services',
  'src/Infrastructure/Persistence', 'src/Infrastructure/Repositories',
  'src/Infrastructure/Services', 'src/Infrastructure/Messaging',
  'src/Infrastructure/Cache', 'src/Infrastructure/Logging', 'src/Infrastructure/Config',
  'src/Interfaces/Controllers', 'src/Interfaces/Middleware', 'src/Interfaces/Routes',
  'tests/Unit', 'tests/Integration', 'docs'
]

export const arquivosDDD_CS = [
  'src/Domain/Entities/User.cs', 'src/Domain/Entities/Product.cs',
  'src/Domain/ValueObjects/Email.cs',
  'src/Domain/Repositories/IUserRepository.cs',
  'src/Domain/Services/UserDomainService.cs', 'src/Domain/Exceptions/DomainException.cs',
  'src/Application/DTOs/CreateUserDTO.cs', 'src/Application/DTOs/UserResponseDTO.cs',
  'src/Application/UseCases/CreateUserUseCase.cs', 'src/Application/UseCases/GetUserUseCase.cs',
  'src/Application/Validators/CreateUserValidator.cs', 'src/Application/Mappers/UserMapper.cs',
  'src/Infrastructure/Repositories/UserRepository.cs',
  'src/Infrastructure/Persistence/AppDbContext.cs', 'src/Infrastructure/Config/AppSettings.cs',
  'src/Interfaces/Controllers/UserController.cs', 'src/Interfaces/Controllers/AuthController.cs',
  'src/Interfaces/Middleware/AuthMiddleware.cs', 'src/Interfaces/Routes/ApiRoutes.cs',
  'Program.cs', 'appsettings.json'
]

// ============================================
// Clean e Hexagonal para C# (fallback para MVC)
// ============================================
export const pastasClean_CS = [...pastasMVC_CS]
export const arquivosClean_CS = [...arquivosMVC_CS]
export const pastasHexagonal_CS = [...pastasMVC_CS]
export const arquivosHexagonal_CS = [...arquivosMVC_CS]

// ============================================
// MVC - Java
// ============================================
export const pastasMVC_JAVA = [
  'src/main/java/com/constellation/app/controller',
  'src/main/java/com/constellation/app/model',
  'src/main/java/com/constellation/app/service',
  'src/main/java/com/constellation/app/repository',
  'src/main/java/com/constellation/app/dto',
  'src/main/java/com/constellation/app/config',
  'src/main/java/com/constellation/app/exception',
  'src/main/java/com/constellation/app/utils',
  'src/main/java/com/constellation/app/security',
  'src/main/resources', 'src/test/java', 'docs'
]

export const arquivosMVC_JAVA = [
  'src/main/java/com/constellation/app/controller/HomeController.java',
  'src/main/java/com/constellation/app/controller/UserController.java',
  'src/main/java/com/constellation/app/controller/AuthController.java',
  'src/main/java/com/constellation/app/model/User.java',
  'src/main/java/com/constellation/app/model/Product.java',
  'src/main/java/com/constellation/app/service/UserService.java',
  'src/main/java/com/constellation/app/service/AuthService.java',
  'src/main/java/com/constellation/app/repository/UserRepository.java',
  'src/main/java/com/constellation/app/dto/UserRequestDTO.java',
  'src/main/java/com/constellation/app/dto/UserResponseDTO.java',
  'src/main/java/com/constellation/app/config/SecurityConfig.java',
  'src/main/java/com/constellation/app/config/CorsConfig.java',
  'src/main/java/com/constellation/app/exception/GlobalExceptionHandler.java',
  'src/main/java/com/constellation/app/utils/JwtUtil.java',
  'src/main/java/com/constellation/app/security/AuthInterceptor.java',
  'src/main/resources/application.properties',
]

// ============================================
// DDD - Java
// ============================================
export const pastasDDD_JAVA = [
  'src/main/java/com/constellation/domain/entity',
  'src/main/java/com/constellation/domain/valueobject',
  'src/main/java/com/constellation/domain/repository',
  'src/main/java/com/constellation/domain/service',
  'src/main/java/com/constellation/domain/event',
  'src/main/java/com/constellation/domain/exception',
  'src/main/java/com/constellation/application/usecase',
  'src/main/java/com/constellation/application/dto',
  'src/main/java/com/constellation/application/query',
  'src/main/java/com/constellation/application/command',
  'src/main/java/com/constellation/application/handler',
  'src/main/java/com/constellation/application/validator',
  'src/main/java/com/constellation/application/mapper',
  'src/main/java/com/constellation/application/service',
  'src/main/java/com/constellation/infrastructure/persistence',
  'src/main/java/com/constellation/infrastructure/repository',
  'src/main/java/com/constellation/infrastructure/service',
  'src/main/java/com/constellation/infrastructure/messaging',
  'src/main/java/com/constellation/infrastructure/cache',
  'src/main/java/com/constellation/infrastructure/logging',
  'src/main/java/com/constellation/infrastructure/config',
  'src/main/java/com/constellation/interfaces/controller',
  'src/main/java/com/constellation/interfaces/middleware',
  'src/main/java/com/constellation/interfaces/validator',
  'src/main/resources', 'src/test/java', 'docs'
]

export const arquivosDDD_JAVA = [
  'src/main/java/com/constellation/domain/entity/User.java',
  'src/main/java/com/constellation/domain/entity/Product.java',
  'src/main/java/com/constellation/domain/valueobject/Email.java',
  'src/main/java/com/constellation/domain/repository/UserRepositoryInterface.java',
  'src/main/java/com/constellation/domain/exception/DomainException.java',
  'src/main/java/com/constellation/application/dto/CreateUserDTO.java',
  'src/main/java/com/constellation/application/dto/UserResponseDTO.java',
  'src/main/java/com/constellation/application/usecase/CreateUserUseCase.java',
  'src/main/java/com/constellation/application/usecase/GetUserUseCase.java',
  'src/main/java/com/constellation/application/validator/CreateUserValidator.java',
  'src/main/java/com/constellation/application/mapper/UserMapper.java',
  'src/main/java/com/constellation/infrastructure/repository/UserRepository.java',
  'src/main/java/com/constellation/infrastructure/persistence/DatabaseConfig.java',
  'src/main/java/com/constellation/infrastructure/config/AppConfig.java',
  'src/main/java/com/constellation/interfaces/controller/UserController.java',
  'src/main/java/com/constellation/interfaces/controller/AuthController.java',
  'src/main/java/com/constellation/interfaces/middleware/AuthMiddleware.java',
  'src/main/java/com/constellation/Application.java',
  'src/main/resources/application.properties',
]

// ============================================
// Clean e Hexagonal para Java (fallback para MVC)
// ============================================
export const pastasClean_JAVA = [...pastasMVC_JAVA]
export const arquivosClean_JAVA = [...arquivosMVC_JAVA]
export const pastasHexagonal_JAVA = [...pastasMVC_JAVA]
export const arquivosHexagonal_JAVA = [...arquivosMVC_JAVA]

// ============================================
// FUNÇÃO AUXILIAR COMPLETA E CORRIGIDA
// ============================================
export function getEstruturaPorArquitetura(linguagem, arquitetura) {
  const estruturas = {
    // JavaScript
    js: {
      mvc: { pastas: pastasMVC_JS, arquivos: arquivosMVC_JS },
      ddd: { pastas: pastasDDD_JS, arquivos: arquivosDDD_JS },
      clean: { pastas: pastasClean_JS, arquivos: arquivosClean_JS },
      hexagonal: { pastas: pastasHexagonal_JS, arquivos: arquivosHexagonal_JS }
    },
    // TypeScript
    ts: {
      mvc: { pastas: pastasMVC_TS, arquivos: arquivosMVC_TS },
      ddd: { pastas: pastasDDD_TS, arquivos: arquivosDDD_TS },
      clean: { pastas: pastasClean_TS, arquivos: arquivosClean_TS },
      hexagonal: { pastas: pastasHexagonal_TS, arquivos: arquivosHexagonal_TS }
    },
    // PHP
    php: {
      mvc: { pastas: pastasMVC_PHP, arquivos: arquivosMVC_PHP },
      ddd: { pastas: pastasDDD_PHP, arquivos: arquivosDDD_PHP },
      clean: { pastas: pastasClean_PHP, arquivos: arquivosClean_PHP },
      hexagonal: { pastas: pastasHexagonal_PHP, arquivos: arquivosHexagonal_PHP }
    },
    // C#
    cs: {
      mvc: { pastas: pastasMVC_CS, arquivos: arquivosMVC_CS },
      ddd: { pastas: pastasDDD_CS, arquivos: arquivosDDD_CS },
      clean: { pastas: pastasClean_CS, arquivos: arquivosClean_CS },
      hexagonal: { pastas: pastasHexagonal_CS, arquivos: arquivosHexagonal_CS }
    },
    // Java
    java: {
      mvc: { pastas: pastasMVC_JAVA, arquivos: arquivosMVC_JAVA },
      ddd: { pastas: pastasDDD_JAVA, arquivos: arquivosDDD_JAVA },
      clean: { pastas: pastasClean_JAVA, arquivos: arquivosClean_JAVA },
      hexagonal: { pastas: pastasHexagonal_JAVA, arquivos: arquivosHexagonal_JAVA }
    }
  }
  
  // Fallback seguro: se não encontrar, retorna MVC do JavaScript
  return estruturas[linguagem]?.[arquitetura] || estruturas.js.mvc
}