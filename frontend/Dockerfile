# Current version Node: 16
FROM node:latest

WORKDIR /usr/src/app/

COPY ./angular/package*.json ./

RUN npm install -g @angular/cli@latest
RUN npm install bootstrap@3.3.7 --save-dev

COPY ./angular/ /usr/src/app