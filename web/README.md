# Brev.ly - Web

Encurtador de URLs. Projeto desenvolvido para a Faculdade de Tecnologia Rocketseat.

## Como rodar

Crie um arquivo `.env` na raiz com as variáveis:

```bash
VITE_FRONTEND_URL='http://localhost:5173'
VITE_BACKEND_URL='http://localhost:3333'
```

```bash
pnpm install
pnpm dev
```

Isso inicia o servidor de desenvolvimento com hot reload em `http://localhost:5173`.

## Build

```bash
pnpm build
pnpm preview
```

## Lint e formatação

```bash
pnpm lint:eslint:check
pnpm lint:prettier:check
```
