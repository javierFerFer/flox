# Etapa de construcción
FROM node:alpine AS build

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:prod

# Etapa de producción con NGINX
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cambia 'my-app' por el nombre real del proyecto si es diferente
COPY --from=build /usr/src/app/dist/flox/ /usr/share/nginx/html/apps/flox/