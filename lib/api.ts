import type {
  AireRegistro,
  AuthResponse,
  Ciudad,
  ConsultaClima,
  LoginPayload,
  NivelRiesgo,
  RegisterPayload,
} from "@/lib/types";

const BASE_URL = "/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function toConsultaClima(registro: AireRegistro): ConsultaClima {
  return {
    id:          registro.id ?? 0,
    ciudad:      registro.ciudad ?? "",
    fecha:       registro.fecha
                   ? new Date(registro.fecha).toISOString()
                   : new Date().toISOString(),
    temperatura: registro.temperatura,
    sensacion:   registro.sensacion,
    humedad:     registro.humedad,
    viento:      registro.viento,
    visibilidad: registro.visibilidad,
    descripcion: registro.descripcion,
    alerta:      registro.alerta,
    nivelRiesgo: registro.nivelRiesgo as NivelRiesgo,
  };
}

async function throwApiError(res: Response, fallback: string): Promise<never> {
  const text = await res.text().catch(() => "");
  throw new Error(text || fallback);
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });

  if (!res.ok) await throwApiError(res, "Correo o contraseña incorrectos.");

  const data: AuthResponse = await res.json();
  if (data.token) localStorage.setItem("token", data.token);
  return data;
}

export async function register(payload: RegisterPayload): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });

  if (!res.ok) await throwApiError(res, "No se pudo crear la cuenta.");
}

export function logout(): void {
  localStorage.removeItem("token");
}

export async function getCiudades(): Promise<Ciudad[]> {
  const res = await fetch(`${BASE_URL}/cities`, {
    headers: authHeaders(),
  });

  if (!res.ok) await throwApiError(res, "No se pudieron cargar las ciudades.");
  return res.json();
}

export async function getCalidadAire(cityId: number): Promise<ConsultaClima> {
  const res = await fetch(`${BASE_URL}/air-quality?cityId=${cityId}`, {
    headers: authHeaders(),
  });

  if (!res.ok) await throwApiError(res, "No se pudo obtener el clima.");

  const data: AireRegistro = await res.json();
  return toConsultaClima(data);
}

export async function getHistorial(): Promise<ConsultaClima[]> {
  const res = await fetch(`${BASE_URL}/air-quality/history`, {
    headers: authHeaders(),
  });

  if (!res.ok) await throwApiError(res, "No se pudo cargar el historial.");

  const data: AireRegistro[] = await res.json();
  return data.map(toConsultaClima);
}
