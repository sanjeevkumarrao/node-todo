FROM node

RUN apt-get update && apt-get upgrade -y \
    && apt-get clean

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/

COPY . /app

RUN npm install

EXPOSE 9090

CMD [ "npm", "start" ]
