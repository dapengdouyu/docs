/** 
 * 
 * 
 */
const _=require('lodash')
let str='a';
function add1(str){
    return str+1
}
function add2(str){
    return str+2
}
function add3(str){
    return str+3
}

// let r1=add3(add2(add1(str)));

// console.log(r1)//a123


// 可以吧三个函数组合成一个函数
function flow(...fns){ //fns=[add3,add2,add1]
    if(fns.length===1){
        return fns[0]
    }
    // reduceRight 从右向左
    return fns.reduceRight((a,b)=>(...args)=>a(b(...args)))
}
// 1 =>(...args)=>add1(add2(...args))
// 2=>a:(...args)=>(...args)=>add1(add2(...args)),b:add3 ===>(...args)=>()=>add1(add2(add3(...args)))
const flowed=flow(add3,add2,add1); //add1(add2(add3(str)))

let r1=flowed('a');
console.log(r1)