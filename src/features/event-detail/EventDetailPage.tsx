import { useState } from "react";
import Breadcrumbs from "../../components/event-detail/Breadcrumbs";
import CheckoutPanel from "../../components/event-detail/CheckoutPanel";
import ConcurrencyAlert from "../../components/event-detail/ConcurrencyAlert";
import EventHero from "../../components/event-detail/EventHero";
import EventTabs from "../../components/event-detail/EventTabs";
import OrganizerCard from "../../components/event-detail/OrganizerCard";
import PromoBannerRN01 from "../../components/event-detail/PromoBannerRN01";
import Footer from "../../components/layout/Footer";
import { TIERS, type TierId } from "../../data/eventDetail";

export default function EventDetailPage() {
  const [tab, setTab] = useState<"zonas" | "info" | "politicas">("zonas");
  const [cantidades, setCantidades] = useState<Record<TierId, number>>({ vip: 2, general: 0, occidente: 0 });
  const [resaltada, setResaltada] = useState<TierId | null>(null);

  const updateQty = (tier: TierId, delta: number) => {
    setCantidades((prev) => {
      const total = prev.vip + prev.general + prev.occidente;
      const nuevo = prev[tier] + delta;
      if (nuevo < 0) return prev;
      if (delta > 0 && total >= 10) return prev;
      return { ...prev, [tier]: nuevo };
    });
  };

  const count = cantidades.vip + cantidades.general + cantidades.occidente;
  const subtotal = TIERS.reduce((acc, t) => acc + t.precio * cantidades[t.id], 0);
  const descuento = subtotal * 0.15;
  const totales = { count, subtotal, descuento, total: subtotal - descuento };

  const handleSelectTier = (t: TierId) => {
    setResaltada(t);
    document.getElementById(`tier-${t}-container`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => setResaltada((cur) => (cur === t ? null : cur)), 1600);
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="w-full min-h-screen">
        <ConcurrencyAlert />
        <div className="max-w-[1280px] mx-auto w-full px-6 py-6">
          <Breadcrumbs />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <EventHero />
              <PromoBannerRN01 />
              <EventTabs tab={tab} setTab={setTab} onSelectTier={handleSelectTier} />
              <OrganizerCard />
            </div>
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <CheckoutPanel cantidades={cantidades} updateQty={updateQty} totales={totales} resaltada={resaltada} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
