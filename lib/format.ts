import type { NivelRiesgo } from "@/lib/types";

export function badgeNivel(nivel: NivelRiesgo): string {
  switch (nivel) {
    case "critico":
    case "alto":
      return "ALTO";
    case "medio":
      return "MODERADO";
    case "optimo":
      return "ÓPTIMO";
    case "bajo":
      return "BAJO";
  }
}

export function formatearFechaRelativa(fecha: string): string {
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return fecha;

  const ahora = new Date();
  const hora = d.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const inicioHoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
  const inicioAyer = new Date(inicioHoy);
  inicioAyer.setDate(inicioAyer.getDate() - 1);
  const inicioFecha = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  if (inicioFecha.getTime() === inicioHoy.getTime()) return `Hoy · ${hora}`;
  if (inicioFecha.getTime() === inicioAyer.getTime()) return `Ayer · ${hora}`;

  const dia = d.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
  return `${dia} · ${hora}`;
}
