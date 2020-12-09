function arrayDiff(a, b) {
    let newMas = [];
    if (b.length === 0) return a
    for (let i = 0; i < a.length; i++) {
        if (!b.includes(a[i])) {
            newMas.push(a[i]);
        }
    }
    return newMas;
}