FROM node:18-alpine AS builder-server
WORKDIR /app
COPY ./server/package.json ./
COPY ./server/yarn.lock ./
RUN yarn
COPY ./server .
RUN npm run build

FROM node:18-alpine AS builder-client
WORKDIR /app
COPY ./client/package.json ./
COPY ./client/yarn.lock ./
RUN yarn
COPY ./client .
RUN npm run build

FROM node:18-alpine AS server
WORKDIR /app
COPY ./server/package.json ./
COPY ./server/yarn.lock ./
RUN yarn  --production
COPY --from=builder-client ./app/build ./public
COPY --from=builder-server ./app/build ./build
EXPOSE 8000
CMD ["npm", "start"]