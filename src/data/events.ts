export type Categoria = "Conciertos" | "Festivales" | "Teatro & Artes" | "Tecnología & Startups" | "Gastronomía";

export interface Evento {
  id: number;
  titulo: string;
  categoria: Categoria;
  mes: string;
  dia: string;
  ordenFecha: number; // para ordenar por próxima fecha
  recinto: string;
  ciudad: string;
  precio: number;
  vendidoPct: number;
  imagen: string;
  etiqueta?: string;
  alerta?: string;
  rn01: boolean;
}

export const CATEGORIAS: { nombre: Categoria; total: number }[] = [
  { nombre: "Conciertos", total: 18 },
  { nombre: "Festivales", total: 9 },
  { nombre: "Teatro & Artes", total: 6 },
  { nombre: "Tecnología & Startups", total: 4 },
  { nombre: "Gastronomía", total: 7 },
];

export const EVENTOS: Evento[] = [
  {
    id: 1,
    titulo: "Illapu: 50 Años de Memoria",
    categoria: "Conciertos",
    mes: "NOV",
    dia: "22",
    ordenFecha: 1,
    recinto: "Estadio Nacional, Lima",
    ciudad: "Lima Metropolitana",
    precio: 120,
    vendidoPct: 92,
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ0knY0KE5NzkuStGqw1q1ifT67mEKSZJI9U6AhWOp3RQPL_vTLy174b0u7wy9OyI94ibipX-mky4UJVdpv-f0iMWvcP9YX8VaI1P_zwUiCZXj2TJy89av-7f1x3M5ENnCM9uqa8t041zaOu-1TJG9BTFBIkAVP1_UUyBvvTSOiRYC4tK2W_uMSQggJszS-064XP-MKq5ygXG6dlm2YiAJsklrr8twT_mhuawyO5LXm3J2zn7SGRKKwA",
    etiqueta: "Concierto",
    alerta: "Últimas 45",
    rn01: true,
  },
  {
    id: 2,
    titulo: "Sunsets Sessions Costa Verde",
    categoria: "Festivales",
    mes: "DIC",
    dia: "06",
    ordenFecha: 2,
    recinto: "Arena 1, San Miguel",
    ciudad: "Lima Metropolitana",
    precio: 85,
    vendidoPct: 65,
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvDn4spoMk5CW-OuvNLCRELpXVSFycv4WJn2kPSF363sY1eGAmMCuXC5MHe8vaasJsnKFp2DiXO8-kzQQMpoSuFybp2DYaTEI9ViEg5Bs48sgIqaaPqKyC2C-r86DqWFpPQgTci9kfsdJ3FXX2D271Vkt5EwjR__5ionWxSH5qPT7MtKnrRCM4Gye1Guy20eEH3_85LHCWPsTE2qWrSyooDZnkxxklUzJ8txNYAN0HTGNbguprArBvMw",
    etiqueta: "Festival",
    alerta: "Fase 2 Activa",
    rn01: true,
  },
  {
    id: 3,
    titulo: "La Ciudad y los Perros (Adaptación)",
    categoria: "Teatro & Artes",
    mes: "NOV",
    dia: "28",
    ordenFecha: 3,
    recinto: "Teatro Peruano Japonés",
    ciudad: "Lima Metropolitana",
    precio: 60,
    vendidoPct: 88,
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzWSF1VHwrrdGXLgwzvmXN34xBIwN4OYk6rp3HqFQOzonulT8oX3RQ8Oc3rgDIBuQk1yYrufzm5OXLlf4u0XjnH9FAhboOZYfGCTqissdhAclI4FPuWyTwGof69ZPRIp-nhXtluMtadjAOLXuj0h_tu5GWQZ1xiQKwFVkv2-UCWTeFwRNnaJyxkVwigIzWxjBVP4JTpgxdel43CsArHLcBejLUjiofucb59yEwR9qUh89FslmCwzuUBg",
    etiqueta: "Teatro",
    alerta: "Última Semana",
    rn01: true,
  },
  {
    id: 4,
    titulo: "Expo Sabor & Coctelería Andina",
    categoria: "Gastronomía",
    mes: "DIC",
    dia: "14",
    ordenFecha: 4,
    recinto: "Jockey Club del Perú",
    ciudad: "Lima Metropolitana",
    precio: 45,
    vendidoPct: 40,
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcwCbKFW_OszSBFGjRn5g9rrEfgjOpLO8cO9ojlnHyS-qNJQukVEDsjMOjuzg5j_UjLd7KSPLSbwBBTnT23lRuDKLMGFD41WPgTqQkE6ChvQf6ktXhbpOOcVNx1Qqpjq2nNgIfBdVS1VtVPA2IxnXWUfAvtDKqznbCfSaFCt5CYo6nVTSD1ch0lOwP4UuDuI3JQDzi-RamMjr-xQPHTj-p83unAviLr6-UDAUAqcsGn3tbEOqr99uzhg",
    etiqueta: "Gastronomía",
    alerta: "Entrada General",
    rn01: false,
  },
  {
    id: 5,
    titulo: "Trap & Latin Flow Live Tour",
    categoria: "Conciertos",
    mes: "ENE",
    dia: "18",
    ordenFecha: 5,
    recinto: "Arena 1, Costa Verde",
    ciudad: "Lima Metropolitana",
    precio: 140,
    vendidoPct: 96,
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgDyq7YFgkacORIHLxG8S9ybUgnWokuvnqs5sdTqgq2pP1mV89IE5PP7AHOlxw1895S9lY5kIOCl-LM_jVxvI1GSydfvbpMJfjAl0S9Ii1rjlcyXdm4YtxY08VHWUtiCvlw6KhIyXyhTn7-rqJ5V7JTJtd5RHH2vU21VtbGRTitoK4RJY6wNlnYsbCduZl-yqAwSjTP30miVPfHW0LY8HrdAErTeGXdHtFZBeUKWbYr9DhUJE93xxgpA",
    etiqueta: "Concierto",
    alerta: "¡Casi Agotado!",
    rn01: true,
  },
  {
    id: 6,
    titulo: "Peru Tech Summit & Fintech 2025",
    categoria: "Tecnología & Startups",
    mes: "ENE",
    dia: "25",
    ordenFecha: 6,
    recinto: "Centro de Convenciones 27 de Enero",
    ciudad: "Lima Metropolitana",
    precio: 210,
    vendidoPct: 52,
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnSl3ont3CBrtb1H33ZqHtBMTjtBXx1dOOA-YjrHT5tCzbqS1VDXnME4UwdvipQDG8evsJ3Q4wzodcrYQyU8hsiunhR1xCZZIvlEUJBewqoNsaCFJF6oGn4WRUMn2rAZBZ6tevrO1w9Z8D2POeEQco0X5gHlXOONXHyY8VERIblexp9Xr_6v1fNF_fIAyhA726EQ8vsxoayWBAdrJHBpNA3NhydUK-tNi8MeXhEL6YdH8_HcJhZpAcgw",
    etiqueta: "Tecnología",
    alerta: "Pase Corporativo",
    rn01: false,
  },
];

export const PRECIO_MAX = 800;

export function formatoPrecio(n: number) {
  return `S/ ${n.toFixed(2)}`;
}
