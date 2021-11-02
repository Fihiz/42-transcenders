FROM node:latest

WORKDIR /usr/src/app/

COPY ./angular/package*.json ./

RUN npm update -g
RUN npm install -g @angular/cli

# added 02.10.21 after node.js 17 version
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY ./angular/ ./
