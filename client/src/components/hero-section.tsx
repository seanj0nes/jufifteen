import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1591892150204-2f872745bc4b")',
          filter: 'brightness(0.4)'
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0], x: [0, 100, 200] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="absolute inset-0 bg-white/10"
      >
        {/* Simulated camera flashes */}
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-light tracking-wider text-white mb-6"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Sofia
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gold-400 tracking-widest"
        >
          QUINCEAÑERA
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-white/80"
        >
          July 15, 2024 • 6:00 PM
        </motion.div>
      </div>
    </div>
  );
}
