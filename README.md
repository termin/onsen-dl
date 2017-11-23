# なにするやつ？

onsenをアレするやつです

# どの環境で使えるの？

Node.js 8.9.xで作った。

# どうやって使うの？

## 設定する

```shell
$ cp config.yml.example config.yml
```
config.yml
```yaml
programs:
  - toshitai
  - grt
outputPath: ./output
```

## 動かす

yarnの場合
```shell
$ yarn install
$ yarn start
```
npmの場合
```shell
$ npm install
$ npm start
```
