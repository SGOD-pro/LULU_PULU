import React, { useEffect } from "react";
import { ChefHat, FileText, Plus, Bot, Heart, Banana } from "lucide-react";
import ToolCard from "@/components/ToolCard";
import { useStaggeredAnimation } from "@/lib/animations";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  // Apply staggered animation to tool cards
  useStaggeredAnimation(".tool-card", 100);
  useEffect(() => {
    fetch("http://localhost:8000/", { method: "GET" })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) =>
        toast({
          title: "Error",
          description: error.message || "Server didn't respond.",
          variant: "destructive",
        })
      );
  }, []);

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <div className="space-y-4 text-center">
        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          AI Tools Dashboard
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-700  via-green-500 to-blue-700  bg-clip-text text-transparent animate-gradient">
          LULU-PULU-2o
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Access cutting-edge AI tools to enhance your productivity and
          creativity.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ToolCard
          title="Recipe Predictor"
          description="Generate delicious recipes based on ingredients you have."
          icon={ChefHat}
          path="/recipe-predictor"
          className="tool-card"
          colorClass="bg-[hsl(var(--tool-recipe))] text-white"
        />

        <ToolCard
          title="Essay Scorer"
          description="Get instant feedback and scoring for your essays."
          icon={FileText}
          path="/essay-scorer"
          className="tool-card"
          colorClass="bg-[hsl(var(--tool-essay))] text-white"
        />
        <ToolCard
          title="AI vs Human Text Detector"
          description="Detect whether text was written by a human or AI."
          icon={Bot}
          path="/text-detector"
          className="tool-card"
          colorClass="bg-[hsl(var(--tool-detector))] text-white"
        />

        <ToolCard
          title="Toxic Detector"
          description="Shield your space with empathy. Let AI gently detect and diffuse toxic messages to keep your chats kind and safe."
          icon={Banana}
          path="/toxic"
          className="tool-card"
          colorClass="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white"
        />
        <ToolCard
          title="SweetBot"
          description="The AI that listens with heart. Chat to overcome loneliness."
          icon={Heart}
          path="#"
          className="tool-card grayscale"
          colorClass="bg-[hsl(var(--tool-sweetbot))] text-white"
        />
      </div>

      <div className="rounded-lg border border-border/50 p-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <Plus className="h-6 w-6 text-secondary-foreground" />
          </div>

          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-medium">More tools coming soon</h3>
            <p className="text-muted-foreground">
              We're constantly developing new AI tools to help you work smarter.
              Stay tuned for upcoming additions to our toolkit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
