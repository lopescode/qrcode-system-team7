# QR Code System Team7 - Cardápio Online

## Tech Stack

- [Nest.js](https://nestjs.com/)
- [Next.js](https://nextjs.org/)
- [React.js](https://react.dev/)
- [Tailwind](https://tailwindcss.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GitHub Issues](https://docs.github.com/en/issues)
- [GitHub Projects](https://docs.github.com/en/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)

  
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development mode
$ npm run dev:web
$ npm run dev:server

# production mode
$ npm run prod:server
```

## Running the app with Docker

```bash
# development mode
$ docker-compose up

# production mode
$ docker-compose -f docker-compose.prod.yml up
```

## Running migrations

```bash
# development mode
$ npm run migrate:dev

# production mode
$ npm run migrate:prod
```