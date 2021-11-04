// Either 函子内部有两个值: 左值Left)和右值(Right),右值是正常情况下使用的值，左值是右值不存在时使用的默认值
class Either{
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
    static of = function (left, right) {
        return new Either(left, right);
    };
    map(fn) {
        return this.right ?
            Either.of(this.left, fn(this.right)) :
            Either.of(fn(this.left), this.right);
    }
    get value(){
        return this.right||this.left;
    }
}