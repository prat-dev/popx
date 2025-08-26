"use client";

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { provideDesignFeedback, type ProvideDesignFeedbackInput } from '@/ai/flows/provide-design-feedback';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, Palette, Upload } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export function DesignFeedback() {
  const [designDataUri, setDesignDataUri] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please upload an image file.',
        });
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setDesignDataUri(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!designDataUri) {
      toast({ variant: 'destructive', title: 'No design uploaded', description: 'Please upload a design image.' });
      return;
    }

    setIsLoading(true);
    setFeedback(null);

    try {
      const input: ProvideDesignFeedbackInput = { designDataUri };
      const result = await provideDesignFeedback(input);
      setFeedback(result.feedback);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Getting Feedback',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Get AI Design Feedback</CardTitle>
        <CardDescription>Upload your design mockup to receive expert feedback on typography, color, and layout.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6 flex flex-col">
          <div className="flex-grow space-y-2">
            <Label htmlFor="design-upload">Design Mockup</Label>
             <Input
              id="design-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Label
              htmlFor="design-upload"
              className="flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-input bg-background text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {designDataUri ? (
                <img src={designDataUri} alt="Design preview" className="h-full w-full object-contain p-2" />
              ) : (
                <>
                  <Upload className="mx-auto h-10 w-10 mb-2" />
                  <span className="text-sm font-medium">{fileName || 'Click to upload or drag and drop'}</span>
                </>
              )}
            </Label>
          </div>
          <Button onClick={handleSubmit} disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-base py-6">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Palette className="mr-2 h-5 w-5" />
            )}
            Get Feedback
          </Button>
        </div>
        <div className="relative">
          <Label>AI Feedback</Label>
          <Card className="h-full min-h-[360px] flex items-center justify-center bg-secondary/50 p-0 overflow-hidden">
            {isLoading && (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Bot className="h-10 w-10 animate-pulse" />
                <p>Analyzing your design...</p>
              </div>
            )}
            {!isLoading && !feedback && (
              <div className="text-center text-muted-foreground p-4">
                <p>Your AI-generated design feedback will appear here.</p>
              </div>
            )}
            {feedback && (
              <ScrollArea className="h-full w-full rounded-md bg-card">
                <div className="text-sm p-6 whitespace-pre-wrap leading-relaxed">{feedback}</div>
              </ScrollArea>
            )}
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
