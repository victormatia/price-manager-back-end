FROM node:18.16.0
WORKDIR /price-manager-back-end
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]