
let isMenuOpen = false;

// Fonction pour ouvrir le menu
function openMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const burgerContainer = document.getElementById('burgerContainer');

    if (burgerMenu && menuOverlay && burgerContainer) {
        burgerMenu.classList.add('active');
        menuOverlay.classList.add('active');
        burgerContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
        isMenuOpen = true;
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
        document.body.style.overflow = '';
        isMenuOpen = false;
    }
}

// Fonction pour toggle (ouvrir/fermer)
function toggleMenu() {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function setupBurgerEvents() {
    const burgerMenu = document.getElementById('mobileBurgerBtn'); // ← Nouveau bouton
    const menuOverlay = document.getElementById('menuOverlay');
    const closeBtn = document.querySelector('.burger-close');

    if (burgerMenu) burgerMenu.addEventListener('click', toggleMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    document.querySelectorAll('.burger-links a').forEach(link => {
        link.addEventListener('click', () => setTimeout(closeMenu, 200));
    });
}

// Effet scroll sur le header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.mobile-sticky-header');
    if (header) {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});
function createBurgerMenu() {
    if (window.innerWidth > 992) return;
    if (document.getElementById('burgerMenu')) return;

    const lienMenu = document.querySelector('.lien');
    const carteSection = document.querySelector('.carte');

    const links = lienMenu ? lienMenu.innerHTML : '';
    const cartes = carteSection ? carteSection.innerHTML : '';

    // reconstrution de la barre mannuel
    const headerCustomHTML = `
        <div class="burger-header-custom">
            <div class="contact-info">
                <div class="contact-item">
                    <i class="far fa-envelope"></i>
                    <a href="mailto:esi@inphb.edu.ci">esi@inphb.edu.ci</a>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <a href="tel:+2250747260505">+225 07 47 26 05 05</a>
                </div>
            </div>
            <div class="social-icons">
                <a href="https://www.facebook.com/inphb.polytech" class="social-icon facebook" aria-label="Facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="https://x.com/inphbpolytech" class="social-icon twitter" aria-label="Twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://ci.linkedin.com/school/inphb-officiel/" class="social-icon linkedin" aria-label="LinkedIn">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.youtube.com/@inp-hbpageofficielle6975" class="social-icon youtube" aria-label="YouTube">
                    <i class="fab fa-youtube"></i>
                </a>
            </div>
        </div>
    `;

    const burgerHTML = `
        <div class="burger-menu" id="burgerMenu">
            <i class="fas fa-bars"></i>
        </div>
        <div class="menu-overlay" id="menuOverlay"></div>
        <div class="burger-container" id="burgerContainer">
            <button class="burger-close" aria-label="Fermer">
                <i class="fas fa-times"></i>
            </button>
            ${headerCustomHTML}
            <div class="burger-links">
                ${links}
            </div>
            <div class="burger-cartes">
                ${cartes}
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', burgerHTML);
    setupBurgerEvents();
}

// Effet sticky plus prononcé au scroll pour le burger
window.addEventListener('scroll', () => {
    const burger = document.getElementById('burgerMenu');
    if (burger) {
        if (window.scrollY > 50) {
            burger.classList.add('scrolled');
        } else {
            burger.classList.remove('scrolled');
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
  
    createBurgerMenu();

  
    fixMenuStickyZIndex();
});


window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        if (window.innerWidth <= 992 && !document.getElementById('burgerMenu')) {
            createBurgerMenu();
        } else if (window.innerWidth > 992) {
            closeMenu(); // au cas où le menu serait ouvert
        }
    }, 250);
});

// ====================
// FORCER LE Z-INDEX ET LA LARGEUR DU MENU STICKY
// ====================
function fixMenuStickyZIndex() {
    const menuSticky = document.querySelector('.nouvelle_class');
    if (menuSticky) {
        menuSticky.style.setProperty('z-index', '99999', 'important');
        menuSticky.style.setProperty('position', 'fixed', 'important');
        menuSticky.style.setProperty('width', '100%', 'important');
        menuSticky.style.setProperty('left', '0', 'important');
        menuSticky.style.setProperty('right', '0', 'important');
        menuSticky.style.setProperty('transform', 'none', 'important');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    if (window.innerWidth <= 992) {
        createBurgerMenu();
    }
    
    
    fixMenuStickyZIndex();
});


window.addEventListener('resize', () => {
   
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        if (window.innerWidth <= 992 && !document.getElementById('burgerMenu')) {
            createBurgerMenu();
        } else if (window.innerWidth > 992) {
          
            closeMenu();
        }
    }, 250);
});


window.addEventListener('scroll', fixMenuStickyZIndex);
window.addEventListener('load', fixMenuStickyZIndex);


const nav = document.querySelector(".lien");
let isAnimating = false;

if (nav) {
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100 && !nav.classList.contains("nouvelle_class")) {
            nav.classList.remove("lien");
            nav.classList.add("nouvelle_class");
            
            setTimeout(() => {
                nav.style.setProperty('z-index', '99999', 'important');
                nav.style.setProperty('width', '100%', 'important');
                nav.style.setProperty('left', '0', 'important');
                nav.style.setProperty('right', '0', 'important');
                nav.style.setProperty('transform', 'none', 'important');
            }, 50);
            
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
}

// CAROUSEL DES CARTES 

const track = document.getElementById('track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track && prevBtn && nextBtn) {
    const cardWidth = track.querySelector('.card').offsetWidth + 24;
    
    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
    
    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
    
    const checkScroll = () => {
        prevBtn.style.display = track.scrollLeft > 0 ? 'flex' : 'none';
        nextBtn.style.display = track.scrollLeft < (track.scrollWidth - track.clientWidth) ? 'flex' : 'none';
    };
    
    track.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();
}

// COMPTEURS ANIMÉS 

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const suffix = counter.textContent.includes('%') ? '%' : '';
                        const start = 0;
                        const duration = 2000;
                        
                        let current = start;
                        const increment = target / (duration / 16);
                        
                        const updateCounter = () => {
                            current += increment;
                            
                            if (current < target) {
                                counter.textContent = Math.ceil(current) + suffix;
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target + suffix;
                            }
                        };
                        
                        updateCounter();
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
});


// GESTION DE LA VIDEO 

document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.querySelector('.play-btn');
    const videoSection = document.querySelector('.video-section');
    const video = document.getElementById('institutional-video');
    
    if (playBtn && videoSection && video) {
        playBtn.addEventListener('click', () => {
            videoSection.classList.add('video-playing');
            video.play().catch(err => {
                console.log("Erreur de lecture auto :", err);
            });
        });
        
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
                videoSection.classList.remove('video-playing');
            }
        });
        
        video.addEventListener('contextmenu', e => e.preventDefault());
    }
});


// MACHINE À ÉCRIRE

document.addEventListener('DOMContentLoaded', () => {
    const nomElement = document.querySelector('.nom');
    const sloganElement = document.querySelector('.slogan');
    
    if (nomElement && sloganElement) {
        const nomText = "Bienvenue à l'Esi";
        let nomIndex = 0;
        
        function typeNom() {
            if (nomIndex < nomText.length) {
                nomElement.textContent += nomText.charAt(nomIndex);
                nomIndex++;
                setTimeout(typeNom, 100);
            } else {
                setTimeout(() => {
                    sloganElement.style.display = 'block';
                }, 300);
            }
        }
        
        setTimeout(typeNom, 500);
    }
});

// ANIMATIONS DES CARTES
document.addEventListener('DOMContentLoaded', () => {
    const cartes = document.querySelectorAll('.p1, .p2, .p3');
    
    cartes.forEach((carte, index) => {
        setTimeout(() => {
            carte.classList.add('visible');
        }, index * 500);
    });
});

// PREMIÈRE SECTION MISSION (TON CODE EXISTANT)

document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.querySelector('.mission_main_image');
    const sideImages = document.querySelector('.mission_side_images');
    const textContent = document.querySelector('.mission_text');
    
    if (mainImage && sideImages && textContent) {
        setTimeout(() => {
            mainImage.classList.add('visible');
            mainImage.querySelector('img').classList.add('visible');
        }, 300);
        
        setTimeout(() => {
            sideImages.classList.add('visible');
            sideImages.querySelectorAll('img').forEach(img => img.classList.add('visible'));
        }, 800);
        
        setTimeout(() => {
            textContent.classList.add('visible');
        }, 1400);
    }
});


// SECTION MISSION 2 
document.addEventListener('DOMContentLoaded', () => {
    const imageMission = document.querySelector('.image_mission');
    const texteMission = document.querySelector('.texte_mission');
    
    if (imageMission && texteMission) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        imageMission.classList.add('visible');
                    }, 200);
                    
                    setTimeout(() => {
                        texteMission.classList.add('visible');
                    }, 900);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.25
        });
        
        const section = document.querySelector('.section_mission');
        if (section) {
            observer.observe(section);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const imageGauche = document.querySelector('.image-gauche');
    const texteDroite = document.querySelector('.texte-droite');
    
    if (imageGauche && texteDroite) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        imageGauche.classList.add('visible');
                    }, 200);
                    
                    setTimeout(() => {
                        texteDroite.classList.add('visible');
                    }, 900);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.25
        });
        
        const section = document.querySelector('.simple-alternée');
        if (section) {
            observer.observe(section);
        }
    }
});


// CARTES UNIVERSITAIRES

document.addEventListener('DOMContentLoaded', () => {
    const titre = document.querySelector('.universitaires_titre');
    const cartes = document.querySelectorAll('.cartes');
    const btnGlobal = document.querySelector('.universitaires_btn_global');
    
    if (titre && cartes.length > 0 && btnGlobal) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        titre.classList.add('visible');
                    }, 200);
                    
                    setTimeout(() => {
                        cartes[0].classList.add('visible');
                    }, 700);
                    
                    setTimeout(() => {
                        cartes[1].classList.add('visible');
                    }, 1100);
                    
                    setTimeout(() => {
                        btnGlobal.classList.add('visible');
                    }, 1600);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        const section = document.querySelector('.universitaires_section');
        if (section) {
            observer.observe(section);
        }
    }
});


// CAROUSEL ANIMÉ 

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (track && cards.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        const cardWidth = 350;
        const totalCards = cards.length;
        const visibleCards = Math.floor(window.innerWidth / cardWidth) || 3;
        
        function moveCarousel() {
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
        
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
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 400);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        const section = document.querySelector('.carousel-section');
        if (section) observer.observe(section);
    }
});

// MACHINE À ÉCRIRE TÉMOIGNAGES

document.addEventListener('DOMContentLoaded', () => {
    const subtitleText = "COUP DE PROJECTEUR SUR LES ANCIENS ÉLÈVES";
    const titleText = "Ce que disent nos anciens étudiants";
    
    function typeWriter(element, text, speed, callback) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
                i++;
                setTimeout(type, speed);
            } else {
                element.innerHTML = text;
                if (callback) callback();
            }
        }
        
        type();
    }
    
    function startTypewriter() {
        const subtitleEl = document.getElementById('subtitle');
        const titleEl = document.getElementById('title');
        
        if (subtitleEl && titleEl) {
            typeWriter(subtitleEl, subtitleText, 30, () => {
                setTimeout(() => {
                    typeWriter(titleEl, titleText, 40);
                }, 200);
            });
        }
    }
    
    const section = document.querySelector('.subtitle')?.parentElement || document.body;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTypewriter();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(section);
});