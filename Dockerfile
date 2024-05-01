FROM node:20 AS build

COPY . /app

WORKDIR /app
RUN yarn install && yarn run build

FROM node:21-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/src ./src
COPY --from=build /app/package.json ./

RUN yarn install --production && yarn cache clean

EXPOSE 3030
CMD yarn run start