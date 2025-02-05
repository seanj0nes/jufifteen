import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function LocationMap() {
  return (
    <Card className="bg-black/50 border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-white">Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMw"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
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