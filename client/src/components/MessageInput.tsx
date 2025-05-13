import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from 'lucide-react';

interface MessageInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!text.trim()) {
      setError('Please enter a message to check');
      return;
    }
    setError(null);
    onSubmit(text);
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Enter a message to check for toxicity..."
              className="min-h-[120px] resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isLoading}
            />
            {error && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{error}</span>
              </div>
            )}
          </div>
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Checking...' : 'Check Message'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageInput;
