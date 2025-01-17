import { useState } from "react";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { TopicInput } from "@/components/TopicInput";
import { PlatformSelector, type Platform } from "@/components/PlatformSelector";
import { GeneratedPost } from "@/components/GeneratedPost";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { generatePost } from "@/utils/geminiApi";

const Index = () => {
  const [apiKey, setApiKey] = useState("");
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("twitter");
  const [generatedContent, setGeneratedContent] = useState("");
  const [viralityScore, setViralityScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePost = async () => {
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
      const result = await generatePost(apiKey, { topic, platform });
      setGeneratedContent(result.content);
      setViralityScore(result.viralityScore);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate post. Please check your API key and try again.",
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
            onClick={handleGeneratePost}
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