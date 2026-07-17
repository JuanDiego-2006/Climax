"use client";

import { FormEvent, useState } from "react";
import HistorialAlertas from "@/components/HistorialAlertas";
import ResultadoConsulta from "@/components/ResultadoConsulta";
import {
  IconGrid,
  IconHistory,
  IconLeaf,
  IconSearch,
  WeatherEmptyIcon,
} from "@/components/icons";
import {
  CIUDADES_RAPIDAS,
  HISTORIAL_MOCK,
  obtenerConsultaMock,
} from "@/lib/mock-data";
import type { ConsultaClima } from "@/lib/types";

type Vista = "consulta" | "historico";

export default function ClimaApp() {
  const [vista, setVista] = useState<Vista>("consulta");
  const [ciudad, setCiudad] = useState("");
  const [resultado, setResultado] = useState<ConsultaClima | null>(null);

  function buscar(nombre: string) {
    const q = nombre.trim();
    if (!q) return;
    setVista("consulta");
    setResultado(obtenerConsultaMock(q));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    buscar(ciudad);
  }

  return (
    <div className="app">
      <header className={`header ${vista === "historico" ? "header-hist" : ""}`}>
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

        {vista === "consulta" && (
          <>
            <form className="search" onSubmit={onSubmit}>
              <div className="search-field">
                <IconSearch />
                <input
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  placeholder="Buscar municipio de Chiapas..."
                  aria-label="Municipio de Chiapas"
                />
              </div>
              <button
                type="submit"
                className="search-btn"
                disabled={!ciudad.trim()}
                aria-label="Buscar"
              >
                <IconSearch dark />
              </button>
            </form>

            <div className="chips">
              {CIUDADES_RAPIDAS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="chip"
                  onClick={() => {
                    setCiudad(c);
                    buscar(c);
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </>
        )}

        {vista === "historico" && (
          <div className="hist-hero">
            <h1>Historial de alertas</h1>
            <p>{HISTORIAL_MOCK.length} registros en la base de datos</p>
          </div>
        )}
      </header>

      <main className={`content ${vista === "historico" ? "content-hist" : ""}`}>
        {vista === "consulta" && (
          <>
            {!resultado && (
              <div className="panel empty">
                <WeatherEmptyIcon />
                <p>
                  Busca una ciudad de Chiapas para ver el clima y la alerta
                  agrícola generada por el sistema.
                </p>
              </div>
            )}

            {resultado && <ResultadoConsulta data={resultado} />}
          </>
        )}

        {vista === "historico" && <HistorialAlertas items={HISTORIAL_MOCK} />}
      </main>
    </div>
  );
}
