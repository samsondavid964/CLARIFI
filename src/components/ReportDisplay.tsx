
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Home, Download, Share2, Copy, Check, AlertTriangle, Flag, Send, MessageCircle } from "lucide-react";
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
  originalText?: string;
}

interface QAHistory {
  question: string;
  answer: string;
  timestamp: Date;
}

const ReportDisplay = ({ report, onBack, onNewAnalysis, originalText }: ReportDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState("");
  const [qaHistory, setQAHistory] = useState<QAHistory[]>([]);
  const [isAsking, setIsAsking] = useState(false);
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

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Question Required",
        description: "Please enter a question before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsAsking(true);

    try {
      console.log('Sending question to webhook:', question);
      console.log('Original text length:', originalText?.length || 0);
      console.log('Analysis report length:', report.length);

      const response = await fetch('https://n8n-edafe.onrender.com/webhook-test/0f83a06b-280c-4437-a84c-0b4cda2a239b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          originalText: originalText || '',
          analysisReport: report
        }),
      });

      console.log('Question webhook response status:', response.status);

      if (!response.ok) {
        throw new Error(`Failed to get answer: ${response.status}`);
      }

      const answer = await response.text();
      console.log('Question webhook response:', answer);

      // Add to Q&A history
      setQAHistory(prev => [...prev, {
        question: question,
        answer: answer,
        timestamp: new Date()
      }]);

      setQuestion("");
      
      toast({
        title: "Question Answered",
        description: "Your question has been answered successfully",
      });

    } catch (error) {
      console.error('Question error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to get answer. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsAsking(false);
    }
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

          {/* Ask a Question Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 backdrop-blur-sm">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-green-300 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Ask a Question
                </h2>
                <p className="text-gray-300 mb-6">
                  Have specific questions about this document? Ask our AI assistant for clarification.
                </p>
                
                <div className="space-y-4">
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g., How much does it cost to cancel early? Can I have a pet in this apartment?"
                    className="bg-black/50 border-green-500/30 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/20 min-h-[100px] resize-none"
                    disabled={isAsking}
                  />
                  <Button
                    onClick={handleAskQuestion}
                    disabled={isAsking || !question.trim()}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 disabled:opacity-50"
                  >
                    {isAsking ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Getting Answer...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Ask Question
                      </>
                    )}
                  </Button>
                </div>

                {/* Q&A History */}
                {qaHistory.length > 0 && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-xl font-semibold text-green-300 border-b border-green-500/30 pb-2">
                      Question & Answer History
                    </h3>
                    {qaHistory.map((qa, index) => (
                      <div key={index} className="space-y-3">
                        <div className="bg-green-500/10 rounded-lg p-4 border-l-4 border-green-400">
                          <div className="flex items-start space-x-3">
                            <div className="bg-green-500/20 rounded-full p-2">
                              <MessageCircle className="w-4 h-4 text-green-300" />
                            </div>
                            <div className="flex-1">
                              <p className="text-green-200 font-medium">Your Question:</p>
                              <p className="text-white mt-1">{qa.question}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-500/10 rounded-lg p-4 border-l-4 border-blue-400">
                          <div className="flex items-start space-x-3">
                            <div className="bg-blue-500/20 rounded-full p-2">
                              <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                            </div>
                            <div className="flex-1">
                              <p className="text-blue-200 font-medium">Clarifi AI:</p>
                              <p className="text-white mt-1 leading-relaxed">{qa.answer}</p>
                              <p className="text-gray-400 text-sm mt-2">
                                {qa.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Action Cards */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
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
