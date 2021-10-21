# Current version Node: 16
FROM node:latest

WORKDIR /usr/src/app/

COPY ./angular/package*.json ./

RUN npm update -g
RUN npm install -g @angular/cli openssl

COPY ./angular/ ./
