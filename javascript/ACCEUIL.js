
//pour le nav section en scroll

const nav = document.querySelector(".lien");
let isAnimating = false;
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100 && !nav.classList.contains("nouvelle_class")) {
        nav.classList.remove("lien");
        nav.classList.add("nouvelle_class");
        isAnimating = true;
        setTimeout(() => {
            isAnimating = false;
        }, 150);
        
    } else if (scrollPosition < 100 && nav.classList.contains("nouvelle_class")) {
        if (!isAnimating) {
            nav.classList.remove("nouvelle_class");
            nav.classList.add("lien");
        }
    }
}); 

//pour les image defilant
const track = document.getElementById('track');
const prevBtn = document.getElementById('prevBtn'); const nextBtn = document.getElementById('nextBtn');

if (track && prevBtn && nextBtn) {
         const cardWidth = track.querySelector('.card').offsetWidth + 24; // + gap

        nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
            });

        prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            });

                    // Afficher/masquer les boutons selon le scroll
        const checkScroll = () => {
        prevBtn.style.display = track.scrollLeft > 0 ? 'flex' : 'none';
        nextBtn.style.display = track.scrollLeft < (track.scrollWidth - track.clientWidth) ? 'flex' : 'none';
            };

        track.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
                    checkScroll();
                }


//pour le conteur

// Animation des compteurs quand on arrive dans la section
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');

    // Options de l'IntersectionObserver
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5  // déclenche quand 50% de l'élément est visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Lance l'animation pour chaque compteur visible
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                // Optionnel : on arrête d'observer une fois lancé
                observer.disconnect();
            }
        });
    }, options);

    // On observe la première stat (ou la div .stats)
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Fonction qui anime un compteur
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.textContent.includes('%') ? '%' : ''; // garde le % si présent
        const start = 0;
        const duration = 2000; // 2 secondes

        let current = start;
        const increment = target / (duration / 16); // ~60fps

        const updateCounter = () => {
            current += increment;

            // Arrondi et mise à jour
            if (current < target) {
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };

        updateCounter();
    }
});

//pour ma video 
document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.querySelector('.play-btn');
    const videoSection = document.querySelector('.video-section');
    const video = document.getElementById('institutional-video');

    // 1. Lancement de la vidéo quand on clique sur le bouton
    playBtn.addEventListener('click', () => {
        videoSection.classList.add('video-playing');
        video.play().catch(err => {
            console.log("Erreur de lecture auto :", err);
        });
    });

    // 2. Contrôles de la vidéo (pause, play, retour au texte) – toujours actif
    video.addEventListener('click', () => {
        if (video.paused) {
            // Si la vidéo est en pause → on la relance
            video.play();
        } else {
            // Si elle joue → on la met en pause ET on revient au texte
            video.pause();
            videoSection.classList.remove('video-playing');
        }
    });

    
    video.addEventListener('contextmenu', e => e.preventDefault());
});

//pour  mon ecriture 
const nomElement = document.querySelector('.nom');
const sloganElement = document.querySelector('.slogan');

const nomText = "Bienvenue à l'Esi";

let nomIndex = 0;
const nomSpeed = 100;

// Fonction pour écrire le titre
function typeNom() {
    if (nomIndex < nomText.length) {
        nomElement.textContent += nomText.charAt(nomIndex);
        nomIndex++;
        setTimeout(typeNom, nomSpeed);
    } else {
        // Une fois le titre terminé, afficher le slogan
        setTimeout(() => {
            sloganElement.style.display = 'block';
        }, 300);
    }
}

// Démarrer l'animation au chargement de la page
window.addEventListener('load', () => {
    setTimeout(typeNom, 300);
});

//pour ma carte sur les differents parcours
document.addEventListener('DOMContentLoaded', () => {
    const cartes = document.querySelectorAll('.p1, .p2, .p3');

    cartes.forEach((carte, index) => {
        setTimeout(() => {
            carte.classList.add('visible');
        }, index * 500); // 500ms entre chaque carte (0.5s → 1s → 1.5s)
    });
});


