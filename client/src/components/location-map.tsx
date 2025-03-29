import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";

export function LocationMap() {
  // Coordenadas precisas del salón
  const latitude = -34.898179;
  const longitude = -58.007288;
  
  // Enlace para abrir Google Maps con las coordenadas
  const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
  
  // Enlace para abrir navegación en Waze
  const wazeLink = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;

  return (
    <Card className="bg-gradient-to-br from-black/70 to-black/50 border border-[#ffd8aa]/30 shadow-xl">
      <CardHeader className="pb-2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <CardTitle className="text-center text-[#ffd8aa] text-2xl md:text-3xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Te espero acá
          </CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="aspect-video relative rounded-xl overflow-hidden shadow-xl"
        >
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.0368753028854!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e7cc046e9479%3A0x212885f191e1227b!2sSal%C3%B3n%20Vonharv!5e0!3m2!1ses!2sar!4v1711742196387!5m2!1ses!2sar`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-4 text-center text-white/90"
        >
          <p className="flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 text-[#ffd8aa]" />
            <span className="font-semibold text-[#ffd8aa] text-lg">Salón Vonharv</span>
          </p>
          <p className="mt-2 text-white/80">
            Av. 19 entre 511 y 514, B1900 Gonnet, Provincia de Buenos Aires
          </p>
          
          {/* Botones de navegación */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a 
              href={googleMapsLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black/50 text-white px-4 py-2 rounded-md border border-white/20 transition-all hover:bg-black/70 hover:border-white/40"
            >
              <Navigation className="w-4 h-4" />
              <span>Abrir en Google Maps</span>
            </a>
            <a 
              href={wazeLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black/50 text-white px-4 py-2 rounded-md border border-white/20 transition-all hover:bg-black/70 hover:border-white/40"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                <path d="M15.36,1.41C7.41,1.41,1,7.82,1,15.77c0,4.97,2.5,9.35,6.29,11.96L5.75,30.56l3.96-1.19c1.72,0.67,3.58,1.04,5.51,1.04  c8.09,0,14.64-6.56,14.64-14.64S23.45,1.41,15.36,1.41z M15.36,27.36c-1.74,0-3.39-0.34-4.9-0.97l-4.03,1.22l1.24-3.71  c-1.14-1.78-1.8-3.9-1.8-6.17c0-6.4,5.18-11.57,11.57-11.57s11.57,5.18,11.57,11.57S21.76,27.36,15.36,27.36z"/>
                <path d="M18.22,9.88c-0.79-0.48-1.74-0.83-2.62-0.67c-0.87,0.16-1.59,0.99-1.98,1.65c-0.35,0.6-0.36,1.08-0.36,1.76  c0,0.13,0.01,0.25,0.02,0.38c0.02,0.15,0.04,0.3,0.07,0.44c0.25,1.34,0.86,2.26,2.03,3.14c0.39,0.29,3.4,2.8,6.98,3.71  c1.11,0.28,1.98,0.29,2.65,0.18c1.06-0.17,1.93-0.7,2.41-1.5c0.35-0.59,0.51-1.21,0.57-1.67c0.04-0.33,0.02-0.6-0.04-0.83  c-0.1-0.38-0.29-0.53-0.59-0.7l-0.01,0c-0.34-0.2-1.52-0.74-1.75-0.82c-0.22-0.08-0.41-0.11-0.6,0.11  c-0.23,0.27-0.86,1.06-1.04,1.28c-0.16,0.19-0.33,0.21-0.62,0.08c-0.32-0.15-1.28-0.47-2.43-1.5c-0.9-0.8-1.51-1.79-1.69-2.09  c-0.17-0.3-0.02-0.46,0.13-0.61c0.14-0.14,0.3-0.36,0.45-0.54c0.14-0.17,0.19-0.3,0.28-0.5c0.09-0.2,0.04-0.38-0.02-0.53  C19.3,10.98,18.99,10.35,18.22,9.88z"/>
              </svg>
              <span>Abrir en Waze</span>
            </a>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
