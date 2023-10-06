FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
COPY .env.dev .env
CMD ["npm", "run", "start"]
