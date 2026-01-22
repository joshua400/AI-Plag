import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { LoadingSpinner } from "@/components/checker/LoadingSpinner";
import { ResultDisplay } from "@/components/checker/ResultDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileSearch, RotateCcw, Paperclip, Link as LinkIcon, Type } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PlagiarismSource {
  title: string;
  url: string;
  percentage: number;
}

interface PlagiarismResult {
  plagiarism_percentage: number;
  exact_match: number;
  partial_match: number;
  unique_content: number;
  total_words: number;
  total_chars: number;
  results_details: Array<{
    text: string;
    is_plagiarized: boolean;
    source_url?: string;
  }>;
  sources: PlagiarismSource[];
}

const Checker = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!text && !file && !url) {
      toast({
        title: "No Content",
        description: "Please provide text, a file, or a URL to check.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      if (text) formData.append("text", text);
      if (file) formData.append("file", file);
      if (url) formData.append("url", url);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/check-plagiarism`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }

      const data: PlagiarismResult = await response.json();
      setResult(data);

      toast({
        title: "Analysis Complete",
        description: "Your document has been analyzed successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Analysis Failed",
        description:
          "An error occurred while analyzing the document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setFile(null);
    setUrl("");
    setResult(null);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h1 className="mb-8 text-center text-3xl font-bold text-[#1e293b]">Plagiarism Checker AI</h1>
            <p className="mb-8 text-center text-slate-600">
              Our AI plagiarism checker is a fast, accurate, and free online tool that helps you detect
              plagiarism. It's a reliable way to ensure your work is original and written by a human writer.
            </p>

            {!result && (
              <div className="overflow-hidden rounded-xl border bg-white shadow-lg">
                <div className="flex items-center justify-between bg-[#1e293b] px-6 py-3 text-white">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold italic text-cyan-400">30% OFF</span>
                    <div className="hidden h-px w-10 bg-slate-600 md:block" />
                    <span className="text-xs uppercase tracking-wider md:text-sm">Upto 60,000 Words</span>
                    <span className="text-xs uppercase tracking-wider md:text-sm">No Ads</span>
                    <span className="text-xs uppercase tracking-wider md:text-sm">Accurate Reports</span>
                  </div>
                  <div className="bg-yellow-400 px-4 py-1 text-sm font-bold text-black">
                    STARTING FROM $20
                  </div>
                </div>

                <div className="p-6">
                  <div className="relative">
                    <textarea
                      placeholder="The paper discusses the results of a study which explored advanced learners of English..."
                      className="min-h-[300px] w-full resize-none rounded-lg border-none p-4 text-lg focus:ring-0"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <div className="absolute bottom-4 right-4 text-slate-400">
                      Word: {wordCount} / 1000
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex flex-1 items-center gap-2 rounded-full border bg-slate-50 px-4 py-2">
                      <LinkIcon className="h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Enter URL/Link here..."
                        className="w-full bg-transparent text-sm outline-none"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="text-slate-400 hover:text-slate-600">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <button className="text-slate-400 hover:text-slate-600">
                        <Type className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="h-14 rounded-full bg-cyan-500 px-10 text-lg font-bold hover:bg-cyan-600"
                    >
                      {isLoading ? "Checking..." : "Check Plagiarism"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border bg-white shadow-lg">
                <LoadingSpinner />
                <p className="mt-4 text-slate-600">Analyzing your document...</p>
              </div>
            )}

            {result && !isLoading && (
              <div className="space-y-6">
                <ResultDisplay result={result} onReset={handleReset} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checker;

