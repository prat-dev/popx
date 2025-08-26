"use client";

import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { generateCode, type GenerateCodeInput } from '@/ai/flows/generate-code-from-wireframe';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, Clipboard, Code, Loader2, Upload } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export function CodeSuggestion() {
  const [wireframeDataUri, setWireframeDataUri] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
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
        setWireframeDataUri(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!wireframeDataUri) {
      toast({ variant: 'destructive', title: 'No wireframe uploaded', description: 'Please upload a wireframe image.' });
      return;
    }
    if (!description) {
      toast({ variant: 'destructive', title: 'No description provided', description: 'Please describe the components in the wireframe.' });
      return;
    }

    setIsLoading(true);
    setGeneratedCode(null);

    try {
      const input: GenerateCodeInput = { wireframeDataUri, description };
      const result = await generateCode(input);
      setGeneratedCode(result.codeSnippet);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Code',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      toast({ title: 'Code copied to clipboard!' });
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Generate Code from Wireframe</CardTitle>
        <CardDescription>Upload a wireframe, describe it, and let AI generate the Next.js code for you.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="wireframe-upload">Wireframe Image</Label>
            <Input
              id="wireframe-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Label
              htmlFor="wireframe-upload"
              className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-input bg-background text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {wireframeDataUri ? (
                <img src={wireframeDataUri} alt="Wireframe preview" className="h-full w-full object-contain p-2" />
              ) : (
                <>
                  <Upload className="mx-auto h-10 w-10 mb-2" />
                  <span className="text-sm font-medium">{fileName || 'Click to upload or drag and drop'}</span>
                </>
              )}
            </Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="e.g., A hero section with a title, a subtitle, and a call-to-action button."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>
          <Button onClick={handleSubmit} disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-base py-6">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Code className="mr-2 h-5 w-5" />
            )}
            Generate Code
          </Button>
        </div>
        <div className="relative">
          <Label>Generated Code</Label>
          <Card className="h-full min-h-[360px] flex items-center justify-center bg-secondary/50 p-0 overflow-hidden">
            {isLoading && (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Bot className="h-10 w-10 animate-pulse" />
                <p>Generating your code...</p>
              </div>
            )}
            {!isLoading && !generatedCode && (
              <div className="text-center text-muted-foreground p-4">
                <p>Your generated Next.js code will appear here.</p>
              </div>
            )}
            {generatedCode && (
              <div className="w-full h-full relative group">
                <Button variant="ghost" size="icon" className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity" onClick={copyToClipboard}>
                  <Clipboard className="h-4 w-4" />
                </Button>
                <ScrollArea className="h-full w-full rounded-md bg-card">
                   <pre className="text-sm p-4 pt-12 overflow-x-auto"><code className="font-code">{generatedCode}</code></pre>
                </ScrollArea>
              </div>
            )}
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
