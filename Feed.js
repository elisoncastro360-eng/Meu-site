const toggleButton = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

toggleButton.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle("active");
    } else {
        sidebar.classList.toggle("collapsed");
    }
});
