FROM node:14-slim
WORKDIR /vue-app
COPY app/ .
RUN npm install
RUN npm install -g live-server
RUN npm run build
EXPOSE 8080
CMD ["live-server", "dist"]
