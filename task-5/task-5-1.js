function calculateString(str) {
    if (typeof str === 'string') {
        const mas = str.split(' ');
        const newMas = [];
        for (let i = 0; i < mas.length; i++) {
            const result = mas[i] + ' ' + mas[i].length;
            newMas.push(result)
        }
        console.log(newMas);
    } else {
        console.log('Error')
    }
}
calculateString('hello my friend');