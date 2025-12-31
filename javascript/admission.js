document.addEventListener("DOMContentLoaded", function() {
    const etapes = document.querySelectorAll(".etape");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.2 // 20% de l'élément visible pour déclencher
    });

    etapes.forEach(etape => observer.observe(etape));
});