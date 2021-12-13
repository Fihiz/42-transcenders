# Current version Node: 16
FROM node:latest as development

WORKDIR /usr/src/app/

COPY ./nestjs/package*.json ./
RUN npm install --only=development

COPY ./nestjs/ ./

# Using TypeScript and other build-time dependencies, we have to execute this command in the development image
RUN npm run build



FROM node:latest as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

COPY ./nestjs/package*.json ./
RUN npm install --only=production

COPY ./nestjs/ ./

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/server"]