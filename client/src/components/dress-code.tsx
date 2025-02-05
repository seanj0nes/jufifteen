import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const imageAnimation = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export function DressCode() {
  return (
    <Card className="bg-black/50 border-primary/20">
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <CardTitle className="text-center text-white">Código de Vestimenta</CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.div 
          variants={containerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={itemAnimation}
            className="text-center"
          >
            <motion.div
              variants={imageAnimation}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1569388330292-79cc1ec67270"
                alt="Vestimenta Formal"
                className="rounded-lg mb-4 w-full"
                whileHover={{ 
                  filter: "brightness(1.2)",
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
            <h3 className="text-primary font-semibold mb-2">Vestimenta de Gala</h3>
            <p className="text-white/80">Se sugiere traje formal para caballeros y vestido de gala para damas.</p>
          </motion.div>

          <motion.div
            variants={itemAnimation}
            className="text-center"
          >
            <motion.div
              variants={imageAnimation}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1559563458-527698bf5295"
                alt="Paleta de Colores"
                className="rounded-lg mb-4 w-full"
                whileHover={{ 
                  filter: "brightness(1.2)",
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
            <h3 className="text-primary font-semibold mb-2">Paleta de Colores</h3>
            <p className="text-white/80">Se sugieren tonos dorados, negros y fucsia para mantener la armonía del evento.</p>
          </motion.div>

          <motion.div
            variants={itemAnimation}
            className="text-center"
          >
            <motion.div
              variants={imageAnimation}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img 
                src="https://images.unsplash.com/3/www.madebyvadim.com.jpg"
                alt="Accesorios"
                className="rounded-lg mb-4 w-full"
                whileHover={{ 
                  filter: "brightness(1.2)",
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
            <h3 className="text-primary font-semibold mb-2">Accesorios</h3>
            <p className="text-white/80">Se invita a complementar el atuendo con joyería y accesorios elegantes.</p>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}