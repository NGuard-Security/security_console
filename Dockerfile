FROM node:18 as build

WORKDIR /usr/src/app

COPY .yarn ./.yarn
COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./

RUN yarn install --immutable

COPY . .
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]