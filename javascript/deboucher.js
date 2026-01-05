document.addEventListener('DOMContentLoaded', () => {
    // Animation d'entrée pour le hero
    const heroTitle = document.querySelector('.esi_admission');
    const heroText = document.querySelector('#typing-text');
    
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

  
    const aosElements = document.querySelectorAll('[data-aos]');

    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    aosElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        aosObserver.observe(el);
    });


    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                const suffix = counter.nextElementSibling?.textContent.includes('%') ? '%' :
                               counter.nextElementSibling?.textContent.includes('FCFA') ? ' FCFA' : '+';

                let count = 0;
                const increment = target / 80;

                const timer = setInterval(() => {
                    count += increment;

                    if (count >= target) {
                        counter.textContent = target.toLocaleString('fr-FR') + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(count).toLocaleString('fr-FR') + suffix;
                    }
                }, 25);

                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => counterObserver.observe(counter));



    const carousels = document.querySelectorAll('.logo-carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.logo-track');
        
        if (track) {
            // Reset toutes les 30 secondes
            setInterval(() => {
                track.style.transition = 'none';
                track.style.transform = 'translateX(0)';
                void track.offsetHeight;
                track.style.transition = '';
            }, 30000);
        }
    });

   
    const textElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (textElement && cursor) {
        const originalText = textElement.textContent;
        textElement.textContent = '';
        
        let index = 0;
        const typingSpeed = 40;
        
        function typeWriter() {
            if (index < originalText.length) {
                textElement.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                cursor.style.animation = 'none';
                cursor.style.opacity = '0.5';
            }
        }
        
      
        setTimeout(typeWriter, 800);
    }
});