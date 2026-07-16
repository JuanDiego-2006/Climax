export type NivelRiesgo = "bajo" | "medio" | "alto" | "optimo" | "critico";

/** Contrato de datos del clima / alerta (listo para conectar tu backend). */
export interface ConsultaClima {
  id: number | string;
  ciudad: string;
  fecha: string;
  temperatura: number;
  sensacion: number;
  humedad: number;
  /** Velocidad del viento en km/h */
  viento: number;
  /** Visibilidad en km */
  visibilidad: number;
  descripcion: string;
  alerta: string;
  nivelRiesgo: NivelRiesgo;
}
