// ========================================
// BURGER MENU - RESPONSIVE
// ========================================

// Fonctions pour le menu burger
let isMenuOpens = false;

function openMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const burgerContainer = document.getElementById('burgerContainer');
    
    if (burgerMenu && menuOverlay && burgerContainer) {
        burgerMenu.classList.add('active');
        menuOverlay.classList.add('active');
        burgerContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
        isMenuOpens = true;
    }
}

function closeMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const burgerContainer = document.getElementById('burgerContainer');
    
    if (burgerMenu && menuOverlay && burgerContainer) {
        burgerMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        burgerContainer.classList.remove('active');
        document.body.style.overflow = '';
        isMenuOpens = false;
    }
}

function toggleMenu() {
    if (isMenuOpens) {
        closeMenu();
    } else {
        openMenu();
    }
}

// Créer le menu burger SEULEMENT sur mobile
function createBurgerMenu() {
    if (window.innerWidth > 992) return;
    if (document.getElementById('burgerMenu')) return;
    
    const lienMenu = document.querySelector('.lien');
    const carteSection = document.querySelector('.carte');
    
    let links = lienMenu ? lienMenu.innerHTML : '';
    let cartes = carteSection ? carteSection.innerHTML : '';
    
    const burgerHTML = `
        <div class="burger-menu" id="burgerMenu">
            <i class="fas fa-bars"></i>
        </div>
        <div class="menu-overlay" id="menuOverlay"></div>
        <div class="burger-container" id="burgerContainer">
            <div class="burger-links">${links}</div>
            <div class="burger-cartes">${cartes}</div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', burgerHTML);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Créer le menu burger seulement sur mobile
    if (window.innerWidth <= 992) {
        createBurgerMenu();
        
        // Setup des événements
        const burgerMenu = document.getElementById('burgerMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const burgerContainer = document.getElementById('burgerContainer');
        
        if (burgerMenu) {
            burgerMenu.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu();
            });
        }
        
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }
        
        if (burgerContainer) {
            burgerContainer.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    setTimeout(closeMenu, 200);
                });
            });
        }
    }
    
    // Gestion du resize
    window.addEventListener('resize', () => {
        setTimeout(() => {
            if (window.innerWidth <= 992 && !document.getElementById('burgerMenu')) {
                createBurgerMenu();
            }
        }, 250);
    });
});