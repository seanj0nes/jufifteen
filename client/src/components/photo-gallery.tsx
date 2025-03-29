import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Componente para la galería de fotos
export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Lista de imágenes del evento
  const images = [
    '/images/gallery/ju_bg.png',
    '/images/gallery/juli1.png',
    '/images/gallery/juli3.png',
    '/images/gallery/juli4.png',
  ];
  
  // Función para abrir la imagen en modo visualización
  const openImage = (image: string) => {
    setSelectedImage(image);
  };
  
  // Función para cerrar la imagen en modo visualización
  const closeImage = () => {
    setSelectedImage(null);
  };
  
  // Simulación de carga de imagen (en una implementación real, esto se conectaría a un backend)
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulamos un tiempo de carga
    setTimeout(() => {
      setIsUploading(false);
      // Aquí se implementaría la lógica real para subir la imagen
      alert('¡Tu foto ha sido enviada para su revisión!');
    }, 1500);
  };
  
  return (
    <div className="py-16 px-4 bg-black/5" id="galeria">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl text-center font-light text-[#a67b60] mb-2"
        >
          Galería de Fotos
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 mb-10"
        >
          Comparte y revive los mejores momentos
        </motion.p>
        
        {/* Grid de fotos */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer aspect-square"
              onClick={() => openImage(image)}
            >
              <img 
                src={image} 
                alt={`Foto ${index + 1}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors" />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Botón para cargar fotos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <label className="flex items-center gap-2 bg-[#a67b60] hover:bg-[#8d6a53] text-white px-4 py-2 rounded-md cursor-pointer transition-colors">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleUpload}
              disabled={isUploading}
            />
            {isUploading ? (
              <>
                <span className="animate-spin border-2 border-white/20 border-t-white rounded-full w-4 h-4"></span>
                <span>Cargando...</span>
              </>
            ) : (
              <span>Compartir una foto</span>
            )}
          </label>
        </motion.div>
        
        {/* Visor de imagen ampliada */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
            >
              <img 
                src={selectedImage} 
                alt="Foto ampliada" 
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              
              <button
                onClick={closeImage}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <button
                  onClick={() => {
                    const currentIndex = images.indexOf(selectedImage);
                    const prevIndex = (currentIndex - 1 + images.length) % images.length;
                    setSelectedImage(images[prevIndex]);
                  }}
                  className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors ml-2"
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
              
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <button
                  onClick={() => {
                    const currentIndex = images.indexOf(selectedImage);
                    const nextIndex = (currentIndex + 1) % images.length;
                    setSelectedImage(images[nextIndex]);
                  }}
                  className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors mr-2"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}