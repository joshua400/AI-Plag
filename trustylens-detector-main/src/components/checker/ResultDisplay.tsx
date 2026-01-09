import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface PlagiarismResult {
  similarity_score: number;
  plagiarism_level: string;
  plagiarized_sentences: string[];
}

interface ResultDisplayProps {
  result: PlagiarismResult;
}

export const ResultDisplay = ({ result }: ResultDisplayProps) => {
  const { similarity_score, plagiarism_level, plagiarized_sentences } = result;

  const getLevelConfig = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return {
          icon: CheckCircle,
          color: "text-success",
          bgColor: "bg-success/10",
          borderColor: "border-success/30",
          label: "Low Plagiarism",
          description: "The documents show minimal similarity. Content appears to be original.",
        };
      case "moderate":
        return {
          icon: AlertTriangle,
          color: "text-warning",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/30",
          label: "Moderate Plagiarism",
          description: "Some similarities detected. Review highlighted sentences for potential issues.",
        };
      case "high":
        return {
          icon: XCircle,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/30",
          label: "High Plagiarism",
          description: "Significant similarity detected. The content may contain plagiarized material.",
        };
      default:
        return {
          icon: CheckCircle,
          color: "text-muted-foreground",
          bgColor: "bg-muted",
          borderColor: "border-border",
          label: "Unknown",
          description: "Unable to determine plagiarism level.",
        };
    }
  };

  const config = getLevelConfig(plagiarism_level);
  const Icon = config.icon;

  const getScoreColor = () => {
    if (similarity_score < 30) return "text-success";
    if (similarity_score < 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Score Card */}
      <div className={cn(
        "rounded-2xl border-2 p-6",
        config.borderColor,
        config.bgColor
      )}>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl",
              config.bgColor
            )}>
              <Icon className={cn("h-8 w-8", config.color)} />
            </div>
            <div>
              <h3 className={cn("font-heading text-xl font-bold", config.color)}>
                {config.label}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {config.description}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className={cn("font-heading text-5xl font-bold", getScoreColor())}>
              {similarity_score.toFixed(1)}%
            </div>
            <p className="font-body text-sm text-muted-foreground">Similarity Score</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between font-body text-sm">
          <span className="text-muted-foreground">Similarity Progress</span>
          <span className="font-semibold text-foreground">{similarity_score.toFixed(1)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              similarity_score < 30 ? "bg-success" :
              similarity_score < 60 ? "bg-warning" : "bg-destructive"
            )}
            style={{ width: `${similarity_score}%` }}
          />
        </div>
      </div>

      {/* Plagiarized Sentences */}
      {plagiarized_sentences.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-heading text-lg font-semibold text-foreground">
            Highlighted Similarities ({plagiarized_sentences.length})
          </h4>
          <div className="space-y-3">
            {plagiarized_sentences.map((sentence, index) => (
              <div
                key={index}
                className="rounded-xl border border-destructive/20 bg-destructive/5 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/20 font-body text-xs font-semibold text-destructive">
                    {index + 1}
                  </span>
                  <p className="font-body text-sm leading-relaxed text-foreground">
                    "{sentence}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {plagiarized_sentences.length === 0 && (
        <div className="rounded-xl border border-success/30 bg-success/5 p-6 text-center">
          <CheckCircle className="mx-auto h-10 w-10 text-success" />
          <p className="mt-3 font-heading text-lg font-semibold text-success">
            No Specific Matches Found
          </p>
          <p className="mt-1 font-body text-sm text-muted-foreground">
            No exact sentence matches were detected between the documents.
          </p>
        </div>
      )}
    </div>
  );
};
