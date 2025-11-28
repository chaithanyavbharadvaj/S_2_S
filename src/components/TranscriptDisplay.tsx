import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TranscriptDisplayProps {
  transcript: string[];
}

const TranscriptDisplay = ({ transcript }: TranscriptDisplayProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  return (
    <Card className="h-full bg-card border-border">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Transcript</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Recognized ASL signs appear here
        </p>
      </div>
      
      <ScrollArea className="h-[calc(100%-88px)]">
        <div ref={scrollRef} className="p-6 space-y-2">
          {transcript.length === 0 ? (
            <p className="text-muted-foreground italic">
              Start signing to see the transcript...
            </p>
          ) : (
            transcript.map((word, index) => (
              <div
                key={index}
                className="inline-block mr-2 mb-2 px-3 py-1 bg-primary/10 text-primary rounded-md border border-primary/20 animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                {word}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default TranscriptDisplay;
