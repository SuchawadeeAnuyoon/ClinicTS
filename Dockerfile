FROM node:10.12.0-alpine

ADD . .

RUN npm install && npm run build

EXPOSE 8000

CMD ["npm", "run", "start"]