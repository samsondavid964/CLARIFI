import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Home, Download, Share2, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface ReportDisplayProps {
  report: string;
  onBack: () => void;
  onNewAnalysis: () => void;
}

const ReportDisplay = ({ report, onBack, onNewAnalysis }: ReportDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Report copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([report], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "legal-document-analysis.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your report is being downloaded",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onNewAnalysis}
              className="text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-gray-300 hover:text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/03bd9744-0501-4f4b-9eae-0f28d675c05d.png" 
                alt="Clarifi AI" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                Analysis Report
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Document Analysis Complete
            </motion.h1>
            <motion.p 
              className="text-gray-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Here's your comprehensive legal document breakdown
            </motion.p>
          </div>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 overflow-hidden">
            <motion.div 
              className="p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="prose prose-invert prose-pink max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold text-pink-400 mt-8 mb-4">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-medium text-gray-200 mt-6 mb-3">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-4">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300 leading-relaxed">
                        {children}
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-pink-400 font-semibold">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="text-gray-200 italic">
                        {children}
                      </em>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-pink-500 pl-4 italic text-gray-300 bg-gray-900/50 py-2 my-4">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-900 text-pink-400 px-2 py-1 rounded text-sm">
                        {children}
                      </code>
                    ),
                  }}
                >
                  {report}
                </ReactMarkdown>
              </div>
            </motion.div>
          </Card>

          {/* Action Cards */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-pink-600/10 to-red-600/10 border-pink-500/30 p-6 hover:border-pink-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-pink-400">
                Need Another Analysis?
              </h3>
              <p className="text-gray-300 mb-4">
                Analyze another legal document with our AI-powered tool.
              </p>
              <Button 
                onClick={onNewAnalysis}
                className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white"
              >
                Analyze New Document
              </Button>
            </Card>

            <Card className="bg-gradient-to-br from-gray-700/30 to-gray-600/30 border-gray-600 p-6 hover:border-gray-500 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-200">
                Questions About This Report?
              </h3>
              <p className="text-gray-300 mb-4">
                Get in touch with our team for clarification or additional insights.
              </p>
              <Button 
                variant="outline"
                className="border-gray-500 text-gray-300 hover:bg-gray-700"
              >
                Contact Support
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportDisplay;
