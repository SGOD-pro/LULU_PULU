import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, AlertTriangle } from "lucide-react";

interface ResultDisplayProps {
  isToxic: boolean;
  message: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  isToxic,
  message,
}) => {
  return (
    <Card
      className={cn(
        "w-full max-w-2xl transition-colors shadow-lg border-2",
        isToxic ? "border-red-400" : "border-green-400"
      )}
    >
      <CardContent className="pt-6 pb-6">
        <div className="flex items-center justify-center mb-4">
          {isToxic ? (
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          ) : (
            <div className="bg-green-100 p-3 rounded-full">
              <Check className="h-8 w-8 text-green-500" />
            </div>
          )}
        </div>

        <h2
          className={cn(
            "text-2xl font-bold text-center mb-2",
            isToxic ? "text-red-500" : "text-green-500"
          )}
        >
          {isToxic ? "Toxic Content Detected" : "Safe Content"}
        </h2>

        <p className="text-center text-gray-600 mb-4">{message}</p>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
