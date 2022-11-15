$(document).ready(function() {
    var node__number = 0;

    $('.node__number').change(function() {
        node__number = $(this).val();
        $('.table').empty(); // Удаляем все блоки и блока table
        var table = ``;
        table += `<div class="column 0"><div class="cell 0">i</div><div class="cell 1">узлы X</div><div class="cell 2">y = f(x)</div></div>` // Добавляем в таблицу колонку с названиями пременных

        // Генерируем колонки таблицы в зависимости от количества узлов
        for (let i = 1; i <= node__number; i++) {
            table += `<div class="column ${i}"><div class="cell 0">${i-1}</div><input class="cell 1" id="node" type="number"><input class="cell 2" id="node__value" type="number"></div>`
        };

        $('.table').append(table); // Вставляем таблицу в dom дерево в блок table
    });

    $('.build__btn').click(function() {
        MathJax.startup.defaultReady(); // Запускаем MathJax

        $('#formula').empty();
        $('#formula_result').empty();
        $('#result').empty();

        var nodes = [];

        if ($('.table').children().length) {
            $('.table').children().each(function() {
                // Проверяем существует ли input в данной колонке
                if ($($(this).children('#node:input')).length) {
                    // Если input не заполнен, то подставляем 0
                    if ($(this).children('#node:input').val() == '') {
                        $(this).children('#node:input').val(0);
                    }
    
                    // Если input не заполнен, то подставляем 0
                    if ($(this).children('#node__value:input').val() == '') {
                        $(this).children('#node__value:input').val(0);
                    }
    
                    nodes.push({node: $(this).children('#node:input').val(), nodeValue: $(this).children('#node__value:input').val()}); // Добавляем в массив объект с id и значение узла
                }
            });

            var x = $('.x__value').val();

            var formula = `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>L</mi><mi>(</mi><mi>x</mi><mi>)</mi><mi>=</mi></mrow>`
            var formula_result = `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><mrow><mi>L</mi><mi>(</mi><mi>${x}</mi><mi>)</mi><mi>=</mi></mrow>`
            var result = 0;

            for (let i = 0; i < nodes.length; i++) {
                formula += `<mrow class="node ${i}">`
                formula_result += `<mrow class="node ${i}">`

                if (i == 0) {
                    formula += `<mi>${nodes[i]['nodeValue']}</mi>` 
                    formula_result += `<mi>${nodes[i]['nodeValue']}</mi>` 
                }
                else if (i != 0 && nodes[i]['nodeValue'] >= 0) {
                    formula += `<mi>+</mi><mi>${nodes[i]['nodeValue']}</mi>`         
                    formula_result += `<mi>+</mi><mi>${nodes[i]['nodeValue']}</mi>`         
                }
                else if (i != 0 && nodes[i]['nodeValue'] <= 0) {
                    formula += `<mi>-</mi><mi>${-nodes[i]['nodeValue']}</mi>`         
                    formula_result += `<mi>-</mi><mi>${-nodes[i]['nodeValue']}</mi>`         
                }

                formula += `<mfrac class="node ${i}"> <mrow class="numerator ${i}">` 
                formula_result += `<mfrac class="node ${i}"> <mrow class="numerator ${i}">` 

                // Генерация числителя
                var numerator = 1;
                for (let j = 0; j < nodes.length; j++) {
                    if (i != j) {
                        if (nodes[j]['node'] >= 0) {
                            formula += `<mi>(</mi><mi>x</mi><mi>-</mi><mi>${nodes[j]['node']}</mi><mi>)</mi>`
                            formula_result += `<mi>(</mi><mi>${x}</mi><mi>-</mi><mi>${nodes[j]['node']}</mi><mi>)</mi>`
                        }
                        else {
                            formula += `<mi>(</mi><mi>x</mi><mi>+</mi><mi>${-nodes[j]['node']}</mi><mi>)</mi>`
                            formula_result += `<mi>(</mi><mi>${x}</mi><mi>+</mi><mi>${-nodes[j]['node']}</mi><mi>)</mi>`
                        }
                        numerator *= (x - nodes[j]['node']);
                    };
                };

                formula += `</mrow> <mrow class="denominator ${i}">`
                formula_result += `</mrow> <mrow class="denominator ${i}">`

                // Генерация знаменателя
                var denominator = 1;
                for (let j = 0; j < nodes.length; j++) {
                    if (i != j) {
                        if (nodes[j]['node'] >= 0) {
                            formula += `<mi>(</mi><mi>${nodes[i]['node']}</mi><mi>-</mi><mi>${nodes[j]['node']}</mi><mi>)</mi>`
                            formula_result += `<mi>(</mi><mi>${nodes[i]['node']}</mi><mi>-</mi><mi>${nodes[j]['node']}</mi><mi>)</mi>`
                        }
                        else {
                            formula += `<mi>(</mi><mi>${nodes[i]['node']}</mi><mi>+</mi><mi>${-nodes[j]['node']}</mi><mi>)</mi>`
                            formula_result += `<mi>(</mi><mi>${nodes[i]['node']}</mi><mi>+</mi><mi>${-nodes[j]['node']}</mi><mi>)</mi>`
                        }
                        denominator *= nodes[i]['node'] - nodes[j]['node'];
                    };
                };

                result += nodes[i]['nodeValue'] * (numerator / denominator);

                formula += `</mrow></mfrac></mrow>`
                formula_result += `</mrow></mfrac></mrow>`
            };

            result = result.toFixed(2);
            
            var result_block = `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
            <mrow>
                <mi>L</mi>
                <mi>(</mi>
                <mi>${x}</mi>
                <mi>)</mi>
                <mi>=</mi>
            </mrow>
            <mrow>
                <mi> ${result}</mi>
            </mrow>
            `;

            formula += `</math>`
            formula_result += `</math>`
            
            $('#formula').append(formula);
            $('#formula_result').append(formula_result);
            $('#result').append(result_block);
        };
    });
});