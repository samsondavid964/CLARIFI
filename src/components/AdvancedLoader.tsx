
import { motion } from "framer-motion";
import { Brain, Zap, FileSearch, Sparkles } from "lucide-react";

const AdvancedLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center overflow-hidden">
      <div className="relative">
        {/* Background Animated Circles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-pink-500/10 to-red-500/10 blur-xl"
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -100, 100, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="text-center space-y-8">
          {/* Main Logo Animation */}
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-32 h-32 mx-auto relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-xl opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-2 border-pink-500/30 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/03bd9744-0501-4f4b-9eae-0f28d675c05d.png" 
                  alt="Clarifi AI" 
                  className="w-16 h-16"
                />
              </div>
            </div>
          </motion.div>

          {/* Pulsing Brain Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <Brain className="w-16 h-16 text-pink-400" />
          </motion.div>

          {/* Loading Text */}
          <div className="space-y-4">
            <motion.h2
              className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Analyzing Your Document
            </motion.h2>
            
            <div className="space-y-2">
              {[
                "Extracting key information...",
                "Identifying important clauses...",
                "Analyzing fine print details...",
                "Generating comprehensive report...",
              ].map((text, index) => (
                <motion.p
                  key={index}
                  className="text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.5, duration: 0.5 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Floating Icons */}
          <div className="relative w-64 h-32 mx-auto">
            {[
              { Icon: Zap, delay: 0 },
              { Icon: FileSearch, delay: 0.5 },
              { Icon: Sparkles, delay: 1 },
            ].map(({ Icon, delay }, index) => (
              <motion.div
                key={index}
                className="absolute"
                animate={{
                  y: [-20, 20, -20],
                  x: [0, 30, -30, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${25 + index * 25}%`,
                  top: "50%",
                }}
              >
                <Icon className="w-8 h-8 text-pink-400/70" />
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 to-red-500 rounded-full"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Particle Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-pink-400 rounded-full"
                animate={{
                  x: [0, Math.random() * 400 - 200],
                  y: [0, Math.random() * 400 - 200],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                }}
                style={{
                  left: "50%",
                  top: "50%",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedLoader;
