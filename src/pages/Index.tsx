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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6 flex justify-between items-center"
      >
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/03bd9744-0501-4f4b-9eae-0f28d675c05d.png" 
            alt="Clarifi AI" 
            className="w-10 h-10"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
            Clarifi AI
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="hover:text-pink-400 transition-colors">About</a>
            <a href="#features" className="hover:text-pink-400 transition-colors">Features</a>
            <a href="#developer" className="hover:text-pink-400 transition-colors">Developer</a>
          </nav>
          {user ? (
            <UserProfile />
          ) : (
            <Button
              onClick={() => setShowAuthModal(true)}
              variant="outline"
              size="sm"
              className="border-pink-500/50 text-pink-400 hover:bg-pink-500/10"
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
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-red-500/10 blur-3xl"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-pink-400 mr-2" />
            <span className="text-pink-400 font-medium">AI-Powered Legal Document Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Decode Legal Documents with{' '}
            <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
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
              className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
            >
              {user ? 'Analyze Document' : 'Sign In to Analyze'} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg rounded-full"
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
          <h2 className="text-4xl font-bold text-center mb-16">
            Powerful Features for Legal Clarity
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300"
            >
              <Brain className="w-12 h-12 text-pink-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-300">
                Advanced natural language processing to extract key insights from complex legal documents.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300"
            >
              <FileText className="w-12 h-12 text-pink-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Multiple Formats</h3>
              <p className="text-gray-300">
                Support for PDF uploads and text paste functionality for maximum flexibility.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300"
            >
              <Zap className="w-12 h-12 text-pink-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Instant Results</h3>
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
        className="px-6 py-20 bg-gray-900/50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Meet the Developer</h2>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-xl opacity-30"></div>
              <img 
                src="/lovable-uploads/af706ac7-2642-48c4-bc55-1b9be89f018d.png"
                alt="Edafeoghene Egona"
                className="relative w-64 h-64 rounded-full object-cover border-4 border-pink-500/50"
              />
            </motion.div>
            
            <div className="text-left">
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/fddb61ef-1e7f-432b-b397-de6c7c87bfad.png"
                  alt="Developer Logo"
                  className="w-8 h-8 mr-3"
                />
                <h3 className="text-3xl font-bold">Edafeoghene Egona</h3>
              </div>
              <p className="text-xl text-pink-400 mb-4">AI Agent Developer & Innovation Architect</p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Passionate about creating intelligent solutions that bridge the gap between 
                complex technology and user-friendly experiences. Clarifi AI represents the 
                culmination of advanced AI engineering and thoughtful user experience design.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
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
      <footer className="px-6 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/03bd9744-0501-4f4b-9eae-0f28d675c05d.png" 
              alt="Clarifi AI" 
              className="w-8 h-8 mr-2"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
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
