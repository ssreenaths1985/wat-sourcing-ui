FROM node:10.15.3-stretch
ARG NODE_ENV=staging

RUN apt update && apt install -y zip

WORKDIR /app
COPY . .

RUN yarn install

RUN yarn run build

RUN zip -r build.zip build
