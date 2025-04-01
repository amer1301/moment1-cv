document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const bars = menuToggle.querySelector('.bars');
    const close = menuToggle.querySelector('.close');
    const menuText = menuToggle.querySelector('.menu-text');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            bars.style.display = bars.style.display === 'none' ? 'flex' : 'none';
            close.style.display = close.style.display === 'none' ? 'flex' : 'none';

            if (navMenu.classList.contains('active')) {
                menuText.textContent = 'StÃ¤ng meny';
            } else {
                menuText.textContent = 'Meny';
            }
        });

        const menuItems = document.querySelectorAll('#nav-menu a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                bars.style.display = 'flex';
                close.style.display = 'none';
                menuText.textContent = 'Meny';
            });
        });
    } else {
        console.log('Menyelementen saknas!');
    }
});