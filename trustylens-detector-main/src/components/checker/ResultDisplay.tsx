import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface PlagiarismSource {
  title: string;
  url: string;
  percentage: number;
}

interface ResultDisplayProps {
  result: {
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
  };
  onReset: () => void;
}

export const ResultDisplay = ({ result, onReset }: ResultDisplayProps) => {
  const [expandedSource, setExpandedSource] = useState<number | null>(null);

  const chartData = [
    { name: "Plagiarized", value: result.plagiarism_percentage, color: "#ef4444" },
    { name: "Unique", value: 100 - result.plagiarism_percentage, color: "#10b981" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-center text-4xl font-bold text-[#1e293b]">Results</h2>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Side: Uploaded Text */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border bg-white shadow-md">
            <div className="flex items-center justify-between border-b bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold italic text-cyan-500">30% OFF</span>
                <span className="text-xs font-bold md:text-sm">Upto 60,000 Words</span>
                <span className="text-xs font-bold md:text-sm">No Ads</span>
              </div>
              <div className="text-sm font-bold text-cyan-500">IN $20</div>
            </div>

            <div className="p-6">
              <div className="mb-4 flex justify-between text-sm font-medium text-slate-500">
                <span>Uploaded Text</span>
                <div className="flex gap-4">
                  <span>Words: {result.total_words}</span>
                  <span>Characters: {result.total_chars}</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-lg leading-relaxed">
                {result.results_details.map((detail, index) => (
                  <span
                    key={index}
                    className={
                      detail.is_plagiarized
                        ? "bg-red-100 text-red-900"
                        : "bg-green-50 text-slate-900"
                    }
                  >
                    {detail.text}{" "}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-slate-400">
                  <Download className="mr-2 h-4 w-4" />
                </Button>
                <Button className="bg-cyan-500 hover:bg-cyan-600">Download Report</Button>
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
                  <span className="text-2xl font-bold text-red-500">{result.plagiarism_percentage}%</span>
                  <span className="text-[10px] text-slate-400">Plagiarized</span>
                </div>
              </div>

              <div className="mt-6 w-full space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Exact Match</span>
                  <span className="font-bold text-orange-500">{result.exact_match}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Partial Match</span>
                  <span className="font-bold text-cyan-500">{result.partial_match}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Unique Content</span>
                  <span className="font-bold text-emerald-500">{result.unique_content}%</span>
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
                    <p className="text-sm text-slate-600 mb-2">Match found in this source.</p>
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

