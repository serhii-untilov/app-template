# Application Template

## `Turborepo` Vite starter

```sh
npx create-turbo@latest -e with-vite
```

### Apps and Packages

- `docs`: a vanilla [vite](https://vitejs.dev) ts app
- `web`: another vanilla [vite](https://vitejs.dev) ts app
- `@repo/ui`: a stub component & utility library shared by both `web` and `docs` applications
- `@repo/eslint-config`: shared `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## References

[**Nest** - Building a REST API with NestJS, Prisma, Postgres, Swagger](https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0)
[**Prisma** - Prisma Docs](https://www.prisma.io/docs/orm/prisma-migrate)
