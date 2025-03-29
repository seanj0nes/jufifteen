import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function LocationMap() {
  return (
    <Card className="bg-black/50 border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-white">
          Si venís por tu cuenta, tenes que llegar hasta acá
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.8289276661974!2d-58.0072877237305!3d-34.89817897272648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e62f5f3f6f41%3A0x7f3c28012a2b8e0a!2sAv.%2019%20%26%20Calle%20511%2C%20Manuel%20B%20Gonnet%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1707158548861!5m2!1ses!2sar"
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
          <p className="mt-2">
            Av. 19 entre 511 y 514, B1900 Gonnet, Provincia de Buenos Aires
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
