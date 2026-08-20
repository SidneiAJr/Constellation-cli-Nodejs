// templates/tsconfigTemplate.js

export function tsconfigTemplate() {
  return {
    compilerOptions: {
      target: "ES2020",
      module: "CommonJS",
      moduleResolution: "node",
      outDir: "./dist",
      rootDir: "./src",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      forceConsistentCasingInFileNames: true
    },
    include: ["src/**/*"],
    exclude: ["node_modules", "dist"]
  }
}