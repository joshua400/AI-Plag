import { FileSearch } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-muted border-t-accent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FileSearch className="h-8 w-8 animate-pulse-soft text-accent" />
        </div>
      </div>
      <p className="mt-6 font-heading text-lg font-semibold text-foreground">
        Analyzing Documents
      </p>
      <p className="mt-2 font-body text-sm text-muted-foreground">
        Comparing text and detecting similarities...
      </p>
    </div>
  );
};
