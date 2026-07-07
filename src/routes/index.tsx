import { createFileRoute } from "@tanstack/react-router";
import { BullfarmSite } from "@/components/bullfarm/BullfarmSite";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <BullfarmSite />;
}
