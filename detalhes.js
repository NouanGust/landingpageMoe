document.addEventListener("DOMContentLoaded", function () {
    carregarDetalhesProduto();
});

function carregarDetalhesProduto() {
    const params = new URLSearchParams(window.location.search);
    const nomeProduto = params.get("produto");

    if (!nomeProduto) {
        document.querySelector("main").innerHTML = "<p class='text-center'>Produto não encontrado.</p>";
        return;
    }

    fetch("produtos.json")
        .then(response => response.json())
        .then(produtos => {
            const produto = produtos.find(p => p.nome === nomeProduto);

            if (!produto) {
                document.querySelector("main").innerHTML = "<p class='text-center'>Produto não encontrado.</p>";
                return;
            }

            document.getElementById("produto-nome").textContent = produto.nome;
            document.getElementById("produto-descricao").textContent = produto.descricao;
            document.getElementById("produto-preco").textContent = produto.preco.toFixed(2);
            document.getElementById("produto-colecao").textContent = produto.colecao;
            document.getElementById("produto-imagem").src = produto.estampa_png;
            document.getElementById("produto-imagem").alt = produto.nome;

            // Link para a compra externa (podemos definir URLs específicas depois)
            document.getElementById("botao-compra").href = "https://loja.com/produto/" + encodeURIComponent(produto.nome);
        })
        .catch(error => console.error("Erro ao carregar detalhes do produto:", error));
}
