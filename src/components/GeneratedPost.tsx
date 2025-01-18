import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GeneratedPostProps {
  content: string;
  viralityScore: number;
}

export const GeneratedPost = ({ content, viralityScore }: GeneratedPostProps) => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Reset score when viralityScore changes
    setScore(0);
    // Animate to new score
    const timer = setTimeout(() => {
      setScore(viralityScore);
    }, 100);
    return () => clearTimeout(timer);
  }, [viralityScore]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Your post has been copied to your clipboard.",
    });
  };

  return (
    <Card className="p-6 space-y-4 fade-in">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Virality Score</p>
          <motion.span 
            className="text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {score}%
          </motion.span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Generated Post</h3>
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-muted-foreground whitespace-pre-wrap">{content}</p>
    </Card>
  );
};