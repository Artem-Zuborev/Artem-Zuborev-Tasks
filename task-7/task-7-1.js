const deepCopy = obj => {
    const newObj = {};
    for (let item in obj) {
        if (obj[item] instanceof Array || obj[item] instanceof Function) {
            continue;
        }
        if (typeof obj[item] !== "object") {
            newObj[item] = obj[item];
        } else {
            newObj[item] = deepCopy(obj[item]);
        }
    }
    return newObj;
}

const myCar = {
    car: 'Honda',
    model: 'Accord',
    years: '2003',
    characteristics: {
        v: '1999',
        hp: '156',
        speed:{
            maxSpeed: '250'
        }
    },
    mas: [1, 2, 3, 4, 5]
}
const yourCar = deepCopy(myCar);


console.log(myCar === yourCar);