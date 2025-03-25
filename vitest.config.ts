import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.spec.ts'],  // Aquí especificamos tus archivos de       prueba .spec.ts
    coverage: {
      provider: 'v8',  // Usar el recolector de cobertura V8
      reporter: ['text', 'html', 'lcov', 'cobertura'],  // Agregar 'lcov' y       'cobertura'
      include: ['src/**/*.ts', 'src/*.ts'],  
      exclude: ['**/*.spec.ts'],  
    },
  },
})
