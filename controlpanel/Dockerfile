FROM node:18-alpine

RUN apk add --no-cache g++ make python3

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10 && npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]