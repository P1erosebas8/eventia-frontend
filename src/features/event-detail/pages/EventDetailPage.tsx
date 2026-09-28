import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Footer from "../../../shared/layouts/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import CheckoutPanel from "../components/CheckoutPanel";
import ConcurrencyAlert from "../components/ConcurrencyAlert";
import EventHero from "../components/EventHero";
import EventTabs from "../components/EventTabs";
import OrganizerCard from "../components/OrganizerCard";
import { getEventDetail, MAX_TICKETS } from "../services/event-detail.service";
import type { DetailTabId, TicketTierId } from "../types/event-detail.types";
import { isPromoUser, PROMO_DISCOUNT_PCT } from "../../events/utils/promo.utils";

/**
 * Ficha del evento: hero, mapa de zonas y checkout lateral.
 * Todo sale de db.json vía el servicio según el `:id` de la ruta.
 * El descuento de la promo depende del nombre de sesión.
 */
export default function EventDetailPage() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState<DetailTabId>("zones");
  const [quantities, setQuantities] = useState<Record<TicketTierId, number>>({});
  const [highlightedTier, setHighlightedTier] = useState<TicketTierId | null>(null);

  // Ficha desde el servicio (con respaldo al primer evento activo).
  const detail = useMemo(() => getEventDetail(Number(id)), [id]);

  /** Nombre de sesión o null si es visita anónima (sin input manual). */
  const sessionName =
    isAuthenticated && user ? `${user.firstName} ${user.lastName}`.trim() : null;

  const updateQuantity = (tier: TicketTierId, delta: number) => {
    setQuantities((prev) => {
      const total = Object.values(prev).reduce((acc, qty) => acc + qty, 0);
      const next = (prev[tier] ?? 0) + delta;
      if (next < 0) return prev;
      // Tope antirreventa: máximo MAX_TICKETS entre todas las zonas.
      if (delta > 0 && total >= MAX_TICKETS) return prev;
      return { ...prev, [tier]: next };
    });
  };

  if (!detail || detail.tiers.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-2 px-4 text-center">
        <h1 className="font-display font-extrabold text-4xl">Evento no disponible</h1>
        <p className="text-sm text-on-surface-variant">
          No encontramos información para este evento.
        </p>
        <Link
          to="/"
          className="mt-2 px-4 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const count = detail.tiers.reduce((acc, tier) => acc + (quantities[tier.id] ?? 0), 0);
  const subtotal = detail.tiers.reduce(
    (acc, tier) => acc + tier.price * (quantities[tier.id] ?? 0),
    0
  );
  // Sin sesión que califique no hay descuento (total = subtotal).
  const discount =
    sessionName !== null && isPromoUser(sessionName)
      ? (subtotal * PROMO_DISCOUNT_PCT) / 100
      : 0;
  const totals = { count, subtotal, discount, total: subtotal - discount };

  const handleSelectTier = (tier: TicketTierId) => {
    setHighlightedTier(tier);
    // Lleva la zona al checkout y la resalta; el resaltado se apaga solo.
    document
      .getElementById(`tier-${tier}-container`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => setHighlightedTier((current) => (current === tier ? null : current)), 1600);
  };

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      <main className="w-full pt-16 min-h-screen min-w-0">
        <ConcurrencyAlert />
        <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 py-6 min-w-0">
          <Breadcrumbs title={detail.title} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start min-w-0">
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 min-w-0">
              <EventHero
                title={detail.title}
                venue={detail.venue}
                month={detail.month}
                day={detail.day}
              />
              <EventTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSelectTier={handleSelectTier}
                tiers={detail.tiers}
                eventDescription={`${detail.title}: ${detail.dateLabel} en ${detail.venue}.`}
              />
              <OrganizerCard />
            </div>
            <div className="lg:col-span-5 lg:sticky lg:top-20 min-w-0">
              <CheckoutPanel
                tiers={detail.tiers}
                quantities={quantities}
                onUpdateQuantity={updateQuantity}
                totals={totals}
                highlightedTier={highlightedTier}
                sessionName={sessionName}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
