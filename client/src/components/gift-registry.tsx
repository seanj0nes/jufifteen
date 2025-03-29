import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

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

export function GiftRegistry() {
  return (
    <Card className="bg-black/50 border-primary/20">
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CardTitle className="text-center text-white flex items-center justify-center gap-2">
            <motion.div initial="rest" whileHover="hover" animate="rest">
              <motion.div variants={iconAnimation}>
                <Gift className="w-5 h-5" />
              </motion.div>
            </motion.div>
            Regalitos
          </CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent className="text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-white/80 mb-6"
        >
          Tu presencia en mi fiesta es el mejor regalo. Sin embargo, si queres
          darme algo, acá algunas sugerencias:
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="block md:hidden"
          >
            <motion.div variants={buttonAnimation}>
              <Button
                variant="outline"
                className="w-full relative overflow-hidden group"
                onClick={() =>
                  window.open(
                    "mercadopago://sendmoney?receiver_alias=regalo.cumple.mp&amount=50000",
                    "_blank",
                  )
                }
              >
                <motion.span
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-primary/20"
                />
                <span className="relative">
                  Hace click para hacer el regalo desde Mercado Pago
                </span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="hidden md:block"
          >
            <motion.div variants={buttonAnimation}>
              <span className="relative">
                Podes transferirme a: 🔗 <strong>Alias CVU:</strong>{" "}
                <code>regalo.cumple.mp</code>
              </span>
            </motion.div>
          </motion.div>

          <motion.div initial="rest" whileHover="hover" animate="rest">
            <motion.div variants={buttonAnimation}>
              <Button
                variant="outline"
                className="w-full relative overflow-hidden group"
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
                  className="absolute inset-0 bg-primary/20"
                />
                <span className="relative">O elegíme un Charm de Pandora</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
