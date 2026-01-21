import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FileUpload } from "@/components/checker/FileUpload";
import { LoadingSpinner } from "@/components/checker/LoadingSpinner";
import { ResultDisplay } from "@/components/checker/ResultDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileSearch, RotateCcw } from "lucide-react";

interface PlagiarismResult {
  plagiarism_percentage: number;
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
        const errText = await response.text();
        throw new Error(errText);
      }

      const data: PlagiarismResult = await response.json();
      setResult(data);

      toast({
        title: "Analysis Complete",
        description: "Your documents have been analyzed successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Analysis Failed",
        description:
          "An error occurred while analyzing the documents. Please try again.",
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

          {!isLoading && !result && (
            <div className="space-y-8">
              <div className="rounded-2xl border bg-card p-6 shadow-card">
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
            </div>
          )}

          {isLoading && (
            <div className="rounded-2xl border bg-card shadow-card">
              <LoadingSpinner />
            </div>
          )}

          {result && !isLoading && (
            <div className="space-y-6">
              <div className="rounded-2xl border bg-card p-6 shadow-card">
                <ResultDisplay result={result} />
              </div>

              <div className="flex justify-center">
                <Button variant="outline" size="lg" onClick={handleReset}>
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
