let _ = require("lodash");
function add(a, b, c) {
  return a + b + c;
}

function curry(func) {
  const len=func.length; //形参的个数
  let curried = (...args) => {
    if(args.length<len){
        return (...rest)=>curried(...args,...rest)
    }
    return fnc(...args)
  };
  return curried;
}
let curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3));
console.log(curriedAdd(1, 2, 3));
