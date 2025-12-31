document.addEventListener('DOMContentLoaded', () => {

    // =============== FAQ ACCORDÉON ===============
    const faqButtons = document.querySelectorAll('.faq-question');

    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle la classe active sur le bouton
            button.classList.toggle('active');

            // Récupère la réponse juste après le bouton
            const answer = button.nextElementSibling;

            // Toggle la classe active sur la réponse
            answer.classList.toggle('active');
        });
    });

    // =============== AUTRES ANIMATIONS (si tu les gardes) ===============

    // Effet machine à écrire (si tu l'utilises toujours)
    const textElement = document.getElementById('typing-text');
    if (textElement) {
        const cursor = document.querySelector('.cursor');
        const fullText = `À l’ESI, nous offrons des programmes conçus pour préparer nos étudiants aux défis du monde professionnel et technologique.\nLa filière STIC forme aux technologies numériques et à la communication digitale.\nLa filière STGI prépare aux métiers de l’industrie, de la production et de l’innovation technologique.\nEnsemble, ces formations allient théorie, pratique et projets concrets pour former des professionnels compétents et responsables.`;

        let index = 0;
        const typingSpeed = 40;
        const lineBreakDelay = 600;

        function typeWriter() {
            if (index < fullText.length) {
                textElement.textContent += fullText.charAt(index);
                index++;
                if (fullText.charAt(index - 1) === '\n') {
                    setTimeout(typeWriter, lineBreakDelay);
                } else {
                    setTimeout(typeWriter, typingSpeed);
                }
            } else {
                cursor.style.animation = 'none';
                cursor.style.opacity = '0';
            }
        }

        setTimeout(typeWriter, 800);
    }

    // Animation au scroll (fade-up)
    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Boutons "Voir le programme détaillé" (accordéon programmes)
    const detailButtons = document.querySelectorAll('.btn-details');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const target = document.getElementById(targetId);
            target.classList.toggle('active');
            btn.textContent = target.classList.contains('active') ? 'Masquer le programme' : 'Voir le programme détaillé';
        });
    });

});