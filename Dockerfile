FROM node:8.9-alpine
COPY . /onsen-dl
WORKDIR /onsen-dl
RUN apk update \
  && apk --no-cache add yarn \
  && yarn install
CMD yarn start
