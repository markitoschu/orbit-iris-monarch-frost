import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { SurveyForm } from "@/components/survey/survey-form";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell current="survey">
      <SurveyForm />
    </AppShell>
  );
}
