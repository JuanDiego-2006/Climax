import type { ConsultaClima, NivelRiesgo } from "@/lib/types";

export const CIUDADES_RAPIDAS = [
  "Tuxtla Gutiérrez",
  "Tapachula",
  "San Cristóbal",
  "Comitán",
] as const;

/** Datos temporales de UI. Sustituye por la respuesta de tu backend. */
export const HISTORIAL_MOCK: ConsultaClima[] = [
  {
    id: 1,
    ciudad: "Tuxtla Gutiérrez",
    fecha: hoursAgo(2),
    temperatura: 34,
    sensacion: 38,
    humedad: 28,
    viento: 42,
    visibilidad: 9.2,
    descripcion: "Parcialmente nublado",
    alerta:
      "Humedad muy baja y viento fuerte. Alto riesgo de incendios forestales — evite quemas agrícolas.",
    nivelRiesgo: "alto",
  },
  {
    id: 2,
    ciudad: "Tapachula",
    fecha: hoursAgo(5),
    temperatura: 27,
    sensacion: 30,
    humedad: 72,
    viento: 11,
    visibilidad: 8.5,
    descripcion: "Lluvia ligera",
    alerta: "Condiciones ideales para siembra. Aproveche la humedad del suelo.",
    nivelRiesgo: "optimo",
  },
  {
    id: 3,
    ciudad: "San Cristóbal",
    fecha: hoursAgo(8),
    temperatura: 18,
    sensacion: 16,
    humedad: 85,
    viento: 23,
    visibilidad: 6,
    descripcion: "Lluvia moderada",
    alerta: "Lluvia moderada: precaución en cultivos y caminos rurales.",
    nivelRiesgo: "medio",
  },
  {
    id: 4,
    ciudad: "Comitán",
    fecha: hoursAgo(12),
    temperatura: 24,
    sensacion: 25,
    humedad: 55,
    viento: 8,
    visibilidad: 10,
    descripcion: "Parcialmente nublado",
    alerta: "Condiciones estables para el agro. Monitoree la humedad.",
    nivelRiesgo: "bajo",
  },
  {
    id: 5,
    ciudad: "Palenque",
    fecha: daysAgo(1, 16, 10),
    temperatura: 36,
    sensacion: 40,
    humedad: 30,
    viento: 38,
    visibilidad: 8,
    descripcion: "Calor intenso",
    alerta: "Alto riesgo de incendios forestales",
    nivelRiesgo: "alto",
  },
  {
    id: 6,
    ciudad: "Chiapa de Corzo",
    fecha: daysAgo(1, 11, 20),
    temperatura: 29,
    sensacion: 32,
    humedad: 68,
    viento: 10,
    visibilidad: 9,
    descripcion: "Nublado",
    alerta: "Condiciones ideales para siembra",
    nivelRiesgo: "optimo",
  },
  {
    id: 7,
    ciudad: "Ocosingo",
    fecha: daysAgo(2, 9, 45),
    temperatura: 22,
    sensacion: 21,
    humedad: 78,
    viento: 18,
    visibilidad: 7.5,
    descripcion: "Llovizna",
    alerta: "Humedad elevada: vigilar plagas",
    nivelRiesgo: "medio",
  },
  {
    id: 8,
    ciudad: "Villaflores",
    fecha: daysAgo(2, 18, 5),
    temperatura: 31,
    sensacion: 34,
    humedad: 48,
    viento: 13,
    visibilidad: 10,
    descripcion: "Despejado",
    alerta: "Condiciones estables para el agro",
    nivelRiesgo: "bajo",
  },
];

const CONSULTAS: Record<string, Omit<ConsultaClima, "id" | "fecha" | "ciudad">> = {
  "tuxtla gutierrez": {
    temperatura: 34,
    sensacion: 38,
    humedad: 28,
    viento: 42,
    visibilidad: 9.2,
    descripcion: "Parcialmente nublado",
    alerta:
      "Humedad muy baja y viento fuerte. Alto riesgo de incendios forestales — evite quemas agrícolas.",
    nivelRiesgo: "alto",
  },
  tapachula: {
    temperatura: 27,
    sensacion: 30,
    humedad: 72,
    viento: 11,
    visibilidad: 8.5,
    descripcion: "Lluvia ligera",
    alerta: "Condiciones ideales para siembra. Aproveche la humedad del suelo.",
    nivelRiesgo: "optimo",
  },
  "san cristobal": {
    temperatura: 18,
    sensacion: 16,
    humedad: 85,
    viento: 23,
    visibilidad: 6,
    descripcion: "Lluvia moderada",
    alerta: "Lluvia moderada: precaución en cultivos y caminos rurales.",
    nivelRiesgo: "medio",
  },
  "san cristobal de las casas": {
    temperatura: 18,
    sensacion: 16,
    humedad: 85,
    viento: 23,
    visibilidad: 6,
    descripcion: "Lluvia moderada",
    alerta: "Lluvia moderada: precaución en cultivos y caminos rurales.",
    nivelRiesgo: "medio",
  },
  comitan: {
    temperatura: 24,
    sensacion: 25,
    humedad: 55,
    viento: 8,
    visibilidad: 10,
    descripcion: "Parcialmente nublado",
    alerta: "Condiciones estables para el agro. Monitoree la humedad.",
    nivelRiesgo: "bajo",
  },
  "comitan de dominguez": {
    temperatura: 24,
    sensacion: 25,
    humedad: 55,
    viento: 8,
    visibilidad: 10,
    descripcion: "Parcialmente nublado",
    alerta: "Condiciones estables para el agro. Monitoree la humedad.",
    nivelRiesgo: "bajo",
  },
};

function normalizar(texto: string): string {
  return texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Devuelve una consulta mock por ciudad. Reemplaza esta función al conectar tu API. */
export function obtenerConsultaMock(ciudad: string): ConsultaClima {
  const clave = normalizar(ciudad);
  const match = Object.entries(CONSULTAS).find(([k]) => clave.includes(k) || k.includes(clave));
  const datos = match?.[1] ?? {
    temperatura: 28,
    sensacion: 30,
    humedad: 50,
    viento: 14,
    visibilidad: 9,
    descripcion: "Parcialmente nublado",
    alerta: "Condiciones estables para el agro en la región.",
    nivelRiesgo: "bajo" as NivelRiesgo,
  };

  return {
    id: Date.now(),
    ciudad: ciudad.trim(),
    fecha: new Date().toISOString(),
    ...datos,
  };
}

function hoursAgo(hours: number): string {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

function daysAgo(days: number, hour: number, minute: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}
