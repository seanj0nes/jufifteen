import { Howl } from "howler";

let backgroundMusic: Howl | null = null;

export function setupBackgroundAudio() {
  backgroundMusic = new Howl({
    src: ["https://cdn.pixabay.com/download/audio/2022/03/23/audio_c8c8a73941.mp3?filename=fashion-electro-groove-15348.mp3"],
    loop: true,
    volume: 0.25,
    autoplay: false,
  });

  const playButton = document.createElement("button");
  playButton.innerHTML = "🎵";
  playButton.className = "fixed bottom-4 right-4 bg-primary/80 hover:bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-50 transition-all duration-300 transform hover:scale-110";

  let isPlaying = false;

  playButton.onclick = () => {
    if (isPlaying) {
      backgroundMusic?.pause();
      playButton.innerHTML = "🎵";
      playButton.classList.remove("animate-pulse");
    } else {
      backgroundMusic?.play();
      playButton.innerHTML = "⏸";
      playButton.classList.add("animate-pulse");
    }
    isPlaying = !isPlaying;
  };

  // Agregar tooltip
  playButton.title = "Música de fondo";

  // Fade in/out al pasar el mouse
  playButton.onmouseenter = () => {
    if (backgroundMusic) {
      playButton.style.opacity = "1";
    }
  };

  playButton.onmouseleave = () => {
    if (backgroundMusic && !isPlaying) {
      playButton.style.opacity = "0.8";
    }
  };

  document.body.appendChild(playButton);

  return () => {
    backgroundMusic?.unload();
    playButton.remove();
  };
}