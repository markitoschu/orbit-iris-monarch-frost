import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  AREA_BY_ID,
  CLASS_TYPES,
  DAYS,
  labelOf,
} from "@/lib/nila/constants";
import type { Student } from "@/lib/nila/types";
import { Button } from "@/components/ui/button";

export function StudentTable({ students }: { students: Student[] }) {
  const [q, setQ] = useState("");
  const [cluster, setCluster] = useState<"all" | "east" | "northeast" | "central">("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return students.filter((s) => {
      if (cluster !== "all" && AREA_BY_ID[s.liveArea]?.cluster !== cluster) return false;
      if (!needle) return true;
      const hay = [
        s.firstName,
        AREA_BY_ID[s.liveArea]?.label,
        s.classTypes.map((c) => labelOf(CLASS_TYPES, c)).join(" "),
        s.preferredDays.map((d) => labelOf(DAYS, d)).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [students, q, cluster]);

  function exportCsv() {
    const headers = [
      "name",
      "lives",
      "works",
      "convenient",
      "travel",
      "days",
      "times",
      "classes",
      "frequency",
      "stated_price",
      "commit_price",
      "packages",
      "commitment",
      "makeup",
      "true_yoga",
    ];
    const lines = filtered.map((s) =>
      [
        s.firstName,
        s.liveArea,
        s.workArea,
        s.convenientAreas.join("|"),
        s.travel,
        s.preferredDays.join("|"),
        s.timeWindows.join("|"),
        s.classTypes.join("|"),
        s.frequency,
        s.statedPrice,
        s.commitPrice,
        s.packages.join("|"),
        s.commitmentStyle,
        s.makeup,
        s.trueYogaStudent ? "yes" : "no",
      ]
        .map((v) => `"${String(v).replaceAll('"', '""')}"`)
        .join(","),
    );
    const blob = new Blob([[headers.join(","), ...lines].join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nila-students.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, area, class…"
          className="sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {(["all", "east", "northeast", "central"] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCluster(c)}
              className={
                cluster === c
                  ? "h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground"
                  : "h-9 rounded-md bg-card px-3 text-sm shadow-card"
              }
            >
              {c === "all" ? "All" : c === "northeast" ? "North-East" : c[0].toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        <Button variant="outline" className="sm:ml-auto" onClick={exportCsv}>
          Download CSV
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl bg-card shadow-card">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr className="border-b border-border">
              <th className="px-4 py-3 font-medium">Student</th>
              <th className="px-4 py-3 font-medium">Lives</th>
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Practice</th>
              <th className="px-4 py-3 font-medium">Pay</th>
              <th className="px-4 py-3 font-medium">Commit</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-border/70 last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium">{s.firstName}</div>
                  <div className="text-xs text-muted-foreground">
                    {s.trueYogaStudent ? "True Yoga" : "New"} · {s.frequency}
                  </div>
                </td>
                <td className="px-4 py-3">{AREA_BY_ID[s.liveArea]?.label}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {s.preferredDays.map((d) => labelOf(DAYS, d).slice(0, 3)).join(" ")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {s.classTypes.slice(0, 2).map((c) => (
                      <Badge key={c} variant="sage">
                        {labelOf(CLASS_TYPES, c)}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 tabular-nums">
                  S${s.commitPrice}
                  <span className="text-muted-foreground"> / said S${s.statedPrice}</span>
                </td>
                <td className="px-4 py-3 capitalize">{s.commitmentStyle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">{filtered.length} people in this view.</p>
    </div>
  );
}
