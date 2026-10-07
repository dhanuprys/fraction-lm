import defaultImage from "@/assets/images/ai-status/default.webp";
import happyImage from "@/assets/images/ai-status/happy.webp";
import loadingImage from "@/assets/images/ai-status/loading.webp";
import standbyImage from "@/assets/images/ai-status/standby.webp";
import thinkingImage from "@/assets/images/ai-status/thinking.webp";
import ideaImage from "@/assets/images/ai-status/idea.webp";
import { clsx } from "clsx";

interface AIAvatarProps {
  state?: "default" | "happy" | "loading" | "standby" | "thinking" | "idea";
  className?: string;
  size?: "sm" | "md" | "lg" | number;
}

export function AIAvatar({ state = "default", className = "", size = "sm" }: AIAvatarProps) {
  // For future scaling, we map different states to their respective image assets.
  const stateImages = {
    default: defaultImage,
    happy: happyImage,
    loading: loadingImage,
    standby: standbyImage,
    thinking: thinkingImage,
    idea: ideaImage,
  };

  const currentImage = stateImages[state] || defaultImage;

  // Determine size classes or inline styles
  let sizeClass = "w-10 h-10";
  if (size === "md") sizeClass = "w-12 h-12";
  if (size === "lg") sizeClass = "w-14 h-14";

  const customStyle = typeof size === "number" ? { width: size, height: size } : {};

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl bg-[var(--surface)] flex-shrink-0",
        "transition-all duration-300 ease-in-out",
        typeof size === "string" ? sizeClass : "",
        className,
      )}
      style={customStyle}
    >
      <img
        src={currentImage}
        alt={`AI is ${state}`}
        className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
      />
    </div>
  );
}
