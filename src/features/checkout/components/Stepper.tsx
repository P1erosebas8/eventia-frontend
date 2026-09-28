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
    <div>
      <section className="w-full max-w-4xl mx-auto p-5">
        <div>
          {/*-----------------------------------------------*/}
          {/*Pasos del Formulario*/}
          <div className="flex justify-center p-3 gap-10">
            {steps.map((item, index) => {
              const stepNumber = index + 1;
              const isActive = step === stepNumber;
              const isCompleted = step > stepNumber;

              return (
                <div key={item.label} className="flex p-3 gap-1.5">
                  <span
                    className={`rounded-full w-10 h-10 flex justify-center items-center font-bold transition-colors ${isActive || isCompleted ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"} ${isActive ? "ring-2 ring-indigo-200" : ""}`}
                  >
                    {isCompleted ? <CheckIcon /> : stepNumber}
                  </span>
                  <div className="flex flex-col items-start">
                    <p className="text-xs tracking-wide">PASO {index + 1}</p>
                    <p className="font-bold">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/*-----------------------------------------------*/}
          {/*Vistas*/}
          <div className="my-6 p-4 rounded-lg min-h-25 flex items-center justify-center bg-white shadow-sm">
            {step === 2 && (<PaymentMethodStep/>)}
            {step === 3 && (<SummaryStep/>)}
          </div>
          {/*-----------------------------------------------*/}
          {/*Botones para Retroceder o Avanzar*/}
          <div className="w-full flex justify-between">
            <button
              type="button"
              className="px-4 py-2 border rounded disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={step === 1}
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
      </section>
    </div>
  );
}

export default Stepper;
