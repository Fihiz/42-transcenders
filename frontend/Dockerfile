# Current version Node: 16
FROM node:latest

WORKDIR /usr/src/app/

COPY ./angular/package*.json ./

RUN npm update -g
RUN npm install -g @angular/cli

# Added 02.10.21 to deal with node.js 17 version
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY ./angular/ ./
