const sum = (a, b) => a + b;
const memedSum = memo(sum);
const memo = f => {
    let newObj = {};
    return (...rest) => {
        let str = JSON.stringify(rest);
        if (!newObj[str]) {
            newObj[str] = f.call(null, ...rest)
        }
        return newObj[str];
    }
}

console.log(memedSum(1, 2));
console.log(memedSum(1, 2)); // second time there is no calculation, we get answer from cache
