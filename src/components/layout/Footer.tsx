export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-10 py-10">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="font-display font-semibold text-lg text-primary">Eventia S.A.C.</span>
            <span className="text-xs bg-surface-container-high px-2 py-0.5 rounded text-outline">
              RUC 20609842114
            </span>
          </div>
          <p className="text-sm text-on-surface-variant">
            Plataforma oficial de venta, distribución y validación biométrica de entradas en Perú.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-on-surface-variant text-sm font-medium">
          <a className="hover:text-on-surface transition-colors" href="#">Términos & Condiciones</a>
          <a className="hover:text-on-surface transition-colors" href="#">Política de Privacidad</a>
          <a className="hover:text-on-surface transition-colors" href="#">Libro de Reclamaciones</a>
          <a className="hover:text-on-surface transition-colors" href="#">Atención al Cliente</a>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-6 mt-6 pt-4 flex justify-between items-center text-outline text-xs border-t border-outline-variant/50">
        <span>© 2025 Eventia S.A.C. Todos los derechos reservados. Lima, Perú.</span>
        <span>Soporte 24/7: soporte@eventia.pe</span>
      </div>
    </footer>
  );
}
