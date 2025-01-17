import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ApiKeyInput = ({ value, onChange }: ApiKeyInputProps) => {
  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between">
        <Label htmlFor="api-key">Google Gemini API Key</Label>
        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          Get API Key
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <Input
        id="api-key"
        type="password"
        placeholder="Enter your API key"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
};