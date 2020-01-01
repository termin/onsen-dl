FROM node:13.5.0-alpine3.11
COPY . /onsen-dl
WORKDIR /onsen-dl
RUN apk update \
  && apk --no-cache add yarn \
  && yarn install
CMD yarn start
