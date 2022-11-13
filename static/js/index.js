$(document).ready(function() {
    const defaultColumn = `<div class="column 0"><div class="cell 0">i</div><div class="cell 1">узлы X</div><div class="cell 2">y = f(x)</div></div>`
    
    var table = ``;

    $('.node__number').change(function() {
        $('.table').empty();
        table = ``;
        table += defaultColumn;

        for (let i = 1; i <= $('.node__number').val(); i++) {
            table += `<div class="column ${i}"><div class="cell 0">${i-1}</div><input class="cell 1" type="number"><input class="cell 2" type="number"></div>`
        };

        $('.table').append(table);
    });

    // $('.build__btn').click(function() {
    //     var 
    // });
});