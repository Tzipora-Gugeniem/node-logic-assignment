# Node Logic Assignment
Game Logic Service 
A robust Node.js backend service demonstrating game management logic, database integration with Prisma ORM, and full containerization.

Tech Stack
Runtime: Node.js (ESM)

Database: PostgreSQL

ORM: Prisma

Infrastructure: Docker & Docker Compose

Key Features & Implementation
Scalable Architecture: Implemented a singleton Prisma client pattern to manage database connections efficiently.

Relational Schema: Designed a PostgreSQL schema with complex constraints, including compound unique keys for participants to prevent duplicate entries.

Modern JavaScript: Fully migrated to ES Modules (ESM) for better performance and syntax standards.

Resilient Logic: Robust game service handling registration, status tracking, and error management.

Dockerized Environment: Production-ready Docker configuration, optimized for quick deployment with automated migrations.

Quick Start
1. Environment Setup
Create a .env file based on the provided template:

Code snippet
DATABASE_URL="postgresql://user:password@db:5432/gamedb?schema=public"
2. Run with Docker (Recommended)
Bash
docker-compose up --build
This will automatically install dependencies, run migrations, and start the service.

3. Local Development
Bash
npm install
npx prisma generate
npm start