//POUR PREMIERE IMAGE 
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('.mission_main_image');
    const sideImages = document.querySelector('.mission_side_images');
    const textContent = document.querySelector('.mission_text');

    // 1. Image principale en premier (après 300ms)
    setTimeout(() => {
        mainImage.classList.add('visible');
        mainImage.querySelector('img').classList.add('visible');
    }, 300);

    // 2. Images secondaires ensuite (après 800ms)
    setTimeout(() => {
        sideImages.classList.add('visible');
        sideImages.querySelectorAll('img').forEach(img => img.classList.add('visible'));
    }, 800);

    // 3. Texte en dernier (après 1400ms) + en rouge
    setTimeout(() => {
        textContent.classList.add('visible');
    }, 1400);
});


//image2
document.addEventListener('DOMContentLoaded', () => {
    const imageMission = document.querySelector('.image_mission');
    const texteMission = document.querySelector('.texte_mission');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Image en premier (après un petit délai naturel)
                setTimeout(() => {
                    imageMission.classList.add('visible');
                }, 200);

                // 2. Texte ensuite
                setTimeout(() => {
                    texteMission.classList.add('visible');
                }, 900);

                // On arrête d'observer une fois lancé
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25 // déclenche quand 25% de la section est visible
    });

    const section = document.querySelector('.section_mission');
    if (section) {
        observer.observe(section);
    }
});

//image3
document.addEventListener('DOMContentLoaded', () => {
    const imageGauche = document.querySelector('.image-gauche');
    const texteDroite = document.querySelector('.texte-droite');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Image à gauche en premier
                setTimeout(() => {
                    imageGauche.classList.add('visible');
                }, 200);

                // 2. Texte à droite ensuite
                setTimeout(() => {
                    texteDroite.classList.add('visible');
                }, 900);

                // Arrête d'observer une fois lancé
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25 // déclenche quand 25% de la section est visible
    });

    const section = document.querySelector('.simple-alternée');
    if (section) {
        observer.observe(section);
    }
});


//mes deux cartes 2 mes sections 
document.addEventListener('DOMContentLoaded', () => {
    const titre = document.querySelector('.universitaires_titre');
    const cartes = document.querySelectorAll('.cartes');
    const btnGlobal = document.querySelector('.universitaires_btn_global');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Titre en premier
                setTimeout(() => {
                    titre.classList.add('visible');
                }, 200);

                // 2. Première carte
                setTimeout(() => {
                    cartes[0].classList.add('visible');
                }, 700);

                // 3. Deuxième carte
                setTimeout(() => {
                    cartes[1].classList.add('visible');
                }, 1100);

                // 4. Bouton global en dernier
                setTimeout(() => {
                    btnGlobal.classList.add('visible');
                }, 1600);

                // On arrête d'observer une fois lancé
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // déclenche quand 30% de la section est visible
    });

    const section = document.querySelector('.universitaires_section');
    if (section) {
        observer.observe(section);
    }
});

//pour ma caorousel1
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;
    const cardWidth = 350; // largeur carte + gap (320px + 30px gap)
    const totalCards = cards.length;
    const visibleCards = Math.floor(window.innerWidth / cardWidth) || 3; // approx 3 cartes visibles

    // Fonction pour déplacer le carrousel
    function moveCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    // Boutons navigation
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - visibleCards) {
            currentIndex++;
            moveCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            moveCarousel();
        }
    });

    // Apparition séquentielle des cartes quand la section est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 400); // 400ms entre chaque carte
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const section = document.querySelector('.carousel-section');
    if (section) observer.observe(section);
});


//machine à ecrire pour le dernier 
// Textes à écrire
const subtitleText = "COUP DE PROJECTEUR SUR LES ANCIENS ÉLÈVES";
const titleText = "Ce que disent nos anciens étudiants";

// Fonction machine à écrire avec curseur
function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.innerHTML = ''; // on vide au départ

    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
            i++;
            setTimeout(type, speed);
        } else {
            element.innerHTML = text; // curseur disparait à la fin
            if (callback) callback();
        }
    }
    
    type();
}

// Fonction pour lancer l'effet
function startTypewriter() {
    const subtitleEl = document.getElementById('subtitle');
    const titleEl = document.getElementById('title');

    typeWriter(subtitleEl, subtitleText, 30, () => {
        // Petit délai avant le titre
        setTimeout(() => {
            typeWriter(titleEl, titleText, 40);
        }, 200);
    });
}

// IntersectionObserver : démarre quand la section est visible
document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.subtitle')?.parentElement || document.body; // parent ou fallback

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTypewriter(); // lance l'effet
                observer.unobserve(entry.target); // une seule fois
            }
        });
    }, {
        threshold: 0.5 // déclenche quand 50% de la section est visible
    });

    observer.observe(section);
});