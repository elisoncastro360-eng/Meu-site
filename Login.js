const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulação de login
    if (username === "admin" && password === "123456") {

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("user", username);

        // Redireciona para a Home
        window.location.href = "index.html";

    } else {
        errorMessage.textContent = "Usuário ou senha incorretos!";
    }
});
