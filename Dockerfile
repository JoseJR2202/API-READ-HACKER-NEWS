FROM node:alpine3.16

WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm i
COPY . .

EXPOSE 5000

CMD ["npm","start"]