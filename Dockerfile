FROM node:18.12
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
RUN rm -rf /usr/src/app/.github 
EXPOSE 3000
ENTRYPOINT [ "node", "./server/server.js" ]