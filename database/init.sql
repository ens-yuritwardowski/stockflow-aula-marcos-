CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    quantidade INTEGER NOT NULL DEFAULT 0,
    estoque_minimo INTEGER NOT NULL DEFAULT 5,
    preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produtos 
(nome, descricao, quantidade, estoque_minimo, preco)
VALUES
('Teclado Mecânico', 'Teclado mecânico RGB', 15, 5, 249.90),
('Mouse Gamer', 'Mouse gamer 7200 DPI', 8, 5, 129.90),
('Headset', 'Headset gamer com microfone', 3, 5, 199.90);