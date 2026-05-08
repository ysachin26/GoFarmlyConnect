# ---- Base ----
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# ---- Builder ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars needed by Next.js at build time
# These are NOT secrets — they allow the build to succeed.
# Real values are injected at runtime via docker-compose.
ENV MONGODB_URI="mongodb+srv://placeholder:placeholder@placeholder.mongodb.net/placeholder"
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---- Runner (Production) ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Prerender cache permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone output (smallest possible image)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# server.js is created by `next build` with output: 'standalone'
CMD ["node", "server.js"]
