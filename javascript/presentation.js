// Fonction générique machine à écrire avec curseur clignotant
function machineAEcrire(element, texte, vitesse = 40) {
    let index = 0;
    element.innerHTML = '';

    function ecrire() {
        if (index < texte.length) {
            element.innerHTML = texte.substring(0, index + 1) + '<span class="curseur"></span>';
            index++;
            setTimeout(ecrire, vitesse);
        } else {
            element.innerHTML = texte; // curseur disparaît à la fin
        }
    }
    ecrire();
}

// Les textes
const texteEsiComplet = "L’ESI se consacre depuis plus de 20 ans à former des étudiants compétents et responsables, en combinant excellence académique, innovation technologique et accompagnement personnalisé pour préparer l’avenir de chacun.";

const texteComplet = "Découvrez les étudiants de l'ESI et leurs projets innovants qui font la fierté de notre école."; // variables conservées comme tu l’avais demandé

const texteDescription = "Nos principes guident chaque action et garantissent une formation de qualité, centrée sur la réussite et le développement de nos étudiants.";

document.addEventListener('DOMContentLoaded', () => {
    const elementEsi = document.getElementById('texteEsi');
    const elementDecouverte = document.getElementById('texteMachine');
    const elementDescription = document.getElementById('descriptionSection');

    // Fonction utilitaire pour observer un élément à 40% de visibilité
    function observerElement(element, callback) {
        if (!element) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback();
                    observer.unobserve(entry.target); // déclenche une seule fois
                }
            });
        }, {
            threshold: 0.4 // 40% de l’élément visible
        });

        // On observe l’élément lui-même ou son parent pour plus de fiabilité
        observer.observe(element.parentElement || element);
    }

    // 1. Texte ESI 20 ans
    observerElement(elementEsi, () => {
        machineAEcrire(elementEsi, texteEsiComplet, 70);
    });

    // 2. Texte "Découvrez les étudiants..." (avec tes variables d’origine conservées)
    observerElement(elementDecouverte, () => {
        let i = 0; // variable conservée comme demandé
        function ecrireTexte() {
            if (i < texteComplet.length) {
                elementDecouverte.innerHTML = texteComplet.substring(0, i + 1) + '<span class="curseur"></span>';
                i++;
                setTimeout(ecrireTexte, 60);
            } else {
                elementDecouverte.innerHTML = texteComplet;
            }
        }
        ecrireTexte();
    });

    // 3. Texte "Nos principes guident..."
    observerElement(elementDescription, () => {
        machineAEcrire(elementDescription, texteDescription, 35);
    });
}); 






//CARROUSEL+2MACHINE à ecire 

const elementTexte = document.getElementById('texteMachine');
let i = 0;

function ecrireTexte() {
    if (i < texteComplet.length) {
        // Ajoute le caractère + curseur clignotant
        elementTexte.innerHTML = texteComplet.substring(0, i + 1) + '<span class="curseur"></span>';
        i++;
        setTimeout(ecrireTexte, 60);
    } else {
        // À la fin : on enlève le curseur
        elementTexte.innerHTML = texteComplet;
    }
}

// Démarrage
   ecrireTexte(); // Démarre l'effet au chargement

    // Carrousel
    const liste = document.getElementById('liste');
    const elements = document.querySelectorAll('.carrousel-element');
    const btnPrecedent = document.querySelector('.precedent');
    const btnSuivant = document.querySelector('.suivant');
    const conteneurIndicateurs = document.getElementById('indicateurs');

    let indexActuel = 0;
    const total = elements.length;

    // Création des points
    for (let j = 0; j < total; j++) {
      const point = document.createElement('div');
      point.classList.add('indicateur');
      if (j === 0) point.classList.add('actif');
      point.addEventListener('click', () => allerVers(j));
      conteneurIndicateurs.appendChild(point);
    }

    const points = document.querySelectorAll('.indicateur');

    function mettreAJour() {
      liste.style.transform = `translateX(-${indexActuel * 100}%)`;
      points.forEach((p, idx) => p.classList.toggle('actif', idx === indexActuel));
    }

    function allerVers(nouveauIndex) {
      indexActuel = nouveauIndex;
      if (indexActuel < 0) indexActuel = total - 1;
      if (indexActuel >= total) indexActuel = 0;
      mettreAJour();
    }

    btnSuivant.addEventListener('click', () => allerVers(indexActuel + 1));
    btnPrecedent.addEventListener('click', () => allerVers(indexActuel - 1));

    // Navigation clavier
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') allerVers(indexActuel + 1);
      if (e.key === 'ArrowLeft') allerVers(indexActuel - 1);
    });

    // Swipe tactile
    let debutX = 0;
    const container = document.querySelector('.carrousel-container');
    container.addEventListener('touchstart', e => debutX = e.touches[0].clientX);
    container.addEventListener('touchend', e => {
      const finX = e.changedTouches[0].clientX;
      if (debutX - finX > 50) allerVers(indexActuel + 1);
      if (finX - debutX > 50) allerVers(indexActuel - 1);
    });


//troisieme machine à ecrireconst texteDescription = "Nos principes guident chaque action et garantissent une formation de qualité, centrée sur la réussite et le développement de nos étudiants.";

function machineAEcrireDescription(element, texte, vitesse) {
    let index = 0;
    element.innerHTML = '';

    function ecrire() {
        if (index < texte.length) {
            element.innerHTML = texte.substring(0, index + 1) + '<span class="curseur"></span>';
            index++;
            setTimeout(ecrire, vitesse);
        } else {
            element.innerHTML = texte;
        }
    }
    
    ecrire();
}

document.addEventListener('DOMContentLoaded', () => {
    const elementDescription = document.getElementById('descriptionSection');
    
    // Démarre au chargement ou au scroll (décommente l'Observer si besoin)
    machineAEcrireDescription(elementDescription, texteDescription, 35);
});



//pour l'animation photo

document.addEventListener("DOMContentLoaded", () => {
    const imageDiv = document.querySelector('.autre .image');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Déclenche une seule fois
        }
      });
    }, { threshold: 0.2 }); // Déclenche quand 20% visible

    observer.observe(imageDiv);
  });