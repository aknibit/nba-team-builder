FROM node:18-alpine

ENV NODE_OPTIONS=--max-old-space-size=8192

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
EXPOSE 3200

CMD ["npm", "run", "dev"]
