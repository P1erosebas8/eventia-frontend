import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { organizerService } from "../services/organizerService";
import type { OrganizerEvent, EventFormData } from "../types/organizer.types";
import { getStatusConfig } from "../utils/organizerFormatters";
import EventFormGeneral from "../components/EventFormGeneral";
import EventFormSchedule from "../components/EventFormSchedule";
import EventFormDescription from "../components/EventFormDescription";
import EventFormBanners from "../components/EventFormBanners";
import DeactivateModal from "../components/DeactivateModal";
import PreviewModal from "../components/PreviewModal";
import Toast from "../components/Toast";
import EventPanel from "../components/EventPanel";

export default function EventEditPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<OrganizerEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Form state
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    category: "",
    capacity: 0,
    venue: "",
    address: "",
    eventDate: "",
    doorsOpen: "16:30",
    showStart: "20:00",
    salesClose: "22:00",
    description: "",
    restrictions: [],
    bannerDesktopUrl: "",
    bannerMobileUrl: "",
    isPublic: true,
  });

  // Modal states
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [deactivating, setDeactivating] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ visible: false, message: "" });
  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
  }, []);
  const hideToast = useCallback(() => {
    setToast({ visible: false, message: "" });
  }, []);

  // Load event data
  useEffect(() => {
    async function loadEvent() {
      if (!id) return;
      setLoading(true);
      try {
        const eventData = await organizerService.getEventById(id);

        if (eventData) {
          setEvent(eventData);
          setFormData({
            title: eventData.title,
            category: eventData.category,
            capacity: eventData.capacity,
            venue: eventData.venue,
            address: `${eventData.venue}, ${eventData.city}`,
            eventDate: eventData.date,
            doorsOpen: "16:30",
            showStart: eventData.time,
            salesClose: "22:00",
            description: `${eventData.title} es uno de los eventos más esperados de la temporada. El ingreso está estrictamente reservado a mayores de 18 años portando su Documento Nacional de Identidad (DNI) físico o Carné de Extranjería original.`,
            restrictions: [
              "Toda entrada debe estar nominada con DNI/RUC válido antes de las 12:00 hrs del día del evento.",
              "Se aplicará validación de QR dinámico anti-captura de pantalla.",
              "Prohibido el reingreso una vez validado el acceso en puerta exterior.",
            ],
            bannerDesktopUrl: eventData.bannerUrl,
            bannerMobileUrl: eventData.bannerUrl,
            isPublic: eventData.active && eventData.status !== "hidden" && eventData.status !== "draft",
          });
        }
      } catch (error) {
        console.error("Error loading event:", error);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [id]);

  // Field change handler
  const handleFieldChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Save handler
  const handleSave = async () => {
    if (!event || !id) return;
    setSaving(true);
    try {
      const updated = await organizerService.updateEvent(id, {
        title: formData.title,
        category: formData.category,
        capacity: formData.capacity,
        venue: formData.venue,
        date: formData.eventDate,
        time: formData.showStart,
        bannerUrl: formData.bannerDesktopUrl,
      });
      setEvent(updated);
      showToast("¡Cambios guardados con éxito!");
    } catch (error) {
      showToast("Error al guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  // Sync handler
  const handleSync = async () => {
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 800));
    setSyncing(false);
    showToast("Borrador sincronizado.");
  };

  // Toggle visibility handler
  const handleToggleVisibility = () => {
    setFormData((prev) => {
      const newIsPublic = !prev.isPublic;
      showToast(
        newIsPublic
          ? "Evento activado y visible en cartelera pública."
          : "Evento pausado. Oculto para compradores, datos intactos."
      );
      return { ...prev, isPublic: newIsPublic };
    });
  };

  // Deactivate handler
  const handleDeactivate = async (reason: string) => {
    if (!event || !id) return;
    setDeactivating(true);
    try {
      const updated = await organizerService.deactivateEvent(id, reason);
      setEvent(updated);
      setFormData((prev) => ({ ...prev, isPublic: false }));
      setShowDeactivateModal(false);
      showToast("Evento inactivado.");
    } catch (error) {
      showToast("Error al inactivar el evento.");
    } finally {
      setDeactivating(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant">Cargando evento...</span>
        </div>
      </div>
    );
  }

  // Not found
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <span className="material-symbols-outlined text-[48px] text-outline">event_busy</span>
        <h2 className="font-display text-xl font-bold text-on-surface">Evento no encontrado</h2>
        <Link
          to="/organizador/dashboard"
          className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold"
        >
          Volver al Dashboard
        </Link>
      </div>
    );
  }

  const statusConfig = getStatusConfig(event.status, event.active);

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Top Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to="/organizador/dashboard"
            className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[0.6875rem] text-outline uppercase tracking-wider">
                Gestión
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
              <span className="text-[0.6875rem] font-semibold text-primary">
                ID: {event.id}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <h1 className="font-display text-xl font-semibold text-on-surface leading-tight">
                Editar Evento: {event.title}
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.6875rem] font-bold ${event.active
                  ? "bg-surface-container-high text-primary"
                  : "bg-error-container text-error"
                  }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${event.active ? "bg-primary animate-pulse" : "bg-error"
                    }`}
                />
                {event.active ? statusConfig.label : "Inactivo"}
              </span>
            </div>
          </div>
        </div>

        {/* Top action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors disabled:opacity-60"
          >
            <span className={`material-symbols-outlined text-[18px] ${syncing ? "animate-spin" : ""}`}>
              sync
            </span>
            <span>{syncing ? "Sincronizando..." : "Sincronizar"}</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-all shadow-sm disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]">
              {saving ? "hourglass_empty" : "save"}
            </span>
            <span>{saving ? "Guardando..." : "Guardar Cambios"}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout (8/4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Sections */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <EventFormGeneral
            title={formData.title}
            category={formData.category}
            capacity={formData.capacity}
            venue={formData.venue}
            address={formData.address}
            onChange={handleFieldChange}
          />

          <EventFormSchedule
            eventDate={formData.eventDate}
            doorsOpen={formData.doorsOpen}
            showStart={formData.showStart}
            salesClose={formData.salesClose}
            onChange={handleFieldChange}
          />

          <EventFormDescription
            description={formData.description}
            onChange={handleFieldChange}
          />

          <EventFormBanners
            bannerDesktopUrl={formData.bannerDesktopUrl}
            bannerMobileUrl={formData.bannerMobileUrl}
          />
        </div>

        {/* Right Column: Panel + Traceability */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <EventPanel
            eventStatus={event.status}
            isPublic={formData.isPublic}
            onToggleVisibility={handleToggleVisibility}
            onSave={handleSave}
            onPreview={() => setShowPreviewModal(true)}
            onDeactivate={() => setShowDeactivateModal(true)}
            saving={saving}
          />

        </div>
      </div>

      {/* Modals */}
      <DeactivateModal
        eventTitle={event.title}
        ticketsSold={event.ticketsSold}
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        onConfirm={handleDeactivate}
        loading={deactivating}
      />

      <PreviewModal
        event={event}
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
      />

      {/* Toast */}
      <Toast message={toast.message} visible={toast.visible} onClose={hideToast} />
    </div>
  );
}
