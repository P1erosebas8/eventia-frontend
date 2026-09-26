import { useState } from "react";
import Breadcrumbs from "../../components/event-detail/Breadcrumbs";
import CheckoutPanel from "../../components/event-detail/CheckoutPanel";
import ConcurrencyAlert from "../../components/event-detail/ConcurrencyAlert";
import EventHero from "../../components/event-detail/EventHero";
import EventTabs from "../../components/event-detail/EventTabs";
import OrganizerCard from "../../components/event-detail/OrganizerCard";
import PromoBannerRN01 from "../../components/event-detail/PromoBannerRN01";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import type { TierId } from "../../data/eventDetail";
import { useTabs } from "../../hooks/useTabs";
import { useTicketSelection } from "../../hooks/useTicketSelection";

export default function EventDetailPage() {
  const { tab, setTab } = useTabs("zonas");
  const seleccion = useTicketSelection();
  const [resaltada, setResaltada] = useState<TierId | null>(null);

  const handleSelectTier = (t: TierId) => {
    setResaltada(t);
    document.getElementById(`tier-${t}-container`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => setResaltada((cur) => (cur === t ? null : cur)), 1600);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <main className="w-full pt-20 min-h-screen">
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
              <CheckoutPanel seleccion={seleccion} resaltada={resaltada} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
