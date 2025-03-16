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

            // Atualizar informações do produto na página
            document.getElementById("produto-nome").textContent = produto.nome;
            document.getElementById("produto-descricao").textContent = produto.descricao;
            document.getElementById("produto-preco").textContent = `R$ ${produto.preco.toFixed(2)}`;
            document.getElementById("produto-colecao").textContent = produto.colecao;
            document.getElementById("produto-imagem").src = produto.estampa;
            document.getElementById("produto-imagem").alt = produto.nome;
            document.getElementById("botao-compra").href = "https://loja.com/produto/" + encodeURIComponent(produto.nome);

            // Referências aos elementos da área de cores
            const coresContainer = document.getElementById("cores-container");
            const tituloCores = document.getElementById("titulo-cores");

            // Se o produto tem variações de cor, exibir os botões
            if (produto.cores && produto.cores.length > 0) {
                coresContainer.innerHTML = ""; // Limpa antes de adicionar novas cores
                tituloCores.style.display = "block"; // Mostra o título

                produto.cores.forEach(cor => {
                    const btnCor = document.createElement("button");
                    btnCor.classList.add("btn", "btn-sm", "border", "rounded-circle");
                    btnCor.style.backgroundColor = cor.codigo;
                    btnCor.style.width = "30px";
                    btnCor.style.height = "30px";

                    // Troca a imagem quando clicar na cor
                    btnCor.addEventListener("click", () => {
                        document.getElementById("produto-imagem").src = cor.imagem;
                    });

                    coresContainer.appendChild(btnCor);
                });
            } else {
                tituloCores.style.display = "none"; // Oculta o título se não houver variações
            }
        })
        .catch(error => console.error("Erro ao carregar detalhes do produto:", error));
}
