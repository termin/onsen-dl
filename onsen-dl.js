var onsen = require('onsen-node')
var path = require('path')
var fs = require('fs')
var yaml = require('js-yaml')
var cacheDir = path.join(__dirname, 'cache')
var suzu = require('suzu-downloader')
var downloader = new suzu()

/**
 * ダウンロードする
 * @param {Object} info - onsen.getInfo()で取得したハッシュ
 * @param {string} outputDir - 出力先ディレクトリのパス
 * @param {function} success - callback function
 */
var download = (info, outputDir, success) => {
  let url = info.moviePath.pc;
  let count = info.count;
  let extension = path.extname(url);
  let updated = info.update.replace(/\./g, '-')
  let outputPath = path.join(outputDir, `${info.title} 第${count}回 ${updated}${extension}`);
  return downloader.get({
    url: url,
    path: outputPath,
    success: success,
    error: () => {
      console.log('ダウンロード失敗', info.url, info.count, info.update)
    }
  });
}

// 設定読み込み
try {
  let configFile = path.join(__dirname, 'config.yml')
  let config = yaml.safeLoad(fs.readFileSync(configFile, 'utf-8'))
  var programs = config.programs
  var outputDir = config.outputDir || './output'
  if (programs === null) {
    throw new Error('対象番組が空')
  }
} catch (e) {
  console.log(e)
  return
}

// 処理済みjsonファイルがあって今回と同じ配信日(update) => スキップ
// それ以外 => ダウンロード
// ダウンロード完了後にjsonを保存
programs.forEach(program => {
  onsen.getInfo(program, (info) => {
    if (info === null) {
      console.log('存在しない番組', program)
      return
    }
    let jsonPath = path.join(cacheDir, program + '.json')
    fs.readFile(jsonPath, 'utf8', (err, jsonStr) => {
      if (err === null) {
        let json = JSON.parse(jsonStr)
        if (info.update === json.update) {
          // console.log('ダウンロード済み', program, info.update)
          return
        }
      }
      // console.log('ダウンロードする', program)
      download(info, outputDir, () => {
        fs.writeFile(jsonPath, JSON.stringify(info), 'utf8', (err) => {
          if (err !== null) {
            console.log('ダウンロード済みjsonファイル書き込み失敗', program)
          }
        })
      })
    })
  })
});
