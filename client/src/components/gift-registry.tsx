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
      ease: "easeInOut"
    }
  }
};

const iconAnimation = {
  rest: { rotate: 0 },
  hover: { 
    rotate: 15,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 200
    }
  }
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
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.div variants={iconAnimation}>
                <Gift className="w-5 h-5" />
              </motion.div>
            </motion.div>
            Gift Registry
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
          Your presence at my celebration is the greatest gift. However, if you wish to give something,
          here are some suggestions:
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
          >
            <motion.div variants={buttonAnimation}>
              <Button 
                variant="outline" 
                className="w-full relative overflow-hidden group"
                onClick={() => window.open("https://amazon.com/registry", "_blank")}
              >
                <motion.span
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-primary/20"
                />
                <span className="relative">Amazon Registry</span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div variants={buttonAnimation}>
              <Button 
                variant="outline" 
                className="w-full relative overflow-hidden group"
                onClick={() => window.open("https://target.com/registry", "_blank")}
              >
                <motion.span
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-primary/20"
                />
                <span className="relative">Target Registry</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}