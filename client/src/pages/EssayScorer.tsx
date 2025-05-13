
import React, { useState } from 'react';
import { FileText, Check, Save, RefreshCw, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EssayScorer = () => {
  const [essay, setEssay] = useState('');
  const [topic, setTopic] = useState('');
  const [isScoring, setIsScoring] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  
  const { toast } = useToast();

  // Simulated feedback type
  type Feedback = {
    score: number;
    overview: string;
    strengths: string[];
    improvements: string[];
    grammarIssues: number;
    readabilityScore: number;
    coherenceScore: number;
    vocabularyScore: number;
  };

  const topics = [
    "Technology and Society",
    "Environmental Challenges",
    "Education Reform",
    "Healthcare Innovation",
    "Cultural Diversity",
    "Economic Inequality",
    "Media Influence",
    "Ethical Leadership"
  ];

  const handleTopicChange = (value: string) => {
    setTopic(value);
  };

  const scoreEssay = () => {
    if (essay.trim().length < 100) {
      toast({
        title: "Essay too short",
        description: "Please write at least 100 characters for an accurate score.",
        variant: "destructive",
      });
      return;
    }

    if (!topic) {
      toast({
        title: "Topic required",
        description: "Please select a topic for your essay.",
        variant: "destructive",
      });
      return;
    }

    setIsScoring(true);
    
    // Simulated API call with timeout
    setTimeout(() => {
      // Mock feedback generation
      const words = essay.split(/\s+/).length;
      
      // Generate score between 70 and 95
      const baseScore = Math.floor(Math.random() * 25 + 70);
      
      // Adjust score based on essay length
      let adjustedScore = baseScore;
      if (words < 200) adjustedScore -= 5;
      if (words > 500) adjustedScore += 5;
      
      // Cap at 100
      const finalScore = Math.min(adjustedScore, 100);
      
      const mockFeedback: Feedback = {
        score: finalScore,
        overview: `Your essay on "${topic}" demonstrates ${finalScore > 85 ? 'strong' : 'adequate'} understanding of the subject matter. The writing is ${finalScore > 85 ? 'clear and engaging' : 'somewhat clear but could be more cohesive'}.`,
        strengths: [
          "Good introduction that sets the context",
          `Effective use of ${finalScore > 85 ? 'evidence and examples' : 'some examples'}`,
          `${finalScore > 85 ? 'Strong' : 'Adequate'} conclusion that summarizes key points`
        ],
        improvements: [
          `${finalScore < 85 ? 'Develop arguments more thoroughly' : 'Consider exploring counterarguments'}`,
          `${finalScore < 85 ? 'Improve transitions between paragraphs' : 'Add more varied sentence structures'}`,
          `Enhance vocabulary with more ${finalScore < 85 ? 'precise' : 'sophisticated'} terms`
        ],
        grammarIssues: Math.floor(Math.random() * 5),
        readabilityScore: Math.floor(Math.random() * 20 + 70),
        coherenceScore: Math.floor(Math.random() * 20 + 70),
        vocabularyScore: Math.floor(Math.random() * 20 + 70)
      };
      
      setFeedback(mockFeedback);
      setIsScoring(false);
      
      toast({
        title: "Essay scored!",
        description: "Your detailed feedback is ready to review.",
      });
    }, 3000);
  };

  const resetFeedback = () => {
    setFeedback(null);
  };

  const saveEssay = () => {
    toast({
      title: "Essay saved",
      description: "Your essay has been saved successfully.",
    });
  };

  // Calculate word count
  const wordCount = essay.trim() === '' ? 0 : essay.trim().split(/\s+/).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <FileText className="h-8 w-8 text-[hsl(var(--tool-essay))]" />
          Essay Scorer
        </h1>
        <p className="text-muted-foreground">
          Get instant feedback and scoring on your essays.
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Your Essay</CardTitle>
          <CardDescription>
            Write or paste your essay below, then submit for scoring
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Essay Topic</Label>
            <Select value={topic} onValueChange={handleTopicChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="essay">Essay Content</Label>
              <span className="text-xs text-muted-foreground">
                {wordCount} {wordCount === 1 ? 'word' : 'words'}
              </span>
            </div>
            <Textarea
              id="essay"
              placeholder="Write or paste your essay here..."
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              rows={10}
              className="resize-y min-h-[200px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={saveEssay}
            disabled={essay.trim() === '' || isScoring}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button 
            onClick={scoreEssay}
            disabled={essay.trim().length < 100 || !topic || isScoring}
            className="bg-[hsl(var(--tool-essay))] hover:bg-[hsl(var(--tool-essay))] hover:opacity-90 text-white"
          >
            {isScoring ? (
              <>Analyzing<span className="loading">...</span></>
            ) : (
              <>
                <FileCheck className="mr-2 h-4 w-4" />
                Score Essay
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {feedback && (
        <Card className="border-border/50 animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">Score: {feedback.score}/100</span>
              <span className={`text-sm px-2 py-0.5 rounded-full ${
                feedback.score >= 90 ? 'bg-green-100 text-green-800' :
                feedback.score >= 80 ? 'bg-blue-100 text-blue-800' :
                feedback.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {feedback.score >= 90 ? 'Excellent' :
                 feedback.score >= 80 ? 'Good' :
                 feedback.score >= 70 ? 'Satisfactory' :
                 'Needs Improvement'}
              </span>
            </CardTitle>
            <CardDescription>{feedback.overview}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-medium text-lg flex items-center gap-2 text-green-600">
                  <Check className="h-4 w-4" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-lg flex items-center gap-2 text-amber-600">
                  <RefreshCw className="h-4 w-4" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0 mt-0.5">
                        <RefreshCw className="h-3 w-3" />
                      </span>
                      <span className="text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Detailed Analysis</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Grammar & Spelling</span>
                  <span className="text-xs text-muted-foreground">
                    {feedback.grammarIssues} {feedback.grammarIssues === 1 ? 'issue' : 'issues'} found
                  </span>
                </div>
                <Progress value={100 - (feedback.grammarIssues * 5)} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Readability</span>
                  <span className="text-xs text-muted-foreground">
                    {feedback.readabilityScore}/100
                  </span>
                </div>
                <Progress value={feedback.readabilityScore} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Coherence & Structure</span>
                  <span className="text-xs text-muted-foreground">
                    {feedback.coherenceScore}/100
                  </span>
                </div>
                <Progress value={feedback.coherenceScore} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Vocabulary Usage</span>
                  <span className="text-xs text-muted-foreground">
                    {feedback.vocabularyScore}/100
                  </span>
                </div>
                <Progress value={feedback.vocabularyScore} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={resetFeedback}
              variant="outline"
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Score Another Essay
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default EssayScorer;
