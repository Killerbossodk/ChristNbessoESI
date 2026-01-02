// ========================================
// RESPONSIVE JAVASCRIPT - ESI WEBSITE
// Fichier: responsive.js
// ========================================

// Fonction pour créer le menu burger avec les cartes intégrées
function createBurgerMenu() {
    // Récupérer les liens du menu normal
    const lienMenu = document.querySelector('.lien');
    const links = lienMenu ? lienMenu.innerHTML : '';
    
    // Récupérer les cartes
    const carteSection = document.querySelector('.carte');
    const cartes = carteSection ? carteSection.innerHTML : '';
    
    // Créer la structure complète du menu burger
    const burgerHTML = `
        <!-- Bouton burger -->
        <div class="burger-menu" id="burgerMenu">
            <span></span>
            <span></span>
            <span></span>
        </div>
        
        <!-- Overlay (fond sombre) -->
        <div class="menu-overlay" id="menuOverlay"></div>
        
        <!-- Container du menu burger -->
        <div class="burger-container" id="burgerContainer">
            <!-- Section des liens -->
            <div class="burger-links">
                ${links}
            </div>
            
            <!-- Section des cartes -->
            <div class="burger-cartes">
                ${cartes}
            </div>
        </div>
    `;
    
    // Insérer le menu burger au début du body
    document.body.insertAdjacentHTML('afterbegin', burgerHTML);
}

// Fonction pour ouvrir le menu
function openMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const burgerContainer = document.getElementById('burgerContainer');
    
    if (burgerMenu && menuOverlay && burgerContainer) {
        burgerMenu.classList.add('active');
        menuOverlay.classList.add('active');
        burgerContainer.classList.add('active');
        
        // Empêcher le scroll du body quand le menu est ouvert
        document.body.style.overflow = 'hidden';
    }
}

// Fonction pour fermer le menu
function closeMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const burgerContainer = document.getElementById('burgerContainer');
    
    if (burgerMenu && menuOverlay && burgerContainer) {
        burgerMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        burgerContainer.classList.remove('active');
        
        // Réactiver le scroll du body
        document.body.style.overflow = '';
    }
}

// Fonction pour toggle (ouvrir/fermer) le menu
function toggleMenu() {
    const burgerContainer = document.getElementById('burgerContainer');
    
    if (burgerContainer && burgerContainer.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
}

// Initialiser le menu burger au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Créer le menu burger
    createBurgerMenu();
    
    // Récupérer les éléments
    const burgerMenu = document.getElementById('burgerMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const burgerContainer = document.getElementById('burgerContainer');
    
    // Event listener: Clic sur le bouton burger
    if (burgerMenu) {
        burgerMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Event listener: Clic sur l'overlay (ferme le menu)
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Event listener: Clic sur un lien dans le menu burger (ferme le menu)
    if (burgerContainer) {
        const allLinks = burgerContainer.querySelectorAll('a');
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Si c'est un lien avec href (pas juste une ancre #)
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    // Petit délai pour laisser l'animation se terminer
                    setTimeout(closeMenu, 200);
                }
            });
        });
    }
    
    // Event listener: Fermer le menu si on resize vers desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 992) {
                closeMenu();
            }
        }, 250);
    });
    
    // Event listener: Fermer le menu au scroll (optionnel)
    let scrollTimer;
    window.addEventListener('scroll', () => {
        if (burgerContainer && burgerContainer.classList.contains('active')) {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                // closeMenu(); // Décommenter si vous voulez que le menu se ferme au scroll
            }, 100);
        }
    });
    
    // Touche Escape pour fermer le menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
});

// Gestion du menu sticky (scroll)
let isAnimatings = false;

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    // Sélectionner le nav à chaque fois (soit .lien soit .nouvelle_class)
    const nav = document.querySelector(".lien") || document.querySelector(".nouvelle_class");
    
    if (!nav) return; // Sécurité si l'élément n'existe pas
    
    if (scrollPosition > 100 && !nav.classList.contains("nouvelle_class")) {
        nav.classList.remove("lien");
        nav.classList.add("nouvelle_class");
        isAnimatings= true;
        setTimeout(() => {
            isAnimating = false;
        }, 150);
        
    } else if (scrollPosition < 100 && nav.classList.contains("nouvelle_class")) {
        if (!isAnimatings) {
            nav.classList.remove("nouvelle_class");
            nav.classList.add("lien");
        }
    }
});

// Export des fonctions pour utilisation externe si nécessaire
window.burgerMenuFunctions = {
    open: openMenu,
    close: closeMenu,
    toggle: toggleMenu
};