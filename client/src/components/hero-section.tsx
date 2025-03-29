import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar } from "lucide-react";

export function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);
  
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
          backgroundImage: 'url("https://images.unsplash.com/photo-1621784563330-caee0b138a00")',
          filter: 'brightness(0.4)',
          scale,
        }}
      />

      {/* Camera flash effects */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2 + i,
              delay: i * 0.7,
            }}
            className="absolute w-20 h-20 bg-white/80 rounded-full blur-xl"
            style={{
              left: `${30 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center text-center"
        style={{ opacity }}
      >
        {/* Logo Julieta (usando la imagen PNG) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md px-4"
        >
          <img 
            src="/images/juli-logo.png" 
            alt="Julieta - Mis 15" 
            className="w-full h-auto"
          />
        </motion.div>
        
        {/* Add to calendar button */}
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
            className="flex items-center gap-2 border border-[#a67b60]/60 bg-[#a67b60]/10 hover:bg-[#a67b60]/30 text-[#a67b60] px-4 py-2 rounded-md transition-all duration-300"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              letterSpacing: '0.05em'
            }}
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}