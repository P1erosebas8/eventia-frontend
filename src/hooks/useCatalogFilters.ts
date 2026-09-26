import { useMemo, useState } from "react";
import { EVENTOS, PRECIO_MAX, type Categoria } from "../data/events";

export type Orden = "populares" | "fecha" | "menor-precio" | "mayor-precio";
export type Vista = "grid" | "lista";

export function useCatalogFilters() {
  const [busqueda, setBusqueda] = useState("");
  const [soloPromo, setSoloPromo] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>(["Conciertos"]);
  const [precioMax, setPrecioMax] = useState(450);
  const [orden, setOrden] = useState<Orden>("populares");
  const [vista, setVista] = useState<Vista>("grid");
  const [pagina, setPagina] = useState(1);

  const toggleCategoria = (cat: Categoria) => {
    setCategorias((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setPagina(1);
  };

  const limpiar = () => {
    setBusqueda("");
    setSoloPromo(false);
    setCategorias([]);
    setPrecioMax(PRECIO_MAX);
    setOrden("populares");
    setPagina(1);
  };

  const eventos = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    let lista = EVENTOS.filter((e) => {
      if (soloPromo && !e.rn01) return false;
      if (categorias.length > 0 && !categorias.includes(e.categoria)) return false;
      if (e.precio > precioMax) return false;
      if (q && !`${e.titulo} ${e.recinto} ${e.ciudad}`.toLowerCase().includes(q)) return false;
      return true;
    });

    switch (orden) {
      case "fecha":
        lista = [...lista].sort((a, b) => a.ordenFecha - b.ordenFecha);
        break;
      case "menor-precio":
        lista = [...lista].sort((a, b) => a.precio - b.precio);
        break;
      case "mayor-precio":
        lista = [...lista].sort((a, b) => b.precio - a.precio);
        break;
      default:
        lista = [...lista].sort((a, b) => b.vendidoPct - a.vendidoPct);
    }
    return lista;
  }, [busqueda, soloPromo, categorias, precioMax, orden]);

  return {
    busqueda, setBusqueda,
    soloPromo, setSoloPromo,
    categorias, toggleCategoria,
    precioMax, setPrecioMax,
    orden, setOrden,
    vista, setVista,
    pagina, setPagina,
    eventos,
    limpiar,
  };
}

export type CatalogFilters = ReturnType<typeof useCatalogFilters>;
