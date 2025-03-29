# Honora

Honora is a starter template for building full-stack applications with Hono.

## Tech Stack 🛠️

- [Hono](https://github.com/honojs/hono) - Fast, lightweight, built on Web Standards. Support for any JavaScript runtime.
- [Prisma](https://prisma.io/) - Next-generation Node.js and TypeScript ORM.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.

## Tools 🛠️

- [Bun](https://bun.sh/) - A fast all-in-one JavaScript runtime.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [ESLint](https://eslint.org/) - A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

## Getting Started 🚀

1. Clone the repository:

```bash
git clone https://github.com/anddsdev/honora my-app
cd my-app
bun install
```

2. Create a `.env` file in the root directory or in the `apps/api` `apps/web` directory and add the following environment variables:

```bash
# For the API
DATABASE_URL="" # The URL of the database

ALLOWED_ORIGINS=["http://localhost:3000", "http://localhost:5173"] # The URLs that are allowed to access the API

BETTER_AUTH_URL=http://localhost:3000 # The URL of the API
BETTER_AUTH_SECRET= # The secret key for the API

# For the Web
BETTER_AUTH_URL=http://localhost:3000 # The URL of the API

RESEND_API_KEY= # The API key for the Resend service
```

3. Run the following commands to set up the database:

```bash
bun run db:generate
bun run db:migrate
bun run db:push
```

4. Start development servers:

```bash
bun run dev # Start both the API and the Web server

# or run the following commands separately:
bun run dev:api # Start the API server
bun run dev:client # Start the Web server
```

5. Open the following URLs in your browser:

- http://localhost:3000 - The API server
- http://localhost:5173 - The Web server

# Development 🧑‍💻

This template is configured for an optimal development experience out of the box:

- Hot module replacement (HMR) for both the API and the Web server.
- Type checking for both the API and the Web server.
- Linting for both the API and the Web server.
- Formatting for both the API and the Web server.
- Code splitting for the Web server.
- Automatically generated routes for the API server.

## Contributing 🤝

Contributions are always welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-branch`.
3. Make your changes and commit them: `git commit -m "Add my feature"`.
4. Push to the branch: `git push origin my-branch`.
5. Create a new pull request.

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
