const form = document.getElementById("form");
const lista = document.getElementById("lista");

async function carregar() {
    const res = await fetch("http://localhost:3000/pocoes");
    const data = await res.json();

    lista.innerHTML = "";

    data.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${p.nome}</h3>
            <p>${p.descricao}</p>
            <strong>${p.preco}</strong>
            <button onclick="deletar(${p.id})">Deletar</button>
        `;

        lista.appendChild(div);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {
        nome: nome.value,
        descricao: descricao.value,
        imagem: imagem.value,
        preco: preco.value
    };

    await fetch("http://localhost:3000/pocoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    form.reset();
    carregar();
});

async function deletar(id) {
    await fetch(`http://localhost:3000/pocoes/${id}`, {
        method: "DELETE"
    });

    carregar();
}

carregar();