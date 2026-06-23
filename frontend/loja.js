const container = document.getElementById("container");

async function carregarPocoes() {
    const res = await fetch("http://localhost:3000/pocoes");
    const pocoes = await res.json();

    container.innerHTML = "";

    pocoes.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${p.imagem}">
            <h3>${p.nome}</h3>
            <p>${p.descricao}</p>
            <strong>R$ ${p.preco}</strong>
            <button>Comprar</button>
        `;

        container.appendChild(card);
    });
}

carregarPocoes();