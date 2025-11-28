# Etapa 1: Build da aplicação Angular
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install

COPY . .
RUN ng build --configuration production

# Etapa 2: Servir com nginx
FROM nginx:alpine
COPY --from=builder /app/dist/streamwise-frontend /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
