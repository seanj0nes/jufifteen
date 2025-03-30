import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, HelpCircle, Award } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export function FashionTrivia() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Define las preguntas de la trivia aquí
  const questions: Question[] = [
    {
      id: 1,
      text: "¿Cuál es mi color favorito?",
      options: ["Azul", "Rosa", "Verde", "Morado"],
      correctAnswer: 1 // El índice de "Rosa" (0-based)
    },
    {
      id: 2,
      text: "¿Qué país me gustaría visitar primero?",
      options: ["Francia", "Italia", "Japón", "Estados Unidos"],
      correctAnswer: 0 // El índice de "Francia" (0-based)
    },
    {
      id: 3,
      text: "¿Cuál es mi comida favorita?",
      options: ["Pizza", "Sushi", "Hamburguesa", "Pasta"],
      correctAnswer: 3 // El índice de "Pasta" (0-based)
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const correct = optionIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      // Lanzar confeti cuando la respuesta es correcta
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResults(true);
    }
  };

  const resetTrivia = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto mb-8"
      >
        <h2
          className="text-3xl md:text-4xl text-center font-light text-[#b98f71] flex items-center justify-center gap-3"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        >
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="inline-flex"
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 200 }}
            >
              <HelpCircle className="w-8 h-8 text-[#b98f71]" />
            </motion.div>
          </motion.div>
          Trivia Fashion
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="inline-flex"
          >
            <motion.div
              whileHover={{ rotate: -15 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 200 }}
            >
              <Award className="w-7 h-7 text-[#b98f71]" />
            </motion.div>
          </motion.div>
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-white/90 mb-8 text-center max-w-2xl mx-auto text-lg"
        >
          ¡Pon a prueba cuánto me conoces! Responde estas preguntas para ver qué tanto sabes de mí.
        </motion.p>
      </motion.div>

      {!showResults ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-black/70 to-black/40 border border-[#b98f71]/30 shadow-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-6 flex justify-between items-center">
                <span className="text-white/60 text-sm">
                  Pregunta {currentQuestionIndex + 1} de {questions.length}
                </span>
                <span className="text-white/60 text-sm">
                  Puntos: {score}
                </span>
              </div>

              <h3 className="text-xl text-white mb-6">{currentQuestion.text}</h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className={`w-full justify-between text-left py-4 px-4 ${
                        selectedOption === index
                          ? selectedOption === currentQuestion.correctAnswer
                            ? "border-green-500 text-green-400"
                            : "border-red-500 text-red-400"
                          : "border-[#b98f71]/50 text-white"
                      }`}
                      onClick={() => handleOptionSelect(index)}
                      disabled={selectedOption !== null}
                    >
                      <span>{option}</span>
                      {selectedOption === index && (
                        selectedOption === currentQuestion.correctAnswer ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <X className="w-5 h-5 text-red-400" />
                        )
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex justify-center"
                >
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-[#b98f71] hover:bg-[#a67c5f] text-white"
                  >
                    {currentQuestionIndex < questions.length - 1
                      ? "Siguiente Pregunta"
                      : "Ver Resultados"}
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-black/70 to-black/40 border border-[#b98f71]/30 shadow-xl overflow-hidden">
            <CardContent className="p-8 text-center">
              <Award className="w-16 h-16 text-[#b98f71] mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                ¡Tu puntaje final es!
              </h3>
              <div className="text-5xl font-bold text-[#b98f71] mb-6">
                {score}/{questions.length}
              </div>
              <p className="text-white/80 mb-8">
                {score === questions.length
                  ? "¡Perfecto! ¡Me conoces muy bien!"
                  : score >= questions.length / 2
                  ? "¡Buen trabajo! Conoces bastante de mí."
                  : "¡Gracias por participar! Te espero en mis 15 para conocernos mejor."}
              </p>
              <Button
                onClick={resetTrivia}
                className="bg-[#b98f71] hover:bg-[#a67c5f] text-white"
              >
                Intentar de Nuevo
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}