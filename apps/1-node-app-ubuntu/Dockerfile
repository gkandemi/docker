FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install nodejs -y
WORKDIR /opt/node-app
COPY . /opt/node-app/
ENV channel=kablosuzkedi
# COPY . .
# CMD ["node", "/opt/node-app/index.js"];
CMD ["node", "index.js"];