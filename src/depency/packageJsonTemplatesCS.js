// src/depency/packageJsonTemplatesCS.js

export function buildCsproj(projectName, nivel = 'enterprise') {
  const basico = `<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <!-- Web & Core -->
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.0" />

    <!-- Entity Framework -->
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
    <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />

    <!-- Config -->
    <PackageReference Include="DotNetEnv" Version="3.0.0" />
  </ItemGroup>
</Project>`

  const avancado = `<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <!-- Web & Core -->
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.0" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />

    <!-- Auth -->
    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.0" />
    <PackageReference Include="BCrypt.Net-Next" Version="4.0.3" />

    <!-- Entity Framework -->
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
    <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />

    <!-- Validação -->
    <PackageReference Include="FluentValidation.AspNetCore" Version="11.3.0" />

    <!-- Logs -->
    <PackageReference Include="Serilog.AspNetCore" Version="8.0.0" />
    <PackageReference Include="Serilog.Sinks.Console" Version="5.0.1" />
    <PackageReference Include="Serilog.Sinks.File" Version="5.0.0" />

    <!-- Utils -->
    <PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="12.0.1" />
    <PackageReference Include="DotNetEnv" Version="3.0.0" />
  </ItemGroup>
</Project>`

  const enterprise = `<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
  </PropertyGroup>

  <ItemGroup>
    <!-- Web & Docs -->
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.0" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
    <PackageReference Include="Asp.Versioning.Mvc" Version="8.1.0" />

    <!-- Auth & Segurança -->
    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.0" />
    <PackageReference Include="BCrypt.Net-Next" Version="4.0.3" />
    <PackageReference Include="AspNetCoreRateLimit" Version="5.0.0" />

    <!-- Entity Framework & Banco -->
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />
    <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="8.0.0" />
    <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="8.0.0" />
    <PackageReference Include="MongoDB.Driver" Version="2.23.1" />

    <!-- Cache -->
    <PackageReference Include="StackExchange.Redis" Version="2.7.17" />
    <PackageReference Include="Microsoft.Extensions.Caching.StackExchangeRedis" Version="8.0.0" />

    <!-- Filas & Mensageria -->
    <PackageReference Include="MassTransit" Version="8.1.3" />
    <PackageReference Include="MassTransit.RabbitMQ" Version="8.1.3" />
    <PackageReference Include="Hangfire.AspNetCore" Version="1.8.6" />
    <PackageReference Include="Hangfire.MySqlStorage" Version="2.0.3" />

    <!-- Validação -->
    <PackageReference Include="FluentValidation.AspNetCore" Version="11.3.0" />

    <!-- Logs & Monitoramento -->
    <PackageReference Include="Serilog.AspNetCore" Version="8.0.0" />
    <PackageReference Include="Serilog.Sinks.Console" Version="5.0.1" />
    <PackageReference Include="Serilog.Sinks.File" Version="5.0.0" />
    <PackageReference Include="Serilog.Sinks.Elasticsearch" Version="9.0.3" />
    <PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.7.0" />
    <PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.7.0" />
    <PackageReference Include="prometheus-net.AspNetCore" Version="8.2.1" />

    <!-- Utils -->
    <PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="12.0.1" />
    <PackageReference Include="MediatR" Version="12.2.0" />
    <PackageReference Include="DotNetEnv" Version="3.0.0" />
    <PackageReference Include="Polly" Version="8.2.0" />
    <PackageReference Include="MailKit" Version="4.3.0" />

    <!-- Storage -->
    <PackageReference Include="AWSSDK.S3" Version="3.7.300" />

    <!-- PDF & Excel -->
    <PackageReference Include="QuestPDF" Version="2023.12.6" />
    <PackageReference Include="ClosedXML" Version="0.102.1" />
  </ItemGroup>
</Project>`

  const niveis = { basico, avancado, enterprise }
  return niveis[nivel] ?? enterprise
}

export function buildAppSettings(projectName) {
  return JSON.stringify({
    ConnectionStrings: {
      DefaultConnection: `Server=localhost;Database=${projectName.toLowerCase()}_db;User=root;Password=root;`,
      Redis: 'localhost:6379',
      MongoDB: `mongodb://localhost:27017/${projectName.toLowerCase()}_db`
    },
    Jwt: {
      Secret: 'changeme-use-uma-chave-forte-em-producao',
      Issuer: projectName,
      Audience: projectName,
      ExpiresInMinutes: 60
    },
    Hangfire: {
      Dashboard: '/hangfire'
    },
    Serilog: {
      MinimumLevel: { Default: 'Information', Override: { Microsoft: 'Warning' } }
    },
    Logging: {
      LogLevel: { Default: 'Information', 'Microsoft.AspNetCore': 'Warning' }
    },
    AllowedHosts: '*'
  }, null, 2)
}