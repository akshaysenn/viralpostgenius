import { useState } from "react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { TopicInput } from "@/components/TopicInput";
import { PlatformSelector, type Platform } from "@/components/PlatformSelector";
import { GeneratedPost } from "@/components/GeneratedPost";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [apiKey, setApiKey] = useState("");
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("twitter");
  const [generatedContent, setGeneratedContent] = useState("");
  const [viralityScore, setViralityScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generatePost = async () => {
    if (!apiKey || !topic) {
      toast({
        title: "Missing information",
        description: "Please provide both an API key and a topic.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, we would call the Gemini API here
      // For now, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const mockContent = `🚀 Exciting news! Just discovered an amazing way to boost productivity using AI tools.\n\n💡 Key takeaways:\n- Automate repetitive tasks\n- Focus on creative work\n- Scale your impact\n\nWho else is leveraging AI in their workflow? 🤔\n\n#ProductivityHacks #AI #Innovation`;
      setGeneratedContent(mockContent);
      setViralityScore(85);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">AI Post Generator</h1>
          <p className="text-muted-foreground">
            Generate viral social media posts with AI
          </p>
        </div>

        <div className="space-y-6">
          <ApiKeyInput value={apiKey} onChange={setApiKey} />
          <TopicInput value={topic} onChange={setTopic} />
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Platform</label>
            <PlatformSelector selected={platform} onSelect={setPlatform} />
          </div>
          
          <Button
            className="w-full"
            onClick={generatePost}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Post"
            )}
          </Button>

          {generatedContent && (
            <GeneratedPost
              content={generatedContent}
              viralityScore={viralityScore}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;