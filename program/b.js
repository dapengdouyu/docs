const say = require('./a')
const  object = {
   name:'《React进阶实践指南》',
   author:'我不是外星人'
}
console.log('我是 b 文件',say)
module.exports = function(){
    return object
}
module.loaded=false