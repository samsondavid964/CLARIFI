
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, FileText, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import AdvancedLoader from "./AdvancedLoader";
import ReportDisplay from "./ReportDisplay";
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface DocumentAnalyzerProps {
  onBack: () => void;
}

const DocumentAnalyzer = ({ onBack }: DocumentAnalyzerProps) => {
  const [activeTab, setActiveTab] = useState<'paste' | 'upload'>('paste');
  const [textContent, setTextContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, logout } = useAuth();

  // Redirect if not authenticated
  if (!user) {
    onBack();
    return null;
  }

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid PDF file.');
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (activeTab === 'paste' && !textContent.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    
    if (activeTab === 'upload' && !file) {
      setError('Please select a PDF file to upload.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      let textToSend = '';
      
      if (activeTab === 'paste') {
        textToSend = textContent;
      } else {
        // Extract text from PDF
        textToSend = await extractTextFromPDF(file!);
      }

      console.log('Sending text to webhook:', textToSend.substring(0, 100) + '...');

      const response = await fetch('https://n8n-edafe.onrender.com/webhook-test/c5f9e025-f3d3-4a6e-87d6-bcc4373fdf7f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textToSend
        }),
      });

      console.log('Webhook response status:', response.status);

      if (!response.ok) {
        throw new Error(`Failed to analyze document: ${response.status}`);
      }

      const result = await response.text();
      console.log('Webhook response:', result);
      setReport(result);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze document. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return <AdvancedLoader />;
  }

  if (report) {
    return (
      <ReportDisplay
        report={report}
        onBack={() => {
          setReport(null);
          setTextContent('');
          setFile(null);
        }}
        onNewAnalysis={() => {
          setReport(null);
          setTextContent('');
          setFile(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 flex justify-between items-center border-b border-gray-700"
      >
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
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
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Welcome, {user.email}</span>
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Sign Out
          </Button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8">
            Analyze Your Legal Document
          </h1>
          <p className="text-xl text-gray-300 text-center mb-12">
            Upload a PDF file or paste text to get AI-powered insights into legal documents
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800/50 rounded-lg p-1 flex">
              <Button
                onClick={() => setActiveTab('paste')}
                variant={activeTab === 'paste' ? 'default' : 'ghost'}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'paste' 
                    ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Paste Text
              </Button>
              <Button
                onClick={() => setActiveTab('upload')}
                variant={activeTab === 'upload' ? 'default' : 'ghost'}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'upload' 
                    ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload PDF
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
          >
            {activeTab === 'paste' ? (
              <div className="space-y-4">
                <Label htmlFor="document-text" className="text-lg font-medium text-gray-200">
                  Document Text
                </Label>
                <textarea
                  id="document-text"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Paste your legal document text here..."
                  className="w-full h-64 p-4 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <Label htmlFor="pdf-upload" className="text-lg font-medium text-gray-200">
                  Upload PDF Document
                </Label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-pink-500/50 transition-colors">
                  <Input
                    ref={fileInputRef}
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose PDF File
                  </Button>
                  {file && (
                    <p className="mt-2 text-green-400">
                      Selected: {file.name}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-400">
                    Only PDF files are supported
                  </p>
                </div>
              </div>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-center mt-4"
              >
                {error}
              </motion.p>
            )}

            <div className="flex justify-center mt-8">
              <Button
                onClick={handleSubmit}
                disabled={isAnalyzing || (activeTab === 'paste' && !textContent.trim()) || (activeTab === 'upload' && !file)}
                className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5 mr-2" />
                Analyze Document
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;
