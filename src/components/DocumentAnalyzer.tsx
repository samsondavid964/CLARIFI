
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, FileText, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import AdvancedLoader from "./AdvancedLoader";
import ReportDisplay from "./ReportDisplay";

interface DocumentAnalyzerProps {
  onBack: () => void;
}

const DocumentAnalyzer = ({ onBack }: DocumentAnalyzerProps) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState("");
  const [activeTab, setActiveTab] = useState<"text" | "upload">("text");
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      // In a real implementation, you'd extract text from PDF
      toast({
        title: "PDF Upload",
        description: "PDF processing will be implemented with a PDF parser.",
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast({
        title: "No Content",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("https://n8n-edafe.onrender.com/webhook-test/c5f9e025-f3d3-4a6e-87d6-bcc4373fdf7f", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          document_text: text,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const result = await response.text();
      setReport(result);
      
      toast({
        title: "Analysis Complete",
        description: "Your document has been successfully analyzed!",
      });
    } catch (error) {
      console.error("Error analyzing document:", error);
      toast({
        title: "Analysis Failed", 
        description: "There was an error analyzing your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <AdvancedLoader />;
  }

  if (report) {
    return <ReportDisplay report={report} onBack={() => setReport("")} onHome={onBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 flex items-center justify-between border-b border-gray-800"
      >
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/03bd9744-0501-4f4b-9eae-0f28d675c05d.png" 
              alt="Clarifi AI" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              Document Analyzer
            </span>
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
            <h1 className="text-4xl font-bold mb-4">Analyze Your Legal Document</h1>
            <p className="text-gray-300 text-lg">
              Upload a PDF or paste your document text to get detailed insights and analysis
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-full p-1 flex">
              <button
                onClick={() => setActiveTab("text")}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeTab === "text" 
                    ? "bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Paste Text
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeTab === "upload" 
                    ? "bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Upload PDF
              </button>
            </div>
          </div>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-8">
            <AnimatePresence mode="wait">
              {activeTab === "text" ? (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Document Content
                      </label>
                      <Textarea
                        placeholder="Paste your legal document text here... (Terms & Conditions, Tenancy Agreement, etc.)"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[300px] bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 resize-none focus:border-pink-500 focus:ring-pink-500"
                      />
                    </div>
                    
                    <div className="flex justify-center">
                      <Button
                        onClick={handleAnalyze}
                        disabled={!text.trim()}
                        size="lg"
                        className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white px-12 py-3 text-lg font-semibold rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Analyze Document
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center hover:border-pink-500 transition-colors duration-300">
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Upload PDF Document</h3>
                      <p className="text-gray-400 mb-6">
                        Drag and drop your PDF file here, or click to browse
                      </p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="pdf-upload"
                      />
                      <label htmlFor="pdf-upload">
                        <Button
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 cursor-pointer"
                          asChild
                        >
                          <span>Choose PDF File</span>
                        </Button>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;
