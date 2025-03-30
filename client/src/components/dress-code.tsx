import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Music, Sparkles } from "lucide-react";
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
  hidden: { scale: 0.7, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Datos para la sección de código de vestimenta
const dressCodeItems = [
  {
    icon: <Scissors className="w-10 h-10 text-[#b98f71] mb-3" />,
    title: "Dress Code: Elegante",
    description:
      "Traje, vestido o conjunto que te haga brillar. ¡Es noche de pasarela!",
    image: "/images/dress-code/formal-new.png",
  },
  {
    icon: <Sparkles className="w-10 h-10 text-[#b98f71] mb-3" />,
    title: "Colores Sugeridos",
    description:
      "Tonos de rosa, fucsia y colores billantes para quedar a tono :P",
    image: "/images/dress-code/colors-new.svg",
  },
  {
    icon: <Music className="w-10 h-10 text-[#b98f71] mb-3" />,
    title: "Playlist Colaborativa",
    description:
      "¡Sumá tus canciones favoritas a mi playlist para que suenen en la fiesta!",
    image: "/images/dress-code/earphones.jpeg",
    link: "https://open.spotify.com/playlist/5CFX3UkqlvObM40Izck5Uf?si=5zgc_NtZR6mSnxw8iFSoTQ&pi=ynNSKilXSj6UK&pt=e217ecca928fb04720c6a7529d4483d7",
  },
];

export function DressCode() {
  return (
    <div className="py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            className="text-3xl md:text-4xl text-center font-['Cormorant_Garamond'] font-light text-[#b98f71] mb-12"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
          >
            Código de Vestimenta
          </h2>
        </motion.div>

        <motion.div
          variants={containerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {dressCodeItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemAnimation}
              className="text-center"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="h-full bg-gradient-to-br from-black/70 to-black/40 border border-[#b98f71]/30 overflow-hidden shadow-xl">
                <CardContent className="p-6 flex flex-col items-center h-full">
                  <motion.div
                    variants={imageAnimation}
                    className="relative w-full h-52 mb-6 overflow-hidden rounded-lg"
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                        <div className="absolute bottom-3 left-0 right-0 text-center text-white text-sm z-20">
                          Clic para abrir playlist
                        </div>
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`w-full h-full transition-transform duration-500 hover:scale-110 hover:filter hover:brightness-110 ${
                            item.image.includes('formal-new') 
                              ? 'object-contain bg-gradient-to-br from-[#181818] to-[#0c0c0c] p-1' 
                              : 'object-cover'
                          }`}
                        />
                      </a>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${
                            item.image.includes('formal-new') 
                              ? 'object-contain bg-gradient-to-br from-[#181818] to-[#0c0c0c] p-1' 
                              : 'object-cover'
                          }`}
                        />
                      </>
                    )}
                  </motion.div>

                  <div className="flex-grow">
                    {item.icon}
                    <h3
                      className="text-[#b98f71] font-['Cormorant_Garamond'] font-semibold text-xl mb-3"
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-white/80">{item.description}</p>
                  </div>

                  {/* Flash de cámara efecto */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 opacity-0"
                    whileHover={{ opacity: 1, transition: { duration: 0.2 } }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
