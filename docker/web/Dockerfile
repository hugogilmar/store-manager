FROM node:alpine

ENV USER=node
ENV GROUP=node
ENV HOME_DIR=/home/node
ENV APP_DIR=$HOME_DIR/app

RUN yarn global add @vue/cli

RUN mkdir -p $APP_DIR
RUN chown -R $USER:$GROUP $APP_DIR

WORKDIR $APP_DIR

CMD ["./docker/web/startup.sh"]
