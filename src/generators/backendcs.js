import { criarArquivo, criarPasta } from '../utils/fileHelper.js'
import path from 'path'
import { getEstruturaPorArquitetura } from '../templates/estruturasbackend.js'

export async function gerarBackendCs(projectName, arquitetura = 'mvc') {
  const base = path.join(projectName, 'Backend')

  // ============================================
  // 1. PEGA A ESTRUTURA CORRETA (C# + arquitetura)
  // ============================================
  const { pastas, arquivos } = getEstruturaPorArquitetura('cs', arquitetura)

  // ============================================
  // 2. CRIA PASTAS E ARQUIVOS
  // ============================================
  pastas.forEach(p => criarPasta(path.join(base, p)))
  arquivos.forEach(f => criarArquivo(path.join(base, f)))

  // ============================================
  // 3. .csproj
  // ============================================
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

  // ============================================
  // 4. appsettings.json
  // ============================================
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

  // ============================================
  // 5. .gitignore
  // ============================================
  criarArquivo(
    path.join(base, '.gitignore'),
    'bin/\nobj/\n.env\n*.user\n.vs/'
  )
}