FROM node:18

WORKDIR /app

COPY package.json lerna.json ./

RUN npm install -g lerna
RUN npm install -g @nestjs/cli
RUN npm install

