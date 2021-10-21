/**
 * 编写parse函数，实现访问对象里属性的值
 */
let obj = { a: 1, b: { c: 2 }, d: [1, 2, 3], e: [{ f: [4, 5, 6] }] };
let r1 = parse(obj, "a"); // = 1;
let r2 = parse(obj, "b.c"); // = 2;
let r3 = parse(obj, "d[2]"); // = 3;
let r4 = parse(obj, "e[0].f[2]"); // = 4;

function parse(obj, str) {
  return str
    .split(/[\.\[\]]/g)
    .filter((l) => l !== "")
    .reduce((memo, next, index, arr) => {
      if (memo == null && arr.length - 1 !== index) {
        memo = {};
      }
      return memo[next];
    }, obj);
}
console.log(r1, r2, r3, r4);

/**
 * flat
 */
let arr = [[1], [2, 3], [4, 5, 6, [7, 8, [9, 10, [11]]]], 12];
// console.log(arr.flat(Infinity))

// console.log(arr.toString().split(','))

// console.log(
//   JSON.stringify(arr)
//     .split(/[\[\],]/g)
//     .filter((item) => item !== "")
// );

// while (arr.some((item) => Array.isArray(item))) {
//   arr = [].concat(...arr);
// }
// function flat(arr, r = []) {
//   if (!Array.isArray(arr)) {
//     return arr;
//   }
//   for (let item of arr) {
//     r = r.concat(flat(item));
//   }
//   return r;
// }
// console.log(flat(arr));

/***    
 * 题目描述:实现一个 compose 函数
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11
 */
