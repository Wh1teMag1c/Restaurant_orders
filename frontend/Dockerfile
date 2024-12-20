# Шаг 1: Используем Node.js для сборки проекта
FROM node:20 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем исходный код проекта
COPY . .

# Собираем проект
RUN npm run build

# Шаг 2: Используем nginx для запуска собранного проекта
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранные файлы из предыдущего шага в директорию nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
