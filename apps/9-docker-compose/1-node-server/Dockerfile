FROM node:14-slim
WORKDIR /opt/node-server
COPY app/ .
RUN npm install
CMD ["node", "app.js"]