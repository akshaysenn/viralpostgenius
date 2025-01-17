import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ApiKeyInput = ({ value, onChange }: ApiKeyInputProps) => {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="api-key">Google Gemini API Key</Label>
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