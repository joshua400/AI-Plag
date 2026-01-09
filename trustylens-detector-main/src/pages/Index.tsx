import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { FileSearch, Shield, Zap, Brain, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced NLP algorithms analyze semantic meaning beyond simple word matching.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Get accurate results in seconds with our optimized comparison engine.",
  },
  {
    icon: Shield,
    title: "Accurate Detection",
    description: "Multiple detection methods ensure comprehensive plagiarism identification.",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
              <FileSearch className="h-4 w-4 text-accent" />
              <span className="font-body text-sm font-medium text-accent">
                Advanced Document Analysis
              </span>
            </div>
            
            <h1 className="animate-fade-in-up font-heading text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl" style={{ animationDelay: "0.1s" }}>
              AI-Based Plagiarism Detection System
            </h1>
            
            <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-primary-foreground/80 md:text-xl" style={{ animationDelay: "0.2s" }}>
              Analyze document similarity and detect plagiarism with advanced Natural Language 
              Processing. Compare texts instantly and get detailed similarity reports.
            </p>
            
            <div className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/checker">
                  Check Plagiarism
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 font-body text-lg text-muted-foreground">
              Our system uses cutting-edge AI technology to compare documents and identify similarities.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="animate-fade-in-up group rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:shadow-hover"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <feature.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 font-body leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Ready to Check Your Documents?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-muted-foreground">
            Upload two documents and get instant plagiarism analysis with detailed similarity reports.
          </p>
          <Button variant="accent" size="xl" className="mt-8" asChild>
            <Link to="/checker">
              Start Free Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
