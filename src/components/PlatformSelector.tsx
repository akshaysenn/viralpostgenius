import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Platform = "twitter" | "instagram" | "linkedin";

interface PlatformSelectorProps {
  selected: Platform;
  onSelect: (platform: Platform) => void;
}

export const PlatformSelector = ({ selected, onSelect }: PlatformSelectorProps) => {
  const platforms: { id: Platform; name: string }[] = [
    { id: "twitter", name: "X/Twitter" },
    { id: "instagram", name: "Instagram" },
    { id: "linkedin", name: "LinkedIn" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onSelect(platform.id)}
          className={cn(
            "px-4 py-2 rounded-md transition-all duration-200",
            selected === platform.id
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-secondary/80"
          )}
        >
          <span className="flex items-center gap-2">
            {platform.name}
            {selected === platform.id && <Check className="w-4 h-4" />}
          </span>
        </button>
      ))}
    </div>
  );
};