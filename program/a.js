const getMes = require('./b')
console.log('我是 a 文件',getMes)

exports.say = function(){
    const message = getMes()
    console.log(message)
}
