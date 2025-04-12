# Server - Express Backend

This directory contains the Express.js backend for the React Express SPA Template. It features a modular, feature-based architecture using TypeScript.

## Prerequisites

*   Node.js (v20 or later recommended)
*   npm (comes with Node.js) or yarn

## Setup

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the server directory:**
    ```bash
    cd server
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
4.  **Set up environment variables:**
    *   Copy the example environment file:
        ```bash
        cp .env.example .env
        ```
    *   Open the `.env` file and fill in the required values (e.g., `DATABASE_URL`, `JWT_SECRET`, Google OAuth credentials if needed).
5.  **Set up the database:**
    *   Ensure your database server (e.g., PostgreSQL) is running.
    *   Run the database migrations:
        ```bash
        npx prisma migrate dev
        ```
    *   (Optional) Generate the Prisma client:
        ```bash
        npx prisma generate
        ```
    *   (Optional) Open Prisma Studio to view/manage data:
        ```bash
        npx prisma studio
        ```

## Running the Server

*   **Development Mode (with hot-reloading):**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The server will typically start on `http://localhost:8000`.

*   **Production Mode:**
    ```bash
    # 1. Build the TypeScript code
    npm run build
    # or
    yarn build

    # 2. Start the server
    npm start
    # or
    yarn start
    ```

## Available Scripts

*   `npm run dev`: Starts the server in development mode using `ts-node-dev`.
*   `npm run build`: Compiles TypeScript code to JavaScript in the `dist` directory.
*   `npm start`: Starts the compiled server from the `dist` directory.
*   `npm run lint`: Lints the codebase using ESLint.
*   `npm run prisma:generate`: Generates the Prisma client based on `schema.prisma`.
*   `npm run prisma:migrate`: Applies database migrations.
*   `npm run prisma:studio`: Opens Prisma Studio.

## API Endpoints

The server exposes the following base routes:

*   `GET /`: Welcome message.
*   `GET /health`: Health check endpoint. Returns server status and timestamp.
*   `/api/auth`: Authentication related endpoints (login, register, etc.).
*   `/api/blog`: Blog post related endpoints.

*(Refer to the specific route files within `src/features/*` for detailed endpoint definitions)*

**Example Request (using curl):**

To check the health endpoint:

```bash
curl http://localhost:8000/health
```

Expected Response:

```json
{
  "status": "ok",
  "timestamp": "2024-10-27T10:30:00.123Z" 
}
```
*(Timestamp will reflect the current time)*

## Tech Stack

*   **Framework:** Express.js
*   **Language:** TypeScript
*   **ORM:** Prisma
*   **Authentication:** Passport.js (JWT, Google OAuth 2.0)
*   **Validation:** Zod
*   **Database:** PostgreSQL (configured via Prisma, adaptable to others)
*   **Middleware:** Helmet, CORS, Compression, Morgan, Express Rate Limit

## Folder Structure

```
server/
├── dist/             # Compiled JavaScript output (after build)
├── infra/            # Infrastructure files (e.g., Dockerfile)
├── prisma/           # Prisma schema, migrations, and generated client
│   └── schema.prisma # Database schema definition
├── src/              # Source code
│   ├── config/       # Configuration files (database, passport, env)
│   ├── features/     # Feature modules (e.g., auth, blog)
│   │   └── [feature]/ # Contains controller, service, routes, types, validator
│   ├── middlewares/  # Custom Express middleware
│   ├── app.ts        # Express application setup
│   └── index.ts      # Server entry point
├── .env              # Environment variables (ignored by git)
├── .env.example      # Example environment variables
├── .eslintrc.json    # ESLint configuration
├── package.json      # Project metadata and dependencies
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
```

## Code Conventions & Feature Structure

This project follows a feature-based architecture to promote modularity and separation of concerns. Each primary feature (e.g., authentication, blog posts) resides in its own directory within `src/features/`.

Key conventions include:

*   **File Naming:** Files within a feature module follow the pattern `[feature].[role].ts` (e.g., `auth.controller.ts`, `blog.service.ts`).
*   **Separation of Concerns:**
    *   **`*.controller.ts`:** Handles incoming HTTP requests, validates input (often via middleware), calls the appropriate service method, and formats the HTTP response. Uses static methods within a class.
    *   **`*.service.ts`:** Contains the core business logic for the feature, interacts with the database (Prisma), and performs data transformations. Uses static methods within a class.
    *   **`*.routes.ts`:** Defines the API endpoints for the feature using an Express Router. Connects routes to controller methods and applies necessary middleware (authentication, validation).
    *   **`*.validator.ts`:** Exports middleware functions that use Zod schemas (from `*.types.ts`) to validate request bodies or parameters.
    *   **`*.types.ts`:** Defines TypeScript interfaces and Zod schemas specific to the feature.
*   **Error Handling:** Controllers use `try/catch` blocks to catch errors from services or validation and pass them to the global error handler middleware using `next(error)`. Services throw custom errors, often attaching a `statusCode`.
*   **Validation:** Input validation is performed using Zod schemas, typically applied as middleware in the routes file.
*   **Asynchronous Operations:** `async/await` is used consistently for handling promises, especially during database interactions.
