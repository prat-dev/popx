"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeSuggestion } from "@/components/code-suggestion";
import { DesignFeedback } from "@/components/design-feedback";
import { Code, Palette } from "lucide-react";

export function FeatureTabs() {
  return (
    <Tabs defaultValue="code-suggestion" className="w-full">
      <TabsList className="grid w-full grid-cols-2 h-14">
        <TabsTrigger value="code-suggestion" className="text-base">
          <Code className="mr-2 h-5 w-5" />
          Code Suggestion
        </TabsTrigger>
        <TabsTrigger value="design-feedback" className="text-base">
          <Palette className="mr-2 h-5 w-5" />
          Design Feedback
        </TabsTrigger>
      </TabsList>
      <TabsContent value="code-suggestion" className="mt-6">
        <CodeSuggestion />
      </TabsContent>
      <TabsContent value="design-feedback" className="mt-6">
        <DesignFeedback />
      </TabsContent>
    </Tabs>
  );
}
