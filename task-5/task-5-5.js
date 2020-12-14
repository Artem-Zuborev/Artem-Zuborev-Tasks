0 == null;
// При нестрогом сравнении приравниваются нулю только false, '', '0', и [], следовательно результатом данного сравнения будет false

null == undefined
// null особым образом обрабатывается оператором равенства (==)
// При нестрогом равенстве (==) эти значения равны друг другу и не равны никаким другим значениям. Это специальное правило языка.
// true

1 == {}
// Если объект сравнивается с числом или строкой, JavaScript пытается получить значение по умолчанию для данного объекта.
// Полученное значение преобразуется в примитив, посредством методов valueOf() и toString().
// Если преобразовать объект не удается, генерируется ошибка времени выполнения.
// Попытка привести объект к примитиву => "[object Object]"
// Попытка строку привести к числу => NaN
// 1 == NaN
// false

{ } == 1
    // {} воспринимается как блок кода
    // в результате сравнения будет ошибка


    ({}) == 1
        // ({}) воспринимается как объект
        // Попытка привести объект к примитиву => "[object Object]"
        // Попытка строку привести к числу => NaN
        // NaN == 1
        // false



        ({ toString: () => '12' }) == 12
        // Объект содержит функции результат которой "12"
        // "12" == 12
        // "12" приводится к числу 12
        // 12 == 12
        // true