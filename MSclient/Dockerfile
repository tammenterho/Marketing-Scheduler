# Vaihe 1: Käytä Node.js -pohjaista kuvaa Angular-kääntämiseen
FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Vaihe 2: Luo pienempi kuvatiedosto
FROM nginx:alpine
COPY --from=build /app/dist/mmfront /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
