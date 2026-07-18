import type { Metadata } from "next";
import ClimaApp from "@/components/ClimaApp";

export const metadata: Metadata = {
  title: "Consulta climática | Climax",
};

export default function ClimaPage() {
  return <ClimaApp />;
}
