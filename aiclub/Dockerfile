# ---------- 1. Build stage ----------
FROM node:22-bullseye AS build

WORKDIR /app

# Install all deps (including dev) for Tailwind & build tools
COPY package*.json ./
RUN npm ci

# Copy Prisma and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy app source and build
COPY . .
RUN npm run build


# ---------- 2. Runtime stage ----------
FROM node:22-bullseye AS runner
WORKDIR /app

# Copy built app & Prisma schema
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma

# Install only production deps
RUN npm ci --omit=dev

# Environment
ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "run", "start"]
