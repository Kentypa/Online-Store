# Kent Clicker

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) to install all dependencies.

### Clone repository

```bash
git clone https://github.com/Kentypa/KentClicker
cd KentClicker
```

### Install Frontend Dependencies

```bash
cd apps/frontend
yarn install
```

### Install Backend Dependencies

```bash
cd .../backend
yarn install
```

### Docker

Install [docker](https://www.docker.com/products/docker-desktop/) into system

## Startup

To run project write from main directory

```bash
docker-compose up
```

To close project write from main directory

```bash
docker-compose down
```

## Project Structure

```bash
KentClicker/
├── apps/
│   ├── frontend/   # React
│   └── backend/    # NestJS
├── docker-compose.yml
└── README.md
```

## Usage

### After run docker-compose(with default .env parameters):

- frontend can be open at [http://localhost:5173](http://localhost:5173)
- backend can be open at [http://localhost:3000](http://localhost:3000)
- api documentaion can be open at [http://localhost:3000/api](http://localhost:3000/api)
- adminer can be open at [http://localhost:8081](http://localhost:8081)

## Stack technology

### Backend:

- [NestJS](https://nestjs.com/) — A progressive Node.js framework for building scalable and modular server applications.
- [Passport-JWT](https://www.passportjs.org/packages/passport-jwt/) — Authentication Middleware.
- [TypeORM](https://typeorm.io/) — ORM for work with databases.
- [Bcrypt](https://www.npmjs.com/package/bcrypt) — Data hashing library.
- [Class-validator](https://github.com/typestack/class-validator) — Validation DTO.
- [Class-transformer](https://github.com/typestack/class-transformer) — Transforming DTO.
- [Multer](https://www.npmjs.com/package/multer) — Middleware for handling file uploads.
- [Swagger](https://swagger.io/) — API documentation generation.
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser) — For work with cookies.
- [Jest](https://jestjs.io/) — Unit and e2e testing.

### Frontend:

- [React](https://react.dev/) — Declarative UI library for building interactive user interfaces.
- [React Router](https://reactrouter.com/) — Client-side routing solution.
- [Redux Toolkit](https://redux-toolkit.js.org/) — Standard approach for efficient Redux development.
- [React Redux](https://react-redux.js.org/) — Official React bindings for Redux.
- [TanStack Query (React Query) ](https://tanstack.com/query/latest) — Powerful data-fetching and caching solution.
- [Axios](https://axios-http.com) — Promise-based HTTP client for APIs.
- [D3.js](https://d3js.org/) — JavaScript library for producing dynamic, interactive data visualizations.
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework for rapid UI development.

### Database:

- [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database

### Adminer:

- [Adminer](https://www.adminer.org/en/) - GUI Database managment
