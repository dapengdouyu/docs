function bsearch(A, x) {
    let l=0,r=A.length-1,g;
    while(l<=r){
        g=Math.floor((l+r)/2);
        if(A[g]===x) return g;
        else if(A[g]<x) l=g+1
        else r=g-1
    }
    return -1;
}

const A = [1, 2, 3, 4, 5, 6];
console.log(bsearch(A,5));
