import { Howl } from "howler";

let backgroundMusic: Howl | null = null;

export function setupBackgroundAudio() {
  backgroundMusic = new Howl({
    src: ["https://assets.mixkit.co/music/preview/mixkit-elegant-fashion-show-soundtrack-818.mp3"],
    loop: true,
    volume: 0.3,
    autoplay: false,
  });

  const playButton = document.createElement("button");
  playButton.innerHTML = "🎵";
  playButton.className = "fixed bottom-4 right-4 bg-primary/80 hover:bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-50";
  
  let isPlaying = false;
  
  playButton.onclick = () => {
    if (isPlaying) {
      backgroundMusic?.pause();
      playButton.innerHTML = "🎵";
    } else {
      backgroundMusic?.play();
      playButton.innerHTML = "⏸";
    }
    isPlaying = !isPlaying;
  };

  document.body.appendChild(playButton);

  return () => {
    backgroundMusic?.unload();
    playButton.remove();
  };
}
