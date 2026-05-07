# Node Logic Assignment

This repository contains a small Node.js + Prisma example. I inspected the project, fixed several issues, and added this README with run instructions.

What I changed
- Converted the project to ESM (`type: module` in `package.json`).
- Added a shared `prismaClient.js` to avoid multiple PrismaClient instances.
- Fixed `main.js` to call the main function and gracefully disconnect Prisma.
- Rewrote `game.service.js` as an ESM module and corrected logic/syntax errors.
- Updated `schema.prisma` to use PascalCase model names (`User`, `Game`) and added a compound unique constraint for `GameParticipant` (`@@unique([userId, gameId])`).
- Cleaned up the Dockerfile and removed insecure TLS overrides.
- Added `@prisma/client` to `package.json` dependencies and a `start` script.

Quick start

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client (if you change schema):

```bash
npx prisma generate
```

3. Run the app:

```bash
npm start
```

Notes
- If you run in Docker, Dockerfile already runs `npm install` and `npx prisma generate`.
- The schema model names were changed to PascalCase to match typical Prisma conventions; adjust other code if you used different model names elsewhere.

If you want, I can also run `npm install` and `npx prisma generate` here, or help you update Docker Compose. What would you like next?
