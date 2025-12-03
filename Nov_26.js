//1 (curry function)
function curry (fn) {
    return function curried (...args) {
        if(args.length >= fn.length) return fn(...args);
        else {
            return (...next) => curried(...args, ...next);
        }
    }
}

const sum = (a,b,c) => a + b + c;
const product = (a,b,c,d) => a * b * c * d;

const sumFunc = curry(sum);
const prodFunc = curry(product);

console.log(sumFunc(1)(2,3));
console.log(sumFunc(1,2)(3));
console.log(sumFunc(1,2,3));
console.log(prodFunc(1,2,3,4));
console.log(prodFunc(1)(2,3,4));
console.log(prodFunc(1,2)(3,4));
console.log(prodFunc(1,2,3)(4));



//2 (memoize HOF)
function memoize (fn) {
    const cache = {};
    
    return function (num) {
        if(cache[num] !== undefined) return cache[num];
        else {
            let res = fn(num);
            cache[num] = res;
            return res;
        }        
    }
}

let factorial = n => (n <= 1 ? 1 : n * factorial(n - 1));
const foo = memoize(factorial);
console.log(foo(5));
console.log(foo(5)); 



//3 (trace HOF)
function trace(fn) {
    const history = [];

    function storage(...args) {
        let res = fn(...args);

        history.push({args, output: res});
        return res;
    }

    storage.history = history;
    return storage;
}

function foo2(a,b){
    return a + b
} 
 
const tracedFunc = trace(foo2);
console.log(tracedFunc(1,2));
console.log(tracedFunc(2,4,6));
 
console.log(tracedFunc.history);



//4 (pipes HOF)
function pipe(...fns) {
    return function(val) {
        return fns.reduce((acc, fn) => fn(acc), val);
    }
}

const add5 = a => a + 5;
const double = a => 2 * a;
const sub4 = a => a - 4;

const func = pipe(add5, add5, double, sub4);
console.log(func(2));
