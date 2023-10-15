# syntax=docker/dockerfile:1
FROM --platform=linux/amd64 node:18-alpine

# install app deps
COPY package.json .
RUN npm install -D typescript
RUN npm install -D ts-node
RUN npm install

# install app
COPY . .

CMD npm run start
