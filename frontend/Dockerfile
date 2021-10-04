# Current version Node: 16
FROM node:latest

WORKDIR /usr/src/app/

COPY ./angular/package*.json ./

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
#RUN npm install bootstrap@3.3.7 --save

#COPY ./angular/ ./src
COPY ./angular/ /usr/src/app