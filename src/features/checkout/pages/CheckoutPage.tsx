import Stepper from "../components/Stepper";
import { CartContextProvider } from "../context/CartContext";

function CheckoutPage() {
  return (
    <CartContextProvider>
      <main className="min-h-screen bg-[#faf8ff] py-8 px-4 flex justify-center">
        <div className="w-full max-w-2xl">
          <Stepper />
        </div>
      </main>
    </CartContextProvider>
  );
}

export default CheckoutPage;
