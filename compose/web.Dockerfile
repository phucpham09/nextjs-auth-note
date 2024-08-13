FROM node:20

RUN mkdir app
COPY . . 
COPY ../package.json ../package-lock.json ./app
WORKDIR /app

RUN npm ci

CMD ["npm", "run", "dev"]
