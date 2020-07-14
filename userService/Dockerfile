FROM node:14.4.0

RUN apt-get update && apt-get install -y \
       nano

RUN mkdir -p /app

COPY . /var/www/backend
WORKDIR /var/www/backend

EXPOSE 5000

CMD npm install && npm run start:dev
