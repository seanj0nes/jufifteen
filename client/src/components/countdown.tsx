import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {Object.entries(timeLeft).map(([label, value]) => (
        <motion.div
          key={label}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setIsHovered(label)}
          onHoverEnd={() => setIsHovered(null)}
        >
          <Card className="bg-black/50 border-primary/20 overflow-hidden">
            <CardContent className="p-6 text-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={value}
                  variants={numberAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-4xl font-light text-primary mb-2"
                >
                  {value}
                </motion.div>
              </AnimatePresence>
              <motion.div 
                className="text-sm text-white/60 uppercase tracking-wider"
                animate={{
                  scale: isHovered === label ? 1.1 : 1,
                  color: isHovered === label ? "rgb(255, 255, 255)" : "rgb(255, 255, 255, 0.6)"
                }}
              >
                {label}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}