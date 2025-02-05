import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

  return (
    <div className="relative h-screen overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1591892150204-2f872745bc4b")',
          filter: 'brightness(0.4)',
          scale,
        }}
      />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-white/20"
      >
        {/* Simulated camera flashes */}
      </motion.div>

      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center text-center"
        style={{ opacity }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2,
            delay: 0.3,
            ease: "easeOut"
          }}
          className="text-6xl md:text-8xl font-light tracking-wider text-white mb-6"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Julieta
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8,
            delay: 1,
            ease: "easeOut"
          }}
          className="text-xl md:text-2xl text-primary tracking-widest"
        >
          MIS 15
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 1,
            delay: 1.5,
            ease: "easeOut"
          }}
          className="mt-8 text-white/80"
        >
          26 de Abril, 2025 • 21:30 HS
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-white/60"
          >
            ↓ Scroll para más información
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}