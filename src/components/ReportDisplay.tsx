
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Home, Download, Share2, Copy, Check, AlertTriangle, Flag } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface AnalysisData {
  summary: string;
  risks: string[];
  keyTerms: { [key: string]: string };
}

interface ReportDisplayProps {
  report: string;
  onBack: () => void;
  onNewAnalysis: () => void;
}

const ReportDisplay = ({ report, onBack, onNewAnalysis }: ReportDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Parse the JSON report or fall back to plain text
  let analysisData: AnalysisData | null = null;
  let isStructuredData = false;

  try {
    const parsed = JSON.parse(report);
    if (parsed.summary && parsed.risks && parsed.keyTerms) {
      analysisData = parsed;
      isStructuredData = true;
      console.log('Parsed structured analysis data:', analysisData);
    }
  } catch (error) {
    console.log('Report is not JSON, displaying as plain text');
  }

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
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "legal-document-analysis.txt";
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onNewAnalysis}
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-gray-300 hover:text-white hover:bg-white/10"
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
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Analysis Report
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
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
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
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

          {isStructuredData && analysisData ? (
            <div className="space-y-8">
              {/* Plain-English Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-4 text-purple-300 flex items-center">
                      📋 Plain-English Summary
                    </h2>
                    <p className="text-white text-lg leading-relaxed">
                      {analysisData.summary}
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Red Flags & Risks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30 backdrop-blur-sm">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-red-300 flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-3" />
                      Red Flags & Risks
                    </h2>
                    <div className="space-y-4">
                      {analysisData.risks.map((risk, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Flag className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                          <p className="text-white leading-relaxed">
                            {risk}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Key Terms Explained */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Card className="bg-gradient-to-br from-blue-900/20 to-teal-900/20 border-blue-500/30 backdrop-blur-sm">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-blue-300 flex items-center">
                      🔑 Key Terms Explained
                    </h2>
                    <div className="space-y-6">
                      {Object.entries(analysisData.keyTerms).map(([term, definition], index) => (
                        <div key={index} className="border-l-4 border-blue-400 pl-6">
                          <h3 className="text-xl font-semibold text-blue-300 mb-2">
                            {term}
                          </h3>
                          <p className="text-white leading-relaxed">
                            {definition}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          ) : (
            // Fallback for plain text reports
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
              <motion.div 
                className="p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-white leading-relaxed">
                    {report}
                  </pre>
                </div>
              </motion.div>
            </Card>
          )}

          {/* Action Cards */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Card className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border-purple-500/30 p-6 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">
                Need Another Analysis?
              </h3>
              <p className="text-gray-300 mb-4">
                Analyze another legal document with our AI-powered tool.
              </p>
              <Button 
                onClick={onNewAnalysis}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
              >
                Analyze New Document
              </Button>
            </Card>

            <Card className="bg-gradient-to-br from-gray-700/20 to-gray-600/20 border-gray-500/30 p-6 hover:border-gray-400/50 transition-all duration-300 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-200">
                Questions About This Report?
              </h3>
              <p className="text-gray-300 mb-4">
                Get in touch with our team for clarification or additional insights.
              </p>
              <Button 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
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
