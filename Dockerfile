FROM node:19.2.0

WORKDIR /app

COPY ./server/package.json .

RUN npm install

COPY ./server ./

EXPOSE 5020

CMD ["npm", "run", "dev"]