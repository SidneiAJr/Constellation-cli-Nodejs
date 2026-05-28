export function tsconfigTemplate() {
  return {
    compilerOptions: {
      target: "ES2020",
      module: "ESNext",
      moduleResolution: "node",
      outDir: "./dist",
      rootDir: "./app",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true
    },
    include: ["app/**/*"],
    exclude: ["node_modules", "dist"]
  }
}