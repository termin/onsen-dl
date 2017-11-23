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

## 動かす - 通常

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

## 動かす - Docker

1回のrunで全部ダウンロードして終わる。  
スケジュールはホスト側でよしなにやりましょう。  
```shell
$ cp docker-compose.yml.example docker-compose.yml # 設定変更が必要ならば各自やっていく
$ docker-compose build
$ docker-compose run --rm node
```
