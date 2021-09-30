# Current version Node: 16
FROM node:latest

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY ./angular/package*.json ./
RUN npm install
#RUN npm update
RUN npm install -g @angular/cli
RUN npm install bootstrap@3.3.7 --save

COPY ./angular/ ./
#COPY . .
