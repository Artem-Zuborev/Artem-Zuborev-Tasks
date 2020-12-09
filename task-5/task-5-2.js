function mapLetters(str) {
    let mas = [];
    let newStr = str.toLowerCase().split('');
    for (let i = 0; i < newStr.length; i++) {
        if (!mas.includes(newStr[i])) {
            mas.push(newStr[i]);
        }
    }
    for (i = 0; i < newStr.length; i++) {
        newStr[i] = mas.indexOf(newStr[i]);
    }
    console.log(newStr.join('.'))
}
mapLetters("hello")