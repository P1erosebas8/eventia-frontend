import { useState } from "react";
import PaymentMethodStep from "./PaymentMethodStep";
import SummaryStep from "./SummaryStep";

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
  const isLastStep = step === steps.length;
  const handleNext = () => {
    if (isLastStep) {
      alert("COMPRANDO CALICHIN");
      return;
    }
    setStep((s) => Math.min(steps.length, s + 1));
  };

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
          className="px-4 py-2 border rounded disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={step <= 2}
          onClick={() => setStep((s) => Math.max(2, s - 1))}
        >
          Atras
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-indigo-600 text-white border rounded hover:bg-indigo-700"
          onClick={handleNext}
        >
          {step === steps.length ? "Finalizar Compra" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}

export default Stepper;
