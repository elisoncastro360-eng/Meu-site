const gridArquivados = document.getElementById("gridArquivados");
const viewModal = document.getElementById("viewModal");
const imgExpandida = document.getElementById("imgExpandida");
let postSelecionadoId = null;

// Carregar posts que estão com status "arquivado"
function carregarArquivados() {
    gridArquivados.innerHTML = "";
    // Buscamos os mesmos posts do feed
    let posts = JSON.parse(localStorage.getItem("mnb_posts") || "[]");
    
    // Filtramos apenas os que você marcou como arquivados
    // (Para isso funcionar, você precisará de uma função "Arquivar" no Perfil.js)
    const arquivados = posts.filter(p => p.arquivado === true);

    if (arquivados.length === 0) {
        gridArquivados.innerHTML = "<p style='grid-column: 1/4; text-align: center; padding: 20px; color: #65676b;'>Nenhum item arquivado.</p>";
        return;
    }

    arquivados.forEach(post => {
        const div = document.createElement("div");
        div.classList.add("item-arquivado");
        div.onclick = () => abrirModal(post);
        div.innerHTML = `<img src="${post.media}">`;
        gridArquivados.appendChild(div);
    });
}

function abrirModal(post) {
    postSelecionadoId = post.id;
    imgExpandida.src = post.media;
    viewModal.style.display = "flex";
}

function fecharVisualizacao() {
    viewModal.style.display = "none";
}

function restaurarPost(event) {
    event.stopPropagation();
    let posts = JSON.parse(localStorage.getItem("mnb_posts") || "[]");
    
    // Mudar o status de arquivado para falso
    posts = posts.map(p => {
        if(p.id === postSelecionadoId) p.arquivado = false;
        return p;
    });

    localStorage.setItem("mnb_posts", JSON.stringify(posts));
    fecharVisualizacao();
    carregarArquivados();
    alert("Post restaurado para o feed!");
}

function excluirDefinitivo(event) {
    event.stopPropagation();
    if(!confirm("Excluir permanentemente? Esta ação não tem volta.")) return;

    let posts = JSON.parse(localStorage.getItem("mnb_posts") || "[]");
    posts = posts.filter(p => p.id !== postSelecionadoId);

    localStorage.setItem("mnb_posts", JSON.stringify(posts));
    fecharVisualizacao();
    carregarArquivados();
}

// Iniciar
carregarArquivados();
