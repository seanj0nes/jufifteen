import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Traducciones en español para las etiquetas
const labelTranslations: Record<string, string> = {
  days: "días",
  hours: "horas",
  minutes: "minutos",
  seconds: "segundos"
};

const numberAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export function Countdown({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    const targetDate = new Date(date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Si la fecha ya pasó, mostramos ceros
      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="p-4 rounded-xl bg-gradient-to-b from-black/50 to-black/30 backdrop-blur-sm border border-[#ffd8aa]/20">
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-2xl md:text-3xl font-light text-[#ffd8aa] mb-8"
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}
      >
        Cuenta regresiva para el gran día
      </motion.h3>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {Object.entries(timeLeft).map(([label, value], index) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovered(label)}
            onHoverEnd={() => setIsHovered(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Card className="bg-gradient-to-br from-black/70 to-black/40 border border-[#ffd8aa]/30 overflow-hidden shadow-xl">
              <CardContent className="p-6 text-center relative">
                {/* Círculo decorativo de fondo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#ffd8aa]/5 absolute"></div>
                </div>
                
                {/* Flash de cámara en hover */}
                {isHovered === label && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.2, 0] }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-white rounded-full"
                  />
                )}
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={value}
                    variants={numberAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-5xl font-light text-[#ffd8aa] mb-2"
                    style={{ 
                      fontFamily: '"Cormorant Garamond", serif',
                      textShadow: '0px 2px 4px rgba(0,0,0,0.5)'
                    }}
                  >
                    {value.toString().padStart(2, '0')}
                  </motion.div>
                </AnimatePresence>
                
                <motion.div 
                  className="text-sm text-white/70 uppercase tracking-wider font-medium"
                  animate={{
                    scale: isHovered === label ? 1.1 : 1,
                    color: isHovered === label ? "#ffd8aa" : "rgba(255, 255, 255, 0.7)"
                  }}
                >
                  {labelTranslations[label] || label}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}