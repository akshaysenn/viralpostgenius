import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneratedPostProps {
  content: string;
  viralityScore: number;
}

export const GeneratedPost = ({ content, viralityScore }: GeneratedPostProps) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Your post has been copied to your clipboard.",
    });
  };

  return (
    <Card className="p-6 space-y-4 fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Generated Post</h3>
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-muted-foreground whitespace-pre-wrap">{content}</p>
      <div className="space-y-2">
        <p className="text-sm font-medium">Virality Score</p>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${viralityScore}%` }}
          />
        </div>
      </div>
    </Card>
  );
};