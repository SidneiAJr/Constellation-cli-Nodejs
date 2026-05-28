export function csprojEnterpriseTemplate(projectName) {
  return `<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <!-- Web -->
    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.0" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
    
    <!-- ORM -->
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />
    <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="8.0.0" />
    
    <!-- Cache -->
    <PackageReference Include="Microsoft.Extensions.Caching.StackExchangeRedis" Version="8.0.0" />
    
    <!-- Mensageria -->
    <PackageReference Include="MassTransit.RabbitMQ" Version="8.1.3" />
    <PackageReference Include="Confluent.Kafka" Version="2.3.0" />
    
    <!-- Cloud -->
    <PackageReference Include="AWSSDK.S3" Version="3.7.300" />
    <PackageReference Include="Azure.Storage.Blobs" Version="12.19.0" />
    
    <!-- Monitoramento -->
    <PackageReference Include="OpenTelemetry.Exporter.Prometheus.AspNetCore" Version="1.7.0" />
    <PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.7.0" />
    
    <!-- Testes -->
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.8.0" />
    <PackageReference Include="xunit" Version="2.6.2" />
    <PackageReference Include="Testcontainers" Version="3.8.0" />
    <PackageReference Include="Testcontainers.MySql" Version="3.8.0" />
  </ItemGroup>
</Project>`
}