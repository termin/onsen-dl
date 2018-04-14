FROM node:9.11-alpine
COPY . /onsen-dl
WORKDIR /onsen-dl
RUN apk update \
  && apk --no-cache add yarn \
  && yarn install
CMD yarn start
