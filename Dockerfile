FROM node:10.12.0-alpine

ADD . .

ENV PORT 8000
ENV HOST 0.0.0.0

RUN npm install && npm run build

EXPOSE 8000

CMD ["npm", "run", "start"]