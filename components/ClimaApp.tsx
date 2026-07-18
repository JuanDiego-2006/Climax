"use client";

import { useEffect, useState } from "react";
import { getCiudades, getCalidadAire, getHistorial } from "@/lib/api";
import HistorialAlertas from "@/components/HistorialAlertas";
import ResultadoConsulta from "@/components/ResultadoConsulta";
import {
  IconGrid,
  IconHistory,
  IconLeaf,
  IconSearch,
  WeatherEmptyIcon,
} from "@/components/icons";
import type { Ciudad, ConsultaClima } from "@/lib/types";

type Vista = "consulta" | "historico";

export default function ClimaApp() {
  const [vista, setVista] = useState<Vista>("consulta");

  const [ciudades, setCiudades]       = useState<Ciudad[]>([]);
  const [ciudadInput, setCiudadInput] = useState("");

  const [resultado, setResultado]       = useState<ConsultaClima | null>(null);
  const [loadingClima, setLoadingClima] = useState(false);
  const [errorClima, setErrorClima]     = useState("");

  const [historial, setHistorial]               = useState<ConsultaClima[]>([]);
  const [loadingHistorial, setLoadingHistorial] = useState(false);
  const [errorHistorial, setErrorHistorial]     = useState("");

  useEffect(() => {
    getCiudades()
      .then(setCiudades)
      .catch(() => setCiudades([])); 
  }, []);

  useEffect(() => {
    if (vista !== "historico") return;

    async function cargarHistorial() {
      try {
        const datos = await getHistorial();
        setHistorial(datos);
        setErrorHistorial("");
      } catch (err) {
        setErrorHistorial(err instanceof Error ? err.message : "Error al cargar historial.");
      } finally {
        setLoadingHistorial(false);
      }
    }

    Promise.resolve().then(() => {
      setLoadingHistorial(true);
      setErrorHistorial("");
      cargarHistorial();
    });
  }, [vista]);


  async function buscarClima(nombreCiudad: string) {
    const nombre = nombreCiudad.trim();
    if (!nombre) return;

    const ciudadEncontrada = ciudades.find(
      (c) =>
        c.name.toLowerCase().includes(nombre.toLowerCase()) ||
        nombre.toLowerCase().includes(c.name.toLowerCase())
    );

    if (!ciudadEncontrada) {
      setErrorClima(`Ciudad "${nombre}" no encontrada.`);
      setResultado(null);
      return;
    }

    setVista("consulta");
    setLoadingClima(true);
    setErrorClima("");
    setResultado(null);

    try {
      const datos = await getCalidadAire(ciudadEncontrada.id);
      setResultado(datos);
    } catch (err) {
      setErrorClima(err instanceof Error ? err.message : "Error al consultar el clima.");
    } finally {
      setLoadingClima(false);
    }
  }

  function onSubmitBusqueda(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    buscarClima(ciudadInput);
  }


  return (
    <div className="app">
      <header className={`header ${vista === "historico" ? "header-hist" : ""}`}>

        {/* Barra superior: marca + pestañas de vista */}
        <div className="header-top">
          <div className="brand">
            <span className="brand-icon" aria-hidden>
              <IconLeaf />
            </span>
            <div>
              <p className="brand-title">Climax</p>
              <p className="brand-sub">Sistema de alertas · Chiapas</p>
            </div>
          </div>

          <div className="tabs" role="tablist" aria-label="Vistas">
            <button
              type="button"
              role="tab"
              aria-selected={vista === "consulta"}
              className={vista === "consulta" ? "tab active" : "tab"}
              onClick={() => setVista("consulta")}
            >
              <IconGrid />
              Consulta
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={vista === "historico"}
              className={vista === "historico" ? "tab active" : "tab"}
              onClick={() => setVista("historico")}
            >
              <IconHistory />
              Histórico
            </button>
          </div>
        </div>

        {/* Controles exclusivos de la vista "Consulta" */}
        {vista === "consulta" && (
          <>
            {/* Buscador de ciudad */}
            <form className="search" onSubmit={onSubmitBusqueda}>
              <div className="search-field">
                <IconSearch />
                <input
                  value={ciudadInput}
                  onChange={(e) => setCiudadInput(e.target.value)}
                  placeholder="Buscar municipio de Chiapas..."
                  aria-label="Municipio de Chiapas"
                  disabled={loadingClima}
                />
              </div>
              <button
                type="submit"
                className="search-btn"
                disabled={!ciudadInput.trim() || loadingClima}
                aria-label="Buscar"
              >
                <IconSearch dark />
              </button>
            </form>

            {/* Chips de acceso rápido — ciudades cargadas del backend /cities */}
            {ciudades.length > 0 && (
              <div className="chips">
                {ciudades.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className="chip"
                    onClick={() => {
                      setCiudadInput(c.name);
                      buscarClima(c.name);
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Encabezado exclusivo de la vista "Histórico" */}
        {vista === "historico" && (
          <div className="hist-hero">
            <h1>Historial de alertas</h1>
            <p>{historial.length} registros en la base de datos</p>
          </div>
        )}
      </header>

      {/* Área de contenido principal */}
      <main className={`content ${vista === "historico" ? "content-hist" : ""}`}>

        {/* ── Vista: Consulta ── */}
        {vista === "consulta" && (
          <>
            {loadingClima && (
              <div className="panel empty">
                <p>Cargando clima...</p>
              </div>
            )}

            {!loadingClima && errorClima && (
              <div className="panel empty">
                <p>{errorClima}</p>
              </div>
            )}

            {!loadingClima && !errorClima && !resultado && (
              <div className="panel empty">
                <WeatherEmptyIcon />
                <p>
                  Busca una ciudad de Chiapas para ver el clima y la alerta
                  agrícola generada por el sistema.
                </p>
              </div>
            )}

            {!loadingClima && resultado && (
              <ResultadoConsulta data={resultado} />
            )}
          </>
        )}

        {/* ── Vista: Histórico ── */}
        {vista === "historico" && (
          <>
            {loadingHistorial && (
              <div className="panel empty">
                <p>Cargando historial...</p>
              </div>
            )}

            {!loadingHistorial && errorHistorial && (
              <div className="panel empty">
                <p>{errorHistorial}</p>
              </div>
            )}

            {!loadingHistorial && !errorHistorial && (
              <HistorialAlertas items={historial} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
