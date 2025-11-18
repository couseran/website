FROM node:24-alpine as front-builder

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:24-alpine as front-runner

WORKDIR /app

ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production

# 1. Copy the public folder (needed for images/favicon)
COPY --from=front-builder /app/public ./public

# 2. Copy the standalone build (this includes the necessary node_modules)
COPY --from=front-builder /app/.next/standalone ./

# 3. Copy static assets (Next.js needs these in a specific location)
COPY --from=front-builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]