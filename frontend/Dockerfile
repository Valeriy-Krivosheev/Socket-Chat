# Используем официальный образ Node.js
FROM node:16 as build-stage

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

# Используем легковесный образ Nginx для запуска статики
FROM nginx:alpine as production-stage

# Копируем собранные файлы из предыдущего этапа
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]