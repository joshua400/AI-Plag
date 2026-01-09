import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FileUpload } from "@/components/checker/FileUpload";
import { LoadingSpinner } from "@/components/checker/LoadingSpinner";
import { ResultDisplay } from "@/components/checker/ResultDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileSearch, RotateCcw } from "lucide-react";

interface PlagiarismResult {
  similarity_score: number;
  plagiarism_level: string;
  plagiarized_sentences: string[];
}

const Checker = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file1Error, setFile1Error] = useState<string>("");
  const [file2Error, setFile2Error] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const { toast } = useToast();

  const validateFiles = (): boolean => {
    let isValid = true;
    setFile1Error("");
    setFile2Error("");

    if (!file1) {
      setFile1Error("Please upload Document 1");
      isValid = false;
    }

    if (!file2) {
      setFile2Error("Please upload Document 2");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateFiles()) {
      toast({
        title: "Missing Files",
        description: "Please upload both documents before checking.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("document1", file1!);
      formData.append("document2", file2!);

      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/check-plagiarism`,
  {
    method: "POST",
    body: formData,
  }
);


      if (!response.ok) {
        throw new Error("Failed to analyze documents");
      }

      const data = await response.json();
      setResult(data);
      
      toast({
        title: "Analysis Complete",
        description: "Your documents have been analyzed successfully.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "An error occurred while analyzing the documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile1(null);
    setFile2(null);
    setFile1Error("");
    setFile2Error("");
    setResult(null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 p-4">
              <FileSearch className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Plagiarism Checker
            </h1>
            <p className="mt-4 font-body text-lg text-muted-foreground">
              Upload two .txt documents to compare and detect plagiarism
            </p>
          </div>

          {!isLoading && !result && (
            <div className="animate-fade-in space-y-8">
              {/* Upload Section */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <FileUpload
                    label="Document 1"
                    file={file1}
                    onFileSelect={setFile1}
                    error={file1Error}
                  />
                  <FileUpload
                    label="Document 2"
                    file={file2}
                    onFileSelect={setFile2}
                    error={file2Error}
                  />
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    variant="accent"
                    size="xl"
                    onClick={handleSubmit}
                    className="w-full md:w-auto"
                  >
                    <FileSearch className="mr-2 h-5 w-5" />
                    Check Plagiarism
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div className="rounded-xl bg-muted/50 p-6">
                <h3 className="font-heading text-sm font-semibold text-foreground">
                  Instructions
                </h3>
                <ul className="mt-3 space-y-2 font-body text-sm text-muted-foreground">
                  <li>• Only .txt files are supported</li>
                  <li>• Maximum file size: 5MB per document</li>
                  <li>• Both documents are required for comparison</li>
                  <li>• Results include similarity score and highlighted matches</li>
                </ul>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="rounded-2xl border border-border bg-card shadow-card">
              <LoadingSpinner />
            </div>
          )}

          {result && !isLoading && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
                <ResultDisplay result={result} />
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Check Another Document
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checker;
