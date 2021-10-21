// 把数字"312345678"，变成 "312,345,678"。

function parseStr(str){
    return str.replace(/(?!^)(?=(\d{3})+$)/g,',')
}
 console.log(parseStr('312345678'))