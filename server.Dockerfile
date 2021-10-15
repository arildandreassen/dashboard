FROM node:15

WORKDIR /app
COPY ./package.json .
RUN npm install

COPY ./controllers ./controllers
COPY ./routes ./routes
COPY server.js .


EXPOSE 5000

# ENTRYPOINT ['tail', '-f', '/dev/null'] 
CMD [ "npm", "run", "server" ]