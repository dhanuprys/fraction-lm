# Fraction Learning Module - Backend

This is the backend service for the LLM Fraction Learning Module. It is built with **[Bun](https://bun.sh/)**, **[Hono](https://hono.dev/)**, and **[Prisma 8](https://www.prisma.io/)**. The backend handles user authentication, data persistence, and AI integration for both the student-facing platform and the admin dashboard.

## Deployment with Podman

This project is fully containerized and configured for production deployment using `podman` and `podman-compose` (or `podman compose`).

### Prerequisites
- [Podman](https://podman.io/) installed
- [Podman Compose](https://github.com/containers/podman-compose) installed

### Environment Setup
Create a `.env` file in the `backend/` directory with your production credentials. 

```env
# PostgreSQL Connection String (matches the podman-compose config)
DATABASE_URL="postgresql://fraction_user:fraction_password@db:5432/fraction_db?schema=public"

# Secret key for JWT signing (must be secure for production!)
JWT_SECRET="your_super_secret_jwt_key_here"

# The port exposed inside the container
PORT=20220

# AI Provider Key
DEEPSEEK_API_KEY="your_deepseek_api_key_here"

# Strict CORS restriction for production
FRONTEND_URL="https://your-frontend-domain.com"
```

### Running the Services

Start the backend application and the PostgreSQL database in detached mode:
```bash
podman compose up -d
```

### Database Migration & Initial Setup

Since this project uses Prisma 8 (`contract.prisma`), the database schema must be pushed, and initial seeding must be performed by executing commands inside the running container.

**1. Sync the Database Schema**
```bash
podman compose exec backend bunx prisma db update --schema=src/prisma/contract.prisma
```

**2. Seed Initial Data** (Recommended for fresh deployments)
```bash
podman compose exec backend bun run seed
```

**3. Create the Initial Admin User**
```bash
# Usage: <username> <password> <name>
podman compose exec backend bun run create-admin "admin" "securepassword" "Administrator"
```

### Managing the Container

- **View Logs:** 
  ```bash
  podman compose logs -f backend
  ```
- **Stop Services:** 
  ```bash
  podman compose down
  ```
  *(Note: Your database data and uploaded files are safely stored in named Podman volumes `postgres_data` and `backend_uploads` and will persist across restarts.)*

## Local Development (Without Podman)

If you wish to run the backend natively for development:

1. Install dependencies:
   ```bash
   bun install
   ```
2. Generate the Prisma contract:
   ```bash
   bun run contract:emit
   ```
3. Start the development server:
   ```bash
   bun run dev
   ```
