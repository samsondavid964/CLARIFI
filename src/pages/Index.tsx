
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, FileText, Sparkles, Zap, ExternalLink, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import DocumentAnalyzer from "@/components/DocumentAnalyzer";
import AuthModal from "@/components/AuthModal";
import UserProfile from "@/components/UserProfile";

const Index = () => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const handleAnalyzeClick = () => {
    if (user) {
      setShowAnalyzer(true);
    } else {
      setShowAuthModal(true);
    }
  };

  if (showAnalyzer) {
    return <DocumentAnalyzer onBack={() => setShowAnalyzer(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/15 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut",
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 p-6 flex justify-between items-center bg-black/50 backdrop-blur-sm border-b border-white/10 hover-ultra-lift"
      >
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.img 
            src="/lovable-uploads/6521cce5-4e9f-45fc-aa4a-ee2ce41a22ac.png" 
            alt="Clarifi AI" 
            className="w-10 h-10 animate-floating hover-glow"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.8 }}
          />
          <motion.span 
            className="text-2xl font-bold text-gradient animate-text-shimmer"
            whileHover={{ scale: 1.1 }}
          >
            Clarifi AI
          </motion.span>
        </motion.div>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-8">
            {['About', 'Features', 'Developer'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-purple-300 transition-colors hover-glow"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          {user ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserProfile />
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setShowAuthModal(true)}
                variant="outline"
                size="sm"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 bg-transparent"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="relative px-6 py-20 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-3xl animate-pulse-glow"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-purple-400 mr-2" />
            </motion.div>
            <motion.span 
              className="text-purple-300 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              AI-Powered Legal Document Analysis
            </motion.span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Decode Legal Documents with{' '}
            <motion.span 
              className="text-gradient animate-text-shimmer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              AI Precision
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Transform complex legal jargon into clear, actionable insights. 
            Understand terms & conditions, tenancy agreements, and more with advanced AI analysis.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                onClick={handleAnalyzeClick}
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 border-0"
              >
                {user ? 'Analyze Document' : 'Sign In to Analyze'} 
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-500 text-gray-300 hover:bg-gray-800/50 hover:text-white px-8 py-4 text-lg rounded-full bg-transparent hover-ultra-lift"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        id="features" 
        className="px-6 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 text-gradient animate-text-shimmer"
            whileInView={{ scale: [0.9, 1.05, 1] }}
            transition={{ duration: 0.6 }}
          >
            Powerful Features for Legal Clarity
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { Icon: Brain, title: "AI-Powered Analysis", desc: "Advanced natural language processing to extract key insights from complex legal documents." },
              { Icon: FileText, title: "Multiple Formats", desc: "Support for PDF uploads and text paste functionality for maximum flexibility." },
              { Icon: Zap, title: "Instant Results", desc: "Get comprehensive analysis reports in seconds, not hours of manual review." }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                  rotateX: 5
                }}
                className="glass-effect rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-500 hover-ultra-lift"
              >
                <motion.div
                  className="w-12 h-12 text-purple-400 mb-6 animate-floating"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))"
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.Icon className="w-full h-full" />
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold mb-4 text-white"
                  whileHover={{ x: 5 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-300"
                  whileHover={{ x: 10 }}
                >
                  {feature.desc}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Developer Section */}
      <motion.section 
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        id="developer" 
        className="px-6 py-20 bg-gradient-to-b from-transparent to-gray-900/30"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-gradient animate-text-shimmer"
            whileInView={{ scale: [0.9, 1.05, 1] }}
          >
            Meet the Developer
          </motion.h2>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotateY: 15 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.img 
                src="/lovable-uploads/af706ac7-2642-48c4-bc55-1b9be89f018d.png"
                alt="Edafeoghene Egona"
                className="relative w-64 h-64 rounded-full object-cover border-4 border-purple-500/30 animate-floating"
                whileHover={{ 
                  borderColor: "rgba(168, 85, 247, 0.6)",
                  filter: "drop-shadow(0 0 25px rgba(168, 85, 247, 0.4))"
                }}
              />
            </motion.div>
            
            <motion.div 
              className="text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.div 
                className="flex items-center mb-4"
                whileHover={{ x: 10 }}
              >
                <motion.img 
                  src="/lovable-uploads/fddb61ef-1e7f-432b-b397-de6c7c87bfad.png"
                  alt="Developer Logo"
                  className="w-8 h-8 mr-3 animate-floating hover-glow"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                />
                <motion.h3 
                  className="text-3xl font-bold text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  Edafeoghene Egona
                </motion.h3>
              </motion.div>
              <motion.p 
                className="text-xl text-purple-400 mb-4"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                AI Agent Developer & Innovation Architect
              </motion.p>
              <motion.p 
                className="text-gray-300 leading-relaxed mb-6"
                whileHover={{ x: 10 }}
              >
                Passionate about creating intelligent solutions that bridge the gap between 
                complex technology and user-friendly experiences. Clarifi AI represents the 
                culmination of advanced AI engineering and thoughtful user experience design.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-500 border-0"
                >
                  <a href="https://egonaedafeoghene.framer.website/" target="_blank" rel="noopener noreferrer">
                    View Portfolio 
                    <motion.div
                      className="ml-2"
                      animate={{ rotate: [0, 15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.div>
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="px-6 py-12 border-t border-white/10 bg-black/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            className="flex items-center justify-center mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img 
              src="/lovable-uploads/6521cce5-4e9f-45fc-aa4a-ee2ce41a22ac.png" 
              alt="Clarifi AI" 
              className="w-8 h-8 mr-2 animate-floating hover-glow"
              whileHover={{ rotate: 360 }}
            />
            <motion.span 
              className="text-xl font-bold text-gradient animate-text-shimmer"
              whileHover={{ scale: 1.1 }}
            >
              Clarifi AI
            </motion.span>
          </motion.div>
          <motion.p 
            className="text-gray-400"
            whileHover={{ color: "#e5e7eb", scale: 1.02 }}
          >
            © 2024 Edafeoghene Egona. Empowering users with AI-driven legal document analysis.
          </motion.p>
        </div>
      </motion.footer>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Index;
