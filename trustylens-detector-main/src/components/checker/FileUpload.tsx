import { useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  error?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const FileUpload = ({ label, file, onFileSelect, error }: FileUploadProps) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.name.endsWith(".txt")) {
        if (droppedFile.size > MAX_FILE_SIZE) {
          return;
        }
        onFileSelect(droppedFile);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        if (selectedFile.size > MAX_FILE_SIZE) {
          return;
        }
        onFileSelect(selectedFile);
      }
    },
    [onFileSelect]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = () => {
    onFileSelect(null);
  };

  return (
    <div className="space-y-2">
      <label className="font-body text-sm font-semibold text-foreground">{label}</label>
      
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={cn(
            "group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-300",
            error
              ? "border-destructive bg-destructive/5"
              : "border-border bg-muted/30 hover:border-accent hover:bg-accent/5"
          )}
        >
          <input
            type="file"
            accept=".txt"
            onChange={handleFileInput}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <Upload className={cn(
            "mb-3 h-10 w-10 transition-colors",
            error ? "text-destructive" : "text-muted-foreground group-hover:text-accent"
          )} />
          <p className="font-body text-sm font-medium text-foreground">
            Drop your .txt file here
          </p>
          <p className="mt-1 font-body text-xs text-muted-foreground">
            or click to browse (max 5MB)
          </p>
        </div>
      ) : (
        <div className="animate-scale-in flex items-center justify-between rounded-xl border border-accent/30 bg-accent/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-body text-sm font-medium text-foreground">{file.name}</p>
              <p className="font-body text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && (
        <p className="font-body text-xs text-destructive">{error}</p>
      )}
    </div>
  );
};
