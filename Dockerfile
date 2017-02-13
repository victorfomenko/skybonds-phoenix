FROM node:6.9.5-alpine

WORKDIR /app
COPY . /app

ENTRYPOINT ["npm", "run", "start"]
