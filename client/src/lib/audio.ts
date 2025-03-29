import { Howl } from "howler";

let backgroundMusic: Howl | null = null;

// Lista de pistas de audio con temática de desfile de moda
const runwayTracks = [
  {
    url: "https://cdn.pixabay.com/download/audio/2021/10/25/audio_17ac0ede0a.mp3?filename=fashion-show-146235.mp3",
    title: "Runway Beats"
  },
  {
    url: "https://cdn.pixabay.com/download/audio/2022/03/23/audio_c8c8a73941.mp3?filename=fashion-electro-groove-15348.mp3",
    title: "Fashion Electro"
  },
  {
    url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_42a3ddc56e.mp3?filename=fashion-pop-fashion-show-background-music-30-second-9886.mp3",
    title: "Fashion Pop"
  }
];

export function setupBackgroundAudio() {
  // Seleccionar aleatoriamente una pista para variar la experiencia
  const selectedTrack = runwayTracks[Math.floor(Math.random() * runwayTracks.length)];
  
  backgroundMusic = new Howl({
    src: [selectedTrack.url],
    loop: true,
    volume: 0.3,
    autoplay: false,
    html5: true, // Mejor streaming para archivos grandes
    preload: true, // Precargar para reproducción inmediata
  });

  // Crear contenedor para botón y etiqueta
  const audioControlContainer = document.createElement("div");
  audioControlContainer.className = "fixed bottom-4 right-4 flex items-center gap-2 z-50";
  
  // Crear botón de reproducción
  const playButton = document.createElement("button");
  playButton.innerHTML = "🎵";
  playButton.className = "bg-primary/80 hover:bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110";
  
  // Etiqueta para mostrar la pista actual (opcional)
  const trackLabel = document.createElement("div");
  trackLabel.className = "bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 transition-opacity duration-300";
  trackLabel.textContent = selectedTrack.title;
  
  // Estado de reproducción
  let isPlaying = false;

  playButton.onclick = () => {
    if (isPlaying) {
      backgroundMusic?.fade(0.3, 0, 800);
      setTimeout(() => {
        backgroundMusic?.pause();
      }, 800);
      playButton.innerHTML = "🎵";
      playButton.classList.remove("animate-pulse");
    } else {
      backgroundMusic?.play();
      backgroundMusic?.fade(0, 0.3, 1500);
      playButton.innerHTML = "⏸";
      playButton.classList.add("animate-pulse");
    }
    isPlaying = !isPlaying;
  };

  // Tooltip
  playButton.title = "Música de fondo";
  
  // Efectos de hover
  audioControlContainer.onmouseenter = () => {
    playButton.style.opacity = "1";
    trackLabel.style.opacity = "1";
  };

  audioControlContainer.onmouseleave = () => {
    if (!isPlaying) {
      playButton.style.opacity = "0.8";
    }
    trackLabel.style.opacity = "0";
  };

  // Añadir elementos al DOM
  audioControlContainer.appendChild(playButton);
  audioControlContainer.appendChild(trackLabel);
  document.body.appendChild(audioControlContainer);

  // Manejar errores de audio
  backgroundMusic.once('loaderror', () => {
    console.error('Error cargando el audio, intentando pista alternativa');
    // Si falla, intentar con otra pista
    if (backgroundMusic) {
      backgroundMusic.unload();
      const fallbackTrack = runwayTracks.find(t => t.url !== selectedTrack.url);
      if (fallbackTrack) {
        backgroundMusic = new Howl({
          src: [fallbackTrack.url],
          loop: true,
          volume: 0.3,
          autoplay: false,
        });
        trackLabel.textContent = fallbackTrack.title;
      }
    }
  });

  return () => {
    backgroundMusic?.unload();
    audioControlContainer.remove();
  };
}