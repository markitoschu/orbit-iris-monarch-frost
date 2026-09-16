import { DAYS, TIME_WINDOWS, type DayId, type WindowId } from "@/lib/nila/constants";
import type { HeatCell } from "@/lib/nila/types";
import { cn } from "@/lib/utils";

export function Heatmap({
  cells,
  onPick,
}: {
  cells: HeatCell[];
  onPick?: (day: DayId, window: WindowId) => void;
}) {
  const max = Math.max(1, ...cells.map((c) => c.count));
  const lookup = new Map(cells.map((c) => [`${c.day}-${c.window}`, c.count]));

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] border-separate border-spacing-1 text-sm">
        <thead>
          <tr>
            <th className="w-24 text-left text-xs font-medium text-muted-foreground"> </th>
            {DAYS.map((d) => (
              <th key={d.id} className="text-xs font-medium text-muted-foreground">
                {d.short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIME_WINDOWS.map((w) => (
            <tr key={w.id}>
              <td className="whitespace-nowrap pr-2 text-xs text-muted-foreground">{w.label}</td>
              {DAYS.map((d) => {
                const count = lookup.get(`${d.id}-${w.id}`) ?? 0;
                const intensity = count / max;
                return (
                  <td key={d.id}>
                    <button
                      type="button"
                      onClick={() => onPick?.(d.id, w.id)}
                      className={cn(
                        "flex h-10 w-full items-center justify-center rounded-md text-xs tabular-nums transition-transform duration-150",
                        count === 0
                          ? "bg-muted text-muted-foreground"
                          : "text-primary-foreground",
                      )}
                      style={
                        count === 0
                          ? undefined
                          : { backgroundColor: `color-mix(in oklab, var(--color-primary) ${Math.round(25 + intensity * 75)}%, transparent)` }
                      }
                    >
                      {count || "·"}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
