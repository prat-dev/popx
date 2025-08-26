import { FeatureTabs } from '@/components/feature-tabs';
import { Bot } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-background font-body">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <div className="inline-block bg-primary text-primary-foreground p-3 rounded-full mb-4 shadow-lg">
            <Bot size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tight">
            Design Decoder
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered assistant for UI/UX development and design feedback.
          </p>
        </header>
        <FeatureTabs />
      </div>
    </main>
  );
}
