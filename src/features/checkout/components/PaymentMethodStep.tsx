function PaymentMethodStep() {
  const STYLE_INPUT = "w-full bg-[#f3f4fd] border-none rounded-md py-3 px-2 text-sm text-gray-700 font-medium";
  const STYLE_LABEL = "block text-xs font-semibold text-gray-800 mb-1.5";


  const handleForm=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  }


  return (
    <div className="w-full max-w-xl mx-auto py-2">
      <form onSubmit={handleForm} className="space-y-4">
        {/* Número de Tarjeta */}
        <div className="">
          <label className={STYLE_LABEL}>Numero de Tarjeta *</label>
          <input
            type="text"
            maxLength={19}
            placeholder="4557 **** **** 8912"
            className={STYLE_INPUT}
          />
        </div>

        {/* Expiracion y CVV */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="" className={STYLE_LABEL}>
              Fecha de Expiracion *
            </label>
            <input type="text" placeholder="MM / AA" className={STYLE_INPUT} />
          </div>
          <div>
            <label htmlFor="" className={STYLE_LABEL}>
              CVV / CVC *
            </label>
            <input type="text" placeholder="***" className={STYLE_INPUT} />
          </div>
        </div>

        {/* Nombre y Cuotas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="" className={STYLE_LABEL}>
              Nombre Impreso en la Tarjeta *
            </label>
            <input
              type="text"
              placeholder="CARLOS MENDOZA ZAPATA"
              className={`${STYLE_INPUT} uppercase`}
            />
          </div>
          <div>
            <label htmlFor="" className={STYLE_LABEL}>
              Cuotas Financieras
            </label>
            <select
              defaultValue={1}
              className={`${STYLE_INPUT} cursor-pointer`}
            >
              <option value="1">1 cuota - Directo (Sin intereses)</option>
              <option value="3">3 cuotas</option>
              <option value="6">6 cuotas</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodStep;
