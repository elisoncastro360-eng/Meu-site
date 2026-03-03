window.addEventListener('load', () => {
    const intro = document.getElementById('intro');
    const mainContent = document.getElementById('main-content');

    // Aparecer conteúdo principal após 3 segundos
    setTimeout(() => {
        intro.style.display = 'none';
        mainContent.style.opacity = '1';
    }, 3000);
});
