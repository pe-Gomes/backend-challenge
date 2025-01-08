# Classroom Submissions
## Requisitos iniciais:
 - Clone o repositório.
 - Suba os contêineres docker com `docker compose up -d`.
 - Rode o script *install-dependencies.sh* para gerar o arquivo
 de variáveis e instalar as dependências das aplicações.
 - Ou, adicione o arquivo **.env** na pasta `packages/submissions`.
```yml
# Valor padrão conforme docker compose
DATABASE_URL="postgres://docker:docker@localhost:5432/rocketseat_challenge"
```

### Instale as dependências:
```bash

# Em packages/corrections
pnpm install
npm install
yarn install

# Em packages/submissions
pnpm install
npm install
yarn install

```

### Execução:
```bash
# Certifique que os contâineres estão rodando
# Diretório backend-challenge
docker compose up -d

# Rode a aplicação packages/corrections
pnpm start:dev
npm run start:dev
yarn start:dev

# Rode a aplicação packages/submissions
pnpm start:dev
npm run start:dev
yarn start:dev
```

### Testes unitários:
```bash
# Em packages/submissions
pnpm install
npm install
yarn install

# Rode o teste
pnpm test
npm run test
yarn test
```

### Testes de integração (e2e):
```bash
# Certifique que os contâineres estão rodando
# Diretório backend-challenge
docker compose up -d

# Certifique que as dependências estão instaladas

# Em packages/submissions
pnpm install
npm install
yarn install

# Em packages/corrections
pnpm install
npm install
yarn install

# Rode o teste
pnpm test:e2e
npm run test:e2e
yarn test:e2e
```

## Overview

Pacote responsável pela gestão de desafios (`challenges`) e as suas respostas (`answers`) com o framework [NestJS](https://nestjs.com/).

## DDD e Arquitetura Limpa

Adotou-se o **Domain-Driven Design (DDD)** para foco no domínio principal da
aplicação e os principais casos de uso, assim como a separação por repositórios
para abstração para a comunicação entre as camadas de domínio, aplicação e
infraestrutura.

Ainda, aplicou-se a **Clean Architecture** para garantir independência de frameworks,
separação de responsabilidades, manutenibilidade e testabilidade.

### Estrutura de pastas:
``` bash
src
├── core
│   ├── errors
│   ├── repositories
│   ├── types
│   └── value-objects
├── domain
│   ├── classroom
│   │   ├── entities
│   │   ├── repositories
│   │   └── use-cases
│   │       └── errors
│   └── events
│       ├── entities
│       ├── repositories
│       └── use-cases
│           └── errors
├── infra
│   ├── db
│   │   └── prisma
│   │       ├── mappers
│   │       └── repositories
│   ├── env
│   ├── http
│   │   └── graphql
│   │       ├── inputs
│   │       └── resolvers
│   │           ├── answer
│   │           └── challenge
│   └── messaging
│       └── kafka
│           └── repositories
└── utils
```

## Infraestrutura
### PostgreSQL e Prisma ORM:
O banco de dados utilizado é o PostgreSQL em conjunto com o Prisma ORM, tendo em vista
que ele oferece uma interface robusta e acessível para gerenciar a camada de banco de
dados, oferecendo migração de esquema; visualizador; e segurança de tipo.

### GraphQL com Abordagem Code-First:
Optamos por utilizar o GraphQL com a abordagem code-first, o que significa que o esquema GraphQL é gerado dinamicamente a partir do código TypeScript. Isso garante maior flexibilidade e alinhamento com as definições de tipos e lógica do aplicativo.

#### Razões para Escolher a Abordagem Code-First:
- **Integração com TypeScript**: Permite reutilizar os tipos do TypeScript diretamente no esquema GraphQL.
- **Manutenção Simplificada**: Alterações no código refletem automaticamente no esquema, eliminando a necessidade de sincronização manual.
- **Velocidade de Desenvolvimento**: Reduz a sobrecarga de escrever e manter arquivos de esquema separados.

### Kafka:
Considerando que o sistema de correção de desafios é realizado por um microsserviço em Kafka, utilizou-se a o mesmo para o sistema de mensageria e comunicação externa.

# Links úteis:

- [NestJS](https://docs.nestjs.com/)
- [Prisma ORM](https://www.prisma.io/docs/orm)
