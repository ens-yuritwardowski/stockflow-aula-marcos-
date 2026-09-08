const API_URL = "/api/produtos";

const tabela = document.getElementById("tabelaProdutos");

const totalProdutos = document.getElementById("totalProdutos");

const estoqueBaixo = document.getElementById("estoqueBaixo");

const valorEstoque = document.getElementById("valorEstoque");

const modal = document.getElementById("modal");

const btnNovoProduto = document.getElementById("btnNovoProduto");

const fecharModal = document.getElementById("fecharModal");

const formProduto = document.getElementById("formProduto");


async function carregarProdutos() {

    try {

        const resposta = await fetch(API_URL);

        const produtos = await resposta.json();

        tabela.innerHTML = "";

        let produtosBaixos = 0;

        let valorTotal = 0;

        produtos.forEach(produto => {

            const estoqueEstaBaixo =
                produto.quantidade <= produto.estoque_minimo;

            if (estoqueEstaBaixo) {
                produtosBaixos++;
            }

            valorTotal +=
                Number(produto.quantidade) *
                Number(produto.preco);

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>
                    <strong>${produto.nome}</strong>
                </td>

                <td>
                    ${produto.descricao || "-"}
                </td>

                <td>
                    ${produto.quantidade}
                </td>

                <td>
                    ${produto.estoque_minimo}
                </td>

                <td>
                    R$ ${Number(produto.preco)
                        .toFixed(2)
                        .replace(".", ",")}
                </td>

                <td>
                    <span class="status ${estoqueEstaBaixo ? "baixo" : "ok"}">
                        ${estoqueEstaBaixo ? "Estoque baixo" : "Normal"}
                    </span>
                </td>
            `;

            tabela.appendChild(linha);
        });

        totalProdutos.textContent = produtos.length;

        estoqueBaixo.textContent = produtosBaixos;

        valorEstoque.textContent =
            "R$ " +
            valorTotal
                .toFixed(2)
                .replace(".", ",");

    } catch (erro) {

        console.error("Erro:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="6">
                    Não foi possível carregar os produtos.
                </td>
            </tr>
        `;
    }
}


btnNovoProduto.addEventListener("click", () => {

    modal.classList.add("active");

});


fecharModal.addEventListener("click", () => {

    modal.classList.remove("active");

});


formProduto.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const produto = {

        nome: document.getElementById("nome").value,

        descricao: document.getElementById("descricao").value,

        quantidade:
            Number(document.getElementById("quantidade").value),

        estoque_minimo:
            Number(document.getElementById("estoqueMinimo").value),

        preco:
            Number(document.getElementById("preco").value)

    };

    try {

        const resposta = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(produto)

        });

        if (!resposta.ok) {

            throw new Error("Erro ao cadastrar produto");

        }

        formProduto.reset();

        modal.classList.remove("active");

        await carregarProdutos();

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível cadastrar o produto.");

    }

});


carregarProdutos();