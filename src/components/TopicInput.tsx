import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TopicInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TopicInput = ({ value, onChange }: TopicInputProps) => {
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="topic">Topic</Label>
      <Textarea
        id="topic"
        placeholder="Enter your topic or idea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px] w-full"
      />
    </div>
  );
};