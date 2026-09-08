const pool = require("../database/database");

async function listarProdutos(req, res) {
    try {
        const resultado = await pool.query(
            "SELECT * FROM produtos ORDER BY id DESC"
        );

        res.json(resultado.rows);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar produtos"
        });
    }
}

async function buscarProduto(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            "SELECT * FROM produtos WHERE id = $1",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar produto"
        });
    }
}

async function criarProduto(req, res) {
    try {
        const {
            nome,
            descricao,
            quantidade,
            estoque_minimo,
            preco
        } = req.body;

        if (!nome) {
            return res.status(400).json({
                erro: "O nome do produto é obrigatório"
            });
        }

        const resultado = await pool.query(
            `INSERT INTO produtos
            (nome, descricao, quantidade, estoque_minimo, preco)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                nome,
                descricao || "",
                quantidade || 0,
                estoque_minimo || 5,
                preco || 0
            ]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao criar produto"
        });
    }
}

async function atualizarProduto(req, res) {
    try {
        const { id } = req.params;

        const {
            nome,
            descricao,
            quantidade,
            estoque_minimo,
            preco
        } = req.body;

        const resultado = await pool.query(
            `UPDATE produtos
             SET nome = $1,
                 descricao = $2,
                 quantidade = $3,
                 estoque_minimo = $4,
                 preco = $5
             WHERE id = $6
             RETURNING *`,
            [
                nome,
                descricao,
                quantidade,
                estoque_minimo,
                preco,
                id
            ]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao atualizar produto"
        });
    }
}

async function excluirProduto(req, res) {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            "DELETE FROM produtos WHERE id = $1 RETURNING *",
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        res.json({
            mensagem: "Produto excluído com sucesso"
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Produto não encontrado"
        });
    }
}

module.exports = {
    listarProdutos,
    buscarProduto,
    criarProduto,
    atualizarProduto,
    excluirProduto
};