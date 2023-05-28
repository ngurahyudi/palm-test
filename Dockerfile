ARG APP_VERSION
ARG DOCKER_REGISTRY
FROM ${DOCKER_REGISTRY}node:18.13.0-alpine3.17 as builder
WORKDIR /build
RUN apk add --no-cache python3 build-base
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --omit=dev

FROM ${DOCKER_REGISTRY}node:18.13.0-alpine3.17 as runner
ARG APP_VERSION
ENV APP_VERSION=${APP_VERSION}
ENV NODE_ENV=production
EXPOSE 3000
ENTRYPOINT ["node", "main.js"]
WORKDIR /app

# set timezone
RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Europe/Berlin /etc/localtime && echo "Europe/Berlin" >  /etc/timezone
RUN apk del tzdata

# copy application
COPY --from=builder /build/dist /app
COPY --from=builder /build/node_modules /app/node_modules
