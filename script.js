const drumPads = document.querySelectorAll('.drum-pad');
const display = document.getElementById('display');

// Funkcja pomocnicza do animacji i wyświetlania tekstu
function playSoundAndAnimate(pad) {
    const audio = pad.querySelector('audio');
    if (!audio) return;

    // Reset i odtwarzanie dźwięku
    audio.currentTime = 0;
    audio.play();

    // Aktualizacja wyświetlacza
    display.innerText = pad.id;

    // Dodanie klasy dla efektu wizualnego
    pad.classList.add('active-pad');
    
    // Usunięcie klasy po 100ms (żeby przycisk "odskoczył")
    setTimeout(() => {
        pad.classList.remove('active-pad');
    }, 100);
}

// Obsługa kliknięcia myszką
drumPads.forEach(pad => {
    pad.addEventListener("click", () => {
        playSoundAndAnimate(pad);
    });
});

// Obsługa klawiatury
document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    const audio = document.getElementById(key);
    
    if (audio && audio.classList.contains('clip')) {
        const parentPad = audio.parentElement;
        playSoundAndAnimate(parentPad);
    }
});