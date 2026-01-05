document.addEventListener('DOMContentLoaded', function () {
    // Animation d'entrée pour le hero
    const heroTitle = document.querySelector('.esi_formation');
    const heroText = document.querySelector('.comprendres');
    
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

    // Sélectionner tous les liens du menu
    const menuLinks = document.querySelectorAll('.mes_nav a');
    
    // Fonction pour activer le lien correspondant à la section
    function activateLink(sectionId) {
        menuLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.parentElement.classList.add('active');
            }
        });
    }

    // Fonction pour faire le scroll fluide + activer le lien
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Empêche le saut brutal

            // Récupère l'ID de la cible (ex: href="#dts")
            const targetId = this.getAttribute('href');
            
            // Pour le lien principal "Parcours STIC" sans ID, aller en haut
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                activateLink('');
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scroll fluide vers la section avec offset pour le sticky menu
                window.scrollTo({
                    top: targetSection.offsetTop - 120,
                    behavior: 'smooth'
                });
                
                // Activer le lien cliqué
                activateLink(targetId);
                
                // Mettre à jour l'URL dans la barre d'adresse (optionnel)
                history.pushState(null, null, targetId);
            }
        });
    });

    // Observer pour détecter la section active pendant le scroll
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('.deuxiemme, .quartrieme, .premiere');
        let currentSectionId = '';
        let currentSectionDistance = Infinity;

        sections.forEach(section => {
            const id = section.id;
            if (id) {
                const distance = Math.abs(window.scrollY - (section.offsetTop - 150));
                
                if (distance < currentSectionDistance && window.scrollY >= section.offsetTop - 200) {
                    currentSectionDistance = distance;
                    currentSectionId = '#' + id;
                }
            }
        });

        // Si aucune section n'est détectée, on est probablement en haut (section introduction)
        if (currentSectionId === '' && window.scrollY < 300) {
            currentSectionId = '';
        }

        // Activer le lien correspondant
        activateLink(currentSectionId);
    });

    // Initialiser l'état actif au chargement
    setTimeout(() => {
        if (window.location.hash) {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                activateLink(window.location.hash);
            }
        } else {
            activateLink('');
        }
    }, 100);

    // Animation des images au scroll
    const images = document.querySelectorAll('.images');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                imageObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Animation pour les titres de section au scroll
    const sectionTitles = document.querySelectorAll('.deuxiemme h2, .quartrieme h2, .premier h2');
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    // Initialiser les styles
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        titleObserver.observe(title);
    });
});