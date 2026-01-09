import { Layout } from "@/components/layout/Layout";
import { Brain, Cpu, FileSearch, GitCompare, Layers, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const techniques = [
  {
    icon: FileSearch,
    title: "TF-IDF Vectorization",
    description: "Term Frequency-Inverse Document Frequency converts text into numerical vectors, emphasizing important terms while reducing the weight of common words.",
  },
  {
    icon: Target,
    title: "Cosine Similarity",
    description: "Measures the cosine of the angle between document vectors. A score of 1 indicates identical documents, while 0 indicates no similarity.",
  },
  {
    icon: Brain,
    title: "Semantic Analysis",
    description: "Goes beyond exact matching to understand meaning and context. Identifies paraphrasing and conceptually similar content.",
  },
  {
    icon: GitCompare,
    title: "Sentence Matching",
    description: "Compares individual sentences between documents to identify specific instances of potential plagiarism.",
  },
];

const steps = [
  {
    number: "01",
    title: "Document Preprocessing",
    description: "Text is cleaned, tokenized, and normalized. Stop words are removed, and stemming/lemmatization is applied.",
  },
  {
    number: "02",
    title: "Feature Extraction",
    description: "Documents are converted into numerical representations using TF-IDF and other NLP techniques.",
  },
  {
    number: "03",
    title: "Similarity Computation",
    description: "Multiple algorithms analyze the documents to calculate similarity scores at various levels.",
  },
  {
    number: "04",
    title: "Result Generation",
    description: "The system compiles results, identifies matching sections, and generates a comprehensive report.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 p-4">
              <Cpu className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              How Plagiarism Detection Works
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-muted-foreground">
              Our AI-powered system uses advanced Natural Language Processing techniques to analyze 
              documents and detect similarities. Learn about the technology behind accurate plagiarism detection.
            </p>
          </div>
        </div>
      </section>

      {/* Techniques Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Core Technologies
            </h2>
            <p className="mt-4 font-body text-muted-foreground">
              Our system combines multiple NLP techniques for comprehensive analysis
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {techniques.map((technique, index) => (
              <div
                key={technique.title}
                className="animate-fade-in-up group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-hover"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                    <technique.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {technique.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                      {technique.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              The Detection Process
            </h2>
            <p className="mt-4 font-body text-muted-foreground">
              A step-by-step look at how documents are analyzed
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="animate-fade-in-up flex gap-6"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary font-heading text-xl font-bold text-primary-foreground">
                    {step.number}
                  </div>
                  <div className="flex-1 rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Understanding the Metrics
            </h2>
            
            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Similarity Score
                </h3>
                <p className="mt-2 font-body text-muted-foreground">
                  The similarity score is a percentage (0-100%) that represents how similar two documents are. 
                  It's calculated using a combination of TF-IDF vectors and cosine similarity, providing an 
                  accurate measure of textual overlap.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Plagiarism Levels
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-success" />
                    <span className="font-body text-sm text-foreground">
                      <strong>Low (0-30%):</strong> Minimal similarity, content appears original
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-warning" />
                    <span className="font-body text-sm text-foreground">
                      <strong>Moderate (30-60%):</strong> Notable similarities that may need review
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-destructive" />
                    <span className="font-body text-sm text-foreground">
                      <strong>High (60-100%):</strong> Significant overlap indicating potential plagiarism
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
            Try It Yourself
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-muted-foreground">
            Experience our plagiarism detection system firsthand. Upload your documents and get instant results.
          </p>
          <Button variant="accent" size="xl" className="mt-8" asChild>
            <Link to="/checker">Start Checking Now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
