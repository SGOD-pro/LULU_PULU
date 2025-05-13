import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import MessageInput from "@/components/MessageInput";
import ResultDisplay from "@/components/ResultDisplay";
interface ToxicDetectionResponse {
  isToxic: boolean;
  message: string;
}
async function checkToxicity(text: string): Promise<ToxicDetectionResponse> {
  try {
    const response = await fetch("http://localhost:8000/toxic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking toxicity:", error);
    throw error;
  }
}

const Toxic = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    isToxic: boolean;
    message: string;
  }>(null);

  const handleSubmit = async (text: string) => {
    setLoading(true);
    try {
      const response = await checkToxicity(text);
      console.log(response)
      setResult(response);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description:
          "Could not connect to the toxicity detection API. Is the backend running at localhost:8080?",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Toxic Message Detector
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Enter a message below to check if it contains toxic content
        </p>
      </header>

      <div className="w-full max-w-2xl mb-8">
        <MessageInput onSubmit={handleSubmit} isLoading={loading} />
      </div>

      {loading ? (
        <div className="w-full max-w-2xl">
          <Skeleton className="w-full h-[200px] rounded-lg" />
        </div>
      ) : result ? (
        <ResultDisplay
          isToxic={result.isToxic}
          message={result.message}
        />
      ) : null}

      <footer className="mt-auto pt-8 text-center text-sm text-gray-500">
        <p>This app connects to a toxicity detection API at localhost:8080</p>
      </footer>
    </div>
  );
};

export default Toxic;
