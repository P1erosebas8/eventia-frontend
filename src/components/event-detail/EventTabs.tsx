import type { TabId } from "../../hooks/useTabs";
import type { TierId } from "../../data/eventDetail";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "zonas", label: "Zonas y Mapa", icon: "map" },
  { id: "info", label: "Información & Line-up", icon: "info" },
  { id: "politicas", label: "Políticas y Biometría", icon: "policy" },
];

const LINEUP = [
  { nombre: "Solar Echoes", rol: "Headliner (Reino Unido)", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkx7xLzO2wTCnZsDqqRBF_wSQOR3chR1YgyTsWBj917tcP52VEcjJ4ONfiv1zRqDdSZcqi5i2d9gH-0G9G5aXi2K7JCHahA3vlK-rlI75yP3mafrS9L818r49wFS9ZXIJK-dBtEM4AGgJdnORqycyyQrkx8-iTqxE0eHdWIfao7RQfy0_C5FT1b981Are_1MFTtYbrdlynjNF2zBdvRCM6LNE061OIgJRVwgfbXR8QNGUn5JPdQLO2DA" },
  { nombre: "Los Andes Groove", rol: "Banda Invitada (Perú)", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-nBwCZ8lD7k4xggNvF7uaSjgSvJSk1L96uZrQTNTCwytRzvF2f3-n847X5-VgbpQkiqRXhRfYyxStx5WwtMh7-4pVnc1OKhMLOjQzDtgjvAJN9IYjoQO85Aqh2uqVzCdmUn7sG3HddxLwg-IEGD4S_i7s3TN3thlvVeIUCgvYattLtDCUdym1wmHXBzZCmDqtip_c04QBG4i8EA7vskhkqcfYxOCrYUvt7oqA2EirFr9wa7hC7T666A" },
  { nombre: "Valeria & The Moon", rol: "Opening Act (Argentina)", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_AGl-KiwzCzShvqxbrY2SSzsuyHqLuG-QuZ_dnRaKhLMbY3CIUlIQKO57SCUs2jrUyzzNHSjfozS81M-j-7LxTZmpeF_o77jARlPSQAfxBatXmFTfVsRV4B2SipTdal2czGbF6gxz-C8p8pOcyBtFJ0U22P996_sxkkzsCvkk4KK3Et0G3FkpVkbbbkfImW2Ag5UD7Jl-fVMsbUikN1IGqkf9mB4zFPv_mv9aZGKaytvbGd1fsEsr9g" },
];

interface Props {
  tab: TabId;
  setTab: (t: TabId) => void;
  onSelectTier: (t: TierId) => void;
}

export default function EventTabs({ tab, setTab, onSelectTier }: Props) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 pb-3 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            type="button"
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              tab === t.id ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "zonas" && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-display font-semibold text-lg">Distribución Oficial del Estadio Nacional</h3>
              <p className="text-sm text-outline">
                Toca una zona para resaltar su localidad en el panel de compra.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-full text-xs text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-secondary"></span> En vivo
            </span>
          </div>

          <div className="bg-surface-container-low rounded-xl p-4 flex flex-col items-center">
            <svg viewBox="0 0 600 420" className="w-full max-w-[540px] h-auto drop-shadow-sm">
              <rect x="50" y="20" width="500" height="380" rx="140" fill="#e2e7ff" opacity="0.6" />
              <rect x="75" y="45" width="450" height="330" rx="110" fill="#ffffff" />
              <rect x="180" y="55" width="240" height="42" rx="6" fill="#131b2e" />
              <text x="300" y="80" textAnchor="middle" fill="#faf8ff" fontSize="14" fontWeight="700" letterSpacing="2">
                ESCENARIO PRINCIPAL
              </text>
              <g className="cursor-pointer" onClick={() => onSelectTier("vip")}>
                <path d="M160 110 H440 V185 H160 Z" fill="#4f46e5" />
                <text x="300" y="145" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="700">
                  CAMPO VIP (Frente Escenario)
                </text>
                <text x="300" y="165" textAnchor="middle" fill="#c3c0ff" fontSize="11" fontWeight="600">
                  S/ 320.00 • 48 entradas libres
                </text>
              </g>
              <g className="cursor-pointer" onClick={() => onSelectTier("general")}>
                <rect x="160" y="195" width="280" height="95" rx="8" fill="#6f3dd9" />
                <text x="300" y="240" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="700">
                  CAMPO GENERAL
                </text>
                <text x="300" y="260" textAnchor="middle" fill="#e9ddff" fontSize="11" fontWeight="600">
                  S/ 160.00 • Disponibilidad regular
                </text>
              </g>
              <g className="cursor-pointer" onClick={() => onSelectTier("occidente")}>
                <path d="M85 80 C85 60 145 60 145 80 L145 340 C145 360 85 360 85 340 Z" fill="#3525cd" />
                <text x="115" y="215" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" transform="rotate(-90 115 215)">
                  TRIBUNA OCCIDENTE
                </text>
              </g>
              <g>
                <path d="M160 300 H440 C440 345 375 365 300 365 C225 365 160 345 160 300 Z" fill="#dae2fd" />
                <text x="300" y="335" textAnchor="middle" fill="#131b2e" fontSize="13" fontWeight="700">
                  TRIBUNA NORTE (Agotado)
                </text>
              </g>
            </svg>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-3 bg-white/80 px-4 py-2 rounded-lg w-full text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#4f46e5]"></span>Campo VIP</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#6f3dd9]"></span>Campo General</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#3525cd]"></span>Occidente</span>
              <span className="flex items-center gap-1.5 text-outline"><span className="w-3 h-3 rounded-sm bg-[#dae2fd]"></span>Norte (Sold Out)</span>
            </div>
          </div>
        </div>
      )}

      {tab === "info" && (
        <div className="mt-2">
          <h3 className="font-display font-semibold text-lg mb-2">Artistas Confirmados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {LINEUP.map((a) => (
              <div key={a.nombre} className="bg-surface-container p-3 rounded-lg flex items-center gap-3">
                <img className="w-12 h-12 rounded-lg object-cover" src={a.img} alt={a.nombre} loading="lazy" />
                <div>
                  <span className="text-sm font-bold block">{a.nombre}</span>
                  <span className="text-xs text-outline">{a.rol}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[0.9375rem] text-on-surface-variant leading-relaxed">
            La edición 2025 de las Lima Live Sessions reúne más de 6 horas continuas de música en directo,
            despliegue escenotécnico 360° y visuales de última generación en el recinto más emblemático de
            la capital. Estacionamiento disponible en el Parque de la Reserva mediante reserva previa.
          </p>
        </div>
      )}

      {tab === "politicas" && (
        <div className="mt-2 p-4 rounded-xl bg-surface-container-low flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[24px]">verified_user</span>
            <div>
              <h4 className="text-sm font-bold">Regla RN02: Nominatividad Inmutable de Entradas</h4>
              <p className="text-sm text-on-surface-variant">
                Cada entrada será emitida con Nombre, Apellidos y Documento (DNI/CE/Pasaporte) del
                asistente final. Sin transferencias en puerta sin cambio de titular hasta 48h antes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary text-[24px]">security</span>
            <div>
              <h4 className="text-sm font-bold">Validación QR Dinámica en Puerta</h4>
              <p className="text-sm text-on-surface-variant">
                El QR se activa 3 horas antes de la apertura. No aceptes códigos impresos de revendedores
                ni capturas estáticas.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
