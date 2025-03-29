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
      ease: "easeOut",
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const imageAnimation = {
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
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
          <CardTitle className="text-center text-white">Dress Code</CardTitle>
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
          <motion.div variants={itemAnimation} className="text-center">
            <motion.div
              variants={imageAnimation}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1569388330292-79cc1ec67270"
                alt="Vestimenta Formal"
                className="rounded-lg mb-4 w-full"
                whileHover={{
                  filter: "brightness(1.2)",
                  transition: { duration: 0.3 },
                }}
              />
            </motion.div>
            <h3 className="text-primary font-semibold mb-2">
              Vestimenta de Gala
            </h3>
            <p className="text-white/80">
              Cae de traje o vestido bien L-gante y llamativo.
            </p>
          </motion.div>

          <motion.div variants={itemAnimation} className="text-center">
            <motion.div
              variants={imageAnimation}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1702661159134-2e8d4dcf0231"
                alt="Colores"
                className="rounded-lg mb-4 w-full"
                whileHover={{
                  filter: "brightness(1.2)",
                  transition: { duration: 0.3 },
                }}
              />
            </motion.div>
            <h3 className="text-primary font-semibold mb-2">
              Que colores elijo?
            </h3>
            <p className="text-white/80">
              Brillá con las luces de neon! Trae muchos colores!
            </p>
          </motion.div>

          <motion.div variants={itemAnimation} className="text-center">
            <motion.div
              variants={imageAnimation}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <a
                href="https://open.spotify.com/playlist/5CFX3UkqlvObM40Izck5Uf?si=_FcDv80xRbe6cUwrTKkicA&pt=d4d8b7d14295978949e67509c9945419&pi=8LVc4j7pSWGVv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa"
                  alt="Playlist Colaborativa"
                  className="rounded-lg mb-4 w-full"
                  whileHover={{
                    filter: "brightness(1.2)",
                    transition: { duration: 0.3 },
                  }}
                />
              </a>
            </motion.div>
            <h3 className="text-primary font-semibold mb-2">
              Playlist Colaborativa
            </h3>
            <p className="text-white/80">
              ¡Agrega tus canciones favoritas a mi playlist para que suene en la
              fiesta!
            </p>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
