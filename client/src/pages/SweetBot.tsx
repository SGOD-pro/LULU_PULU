
import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const SweetBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm SweetBot, your friendly AI companion. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to the chat
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage.trim() }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }
      
      const data = await response.json();
      
      // Add bot response to chat
      const botMessage: Message = {
        id: messages.length + 2,
        text: data.response || "I'm having trouble understanding right now. Can you try again?",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Connection Error",
        description: "Couldn't connect to the AI service. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 dark:bg-pink-900/30 px-3 py-1 text-sm font-medium text-pink-600 dark:text-pink-300">
          <Heart className="h-4 w-4" />
          <span>SweetBot</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">The AI that listens with heart</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Chat with SweetBot whenever you're feeling lonely or just want someone to talk to. I'm here for you anytime.
        </p>
      </div>
      
      <Card className="border-2 border-pink-100 dark:border-pink-900/30 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-pink-600 dark:text-pink-300">
            <Heart className="h-5 w-5" />
            SweetBot
          </CardTitle>
          <CardDescription>Your friendly AI companion</CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-foreground'
                  }`}
                >
                  <p className="break-words">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user'
                      ? 'text-primary-foreground/70'
                      : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-foreground">
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-pink-400 dark:bg-pink-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-pink-400 dark:bg-pink-500 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-pink-400 dark:bg-pink-500 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter className="flex gap-2 p-4 border-t">
          <Textarea 
            placeholder="Type your message here..." 
            className="resize-none flex-1"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage} 
            className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50"
            disabled={!inputMessage.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SweetBot;