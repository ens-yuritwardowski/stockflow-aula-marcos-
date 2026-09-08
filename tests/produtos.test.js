const test = require("node:test");
const assert = require("node:assert");

function estoqueEstaBaixo(quantidade, estoqueMinimo) {
    return quantidade <= estoqueMinimo;
}

function calcularValorEstoque(quantidade, preco) {
    return Number(quantidade) * Number(preco);
}

test("produto deve ser considerado com estoque baixo", () => {
    const resultado = estoqueEstaBaixo(3, 5);

    assert.strictEqual(resultado, true);
});

test("produto com estoque acima do mínimo deve ser considerado normal", () => {
    const resultado = estoqueEstaBaixo(10, 5);

    assert.strictEqual(resultado, false);
});

test("deve calcular corretamente o valor do estoque", () => {
    const resultado = calcularValorEstoque(10, 20);

    assert.strictEqual(resultado, 200);
});

test("produto com quantidade igual ao mínimo deve ser considerado estoque baixo", () => {
    const resultado = estoqueEstaBaixo(5, 5);

    assert.strictEqual(resultado, true);
});