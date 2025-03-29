import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Gift, Sparkles, CreditCard, Diamond } from "lucide-react";

const buttonAnimation = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      type: "tween",
      ease: "easeInOut",
    },
  },
};

const iconAnimation = {
  rest: { rotate: 0 },
  hover: {
    rotate: 15,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 200,
    },
  },
};

// Variante de animación para el confeti
const confettiAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, staggerChildren: 0.1 },
};

// Componente de confeti decorativo
const Confetti = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            x: Math.random() * 100 - 50,
            y: -20,
            rotate: Math.random() * 360,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: Math.random() * 200 - 100,
            y: Math.random() * 200,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor:
              i % 3 === 0 ? "#ffd8aa" : i % 3 === 1 ? "#ff61ab" : "#000000",
            left: `${Math.random() * 100}%`,
            top: "-5%",
          }}
        />
      ))}
    </div>
  );
};

export function GiftRegistry() {
  return (
    <div className="relative py-10">
      <Confetti />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto mb-8"
      >
        <h2
          className="text-3xl md:text-4xl text-center font-light text-[#ffd8aa] flex items-center justify-center gap-3"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        >
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="inline-flex"
          >
            <motion.div variants={iconAnimation}>
              <Gift className="w-8 h-8 text-[#ffd8aa]" />
            </motion.div>
          </motion.div>
          Regalitos
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="inline-flex"
          >
            <motion.div variants={iconAnimation}>
              <Sparkles className="w-7 h-7 text-[#ffd8aa]" />
            </motion.div>
          </motion.div>
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-white/90 mb-8 text-center max-w-2xl mx-auto text-lg"
        >
          Tu presencia en mi fiesta es el mejor regalo. Sin embargo, si queres
          hacerme un presente, te dejo estas sugerencias:
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
          className="relative"
        >
          <Card className="bg-gradient-to-br from-black/70 to-black/40 border border-[#ffd8aa]/30 shadow-xl h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="mb-4 text-center">
                <CreditCard className="w-10 h-10 text-[#ffd8aa] mx-auto mb-3" />
                <h3
                  className="text-xl font-medium text-[#ffd8aa] mb-3"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                >
                  Aporte para mi viaje
                </h3>
                <p className="text-white/80 mb-6">
                  Si no sabes que regalarme, acá tenes mis datos para
                  transferirme:
                </p>

                <div className="bg-black/30 p-4 rounded-lg text-left mb-6">
                  <p className="mb-2 text-white/90">
                    <strong className="text-[#ffd8aa]">Alias CVU:</strong>{" "}
                    <span className="font-mono">Belenjulietamolina</span>
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="block md:w-full"
                >
                  <motion.div variants={buttonAnimation}>
                    <Button
                      variant="outline"
                      className="w-full relative overflow-hidden group border-[#ffd8aa] bg-black/50 hover:bg-black/70 text-[#ffd8aa]"
                      onClick={() =>
                        window.open(
                          "mercadopago://sendmoney?receiver_alias=Belenjulietamolina&amount=50000",
                          "_blank",
                        )
                      }
                    >
                      <motion.span
                        initial={{ x: "100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-[#ffd8aa]/10"
                      />
                      <span className="relative flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Abrí Mercado Pago
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
          className="relative"
        >
          <Card className="bg-gradient-to-br from-black/70 to-black/40 border border-[#ffd8aa]/30 shadow-xl h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="mb-4 text-center">
                <Diamond className="w-10 h-10 text-[#ffd8aa] mx-auto mb-3" />
                <h3
                  className="text-xl font-medium text-[#ffd8aa] mb-3"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                >
                  Un recuerdo especial
                </h3>
                <p className="text-white/80 mb-4">
                  Si preferís regalarme algo especial, me encantaría un Charm de
                  Pandora para mi colección
                </p>

                <div className="bg-black/30 p-4 rounded-lg text-left mb-6">
                  <p className="text-white/90">
                    Soy fan de los charms, especialmente los que tienen diseños
                    con onda.
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <motion.div initial="rest" whileHover="hover" animate="rest">
                  <motion.div variants={buttonAnimation}>
                    <Button
                      variant="outline"
                      className="w-full relative overflow-hidden group border-[#ffd8aa] bg-black/50 hover:bg-black/70 text-[#ffd8aa]"
                      onClick={() =>
                        window.open(
                          "https://www.pandoraoficial.com.ar/charms",
                          "_blank",
                        )
                      }
                    >
                      <motion.span
                        initial={{ x: "100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-[#ffd8aa]/10"
                      />
                      <span className="relative flex items-center gap-2">
                        <Diamond className="w-4 h-4" />
                        Mira los Charms de Pandora
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
