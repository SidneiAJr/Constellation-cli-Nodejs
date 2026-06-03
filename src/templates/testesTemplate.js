// templates/teste.js

export const teste = [
  "✅ CLI carregou",
  "✅ Menu principal abriu",
  "✅ Gerou projeto JS com MVC",
  "✅ Gerou projeto TS com Clean",
  "✅ Gerou Java com DDD",
  "✅ Gerou PHP com Hexagonal",
  "✅ Gerou C# com MVC",
  "✅ Criou frontend opcional",
  "✅ Gerou .gitignore globalzão",
  "✅ Gerou .env vazio",
  "✅ Gerou init.sql",
  "✅ Docker compose gerou",
  "✅ NPM install rodou sem erro",
  "✅ Servidor subiu na porta certa",
  "✅ API respondeu 200",
  "",
  "📊 RESULTADO:",
  "🚀 TUDO FUNCIONANDO",
  "💀 SÓ SUCESSO",
  "",
  "Frase do dia:",
  '"Preguiça? Chamo de eficiência." - OS Guri Brabo, 2026'
]

// templates/jestTemplate.js (já existente, mas vou deixar padrão)

export const jestConfig = `module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: ['app/**/*.js', '!app/config/**'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
}
`

// teste simples pro Jest
export const jestSimpleTest = `// __tests__/example.test.js
describe('Teste simples', () => {
  test('soma de 1 + 1 deve ser 2', () => {
    expect(1 + 1).toBe(2)
  })

  test('deve ser verdadeiro', () => {
    expect(true).toBe(true)
  })
})
`

// templates/javaTestTemplate.js (NOVO)

export const javaSimpleTest = `// src/test/java/com/constellation/app/SimpleTest.java
package com.constellation.app;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class SimpleTest {

    @Test
    void somaDeveFuncionar() {
        int resultado = 1 + 1;
        assertEquals(2, resultado);
    }

    @Test
    void verdadeiroDeveSerTrue() {
        assertTrue(true);
    }
}
`