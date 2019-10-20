FROM node:alpine

RUN yarn global add @vue/cli

WORKDIR /opt/project/app

EXPOSE 8080
