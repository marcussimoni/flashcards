FROM node:12.16.1-alpine

WORKDIR /app

COPY .[^/node_modules] .

RUN npm install

RUN npm start