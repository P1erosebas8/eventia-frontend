import { useState } from "react";
import Footer from "../../../shared/layouts/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import CheckoutPanel from "../components/CheckoutPanel";
import ConcurrencyAlert from "../components/ConcurrencyAlert";
import EventHero from "../components/EventHero";
import EventTabs from "../components/EventTabs";
import OrganizerCard from "../components/OrganizerCard";
import PromoBanner from "../components/PromoBanner";
import { TICKET_TIERS, MAX_TICKETS } from "../services/event-detail.service";
import type { DetailTabId, TicketTierId } from "../types/event-detail.types";
import { isPromoUser, PROMO_DISCOUNT_PCT } from "../../events/utils/promo.utils";

export default function EventDetailPage() {
  const [activeTab, setActiveTab] = useState<DetailTabId>("zones");
  const [quantities, setQuantities] = useState<Record<TicketTierId, number>>({
    vip: 2,
    general: 0,
    west: 0,
  });
  const [highlightedTier, setHighlightedTier] = useState<TicketTierId | null>(null);
  const [userName, setUserName] = useState("Roberto");

  const updateQuantity = (tier: TicketTierId, delta: number) => {
    setQuantities((prev) => {
      const total = prev.vip + prev.general + prev.west;
      const next = prev[tier] + delta;
      if (next < 0) return prev;
      if (delta > 0 && total >= MAX_TICKETS) return prev;
      return { ...prev, [tier]: next };
    });
  };

  const count = quantities.vip + quantities.general + quantities.west;
  const subtotal = TICKET_TIERS.reduce((acc, tier) => acc + tier.price * quantities[tier.id], 0);
  const discount = isPromoUser(userName) ? (subtotal * PROMO_DISCOUNT_PCT) / 100 : 0;
  const totals = { count, subtotal, discount, total: subtotal - discount };

  const handleSelectTier = (tier: TicketTierId) => {
    setHighlightedTier(tier);
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
          <Breadcrumbs />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start min-w-0">
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 min-w-0">
              <EventHero />
              <PromoBanner userName={userName} />
              <EventTabs activeTab={activeTab} onTabChange={setActiveTab} onSelectTier={handleSelectTier} />
              <OrganizerCard />
            </div>
            <div className="lg:col-span-5 lg:sticky lg:top-20 min-w-0">
              <CheckoutPanel
                quantities={quantities}
                onUpdateQuantity={updateQuantity}
                totals={totals}
                highlightedTier={highlightedTier}
                userName={userName}
                onUserNameChange={setUserName}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
