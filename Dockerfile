FROM node:18.14.2

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 3000

CMD ["node", "server.js"]
