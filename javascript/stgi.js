document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner tous les liens du menu
    const menuLinks = document.querySelectorAll('.mes_nav a');
    
    // Créer un mapping des IDs vers les sections correspondantes pour STGI
    const sections = {
        '': document.querySelector('.premiere'),                    // Parcours STGI (introduction)
        '#dts-stgi': document.querySelector('#dts-stgi'),           // DIPLÔME DU TECHNICIEN SUPERIEUR STGI
        '#stgi1': document.querySelector('#stgi1'),                 // STGI 1 (DTS)
        '#eai-dts': document.querySelector('#eai-dts'),             // EAI (DTS)
        '#pmsi-dts': document.querySelector('#pmsi-dts'),           // PMSI (DTS)
        '#ma-dts': document.querySelector('#ma-dts'),               // MA (DTS)
        '#mbm-dts': document.querySelector('#mbm-dts'),             // MBM (DTS) - AJOUT
        '#stgi3-dts': document.querySelector('#stgi3-dts'),         // STGI 3 (DTS)
        '#ingenieur-stgi': document.querySelector('#ingenieur-stgi'), // INGENIEUR STGI
        '#stgi1-ing': document.querySelector('#stgi1-ing'),         // STGI 1 (INGENIEUR)
        '#eai-ing': document.querySelector('#eai-ing'),             // EAI (INGENIEUR)
        '#pmsi-ing': document.querySelector('#pmsi-ing'),           // PMSI (INGENIEUR)
        '#ma-ing': document.querySelector('#ma-ing'),               // MA (INGENIEUR)
        '#stgi3-ing': document.querySelector('#stgi3-ing')          // STGI 3 (INGENIEUR)
    };

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

            // Récupère l'ID de la cible (ex: href="#dts-stgi")
            const targetId = this.getAttribute('href');
            
            // Pour le lien principal "Parcours STGI" sans ID, aller en haut
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
                
                // Mettre à jour l'URL dans la barre d'adresse
                history.pushState(null, null, targetId);
            }
        });
    });

    // Observer pour détecter la section active pendant le scroll
    window.addEventListener('scroll', function () {
        let currentSectionId = '';
        let currentSectionDistance = Infinity;

        // Parcourir toutes les sections pour trouver celle la plus proche du haut
        Object.keys(sections).forEach(key => {
            if (key === '') return; // Ignorer la section vide
            
            const section = sections[key];
            if (section) {
                const distance = Math.abs(window.scrollY - (section.offsetTop - 150));
                
                // Si cette section est plus proche que la précédente
                if (distance < currentSectionDistance && window.scrollY >= section.offsetTop - 200) {
                    currentSectionDistance = distance;
                    currentSectionId = key;
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

    // Machine à écrire pour STGI
    const curseur = document.querySelector(".curseur");
    const titre = document.getElementById("comprendre");
    const texte = "La filière STGI forme des techniciens et ingénieurs spécialisés dans les domaines industriels essentiels : électricité, automatisation, production, mécanique et systèmes automatisés. Notre formation combine excellence académique et expérience pratique pour répondre aux besoins des industries modernes.";

    function machine(mot, index) {
        if (index < mot.length) {
            setTimeout(() => {
                titre.innerHTML += `<span>${mot[index]}</span>`;
                machine(mot, index + 1);
            }, 50);
        } else {
            curseur.classList.add("hide");
        }
    }

    setTimeout(() => {
        titre.innerHTML = "";
        machine(texte, 0);
    }, 500);
});

// Animation des titres de section au scroll
document.addEventListener('DOMContentLoaded', function() {
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