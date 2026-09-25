# Brev.ly

Encurtador de URLs full-stack, desenvolvido como avaliação da disciplina **Fundamentos Técnicos e Estratégicos** da Faculdade de Tecnologia Rocketseat.

Permite cadastrar, listar e remover links encurtados, redirecionar corretamente para a URL original e gerar um relatório (CSV) dos links criados.

## Estrutura

Monorepo com dois submódulos git:

| Projeto | Descrição | Stack |
|---|---|---|
| [brevly-server](https://github.com/devchinninto/brevly-server) | API REST | Fastify, Drizzle ORM, PostgreSQL, Zod, S3 (Cloudflare R2) |
| [brevly-web](https://github.com/devchinninto/brevly-web) | Interface web | React, Vite, TailwindCSS, Zustand, React Hook Form |

## Como rodar

Clone o repositório com os submódulos:

```bash
git clone --recurse-submodules <url-do-repo>
```

Depois siga o README de cada projeto:

1. **[brevly-server](brevly-server/README.md)** — sobe o banco via Docker, roda as migrations e inicia a API em `http://localhost:3333`.
2. **[brevly-web](brevly-web/README.md)** — inicia o front-end em `http://localhost:5173`, consumindo a API.

## Funcionalidades

- Criar link encurtado com URL customizada
- Listar todos os links cadastrados
- Deletar link
- Redirecionar do link encurtado para a URL original
- Contabilizar acessos por link
- Exportar relatório de links em CSV
