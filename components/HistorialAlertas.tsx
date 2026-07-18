import type { ConsultaClima } from "@/lib/types";
import { badgeNivel, formatearFechaRelativa } from "@/lib/format";
import {
  IconClock,
  IconDrop,
  IconThermo,
  IconWind,
  NivelIcon,
} from "@/components/icons";

interface Props {
  items: ConsultaClima[];
}

export default function HistorialAlertas({ items }: Props) {
  return (
    <ul className="hist-lista">
      {items.map((item) => (
        <li key={String(item.id)} className="hist-card">
          <div className={`hist-icon nivel-${item.nivelRiesgo}`} aria-hidden>
            <NivelIcon nivel={item.nivelRiesgo} />
          </div>

          <div className="hist-body">
            <div className="hist-row">
              <h2>{item.ciudad}</h2>
              <span className={`hist-badge nivel-${item.nivelRiesgo}`}>
                {badgeNivel(item.nivelRiesgo)}
              </span>
            </div>

            <p className="hist-alerta">{item.alerta}</p>

            <div className="hist-meta">
              <span>
                <IconClock />
                {formatearFechaRelativa(item.fecha)}
              </span>
              <span>
                <IconThermo />
                {Math.round(item.temperatura)} °C
              </span>
              <span>
                <IconDrop />
                {item.humedad}%
              </span>
              <span>
                <IconWind />
                {item.viento} km/h
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
