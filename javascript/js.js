// ====================
// FIX POUR L'AFFICHAGE DE L'IMAGE EN RESPONSIVE
// ====================
document.addEventListener("DOMContentLoaded", () => {
    const imageDiv = document.querySelector('.autre .image');
    
    // Forcer l'affichage de l'image
    if (imageDiv) {
        imageDiv.style.display = 'block';
        imageDiv.style.visibility = 'visible';
        imageDiv.style.opacity = '1';
    }
    
    // Observer pour l'animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (imageDiv) {
        observer.observe(imageDiv);
    }
});

// ====================
// FIX POUR LE HEADER BLEU EN RESPONSIVE
// ====================
document.addEventListener("DOMContentLoaded", () => {
    const headerTop = document.querySelector('.header-top');
    
    if (headerTop) {
        // Forcer l'affichage du header bleu
        headerTop.style.display = 'flex';
        headerTop.style.visibility = 'visible';
    }
});

// ====================
// SMOOTH SCROLL POUR LES LIENS DE NAVIGATION
// ====================
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.mes_nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Si c'est un lien ancre (#section)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Scroll smooth vers la section
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Mettre à jour la classe active
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
});

// ====================
// GESTION DU MENU STICKY EN RESPONSIVE
// ====================
window.addEventListener('scroll', () => {
    const programmes = document.querySelector('.programmes');
    
    if (programmes && window.innerWidth > 992) {
        // Sur desktop, le menu reste sticky
        programmes.style.position = 'sticky';
    } else if (programmes) {
        // Sur mobile, le menu est static
        programmes.style.position = 'static';
    }
});


let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Réajuster les éléments après resize
        const imageDiv = document.querySelector('.autre .image');
        const headerTop = document.querySelector('.header-top');
        
        if (imageDiv) {
            imageDiv.style.display = 'block';
            imageDiv.style.visibility = 'visible';
        }
        
        if (headerTop) {
            headerTop.style.display = 'flex';
            headerTop.style.visibility = 'visible';
        }
    }, 250);
});