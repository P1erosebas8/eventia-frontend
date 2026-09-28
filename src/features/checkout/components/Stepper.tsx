import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PaymentMethodStep from "./PaymentMethodStep";
import SummaryStep from "./SummaryStep";
import { useCartContext } from "../hooks/useCartContext";
import { useAuth } from "../../../context/AuthContext";
import { checkoutService } from "../services/checkoutService";
import { isPromoUser, PROMO_DISCOUNT_PCT } from "../../events/services/events.service";

const steps = [
  { label: "Selección de Entradas" },
  { label: "Método de Pago" },
  { label: "Resumen y Confirmación" },
];

const CheckIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

function Stepper() {
  const [step, setStep] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCartContext();
  const { user } = useAuth();

  const isLastStep = step === steps.length;

  const handleFinishPurchase = async () => {
    if (items.length === 0) return;
    setSubmitting(true);

    const buyer = user
      ? {
          id_user: user.id,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
        }
      : {
          id_user: 1,
          first_name: "Carlos",
          last_name: "Gerónimo Zapata",
          email: "carlos.geronimo@gmail.com",
        };

    const fullName = `${buyer.first_name} ${buyer.last_name}`.trim();
    const hasPromoDiscount = isPromoUser(fullName);
    const discountAmount = hasPromoDiscount ? (totalAmount * PROMO_DISCOUNT_PCT) / 100 : 0;
    const finalTotal = totalAmount - discountAmount;

    try {
      await checkoutService.processCheckout({
        userId: buyer.id_user,
        userName: fullName,
        userEmail: buyer.email,
        items,
        paymentMethod: "CREDIT_CARD",
        totalAmount: finalTotal,
        discountAmount,
      });

      clearCart();
      navigate("/mis-tickets", {
        state: { purchaseSuccess: true, ticketsCount: items.reduce((a, i) => a + i.quantity, 0) },
      });
    } catch (err) {
      console.error("Error al procesar compra:", err);
      alert("Hubo un problema al procesar tu compra. Por favor intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      handleFinishPurchase();
      return;
    }
    setStep((s) => Math.min(steps.length, s + 1));
  };

  if (items.length === 0) {
    return (
      <div className="w-full text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-4">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          🛒
        </div>
        <h2 className="text-xl font-extrabold text-gray-900">Tu carrito está vacío</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          No tienes entradas seleccionadas para realizar el pago. Explora el catálogo de eventos para comenzar.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-md hover:bg-indigo-700 transition"
        >
          Explorar Catálogo de Eventos
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/*-----------------------------------------------*/}
      {/*Pasos del Formulario*/}
      <div className="flex justify-between items-center pb-6 border-b border-gray-100">
        {steps.map((item, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber;

          return (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className={`rounded-full w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm shrink-0 flex justify-center items-center font-bold transition-all 
                  ${
                    isActive || isCompleted
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  } 
                  ${isActive ? "ring-2 ring-indigo-200" : ""}`}
              >
                {isCompleted ? <CheckIcon /> : stepNumber}
              </span>

              <div className="hidden sm:flex flex-col text-left leading-tight">
                <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                  PASO {index + 1}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    isActive ? "text-indigo-600" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/*-----------------------------------------------*/}
      {/*Vistas*/}
      <div className="my-6 p-4 sm:p-6 rounded-xl bg-white shadow-sm border border-gray-100">
        {step === 2 && <PaymentMethodStep />}
        {step === 3 && <SummaryStep />}
      </div>
      {/*-----------------------------------------------*/}
      {/*Botones para Retroceder o Avanzar*/}
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="px-4 py-2 border rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          disabled={step <= 2 || submitting}
          onClick={() => setStep((s) => Math.max(2, s - 1))}
        >
          Atrás
        </button>
        <button
          type="button"
          disabled={submitting}
          className="px-6 py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-md hover:bg-indigo-700 disabled:opacity-50 transition flex items-center gap-2"
          onClick={handleNext}
        >
          {submitting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Procesando pago...
            </>
          ) : step === steps.length ? (
            "Finalizar Compra"
          ) : (
            "Siguiente"
          )}
        </button>
      </div>
    </div>
  );
}

export default Stepper;
