FROM node:24-alpine as front-builder

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:24-alpine as front-runner

WORKDIR /app

COPY --from=front-builder /app/.next ./
EXPOSE 3000

ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production

ENTRYPOINT ["next", "start"]