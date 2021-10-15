FROM node:15

WORKDIR /app
COPY ./dashboard/package.json .
RUN npm install

COPY ./dashboard .

EXPOSE 3000

# ENTRYPOINT ['tail', '-f', '/dev/null'] 
CMD [ "npm", "run", "start" ]