import { criarArquivo, criarPasta } from '../utils/fileHelper.js'
import path from 'path'

export function gerarBackendCs(projectName) {
  const base = path.join(projectName, 'Backend')

  // ✅ Estrutura correta ASP.NET Core — não tem app/, fica na raiz
  const pastas = [
    'Controllers', 'Models', 'Services',
    'Repositories', 'Middleware', 'DTOs',
    'Config', 'Utils', 'Exceptions', 'docs'
  ]
  pastas.forEach(p => criarPasta(path.join(base, p)))

  const arquivos = [
    'Controllers/HomeController.cs',
    'Controllers/UserController.cs',
    'Controllers/AuthController.cs',
    'Models/User.cs',
    'Models/Product.cs',
    'Models/BaseEntity.cs',
    'Services/UserService.cs',
    'Services/AuthService.cs',
    'Repositories/UserRepository.cs',
    'Repositories/ProductRepository.cs',
    'DTOs/UserRequestDTO.cs',
    'DTOs/UserResponseDTO.cs',
    'DTOs/AuthRequestDTO.cs',
    'Middleware/AuthMiddleware.cs',
    'Middleware/ErrorMiddleware.cs',
    'Config/DatabaseConfig.cs',
    'Config/JwtConfig.cs',
    'Utils/JwtUtil.cs',
    'Program.cs',
    'appsettings.json',
  ]
  arquivos.forEach(f => criarArquivo(path.join(base, f)))

  // ✅ .csproj — gerenciador do C#, não package.json
  const csproj = `<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
    <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="8.0.0" />
    <PackageReference Include="BCrypt.Net-Next" Version="4.0.3" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
  </ItemGroup>
</Project>`

  criarArquivo(
    path.join(base, `${projectName}.csproj`),
    csproj
  )

  // ✅ appsettings.json
  const appSettings = {
    ConnectionStrings: {
      DefaultConnection: 'Server=localhost;Database=app_db;User=root;Password=root;'
    },
    Jwt: {
      Secret: 'changeme',
      ExpiresInMinutes: 60
    },
    Logging: {
      LogLevel: { Default: 'Information' }
    }
  }

  criarArquivo(
    path.join(base, 'appsettings.json'),
    JSON.stringify(appSettings, null, 2)
  )

  criarArquivo(
    path.join(base, '.gitignore'),
    'bin/\nobj/\n.env\n*.user\n.vs/'
  )
}