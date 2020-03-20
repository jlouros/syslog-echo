FROM stefanscherer/node-windows:10.16-nanoserver-2016 AS base
ENV NODE_ENV production
WORKDIR /src/app
EXPOSE 514/udp

FROM stefanscherer/node-windows:10.16-nanoserver-2016 AS build
WORKDIR /src/bld
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent
COPY . .
RUN npm run build

FROM base AS final
WORKDIR /src/app
COPY --from=build /src/bld/lib/src .
ENTRYPOINT ["node", "index.js"]
