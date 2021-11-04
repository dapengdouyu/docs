let _=require("lodash")
let str='click button';
// 把它转成CLICK_BUTTON
// 按照过程思维

//lodash 中的方法 数据 先行，先传数据  再传其他参数
// lodash、fb 是好着呢对函数编程设计的 数据放在最后
let r1=_.split(str,' ');
console.log(r1);

let r2=_.toUpper(r1);
console.log(console.log(r2))

let r3=_.split(r2,',');
console.log(r3);
let r4=_.join(r3,'_');
console.log(r4)


// 如果函数编程思维 先组合

_.flowRight(_.join('_'),_.split,_.toUpper,_.split(' '))