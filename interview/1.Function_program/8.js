// Pointfree
// 把数据处理的过程先定义成一种与参数无关的合成运算叫做PointFree
//  Pointed 有指向的
let money=500;
money-=100;//买别墅
money-=100;//买跑车
// PointFree 
function buyhouse(money){
    return money-100;
}

function buyCar(money){
    return money-100;
}
// 从右往做
let fn=compose(buyCar,buyhouse);
let r=fn(500)

console.log(r);

//  先定义过程 然后组合 执行