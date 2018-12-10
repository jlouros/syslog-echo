FROM node:10.14.1-alpine AS base
ENV NODE_ENV production
WORKDIR /usr/src/app
EXPOSE 514/udp

FROM node:10.14.1-alpine AS build
WORKDIR /usr/src/bld
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .
RUN npm run build

FROM base AS final
WORKDIR /usr/src/app
COPY --from=build /usr/src/bld/lib/src .
ENTRYPOINT ["node", "index.js"]
