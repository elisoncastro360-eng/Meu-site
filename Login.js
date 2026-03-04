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

        window.location.href = "Feed.html";

    } else {
        errorMessage.textContent = "Usuário ou senha incorretos!";
    }
});

// Mostrar / Ocultar Senha
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

togglePassword.addEventListener("click", function () {
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    this.textContent = type === "password" ? "👁" : "🙈";
});
