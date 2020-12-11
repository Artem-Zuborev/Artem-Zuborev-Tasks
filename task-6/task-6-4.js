function multiplyAll(mas) {
    return function (n) {
        const newMas = []
        for (let i = 0; i < mas.length; i++) {
            newMas.push(mas[i] * n);
        }
        return newMas
    }
}