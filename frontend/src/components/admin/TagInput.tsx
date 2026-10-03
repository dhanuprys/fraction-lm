import { useState, type KeyboardEvent, type ClipboardEvent } from "react";
import { Icon } from "@/components/pouf/Icon";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function TagInput({
  value = [],
  onChange,
  placeholder = "Ketik lalu tekan Enter atau koma...",
  disabled,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (text: string) => {
    const trimmed = text.trim().replace(/^,+|,+$/g, "");
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  };

  const removeTag = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const tags = paste
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newTags = Array.from(new Set([...value, ...tags]));
    onChange(newTags);
    setInputValue("");
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5 p-2 rounded-lg border border-[var(--separator)] bg-[var(--bg)] min-h-[46px] items-center focus-within:ring-2 focus-within:ring-[var(--mint)] transition-all">
        {value.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-[color-mix(in_srgb,var(--mint)_15%,transparent)] text-[var(--fg)] border border-[color-mix(in_srgb,var(--mint)_30%,transparent)]"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(idx)}
                className="hover:text-red-500 transition-colors ml-0.5"
                title="Hapus kata kunci"
              >
                <Icon name="close" size="sm" />
              </button>
            )}
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => inputValue && addTag(inputValue)}
          onPaste={handlePaste}
          placeholder={value.length === 0 ? placeholder : "Tambah kata..."}
          disabled={disabled}
          className="flex-1 min-w-[140px] bg-transparent border-none text-sm outline-none text-[var(--fg)] placeholder:text-[var(--fg-muted)]"
        />
      </div>
    </div>
  );
}
