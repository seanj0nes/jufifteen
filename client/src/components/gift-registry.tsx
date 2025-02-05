import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export function GiftRegistry() {
  return (
    <Card className="bg-black/50 border-primary/20">
      <CardHeader>
        <CardTitle className="text-center text-white flex items-center justify-center gap-2">
          <Gift className="w-5 h-5" />
          Gift Registry
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-white/80 mb-6">
          Your presence at my celebration is the greatest gift. However, if you wish to give something,
          here are some suggestions:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.open("https://amazon.com/registry", "_blank")}
            >
              Amazon Registry
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.open("https://target.com/registry", "_blank")}
            >
              Target Registry
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
