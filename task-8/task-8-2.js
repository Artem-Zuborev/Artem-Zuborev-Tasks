//Реализовать quickSort алгоритм (через рекурсию)
// В качестве сортировки используйте массив чисел

function quicksort(mas) {
    if (mas.length <= 1) {
        return mas;
    }

    const pivot = mas[0];

    const left = [];
    const right = [];

    for (let i = 1; i < mas.length; i++) {
        if (mas[i] < pivot) {
            left.push(mas[i]);
        } else {
            right.push(mas[i]);
        }
    }

    return quicksort(left).concat(pivot, quicksort(right));
};

let mas = [23, 45, 16, 37, 3, 99, 22];
let newSortedMas = quicksort(mas);

console.log( newSortedMas);