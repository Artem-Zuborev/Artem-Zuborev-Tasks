function bracketDuplicates(str) {
    if (typeof str === 'string') {
        str = str.split('');
        for (let i = 2; i < str.length; i++) {
            if (str[i - 2] === str[i] && str[i - 1] === str[i]) {
                let j = i;
                while (str[j + 1] === str[j]) {
                    j++;
                }
                str.splice(i, 0, '[');
                str.splice(j + 2, 0, ']');
                i = j + 1;
            }
        }
        console.log(str.join(''));
    } else {
        console.log("Error")
    }
}
bracketDuplicates('qqqqqqqhelllllloooooooo')