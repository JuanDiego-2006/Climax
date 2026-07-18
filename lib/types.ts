export type NivelRiesgo = "bajo" | "medio" | "alto" | "optimo" | "critico";

export interface Ciudad {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

export interface AireRegistro {
  id?:         number;
  cityId:      number;
  ciudad?:     string;
  userId?:     number;
  temperatura: number;
  sensacion:   number;
  humedad:     number;
  viento:      number;
  visibilidad: number;
  descripcion: string;
  alertaCorta: string;
  alerta:      string;
  nivelRiesgo: string;
  fecha?:      Date | string;
}

export interface RegisterPayload {
  name:      string;
  lastName:  string;
  email:     string;
  password:  string;
}

export interface LoginPayload {
  email:    string;
  password: string;
}

export interface AuthResponse {
  token:   string;
  userId?: number;
}

export interface ConsultaClima {
  id:          number | string;
  ciudad:      string;
  fecha:       string;
  temperatura: number;
  sensacion:   number;
  humedad:     number;
  viento:      number;
  visibilidad: number;
  descripcion: string;
  alerta:      string;
  nivelRiesgo: NivelRiesgo;
}
