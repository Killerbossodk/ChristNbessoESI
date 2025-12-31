document.addEventListener('DOMContentLoaded', () => {

    /* =============================================
       1. Animation au scroll (fade-up + translateY)
       ============================================= */
    const aosElements = document.querySelectorAll('[data-aos]');

    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optionnel : on peut unobserve pour gagner en perf
                // aosObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    aosElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        aosObserver.observe(el);
    });


    /* =============================================
       2. Animation des compteurs (stats)
       ============================================= */
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                const suffix = counter.nextElementSibling?.textContent.includes('%') ? '%' :
                               counter.nextElementSibling?.textContent.includes('FCFA') ? ' FCFA' : '+';

                let count = 0;
                const increment = target / 80; // ajuste la vitesse (plus petit = plus rapide)

                const timer = setInterval(() => {
                    count += increment;

                    if (count >= target) {
                        counter.textContent = target.toLocaleString('fr-FR') + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(count).toLocaleString('fr-FR') + suffix;
                    }
                }, 25);

                // On n'observe plus cet élément (animation unique)
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => counterObserver.observe(counter));


    const carousels = document.querySelectorAll('.logo-carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.logo-track');

        // Reset toutes les 30 secondes pour éviter les micro-sauts sur mobile
        // (quand l'animation CSS arrive à -50% et boucle)
        setInterval(() => {
            track.style.transition = 'none';           // désactive la transition
            track.style.transform = 'translateX(0)';   // revient au début instantanément
            void track.offsetHeight;                   // force le reflow (obligatoire pour que le navigateur recalcule)
            track.style.transition = '';               // réactive la transition CSS
        }, 30000); // doit correspondre à la durée totale de l'animation CSS (30s dans ton CSS)
    });

});

// EFFET MACHINE À ÉCRIRE
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    
    const fullText = `Les diplômés de l’ESI sont hautement recherchés sur le marché de l’emploi national et international.
Formés dans des filières d’excellence (informatique, mécanique, électrotechnique ,  etc.), ils occupent des postes à responsabilité dans tous les secteurs clés du développement.`;

    let index = 0;
    const typingSpeed = 40; // vitesse en ms par caractère (plus petit = plus rapide)
    const lineBreakDelay = 600; // pause après un retour à la ligne

    function typeWriter() {
        if (index < fullText.length) {
            // Ajoute le caractère actuel
            textElement.textContent += fullText.charAt(index);
            index++;

            // Si c'est un retour à la ligne, on fait une petite pause
            if (fullText.charAt(index - 1) === '\n') {
                setTimeout(typeWriter, lineBreakDelay);
            } else {
                setTimeout(typeWriter, typingSpeed);
            }
        } else {
            // Fin du texte : on peut faire disparaître le curseur ou le laisser
            cursor.style.animation = 'none';
            cursor.style.opacity = '0';
        }
    }

    // Démarre l'animation après un petit délai (pour laisser la page charger)
    setTimeout(typeWriter, 800);
});