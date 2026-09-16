import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { StudioDashboard } from "@/components/studio/dashboard";

export const Route = createFileRoute("/studio")({ component: Studio });

function Studio() {
  return (
    <AppShell current="studio">
      <StudioDashboard />
    </AppShell>
  );
}
