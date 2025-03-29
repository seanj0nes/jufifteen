import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Star } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);
  
  // Estado para determinar la imagen de fondo según el tamaño de pantalla
  const [backgroundImage, setBackgroundImage] = useState("/images/hero/bg-large.png");
  
  // Función para actualizar la imagen de fondo en función del tamaño de pantalla
  useEffect(() => {
    const updateBackgroundImage = () => {
      const width = window.innerWidth;
      
      // Seleccionamos la imagen según el tamaño de pantalla
      if (width < 640) {
        setBackgroundImage("/images/hero/bg-small.png");
      } else if (width < 1024) {
        setBackgroundImage("/images/hero/bg-medium.png");
      } else {
        setBackgroundImage("/images/hero/bg-large.png");
      }
    };
    
    // Actualizar imagen al cargar y al cambiar el tamaño de pantalla
    updateBackgroundImage();
    window.addEventListener("resize", updateBackgroundImage);
    
    return () => {
      window.removeEventListener("resize", updateBackgroundImage);
    };
  }, []);
  
  // Creamos el enlace de Google Calendar
  const eventDate = new Date('2025-04-26T21:30:00');
  const eventEndDate = new Date(eventDate.getTime() + (5 * 60 * 60 * 1000)); // Asumimos 5 horas de duración
  
  const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Fiesta%20de%2015%20de%20Julieta&dates=${eventDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}/${eventEndDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}&details=¡Te%20espero%20en%20mis%2015!%20-%20Julieta&location=Salón%20Vonharv,%20Av.%2019%20entre%20511%20y%20514,%20B1900%20Gonnet,%20Provincia%20de%20Buenos%20Aires&sf=true`;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url("${backgroundImage}")`,
          scale,
        }}
      />
      
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80"></div>
      
      {/* Capa adicional para mayor contraste en la parte central donde está el texto */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-full h-1/2 bg-black/40 blur-md"></div>
      </div>

      {/* Efectos de flash de cámara */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.7, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 5 + i * 1.5,
              delay: i * 0.7,
            }}
            className="absolute w-20 h-20 bg-white/80 rounded-full blur-xl"
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + i * 12}%`,
            }}
          />
        ))}
      </div>
      
      {/* Estrellas animadas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-[#ffd8aa]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
              rotate: [0, 90]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 10,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Star className="w-3 h-3 fill-[#ffd8aa]" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center text-center"
        style={{ opacity }}
      >
        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-full px-6"
        >
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-light text-[#ffd8aa] mb-4"
            style={{ 
              textShadow: '0 4px 8px rgba(0,0,0,0.8)',
              letterSpacing: '0.05em'
            }}
          >
            Julieta
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-[#ffd8aa] to-transparent mx-auto my-4"
          />
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="text-2xl md:text-3xl font-light text-white mb-6"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
          >
            Mis 15 Años
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.7 }}
            className="text-lg md:text-xl text-white/80 max-w-lg mx-auto"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}
          >
            26 de Abril, 2025 • 21:30hs
          </motion.p>
        </motion.div>
        
        {/* Botón para agendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          className="mt-8"
        >
          <a 
            href={googleCalendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-[#ffd8aa] transition-all duration-300"
            style={{
              letterSpacing: '0.05em',
              textShadow: '0px 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            <Calendar className="w-5 h-5 drop-shadow-lg" />
            <span className="font-semibold">Agendar</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}