# stage 1: build
FROM node:22 AS build

WORKDIR /apps/replies

COPY package*.json ./

RUN npm install

COPY . .

# stage 2: production
RUN npm run build

FROM node:22.6.0-alpine3.19

WORKDIR /apps/replies

COPY --from=build /apps/replies/dist ./

COPY ./.env ./.env

COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 8040

# start
CMD ["npm", "run", "start"]