FROM oven/bun:1.3 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build
RUN mkdir -p public && cp -r dist/client/* public/

FROM oven/bun:1.3-slim

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Use ABSOLUTE paths for srvx
CMD ["sh", "-c", "srvx --prod /app/public /app/dist/server/server.js"]
