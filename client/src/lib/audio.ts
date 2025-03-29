import { Howl } from "howler";

let backgroundMusic: Howl | null = null;

// Lista de pistas de audio con temática de desfile de moda
// Usando la pista proporcionada por el cliente
const runwayTracks = [
  {
    url: "/audio/fashion-show.mp3", // Archivo proporcionado por el cliente
    title: "Fashion Gaga"
  }
];

export function setupBackgroundAudio() {
  // Usar un objeto para almacenar referencias a los elementos de la UI
  const ui = {
    container: null as HTMLDivElement | null,
    playButton: null as HTMLButtonElement | null,
    trackLabel: null as HTMLDivElement | null
  };
  
  // Estado
  let isPlaying = false;
  
  // Crear interfaz de usuario para control de audio
  function createAudioControls(trackTitle: string) {
    // Crear contenedor para botón y etiqueta
    const container = document.createElement("div");
    container.className = "fixed bottom-6 right-6 flex items-center gap-3 z-50 filter drop-shadow-2xl";
    
    // Crear botón de reproducción
    const playButton = document.createElement("button");
    playButton.innerHTML = "♪";
    playButton.className = "bg-black/80 hover:bg-black/90 text-[#ffd8aa] border border-[#ffd8aa]/30 rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 text-xl font-medium";
    
    // Etiqueta para mostrar la pista actual
    const trackLabel = document.createElement("div");
    trackLabel.className = "bg-black/70 text-[#ffd8aa] px-4 py-2 rounded-full text-sm opacity-0 transition-opacity duration-300 border border-[#ffd8aa]/20 text-shadow shadow-black";
    trackLabel.textContent = trackTitle;
    
    // Tooltip
    playButton.title = "Música de fondo";
    
    // Efectos de hover
    container.onmouseenter = () => {
      playButton.style.opacity = "1";
      trackLabel.style.opacity = "1";
    };

    container.onmouseleave = () => {
      if (!isPlaying) {
        playButton.style.opacity = "0.8";
      }
      trackLabel.style.opacity = "0";
    };
    
    // Añadir elementos al DOM
    container.appendChild(playButton);
    container.appendChild(trackLabel);
    document.body.appendChild(container);
    
    // Actualizar referencias UI
    ui.container = container;
    ui.playButton = playButton;
    ui.trackLabel = trackLabel;
    
    return { container, playButton, trackLabel };
  }
  
  // Función para reproducir/pausar música
  function setupPlayButton(howl: Howl) {
    if (!ui.playButton) return;
    
    ui.playButton.onclick = () => {
      if (isPlaying) {
        howl.fade(0.3, 0, 800);
        setTimeout(() => howl.pause(), 800);
        
        if (ui.playButton) {
          ui.playButton.innerHTML = "♪";
          ui.playButton.classList.remove("animate-pulse");
        }
      } else {
        howl.play();
        howl.fade(0, 0.3, 1500);
        
        if (ui.playButton) {
          ui.playButton.innerHTML = "II";
          ui.playButton.classList.add("animate-pulse");
        }
      }
      isPlaying = !isPlaying;
    };
  }
  
  // Función para iniciar reproducción con un track específico
  function initializeTrack(track: typeof runwayTracks[0]) {
    // Limpieza previa
    if (backgroundMusic) {
      backgroundMusic.unload();
      backgroundMusic = null;
    }
    
    // Crear nuevo reproductor
    backgroundMusic = new Howl({
      src: [track.url],
      loop: true,
      volume: 0.3,
      autoplay: false,
      html5: true,
      preload: true,
      format: ['mp3', 'mp4'], // Soporte para MP4 también
      xhr: {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    });
    
    // Crear controles si no existen
    if (!ui.container) {
      createAudioControls(track.title);
    } else if (ui.trackLabel) {
      ui.trackLabel.textContent = track.title;
    }
    
    // Configurar botón de reproducción
    if (ui.playButton) {
      setupPlayButton(backgroundMusic);
    }
    
    // Manejar errores
    backgroundMusic.on('loaderror', () => {
      console.warn(`Error cargando el audio: ${track.url}`);
      
      // Crear un mensaje amigable para el botón
      if (ui.playButton) {
        ui.playButton.innerHTML = "✕";
        ui.playButton.title = "Audio no disponible";
        ui.playButton.classList.add("opacity-50");
        ui.playButton.disabled = true;
      }
      
      if (ui.trackLabel) {
        ui.trackLabel.textContent = "Música no disponible";
        ui.trackLabel.style.opacity = "1";
      }
      
      // No intentar más pistas para evitar bucles de error
      console.info("Para habilitar el audio, coloque archivos MP3 en client/public/audio/");
    });
  }

  // Comenzar con una pista aleatoria
  const selectedTrack = runwayTracks[Math.floor(Math.random() * runwayTracks.length)];
  initializeTrack(selectedTrack);
  
  // Función de limpieza
  return () => {
    backgroundMusic?.unload();
    ui.container?.remove();
  };
}