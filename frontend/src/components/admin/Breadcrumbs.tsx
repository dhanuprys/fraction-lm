import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@/components/pouf/Icon";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-[var(--fg-muted)]">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={idx} className="flex items-center gap-2">
            {idx > 0 && <span className="text-[var(--fg-muted)] opacity-60"><Icon name="next" size="sm" /></span>}
            {isLast ? (
              <span className="font-semibold text-[var(--fg)] bg-[var(--surface)] px-2 py-1 rounded-md border border-[var(--separator)]">
                {item.label}
              </span>
            ) : item.onClick ? (
              <button
                type="button"
                onClick={item.onClick}
                className="hover:text-[var(--mint)] hover:underline transition-colors focus:outline-none"
              >
                {item.label}
              </button>
            ) : item.href ? (
              <RouterLink
                to={item.href}
                className="hover:text-[var(--mint)] hover:underline transition-colors"
              >
                {item.label}
              </RouterLink>
            ) : (
              <span>{item.label}</span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
