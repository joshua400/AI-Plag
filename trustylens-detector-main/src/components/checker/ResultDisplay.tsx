interface ResultDisplayProps {
  result: {
    plagiarism_percentage: number;
  };
}

export const ResultDisplay = ({ result }: ResultDisplayProps) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold">Plagiarism Result</h2>
      <p className="text-5xl font-extrabold text-accent">
        {result.plagiarism_percentage}%
      </p>
    </div>
  );
};
