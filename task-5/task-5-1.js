function calculateString(str) {
    if (typeof str === 'string') {
        let mas = str.split(' ');
        let newMas = [];
        for (let i = 0; i < mas.length; i++) {
            let result = mas[i] + ' ' + mas[i].length;
            newMas.push(result)
        }
        console.log(newMas);
    } else {
        console.log('Error')
    }
}
calculateString('hello my friend');