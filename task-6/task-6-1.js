const multiplyTwo = (n) => n * 2;
const minusFour = (n) => n - 4;

function pipe(...funcs) {
    return function (n) {
        let result = n;
        for (let func of funcs) {
            result = func(result)
        }

        return result;
    }
}


const res = pipe(multiplyTwo, minusFour)(10);

console.log(res);