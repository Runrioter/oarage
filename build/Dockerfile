FROM node:10-alpine

LABEL maintainer="runrioter@gmail.com"

RUN npm -g config set user root
RUN npm i -g @oarage/server

EXPOSE 6881

CMD ["oarage"]