/** 
 * 
 * 纯函数的优点：
 * 1.可缓存  相同的参数产生相同的输出
 * 2. 可测试
 */

let _=require("lodash");
function add(a,b){
    console.log('执行计算')
    // 执行计算
    return a+b;
}

const resolver=(...args)=>JSON.stringify(args);

function memoize(func,resolver){
    let cache={};//缓存对象，存放参数和结果的对应关系
    return (...args)=>{
        const key=resolver(...args);
        if(cache[key]){
            return cache[key]
        }else{
          return   (cache[key]=func(...args))
        }

    }
}
const memoizeAdd=memoize(add,resolver);
// console.log(memoizeAdd(1,2));
// console.log(memoizeAdd(1,2));
// console.log(memoizeAdd(1,2));

module.exports=memoizeAdd