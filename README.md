# Application Template

## Apps and Packages

- `api`: a [NestJS](https://nestjs.com/) backend application
- `web`: a [vite](https://vitejs.dev) ts frontend application
- `docs`: another [vite](https://vitejs.dev) ts frontend application
- `@repo/ui`: a stub component & utility library shared by both `web` and `docs` applications
- `@repo/eslint-config`: shared `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

## Project history

### Start

```bash
mkdir app-template
cd app-template

# Created with `Turborepo` Vite starter
npm i turbo --global
npx create-turbo@latest --example with-vite
? Where would you like to create your Turborepo? .

# Create a GitHub repository app-template, then
git remote add origin git@github.com:serhii-untilov/app-template.git
git branch -M master
git push -u origin master

# Create a backend NestJS application
npm i -g @nestjs/cli@latest
nest new api --directory apps/api
rm -rf apps/api/.git

# To serve Frontend from Backend in Production mode
npm i --workspace api --save @nestjs/serve-static
```

## Init DBMS

```bash
npm i --workspace api --save-dev prisma
npx prisma
npx prisma init --datasource-provider postgresql
# configure docker compose for postgres container and run it
# add model User into prisma/schema.prisma file, and then:
npx prisma migrate dev
```

## Common packages

``` bash
npm i @openapitools/openapi-generator-cli -D
npm i --workspace @repo/openapi --save-dev eslint-plugin-no-loops@latest
```

## Backend

```bash
npx --workspace api nest g module prisma
npx --workspace api nest g service prisma
npx --workspace api nest g module prisma apps/auth/src
npx --workspace api nest g service prisma apps/auth/src
npm i --workspace api --save @nestjs/swagger swagger-ui-express
npm i --workspace api --save @nestjs/config
npm i --workspace api --save helmet
npx --workspace api nest g resource users resources
npm i --workspace api --save @repo/prisma-client
npm i --workspace api --save class-transformer reflect-metadata
npm i --workspace api --save @repo/shared
npm i --workspace api --save jest-mock-extended
npm i --workspace api --save class-validator class-transformer
npm i --workspace api --save nestjs-prisma
```

## Frontend

```bash


```

## References

- [**Web apps development methodology** - The Twelve-Factor App](https://12factor.net)
- [**Turborepo** - Add Turborepo to your existing monorepo](https://turbo.build/repo/docs/getting-started/existing-monorepo)
- [**TypeScript** - Static type checking](https://www.typescriptlang.org/)
- [**ESLint** - Code linting](https://eslint.org/)
- [**Prettier** - code formatting](https://prettier.io)
- [**Commits** - Conventional Commits](https://www.conventionalcommits.org)
- [**Prisma** - Prisma Docs](https://www.prisma.io/docs/orm/prisma-migrate)
- [**Prisma** - Building a REST API with NestJS, Prisma, Postgres, Swagger](https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0)
- [**Prisma** - Building a REST API with NestJS and Prisma: Input Validation & Transformation](https://www.prisma.io/blog/nestjs-prisma-validation-7D056s1kOla1)
- [**Prisma** - Building a REST API with NestJS and Prisma: Error Handling](https://www.prisma.io/blog/nestjs-prisma-error-handling-7D056s1kOop2)
- [**Prisma** - https://www.prisma.io/blog/nestjs-prisma-relational-data-7D056s1kOabc](https://www.prisma.io/blog/nestjs-prisma-relational-data-7D056s1kOabc)
- [**Prisma** - Building a REST API with NestJS and Prisma: Authentication](https://www.prisma.io/blog/nestjs-prisma-authentication-7D056s1s0k3l)
- [**Prisma** - How to do Prisma soft delete with NestJS](https://stackoverflow.com/questions/73189707/how-to-do-prisma-soft-delete-with-nestjs)
- [**Prisma** - Implementing Soft Delete in Prisma using Client Extensions: A Step-by-Step Guide for Nestjs](https://medium.com/@erciliomarquesmanhica/implementing-soft-delete-in-prisma-using-client-extensions-a-step-by-step-guide-for-nestjs-51a9d0716831)
- [**NestJS** - Custom pipes](https://docs.nestjs.com/pipes#custom-pipes)
- [**NestJS** - Combine a NestJS app with React](https://youtu.be/nY0R7pslbCI?si=Lunb95j6enSY8GXE)
- [**Vite** - Server Proxy](https://vitejs.dev/config/server-options#server-proxy)
- [**NestJS** - Serve Static](https://docs.nestjs.com/recipes/serve-static)
- [**Linter** - How to use ESLint with TypeScript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)
- [**Prettier** - How to use Prettier with ESLint and TypeScript in VSCode](https://khalilstemmler.com/blogs/tooling/prettier/)
- [**JWT** - The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750)
- [**NestJS** - NestJS JWT Authentication with Refresh Tokens Complete Guide](https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token)
- [**NestJS** - How to implement refresh tokens JWT in NestJS](https://webera.blog/how-to-implement-refresh-tokens-jwt-in-nestjs-b8093c5642a9)
- [**React** - React Query and Axios (Typescript) example with Rest API](https://www.bezkoder.com/react-query-axios-typescript/)
- [**Icons** - Google Fonts - Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons)
- [**React** - Define React Routes With Better Approach (TypeScript)](https://medium.com/@ahsan-ali-mansoor/define-react-routes-with-better-approach-typescript-d07de782b517)
- [**React** - Rules of Hooks](https://legacy.reactjs.org/docs/hooks-rules.html)
- [**React** - React Typescript Authentication example with Hooks](https://www.bezkoder.com/react-typescript-authentication-example/)
- [**React** - Practical React Query](https://tkdodo.eu/blog/practical-react-query)
- [**React** - React Query and Forms](https://tkdodo.eu/blog/react-query-and-forms)
- [**React** - React Hook Form](https://react-hook-form.com/)
- [**React** - React Snackbars](https://notistack.com/)
- [**React** - Comparing the top React toast (snackbars) libraries](https://blog.logrocket.com/react-toast-libraries-compared/#tldr-final-verdict)
- [**React** - React Data Grid](https://adazzle.github.io/react-data-grid/#/common-features)
- [**i18n** - How to use i18n in your React App](https://medium.com/@devpedrodias/how-to-use-i18n-in-your-react-app-1f26deb2a3d8)
- [**Postgres** - Working with Money in Postgres](https://www.crunchydata.com/blog/working-with-money-in-postgres)
- [**React** - React TypeScript Cheat Sheets](https://react-typescript-cheatsheet.netlify.app/)
- [**NestJS** - Advanced Testing Strategies with Mocks NestJS - @golevelup/ts-jest](https://trilon.io/blog/advanced-testing-strategies-with-mocks-in-nestjs)
- [**NestJS** - Inject NestJS Service from Another Module](https://tiloid.com/p/inject-nestjs-service-from-another-module)
- [**Mocking** - Mocking Express Request with Jest and Typescript using correct types](https://stackoverflow.com/questions/57964299/mocking-express-request-with-jest-and-typescript-using-correct-types)
- [**SSE** - NestJS: A Request Progress Tracker Using SSE](https://medium.com/@leonardoacrg.dev/nestjs-a-request-progress-tracker-using-sse-b9f2fded9d70)
- [**SSE** - Backend to Frontend communication with Server-Sent Events](https://dev.to/cloudx/backend-to-frontend-communication-with-server-sent-events-56kf)
- [**SSE** - NestJS - Server-Sent Events](https://docs.nestjs.com/techniques/server-sent-events)
- [**SSE** - NestJS - Server-Sent Events](https://docs.nestjs.com/techniques/server-sent-events)
- [**SSE** - NestJS - How to Push Server-Sent Events (SSE) in NestJS](https://www.slingacademy.com/article/how-to-push-server-sent-events-sse-in-nestjs/)
- [**NestJS** - Sling Academy - NestJS Course](https://www.slingacademy.com/cat/node-js/)
- [**Typescript** - 4 Different Ways Of Creating A Map In TypeScript](https://timmousk.com/blog/typescript-map/)
- [**Release** - Release Please](https://github.com/googleapis/release-please)
- [**Docker** - postgres:15.0-alpine](https://hub.docker.com/layers/library/postgres/15.0-alpine/images/sha256-f46b2ae1a00a87552a52fe83d36f7aef60ef61f9d64baf3bfc4abaa89847024b?context=explore#!)
- [**VPS** - Initial Server Setup with Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04)
- [**VPS** - Disabling Password Authentication on Your Server](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-20-04)
- [**VPS** - How To Install and Use Docker on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
- [**Redux** - Getting Started with React Redux](https://react-redux.js.org/introduction/getting-started)
- [**Backup** - Docker Postgres Backup/Restore Guide (with examples)](https://simplebackups.com/blog/docker-postgres-backup-restore-guide-with-examples/#before-you-begin)
- [**React Hook Form** - Combined Add/Edit (Create/Update) Form Example](https://jasonwatmore.com/post/2020/10/14/react-hook-form-combined-add-edit-create-update-form-example)
- [**ESLint** - ESLint no-unused-vars: \_ ignore prefix](https://johnnyreilly.com/typescript-eslint-no-unused-vars)
- [**TypeScript** - How to Remove a Property from an Object in TypeScript](https://bobbyhadz.com/blog/typescript-object-remove-property)
- [**Yup** - Schema builder for runtime value parsing and validation](https://yup-docs.vercel.app/docs/intro)
- [**React** - Path To A Clean(er) React Architecture](https://profy.dev/article/react-architecture-api-client)
- [**Shared DTO** - Domain Entities & DTOs](https://profy.dev/article/react-architecture-domain-entities-and-dtos)
- [**Shared DTO** - A Guide to OpenAPI Code Generation for TypeScript](https://www.stefanwille.com/2021/05/2021-05-30-openapi-code-generator-for-typescript)
- [**Jest** - Jest with TypeScript and aliased imports (custom paths)](https://dev.to/mliakos/jest-with-typescript-and-aliased-imports-custom-paths-40d4)
- [**NestJS** - Best Way to Structure Your Directory/Code](https://medium.com/the-crowdlinker-chronicle/best-way-to-structure-your-directory-code-nestjs-a06c7a641401)
- [**React Query** - The Official React Query Course](https://query.gg/?s=dom)
- [**React Query** - Mastering Mutations in React Query](https://tkdodo.eu/blog/mastering-mutations-in-react-query)
