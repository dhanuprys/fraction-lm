import { Icon } from "@/components/pouf/Icon";
import { Button } from "@/components/pouf/Button";

interface OrderControlsProps {
  order: number;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  disabled?: boolean;
}

export function OrderControls({
  order,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  disabled,
}: OrderControlsProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-[var(--surface-sunken)] p-1 rounded-lg border border-[var(--separator)]">
      <span className="text-xs font-semibold px-1.5 text-[var(--fg-muted)]">Urutan {order}</span>
      {onMoveUp && (
        <Button
          type="button"
          size="sm"
          variant="quiet"
          disabled={disabled || isFirst}
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
          label="Pindah Ke Atas"
        >
          <Icon name="up" size="sm" />
        </Button>
      )}
      {onMoveDown && (
        <Button
          type="button"
          size="sm"
          variant="quiet"
          disabled={disabled || isLast}
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
          label="Pindah Ke Bawah"
        >
          <Icon name="down" size="sm" />
        </Button>
      )}
    </div>
  );
}
