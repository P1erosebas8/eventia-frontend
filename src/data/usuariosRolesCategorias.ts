export type Rol = "Administrador" | "Organizador" | "Staff" | "Cliente";
export type EstadoCuenta = "Activo" | "Suspendido";

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  iniciales: string;
  rol: Rol;
  docEtiqueta: string;
  docDetalle: string;
  fecha: string;
  estado: EstadoCuenta;
}

export interface CategoriaAdmin {
  id: string;
  nombre: string;
  slug: string;
  icono: string;
  eventos: number;
  enVivo: string;
  volumen: string;
  activa: boolean;
}

export const USUARIOS_INICIALES: Usuario[] = [
  {
    id: "U-01",
    nombre: "Valeria Mendoza Ramos",
    email: "vmendoza@eventia.pe",
    iniciales: "VM",
    rol: "Administrador",
    docEtiqueta: "DNI: 45892110",
    docDetalle: "RENIEC Biometría Ok",
    fecha: "14 Ene 2024, 08:30",
    estado: "Activo",
  },
  {
    id: "U-02",
    nombre: "Carlos Arana Romero",
    email: "contacto@veltrac.pe",
    iniciales: "CA",
    rol: "Organizador",
    docEtiqueta: "RUC: 20554981120",
    docDetalle: "SUNAT: VELTRAC ENTERTAINMENT S.A.C.",
    fecha: "02 Mar 2024, 15:45",
    estado: "Activo",
  },
  {
    id: "U-03",
    nombre: "Miguel Ángel Quiroz",
    email: "mquiroz.staff@eventia.pe",
    iniciales: "MQ",
    rol: "Staff",
    docEtiqueta: "DNI: 70912443",
    docDetalle: "Terminal Asignado: #GATE-A3",
    fecha: "19 Feb 2024, 11:20",
    estado: "Activo",
  },
  {
    id: "U-04",
    nombre: "Luciana Paredes Vega",
    email: "lparedes.dev@gmail.com",
    iniciales: "LP",
    rol: "Cliente",
    docEtiqueta: "DNI: 47990132",
    docDetalle: "Nomina Nominada al 100%",
    fecha: "12 May 2024, 21:05",
    estado: "Activo",
  },
  {
    id: "U-05",
    nombre: "Rodrigo Salazar Benavides",
    email: "rsalazar@eventospop.com",
    iniciales: "RS",
    rol: "Organizador",
    docEtiqueta: "RUC: 20601994821",
    docDetalle: "Bloqueo Preventivo Prevención Fraude",
    fecha: "10 Jun 2023, 19:12",
    estado: "Suspendido",
  },
];

export const CATEGORIAS_INICIALES: CategoriaAdmin[] = [
  {
    id: "CAT-01",
    nombre: "Música & Conciertos",
    slug: "musica-conciertos",
    icono: "music_note",
    eventos: 142,
    enVivo: "18 en vivo",
    volumen: "S/ 4,820,500.00",
    activa: true,
  },
  {
    id: "CAT-02",
    nombre: "Festivales",
    slug: "festivales",
    icono: "festival",
    eventos: 36,
    enVivo: "4 en venta",
    volumen: "S/ 2,190,000.00",
    activa: true,
  },
  {
    id: "CAT-03",
    nombre: "Teatro & Cultura",
    slug: "teatro-cultura",
    icono: "theater_comedy",
    eventos: 88,
    enVivo: "12 en cartelera",
    volumen: "S/ 740,220.00",
    activa: true,
  },
  {
    id: "CAT-04",
    nombre: "Gastronomía & Ferias",
    slug: "gastronomia-ferias",
    icono: "restaurant",
    eventos: 54,
    enVivo: "6 en curso",
    volumen: "S/ 1,350,900.00",
    activa: true,
  },
  {
    id: "CAT-05",
    nombre: "Tecnología & Startups",
    slug: "tecnologia-startups",
    icono: "devices",
    eventos: 22,
    enVivo: "2 próximos",
    volumen: "S/ 410,000.00",
    activa: true,
  },
  {
    id: "CAT-06",
    nombre: "Deportes Extremos & Motor",
    slug: "deportes-extremos",
    icono: "sports_motorsports",
    eventos: 19,
    enVivo: "0 activos",
    volumen: "S/ 315,800.00",
    activa: false,
  },
];
