function confirmarSair() {
    const resposta = confirm("Tens a certeza que desejas terminar sessão?");
    if (resposta) {
        // Redireciona para o login
        window.location.href = "../Login/Login.html";
    }
}

function mudarIdioma() {
    const idioma = document.getElementById("selectIdioma").value;
    localStorage.setItem("pulse_idioma", idioma);
}

function mudarRegiao() {
    const regiao = document.getElementById("selectRegiao").value;
    localStorage.setItem("pulse_regiao", regiao);
    alert("Região atualizada!");
}
