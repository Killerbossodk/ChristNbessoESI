// Animation des étapes au scroll
document.addEventListener("DOMContentLoaded", function() {
    // Animation d'entrée pour le hero
    const heroTitle = document.querySelector('.esi_admission');
    const heroText = document.querySelector('.adm-intro-text');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroText) {
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 600);
    }

    const etapes = document.querySelectorAll(".adm-etape");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    etapes.forEach(etape => {
        observer.observe(etape);
    });
});