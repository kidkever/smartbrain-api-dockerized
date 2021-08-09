FROM node:14.16.1-alpine3.10

WORKDIR /usr/src/smartbrain-api

COPY ./ ./

RUN npm install

CMD ["npm", "start"]