import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { NilaMark } from "./mark";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  current,
}: {
  children: ReactNode;
  current: "survey" | "studio";
}) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <NilaMark className="size-5 text-primary" />
            <span className="font-display text-lg font-medium tracking-tight">Nila</span>
            <span className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Yoga
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink to="/" active={current === "survey"}>
              Student form
            </NavLink>
            <NavLink to="/studio" active={current === "studio"}>
              Studio
            </NavLink>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

function NavLink({
  to,
  active,
  children,
}: {
  to: "/" | "/studio";
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex h-9 items-center rounded-md px-3 text-sm font-medium transition-colors duration-150",
        active ? "bg-sage-soft text-accent-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
