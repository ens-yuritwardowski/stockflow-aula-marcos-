const express = require("express");

const {
    listarProdutos,
    buscarProduto,
    criarProduto,
    atualizarProduto,
    excluirProduto
} = require("../controllers/produtoController");

const router = express.Router();

router.get("/", listarProdutos);

router.get("/:id", buscarProduto);

router.post("/", criarProduto);

router.put("/:id", atualizarProduto);

router.delete("/:id", excluirProduto);

module.exports = router;