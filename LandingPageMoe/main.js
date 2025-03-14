document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos();
});

// Carrega os produtos do JSON e exibe na página
function carregarProdutos() {
    fetch("produtos.json")
        .then(response => response.json())
        .then(produtos => {
            exibirProdutos(produtos);
            configurarFiltro(produtos);
        })
        .catch(error => console.error("Erro ao carregar os produtos:", error));
}

// Exibe os produtos na tela
function exibirProdutos(produtos) {
    const grid = document.getElementById("produtos-grid");
    grid.innerHTML = "";

    produtos.forEach(produto => {
        const produtoHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${produto.estampa}" class="card-img-top" alt="${produto.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <span class="badge bg-primary">${produto.colecao}</span>
                        <a href="detalhes.html?produto=${encodeURIComponent(produto.nome)}" class="btn btn-success">Detalhes</a>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += produtoHTML;
    });
}

// Configura o filtro de categorias
function configurarFiltro(produtos) {
    const filtroCategoria = document.getElementById("categoria");
    filtroCategoria.addEventListener("change", function () {
        const categoriaSelecionada = filtroCategoria.value;

        if (categoriaSelecionada === "todos") {
            exibirProdutos(produtos);
        } else {
            const produtosFiltrados = produtos.filter(produto => produto.colecao.toLowerCase() === categoriaSelecionada.toLowerCase());
            exibirProdutos(produtosFiltrados);
        }
    });
}
