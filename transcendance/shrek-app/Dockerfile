# FROM node:latest as development
# RUN mkdir -p /app
# WORKDIR /app
# COPY package*.json .
# RUN npm install
# COPY . .
# EXPOSE 3000
# RUN npm run build
# CMD ["node" ,"dist/main"]


# FROM node:14.15-alpine as production
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# WORKDIR /usr/src/app/back
# COPY --from=developpement /user/src/app/back .
# EXPOSE 3000
# CMD ["node" ,"dist/main"]

   
FROM node:latest

WORKDIR /usr/back

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node" ,"dist/main"]