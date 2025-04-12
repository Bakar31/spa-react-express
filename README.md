# Full-Stack React Express SPA Template

This is a comprehensive full-stack template with React frontend and Express backend using modern technologies and a scalable architecture.

## Project Structure

```
├── README.md
├── .gitignore
├── docker-compose.yml
├── package.json
├── client/                     # Frontend React application
│   ├── .eslintrc.json
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── public/
│   └── src/
│       ├── main.tsx           # Entry point
│       ├── App.tsx            # Main App component
│       ├── env.ts             # Environment variables validation
│       ├── vite-env.d.ts      # Vite type declarations
│       ├── assets/            # Static assets
│       ├── components/        # Reusable UI components
│       │   ├── ui/            # Shadcn UI components
│       │   └── common/        # Common components
│       ├── config/            # Configuration files
│       ├── contexts/          # React contexts
│       ├── features/          # Feature-based components
│       │   ├── auth/
│       │   │   ├── components/
│       │   │   ├── hooks/
│       │   │   ├── types/
│       │   │   └── utils/
│       │   └── blog/
│       │       ├── components/
│       │       ├── hooks/
│       │       ├── types/
│       │       └── utils/
│       ├── hooks/             # Custom hooks
│       ├── layouts/           # Layout components
│       ├── lib/               # Utility libraries
│       ├── pages/             # Page components
│       ├── routes/            # Route definitions
│       ├── services/          # API service layer
│       ├── store/             # State management
│       ├── types/             # TypeScript type definitions
│       └── utils/             # Utility functions
├── server/                    # Backend Express application
│   ├── .eslintrc.json
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/               # Prisma ORM files
│   │   ├── schema.prisma    
│   │   └── migrations/
│   └── src/
│       ├── index.ts          # Entry point
│       ├── app.ts            # Express app setup
│       ├── config/           # Configuration files
│       │   ├── env.ts
│       │   └── database.ts
│       ├── features/         # Feature-based modules
│       │   ├── auth/
│       │   │   ├── auth.controller.ts
│       │   │   ├── auth.routes.ts
│       │   │   ├── auth.service.ts
│       │   │   ├── auth.validator.ts
│       │   │   └── auth.types.ts
│       │   └── blog/
│       │       ├── blog.controller.ts
│       │       ├── blog.routes.ts
│       │       ├── blog.service.ts
│       │       ├── blog.validator.ts
│       │       └── blog.types.ts
│       ├── middlewares/      # Custom middlewares
│       ├── types/            # TypeScript type definitions
│       └── utils/            # Utility functions
└── tests/                    # End-to-end tests
    ├── auth.test.ts
    └── blog.test.ts
```

## Technology Stack

### Frontend
- React (with TypeScript)
- Vite for fast development
- Shadcn UI for components
- React Hook Form with Zod validation
- TanStack Query for API data fetching
- Axios for HTTP requests

### Backend
- Express.js with TypeScript
- Prisma ORM
- PostgreSQL database
- JWT authentication
- Feature-based architecture

### DevOps
- Docker and Docker Compose
- ESLint for code quality

### Testing
- Vitest for e2e testing