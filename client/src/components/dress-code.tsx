import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function DressCode() {
  return (
    <Card className="bg-black/50 border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-white">Dress Code</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <img 
              src="https://images.unsplash.com/photo-1569388330292-79cc1ec67270"
              alt="Formal Attire"
              className="rounded-lg mb-4 w-full"
            />
            <h3 className="text-primary font-semibold mb-2">Formal Attire</h3>
            <p className="text-white/80">Black tie optional. Evening gowns and suits preferred.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <img 
              src="https://images.unsplash.com/photo-1559563458-527698bf5295"
              alt="Color Palette"
              className="rounded-lg mb-4 w-full"
            />
            <h3 className="text-primary font-semibold mb-2">Color Palette</h3>
            <p className="text-white/80">Gold, Black, and Fuchsia tones encouraged.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <img 
              src="https://images.unsplash.com/3/www.madebyvadim.com.jpg"
              alt="Accessories"
              className="rounded-lg mb-4 w-full"
            />
            <h3 className="text-primary font-semibold mb-2">Accessories</h3>
            <p className="text-white/80">Elegant jewelry and fashion accessories welcome.</p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
