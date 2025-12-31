document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner tous les liens du menu
    const menuLinks = document.querySelectorAll('.mes_nav a');
    
    // Créer un mapping des IDs vers les sections correspondantes
    const sections = {
        '': document.querySelector('.premiere'),                    // Parcours STIC (introduction)
        '#dts': document.querySelector('#dts'),                     // DIPLÔME DU TECHNICIEN SUPERIEUR
        '#stic1': document.querySelector('#stic1'),                 // STIC 1 (DTS)
        '#info-dts': document.querySelector('#info-dts'),           // INFO (DTS)
        '#eit-dts': document.querySelector('#eit-dts'),             // EIT (DTS)
        '#stic3-dts': document.querySelector('#stic3-dts'),         // STIC 3 (DTS)
        '#ingenieur': document.querySelector('#ingenieur'),         // INGENIEUR STIC
        '#stic1-ing': document.querySelector('#stic1-ing'),         // STIC 1 (INGENIEUR)
        '#info-ing': document.querySelector('#info-ing'),           // INFO (INGENIEUR)
        '#eit-ing': document.querySelector('#eit-ing'),             // EIT (INGENIEUR)
        '#telecom': document.querySelector('#telecom'),             // TELECOM
        '#stic3-ing': document.querySelector('#stic3-ing')          // STIC 3 (INGENIEUR)
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

    // Machine à écrire
    const curseur = document.querySelector(".curseur");
    const titre = document.getElementById("comprendre");
    const texte = "Nos formations sont conçues pour fournir aux étudiants des connaissances théoriques solides et des compétences pratiques, adaptées aux besoins du marché. Elles combinent innovation, technologie et accompagnement personnalisé pour préparer chaque étudiant à réussir dans sa carrière.";

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

// Ajout d'un effet visuel pour les titres de section au scroll
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

