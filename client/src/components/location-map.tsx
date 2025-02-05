import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function LocationMap() {
  return (
    <Card className="bg-black/50 border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-white">Ubicación</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.828927666197!2d-57.95598772373044!3d-34.91817897272648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e635457f29ff%3A0x1ddad49d5c268f5!2sLa%20Plata%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2s!4v1707158548861!5m2!1ses!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="mt-4 text-center text-white/80">
          <p className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" />
            Salón Vonharv
          </p>
          <p className="mt-2">La Plata, Buenos Aires, Argentina</p>
        </div>
      </CardContent>
    </Card>
  );
}