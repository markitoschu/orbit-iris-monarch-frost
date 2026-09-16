import { useEffect, useState, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AREA_BY_ID, CLASS_TYPES, labelOf } from "@/lib/nila/constants";
import type { AreaDemand, PricePoint } from "@/lib/nila/types";

function ChartFrame({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="h-64 rounded-lg bg-muted/60" />;
  return <div className="h-64 w-full">{children}</div>;
}

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--color-foreground)",
};

export function AreaBars({ data }: { data: AreaDemand[] }) {
  const rows = data
    .filter((d) => d.live > 0 || d.convenient > 0)
    .map((d) => ({
      name: AREA_BY_ID[d.area]?.label ?? d.area,
      live: d.live,
      convenient: d.convenient,
    }));

  return (
    <ChartFrame>
      <ResponsiveContainer>
        <BarChart data={rows} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={56}
          />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="live" name="Live here" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="convenient" name="Would attend here" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function ClassBars({ data }: { data: { id: string; count: number }[] }) {
  const rows = data.map((d) => ({
    name: labelOf(CLASS_TYPES, d.id),
    count: d.count,
  }));
  return (
    <ChartFrame>
      <ResponsiveContainer>
        <BarChart data={rows} layout="vertical" margin={{ top: 8, right: 12, left: 16, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" horizontal={false} />
          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
          <YAxis
            type="category"
            dataKey="name"
            width={108}
            tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="count" name="Interested" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function PriceBars({ data }: { data: PricePoint[] }) {
  const rows = data.map((d) => ({
    name: `S$${d.price}`,
    commit: d.overallCommit,
    stated: d.overallStated,
  }));
  return (
    <ChartFrame>
      <ResponsiveContainer>
        <BarChart data={rows} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="stated" name="Say they’d pay" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="commit" name="Would actually pay" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
