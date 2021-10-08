FROM node

WORKDIR /app

COPY . /app

RUN apt-get update &&\
    apt-get install -y \
    npm

EXPOSE 5000

# ENTRYPOINT ['tail', '-f', '/dev/null'] 
CMD [ "npm", "run", "server" ]