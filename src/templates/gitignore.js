// templates/gitignore.js

export const gitignoreGlobal = `# ============================================
# GITIGNORE GLOBAL - Constellation CLI
# Cobre todas as linguagens e ferramentas
# ============================================

# ========== DEPENDÊNCIAS ==========
node_modules/
jspm_packages/
bower_components/
vendor/
packages/
*.7z
*.dmg
*.gz
*.iso
*.jar
*.rar
*.tar
*.zip
*.7z
composer.lock
package-lock.json
yarn.lock
pnpm-lock.yaml
Cargo.lock
Gemfile.lock
poetry.lock

# ========== AMBIENTE E CONFIG ==========
.env
.env.local
.env.*.local
.env.production
.env.development
*.log
logs/
*.pid
*.seed
*.pid.lock
.DS_Store
Thumbs.db
desktop.ini
.directory
*.tmp
*.temp
.cache/
*.swp
*.swo
*~
.direnv/
.venv/
venv/
ENV/
env/
.envrc

# ========== IDEs E EDITORES ==========
.vscode/
.idea/
*.sublime-*
.project
.classpath
.settings/
*.code-workspace
*.iml
*.iws
*.ipr
.idea_modules/
*.sw?
.DS_Store
~$*
*.orig

# ========== BUILD E DISTRIBUIÇÃO ==========
dist/
build/
out/
target/
bin/
obj/
Release/
Debug/
*.exe
*.exe~
*.dll
*.so
*.dylib
*.class
*.o
*.a
*.lib
*.pyc
*.pyo
*.pyd
__pycache__/
*.egg-info/
*.egg
*.whl
*.war
*.ear
*.nar
*.zip
*.tar.gz
*.tgz

# ========== TESTES E COBERTURA ==========
coverage/
.nyc_output/
*.test.js
*.spec.js
*.test.ts
*.spec.ts
junit.xml
*.trx
test-results/
.selenium/
.quarantine/

# ========== LOGS E METRICS ==========
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*
report.html
metrics.json
*.metrics

# ========== SEGURANÇA ==========
*.pem
*.key
*.crt
*.p12
*.pfx
*.csr
*.der
secrets/
secrets.*
credentials.*
*.secret
*.enc

# ========== FERRAMENTAS ESPECÍFICAS ==========
# Terraform
*.tfstate
*.tfstate.*
.terraform/

# Kubernetes
*.kubeconfig
helm/values.local.yaml

# Docker
.dockerignore
docker-compose.override.yml

# ESLint / Prettier / Stylelint
.eslintcache
.prettiercache
.stylelintcache

# Next.js
.next/
out/
.nuxt/
.nitro/
.cache/

# ========== LINGUAGEM ESPECÍFICA ==========

## JavaScript / TypeScript
lib-cov/
*.lcov
.yarn/
.yarn-integrity
.pnp.*
serverless/

## Java
*.log
*.ctxt
.mtj.tmp/
*.dex
*.apk
*.ap_
*.dex
build/
gradle-app.setting
!gradle-wrapper.jar
.gradle/
gradle/
gradlew
gradlew.bat

## Python
.pytest_cache/
.mypy_cache/
.dmypy.json
dmypy.json
.pyre/
.pytype/
coverage.xml
*.cover
.hypothesis/
.tox/
noxfile.py
benchmarks/

## PHP
.phpunit.result.cache
phpunit.xml
.php_cs.cache
.phpcs-cache

## C#
*.user
*.userosscache
*.sln.docstates
*.csproj.user
*.suo
*.userprefs
*.usertasks
*.pidb
*.vs/
*.psess
*.vsp
*.vspx
*.sap
*.bin
*.cache
*.ilk
*.log
*.obj
*.pdb
*.sbr
*.tmp
*.tmp_proj
_pipelines/
*.tlog
*.lastbuildstate
*.VC.db
*.VC.opendb
*.opensdf
*.sdf
*.VC.VC.opendb
*.ipdb
*.iobj
*.ncb

## C++
*.pch
*.exe
*.exe.mfresh
*.ilk
*.obj
*.pdb
*.idb
*.pdb
*.map
*.o
*.d
*.gcda
*.gcno
*.gcov

## Ruby
*.gem
*.rbc
/.bundle
/.ruby-version
/.ruby-gemset

## Go
*.exe
*.test
*.out
*.prof
*.test.exe
*.test.out
*.prof
*.cgo*

## Rust
/target/
**/*.rs.bk
*.pdb
*.dSYM
*.rlib

## Swift
*.xccheckout
*.xcuserstate
*.xcuserdatad
*.xcscmblueprint
*.xcworkspace
!default.xcworkspace
xcuserdata/
Build/
DerivedData/
*.moved-aside
*.perspective
*.perspectivev3
*.hmap
*.hmap
*.st-*
*.xccheckout
*.xcuserstate
*.xcuserdatad
*.xcscmblueprint
*.xcworkspace
!default.xcworkspace
*.pbxuser
*.mode1v3
*.mode2v3
*.perspectivev3

## Kotlin
.externalNativeBuild/
.cxx/
*.ktx
*.klib

## Scala
*.class
*.log
*.ctxt
.mtj.tmp/
*.dex
*.apk
*.ap_
*.dex
build/
lib_managed/
src_managed/
project/boot/
project/plugins/project/
.history
.lib/
*.idea/
*.iml
*.iws
*.ipr
.idea_modules/
*.sbt
*.scala
*.class
*.log
*.ctxt
.mtj.tmp/
*.dex
*.apk
*.ap_
*.dex
build/
lib_managed/
src_managed/
project/boot/
project/plugins/project/
.history
.lib/
`

// Versão compacta (se quiser menos linhas)
export const gitignoreCompact = `# Dependências
node_modules/ vendor/ packages/ *.jar composer.lock package-lock.json

# Ambiente
.env .env.* *.log .DS_Store Thumbs.db *.tmp .cache/

# IDE
.vscode/ .idea/ *.iml .project .classpath .settings/

# Build
dist/ build/ target/ bin/ obj/ *.class *.exe *.dll *.so *.pyc __pycache__/

# Testes
coverage/ .nyc_output/ *.test.js *.test.ts

# Segurança
*.pem *.key *.crt secrets/
`

// Função pra mesclar com gitignore existente
export function mergeGitignore(existente = '') {
  return `${existente}\n\n# Adicionado por Constellation CLI\n${gitignoreGlobal}`
}