
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
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6 flex justify-between items-center bg-black/50 backdrop-blur-sm border-b border-white/10"
      >
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/03bd9744-0501-4f4b-9eae-0f28d675c05d.png" 
            alt="Clarifi AI" 
            className="w-10 h-10"
          />
          <span className="text-2xl font-bold text-gradient">
            Clarifi AI
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-300 hover:text-purple-300 transition-colors">About</a>
            <a href="#features" className="text-gray-300 hover:text-purple-300 transition-colors">Features</a>
            <a href="#developer" className="text-gray-300 hover:text-purple-300 transition-colors">Developer</a>
          </nav>
          {user ? (
            <UserProfile />
          ) : (
            <Button
              onClick={() => setShowAuthModal(true)}
              variant="outline"
              size="sm"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 bg-transparent"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative px-6 py-20 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-3xl"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-purple-400 mr-2" />
            <span className="text-purple-300 font-medium">AI-Powered Legal Document Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Decode Legal Documents with{' '}
            <span className="text-gradient">
              AI Precision
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Transform complex legal jargon into clear, actionable insights. 
            Understand terms & conditions, tenancy agreements, and more with advanced AI analysis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleAnalyzeClick}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 border-0"
            >
              {user ? 'Analyze Document' : 'Sign In to Analyze'} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-500 text-gray-300 hover:bg-gray-800/50 hover:text-white px-8 py-4 text-lg rounded-full bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        id="features" 
        className="px-6 py-20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gradient">
            Powerful Features for Legal Clarity
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300"
            >
              <Brain className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-white">AI-Powered Analysis</h3>
              <p className="text-gray-300">
                Advanced natural language processing to extract key insights from complex legal documents.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300"
            >
              <FileText className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-white">Multiple Formats</h3>
              <p className="text-gray-300">
                Support for PDF uploads and text paste functionality for maximum flexibility.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="glass-effect rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300"
            >
              <Zap className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-white">Instant Results</h3>
              <p className="text-gray-300">
                Get comprehensive analysis reports in seconds, not hours of manual review.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Developer Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        id="developer" 
        className="px-6 py-20 bg-gradient-to-b from-transparent to-gray-900/30"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gradient">Meet the Developer</h2>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
              <img 
                src="/lovable-uploads/af706ac7-2642-48c4-bc55-1b9be89f018d.png"
                alt="Edafeoghene Egona"
                className="relative w-64 h-64 rounded-full object-cover border-4 border-purple-500/30"
              />
            </motion.div>
            
            <div className="text-left">
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/fddb61ef-1e7f-432b-b397-de6c7c87bfad.png"
                  alt="Developer Logo"
                  className="w-8 h-8 mr-3"
                />
                <h3 className="text-3xl font-bold text-white">Edafeoghene Egona</h3>
              </div>
              <p className="text-xl text-purple-400 mb-4">AI Agent Developer & Innovation Architect</p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Passionate about creating intelligent solutions that bridge the gap between 
                complex technology and user-friendly experiences. Clarifi AI represents the 
                culmination of advanced AI engineering and thoughtful user experience design.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 border-0"
              >
                <a href="https://egonaedafeoghene.framer.website/" target="_blank" rel="noopener noreferrer">
                  View Portfolio <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10 bg-black/80">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/03bd9744-0501-4f4b-9eae-0f28d675c05d.png" 
              alt="Clarifi AI" 
              className="w-8 h-8 mr-2"
            />
            <span className="text-xl font-bold text-gradient">
              Clarifi AI
            </span>
          </div>
          <p className="text-gray-400">
            © 2024 Edafeoghene Egona. Empowering users with AI-driven legal document analysis.
          </p>
        </div>
      </footer>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Index;
