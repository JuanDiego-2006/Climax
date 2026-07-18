import type { ConsultaClima, NivelRiesgo } from "@/lib/types";
import { badgeNivel, formatearFechaRelativa } from "@/lib/format";
import {
  IconDrop,
  IconEye,
  IconPin,
  IconThermo,
  IconWind,
  NivelIcon,
} from "@/components/icons";

interface Props {
  data: ConsultaClima;
}

export default function ResultadoConsulta({ data }: Props) {
  const { nivelRiesgo: nivel } = data;

  return (
    <div className="consulta-resultado">
      <article className={`clima-hero nivel-${nivel}`}>
        <div className="clima-hero-left">
          <p className="clima-ubicacion">
            <IconPin />
            Chiapas, México
          </p>
          <h2>{data.ciudad}</h2>
          <p className="clima-desc">{data.descripcion}</p>
          <span className={`clima-riesgo nivel-${nivel}`}>
            Riesgo {badgeNivel(nivel)}
          </span>
        </div>

        <div className="clima-hero-right">
          <WeatherHeroIcon nivel={nivel} />
          <p className="clima-temp">{Math.round(data.temperatura)}°</p>
          <time dateTime={data.fecha}>
            {formatearFechaRelativa(data.fecha)} CST
          </time>
        </div>
      </article>

      <aside className={`alerta-agricola nivel-${nivel}`}>
        <div className={`alerta-icono nivel-${nivel}`} aria-hidden>
          <NivelIcon nivel={nivel} />
        </div>
        <div>
          <h3>Alerta agrícola</h3>
          <p>{data.alerta}</p>
        </div>
      </aside>

      <div className="detalle-grid">
        <div className="detalle-card">
          <span className="detalle-icon sensacion" aria-hidden>
            <IconThermo size={22} />
          </span>
          <strong>{Math.round(data.sensacion)}°C</strong>
          <span>Sensación</span>
        </div>
        <div className="detalle-card">
          <span className="detalle-icon humedad" aria-hidden>
            <IconDrop size={22} />
          </span>
          <strong>{data.humedad}%</strong>
          <span>Humedad</span>
        </div>
        <div className="detalle-card">
          <span className="detalle-icon viento" aria-hidden>
            <IconWind size={22} />
          </span>
          <strong>{data.viento} km/h</strong>
          <span>Viento</span>
        </div>
        <div className="detalle-card">
          <span className="detalle-icon visibilidad" aria-hidden>
            <IconEye />
          </span>
          <strong>{data.visibilidad} km</strong>
          <span>Visibilidad</span>
        </div>
      </div>
    </div>
  );
}

function WeatherHeroIcon({ nivel }: { nivel: NivelRiesgo }) {
  if (nivel === "alto" || nivel === "critico") {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden>
        <circle cx="28" cy="22" r="12" fill="#FBBF24" />
        <ellipse cx="34" cy="34" rx="14" ry="9" fill="rgba(255,255,255,0.85)" />
        <ellipse cx="22" cy="36" rx="11" ry="8" fill="rgba(255,255,255,0.7)" />
      </svg>
    );
  }

  if (nivel === "medio") {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden>
        <ellipse cx="28" cy="30" rx="16" ry="11" fill="rgba(255,255,255,0.9)" />
        <path
          d="M22 36v6M28 34v8M34 36v6"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (nivel === "optimo") {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden>
        <circle cx="28" cy="24" r="12" fill="#FDE68A" />
        <ellipse cx="30" cy="36" rx="14" ry="8" fill="rgba(255,255,255,0.75)" />
      </svg>
    );
  }

  return (
    <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden>
      <circle cx="28" cy="26" r="13" fill="#FDE68A" />
    </svg>
  );
}
