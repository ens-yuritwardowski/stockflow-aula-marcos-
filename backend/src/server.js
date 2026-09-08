require("dotenv").config();

const express = require("express");
const cors = require("cors");

const produtoRoutes = require("./routes/produtoRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "StockFlow API funcionando!"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        sistema: "StockFlow"
    });
});

app.use("/api/produtos", produtoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});