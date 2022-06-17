// Initials
resizeMainToFooter();

// Functions
function resizeMainToFooter() {
    const mainElement = document.getElementById('main');
    const footerElement = document.getElementById('footer');
    mainElement.style.paddingBottom = footerElement.offsetHeight + 'px';
}