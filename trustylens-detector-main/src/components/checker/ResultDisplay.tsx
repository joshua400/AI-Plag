import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Download, AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PlagiarismResult } from "@/pages/Checker";

interface ResultDisplayProps {
  result: PlagiarismResult;
  onReset: () => void;
}

export const ResultDisplay = ({ result, onReset }: ResultDisplayProps) => {
  const [expandedSource, setExpandedSource] = useState<number | null>(null);

  const handleDownload = () => {
    const reportText = `
PLAGIARISM CHECK REPORT
====================
Generated: ${new Date().toISOString()}

SUMMARY
-------
Word Count: ${result.wordCount}
Character Count: ${result.characterCount}

PLAGIARISM RESULTS
----------------
Plagiarized: ${result.plagiarismPercentage}%
Exact Match: ${result.exactMatchPercentage}%
Partial Match: ${result.partialMatchPercentage}%
Unique Content: ${result.uniquePercentage}%

SOURCES
-------
${result.sources.map((source, i) => `${i + 1}. ${source.title}
   URL: ${source.url}
   Matched Text: ${source.matchedText}
`).join("\n")}
    `.trim();

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `plagiarism-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const chartData = [
    { name: "Plagiarized", value: result.plagiarismPercentage, color: "#ef4444" },
    { name: "Unique", value: result.uniquePercentage, color: "#10b981" },
  ];

const getInsightIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "info": return <Info className="h-5 w-5 text-blue-500" />;
      case "success": return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getInsightBg = (type: string) => {
    switch (type) {
      case "critical": return "bg-red-50 border-red-200";
      case "warning": return "bg-orange-50 border-orange-200";
      case "info": return "bg-blue-50 border-blue-200";
      case "success": return "bg-green-50 border-green-200";
      default: return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-center text-4xl font-bold text-[#1e293b]">Results</h2>

      {result.aiInsights && result.aiInsights.length > 0 && (
        <div className="rounded-xl border bg-white shadow-md p-6">
          <h3 className="mb-4 text-xl font-bold text-[#1e293b]">AI Insights</h3>
          <div className="space-y-3">
            {result.aiInsights.map((insight, index) => (
              <div key={index} className={`flex items-start gap-3 rounded-lg border p-4 ${getInsightBg(insight.type)}`}>
                {getInsightIcon(insight.type)}
                <div>
                  <p className="font-semibold text-slate-800">{insight.title}</p>
                  <p className="text-sm text-slate-600">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Side: Uploaded Text */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border bg-white shadow-md">
            <div className="p-6">
              <div className="mb-4 flex justify-between text-sm font-medium text-slate-500">
                <span>Uploaded Text</span>
                <div className="flex gap-4">
                  <span>Words: {result.wordCount}</span>
                  <span>Characters: {result.characterCount}</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-lg leading-relaxed">
                {result.highlightedText.map((detail, index) => {
                  let bgColor = "bg-transparent";
                  if (detail.type === "exact") bgColor = "bg-red-200 text-red-900";
                  else if (detail.type === "partial") bgColor = "bg-orange-100 text-orange-900";
                  else if (detail.type === "unique") bgColor = "bg-green-50 text-slate-900";

                  return (
                    <span key={index} className={bgColor}>
                      {detail.text}{" "}
                    </span>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between">
<Button variant="ghost" size="sm" className="text-slate-400" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                </Button>
                <Button className="bg-cyan-500 hover:bg-cyan-600" onClick={handleDownload}>Download Report</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Stats & Sources */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-white p-6 shadow-md">
            <div className="flex flex-col items-center">
              <div className="relative h-40 w-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-red-500">{result.plagiarismPercentage}%</span>
                  <span className="text-[10px] text-slate-400">Plagiarized</span>
                </div>
              </div>

              <div className="mt-6 w-full space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Exact Match</span>
                  <span className="font-bold text-orange-500">{result.exactMatchPercentage}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Partial Match</span>
                  <span className="font-bold text-cyan-500">{result.partialMatchPercentage}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Unique Content</span>
                  <span className="font-bold text-emerald-500">{result.uniquePercentage}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1e293b]">Plagiarized Scores</h3>
            {result.sources.map((source, index) => (
              <div key={index} className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <button
                  onClick={() => setExpandedSource(expandedSource === index ? null : index)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-sm font-bold text-slate-700">{source.title}</span>
                  </div>
                  {expandedSource === index ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </button>
                {expandedSource === index && (
                  <div className="border-t px-4 py-3">
                    <p className="text-sm text-slate-600 mb-2">{source.matchedText}</p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-600 hover:underline break-all"
                    >
                      {source.url}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full border-slate-200" onClick={onReset}>
            Check Another
          </Button>
        </div>
      </div>
    </div>
  );
};


