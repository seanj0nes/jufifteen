
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background runway image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1621784563330-caee0b138a00")',
          filter: 'brightness(0.3)',
          scale,
        }}
      />

      {/* Runway lights effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.4, 0],
          scaleX: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent"
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

      {/* Model silhouette */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute left-0 bottom-0 w-96 h-screen"
      >
        <div 
          className="h-full w-full bg-contain bg-bottom bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1625204614387-6509254d5b02")',
            filter: 'brightness(0) invert(1) opacity(0.7)',
          }}
        />
      </motion.div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center text-center"
        style={{ opacity }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-6xl md:text-8xl font-light tracking-wider text-white mb-6"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Julieta
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-xl md:text-2xl text-primary tracking-widest"
        >
          MIS 15
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8 text-white/80"
        >
          26 de Abril, 2025 • 21:30 HS
        </motion.div>
      </motion.div>
    </div>
  );
}
