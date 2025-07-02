
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, FileText, Sparkles, Zap, ExternalLink, LogIn } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import DocumentAnalyzer from "@/components/DocumentAnalyzer";
import AuthModal from "@/components/AuthModal";
import UserProfile from "@/components/UserProfile";
import { useRef } from "react";

const Index = () => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

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
      {/* Animated Background Elements with Parallax */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/10 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </motion.div>

      {/* Enhanced Header with Scroll Effects */}
      <ScrollRevealHeader user={user} setShowAuthModal={setShowAuthModal} />

      {/* Enhanced Hero Section */}
      <EnhancedHeroSection handleAnalyzeClick={handleAnalyzeClick} user={user} />

      {/* Enhanced Features Section */}
      <EnhancedFeaturesSection />

      {/* Enhanced Developer Section */}
      <EnhancedDeveloperSection />

      {/* Enhanced Footer */}
      <EnhancedFooter />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

// Scroll-triggered Header Component
const ScrollRevealHeader = ({ user, setShowAuthModal }: { user: any, setShowAuthModal: (show: boolean) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.header 
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={{ 
        opacity: isInView ? 1 : 0.9, 
        y: isInView ? 0 : -10,
        backdropFilter: isInView ? "blur(20px)" : "blur(10px)"
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-black/30 backdrop-blur-md border-b border-white/5"
    >
      <motion.div 
        className="flex items-center space-x-3"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.img 
          src="/lovable-uploads/6521cce5-4e9f-45fc-aa4a-ee2ce41a22ac.png" 
          alt="Clarifi AI" 
          className="w-10 h-10"
          whileHover={{ 
            rotate: [0, -10, 10, 0],
            scale: 1.1
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.span 
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          Clarifi AI
        </motion.span>
      </motion.div>
      
      <div className="flex items-center space-x-6">
        <nav className="hidden md:flex space-x-8">
          {['About', 'Features', 'Developer'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-purple-300 transition-all duration-300 relative"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {item}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>
        
        {user ? (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <UserProfile />
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => setShowAuthModal(true)}
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400/50 bg-transparent transition-all duration-300"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

// Enhanced Hero Section with Sophisticated Animations
const EnhancedHeroSection = ({ handleAnalyzeClick, user }: { handleAnalyzeClick: () => void, user: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={ref}
      className="relative px-6 py-32 pt-40 text-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent blur-3xl"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Animated Badge */}
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="flex items-center px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm"
            whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.4)" }}
          >
            <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-300 font-medium text-sm">AI-Powered Legal Document Analysis</span>
          </motion.div>
        </motion.div>
        
        {/* Sophisticated Title Animation */}
        <div className="mb-8">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold leading-tight"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {["Decode", "Legal", "Documents"].map((word, index) => (
              <motion.span
                key={word}
                className="inline-block mr-6"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.6 + index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-300% animate-[shimmer_3s_ease-in-out_infinite]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
              style={{
                backgroundSize: "300% 100%",
                animation: "shimmer 3s ease-in-out infinite"
              }}
            >
              with AI Precision
            </motion.span>
          </motion.h1>
        </div>
        
        {/* Enhanced Description */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          Transform complex legal jargon into clear, actionable insights. 
          Understand terms & conditions, tenancy agreements, and more with advanced AI analysis.
        </motion.p>
        
        {/* Enhanced CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button 
              onClick={handleAnalyzeClick}
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 border-0 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              />
              <span className="relative z-10">
                {user ? 'Analyze Document' : 'Sign In to Analyze'}
              </span>
              <motion.div
                className="ml-3 relative z-10"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-600/50 text-gray-300 hover:bg-gray-800/30 hover:text-white hover:border-gray-500 px-10 py-4 text-lg rounded-full bg-transparent backdrop-blur-sm transition-all duration-300"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Enhanced Features Section with Staggered Animations
const EnhancedFeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { Icon: Brain, title: "AI-Powered Analysis", desc: "Advanced natural language processing to extract key insights from complex legal documents." },
    { Icon: FileText, title: "Multiple Formats", desc: "Support for PDF uploads and text paste functionality for maximum flexibility." },
    { Icon: Zap, title: "Instant Results", desc: "Get comprehensive analysis reports in seconds, not hours of manual review." }
  ];

  return (
    <motion.section 
      ref={ref}
      id="features" 
      className="px-6 py-32"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Powerful Features for Legal Clarity
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 60, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2 + 0.3,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl blur-xl group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-md rounded-3xl p-8 border border-white/5 group-hover:border-purple-500/20 transition-all duration-500">
                <motion.div
                  className="w-16 h-16 text-purple-400 mb-6 relative"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-xl group-hover:bg-purple-500/20 transition-all duration-300" />
                  <feature.Icon className="w-full h-full relative z-10" />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-semibold mb-4 text-white group-hover:text-purple-100 transition-colors duration-300"
                  whileHover={{ x: 2 }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
                  whileHover={{ x: 4 }}
                >
                  {feature.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Enhanced Developer Section
const EnhancedDeveloperSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={ref}
      id="developer" 
      className="px-6 py-32 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-transparent" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2 
          className="text-5xl font-bold mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Meet the Developer
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ scale: 1.05, rotateY: 10 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <img 
              src="/lovable-uploads/af706ac7-2642-48c4-bc55-1b9be89f018d.png"
              alt="Edafeoghene Egona"
              className="relative w-80 h-80 rounded-full object-cover border-4 border-purple-500/30 shadow-2xl"
            />
          </motion.div>
          
          <motion.div 
            className="text-left max-w-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div 
              className="flex items-center mb-6"
              whileHover={{ x: 5 }}
            >
              <img 
                src="/lovable-uploads/fddb61ef-1e7f-432b-b397-de6c7c87bfad.png"
                alt="Developer Logo"
                className="w-10 h-10 mr-4"
              />
              <h3 className="text-4xl font-bold text-white">Edafeoghene Egona</h3>
            </motion.div>
            
            <motion.p 
              className="text-xl text-purple-400 mb-6"
              whileHover={{ x: 3, scale: 1.01 }}
            >
              AI Agent Developer & Innovation Architect
            </motion.p>
            
            <motion.p 
              className="text-gray-300 leading-relaxed mb-8 text-lg"
              whileHover={{ x: 5 }}
            >
              Passionate about creating intelligent solutions that bridge the gap between 
              complex technology and user-friendly experiences. Clarifi AI represents the 
              culmination of advanced AI engineering and thoughtful user experience design.
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-xl hover:shadow-purple-500/25 transition-all duration-500 border-0"
              >
                <a href="https://egonaedafeoghene.framer.website/" target="_blank" rel="noopener noreferrer">
                  View Portfolio 
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Enhanced Footer
const EnhancedFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.footer 
      ref={ref}
      className="px-6 py-16 border-t border-white/5 bg-gradient-to-b from-transparent to-gray-900/30"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.div 
          className="flex items-center justify-center mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <img 
            src="/lovable-uploads/6521cce5-4e9f-45fc-aa4a-ee2ce41a22ac.png" 
            alt="Clarifi AI" 
            className="w-10 h-10 mr-3"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Clarifi AI
          </span>
        </motion.div>
        <motion.p 
          className="text-gray-400 text-lg"
          whileHover={{ color: "#e5e7eb", scale: 1.01 }}
        >
          © 2024 Edafeoghene Egona. Empowering users with AI-driven legal document analysis.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Index;
