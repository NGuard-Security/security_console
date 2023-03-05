FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN yarn build

EXPOSE 3333
CMD [ "yarn", "start" ]