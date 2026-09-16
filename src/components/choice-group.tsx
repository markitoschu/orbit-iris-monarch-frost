import { cn } from "@/lib/utils";

type Option = { id: string; label: string; hint?: string; blurb?: string };

export function ChoiceGroup({
  options,
  value,
  onChange,
  multiple = false,
  columns = "wrap",
}: {
  options: readonly Option[];
  value: string[] | string;
  onChange: (next: string[] | string) => void;
  multiple?: boolean;
  columns?: "wrap" | "stack";
}) {
  const selected = new Set(Array.isArray(value) ? value : value ? [value] : []);

  function toggle(id: string) {
    if (multiple) {
      const next = new Set(selected);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onChange([...next]);
    } else {
      onChange(id);
    }
  }

  return (
    <div
      className={cn(
        "grid gap-2",
        columns === "stack" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2",
      )}
    >
      {options.map((opt) => {
        const on = selected.has(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            aria-pressed={on}
            className={cn(
              "min-h-11 rounded-lg px-3.5 py-3 text-left transition-[background-color,box-shadow,color] duration-150 ease-[var(--ease-out-soft)]",
              on
                ? "bg-primary text-primary-foreground shadow-card"
                : "bg-card text-foreground shadow-card hover:bg-sage-soft",
            )}
          >
            <span className="block text-sm font-medium">{opt.label}</span>
            {opt.hint || opt.blurb ? (
              <span
                className={cn(
                  "mt-0.5 block text-xs",
                  on ? "text-primary-foreground/80" : "text-muted-foreground",
                )}
              >
                {opt.hint ?? opt.blurb}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
