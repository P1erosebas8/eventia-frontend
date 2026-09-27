import type { CatalogEvent, Category } from "../types/event.types";

export const CATEGORIES: { name: Category; total: number }[] = [
  { name: "Conciertos", total: 18 },
  { name: "Festivales", total: 9 },
  { name: "Teatro & Artes", total: 6 },
  { name: "Tecnología & Startups", total: 4 },
  { name: "Gastronomía", total: 7 },
];

export const EVENTS: CatalogEvent[] = [
  {
    id: 1,
    title: "Illapu: 50 Años de Memoria",
    category: "Conciertos",
    month: "NOV",
    day: "22",
    dateOrder: 1,
    venue: "Estadio Nacional, Lima",
    city: "Lima Metropolitana",
    price: 120,
    soldPct: 92,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ0knY0KE5NzkuStGqw1q1ifT67mEKSZJI9U6AhWOp3RQPL_vTLy174b0u7wy9OyI94ibipX-mky4UJVdpv-f0iMWvcP9YX8VaI1P_zwUiCZXj2TJy89av-7f1x3M5ENnCM9uqa8t041zaOu-1TJG9BTFBIkAVP1_UUyBvvTSOiRYC4tK2W_uMSQggJszS-064XP-MKq5ygXG6dlm2YiAJsklrr8twT_mhuawyO5LXm3J2zn7SGRKKwA",
    tag: "Concierto",
    badge: "Últimas 45",
    isPromoEligible: true,
  },
  {
    id: 2,
    title: "Sunsets Sessions Costa Verde",
    category: "Festivales",
    month: "DIC",
    day: "06",
    dateOrder: 2,
    venue: "Arena 1, San Miguel",
    city: "Lima Metropolitana",
    price: 85,
    soldPct: 65,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvDn4spoMk5CW-OuvNLCRELpXVSFycv4WJn2kPSF363sY1eGAmMCuXC5MHe8vaasJsnKFp2DiXO8-kzQQMpoSuFybp2DYaTEI9ViEg5Bs48sgIqaaPqKyC2C-r86DqWFpPQgTci9kfsdJ3FXX2D271Vkt5EwjR__5ionWxSH5qPT7MtKnrRCM4Gye1Guy20eEH3_85LHCWPsTE2qWrSyooDZnkxxklUzJ8txNYAN0HTGNbguprArBvMw",
    tag: "Festival",
    badge: "Fase 2 Activa",
    isPromoEligible: true,
  },
  {
    id: 3,
    title: "La Ciudad y los Perros (Adaptación)",
    category: "Teatro & Artes",
    month: "NOV",
    day: "28",
    dateOrder: 3,
    venue: "Teatro Peruano Japonés",
    city: "Lima Metropolitana",
    price: 60,
    soldPct: 88,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzWSF1VHwrrdGXLgwzvmXN34xBIwN4OYk6rp3HqFQOzonulT8oX3RQ8Oc3rgDIBuQk1yYrufzm5OXLlf4u0XjnH9FAhboOZYfGCTqissdhAclI4FPuWyTwGof69ZPRIp-nhXtluMtadjAOLXuj0h_tu5GWQZ1xiQKwFVkv2-UCWTeFwRNnaJyxkVwigIzWxjBVP4JTpgxdel43CsArHLcBejLUjiofucb59yEwR9qUh89FslmCwzuUBg",
    tag: "Teatro",
    badge: "Última Semana",
    isPromoEligible: true,
  },
  {
    id: 4,
    title: "Expo Sabor & Coctelería Andina",
    category: "Gastronomía",
    month: "DIC",
    day: "14",
    dateOrder: 4,
    venue: "Jockey Club del Perú",
    city: "Lima Metropolitana",
    price: 45,
    soldPct: 40,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDcwCbKFW_OszSBFGjRn5g9rrEfgjOpLO8cO9ojlnHyS-qNJQukVEDsjMOjuzg5j_UjLd7KSPLSbwBBTnT23lRuDKLMGFD41WPgTqQkE6ChvQf6ktXhbpOOcVNx1Qqpjq2nNgIfBdVS1VtVPA2IxnXWUfAvtDKqznbCfSaFCt5CYo6nVTSD1ch0lOwP4UuDuI3JQDzi-RamMjr-xQPHTj-p83unAviLr6-UDAUAQqcsGn3tbEOqr99uzhg",
    tag: "Gastronomía",
    badge: "Entrada General",
    isPromoEligible: false,
  },
  {
    id: 5,
    title: "Trap & Latin Flow Live Tour",
    category: "Conciertos",
    month: "ENE",
    day: "18",
    dateOrder: 5,
    venue: "Arena 1, Costa Verde",
    city: "Lima Metropolitana",
    price: 140,
    soldPct: 96,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgDyq7YFgkacORIHLxG8S9ybUgnWokuvnqs5sdTqgq2pP1mV89IE5PP7AHOlxw1895S9lY5kIOCl-LM_jVxvI1GSydfvbpMJfjAl0S9Ii1rjlcyXdm4YtxY08VHWUtiCvlw6KhIyXyhTn7-rqJ5V7JTJtd5RHH2vU21VtbGRTitoK4RJY6wNlnYsbCduZl-yqAwSjTP30miVPfHW0LY8HrdAErTeGXdHtFZBeUKWbYr9DhUJE93xxgpA",
    tag: "Concierto",
    badge: "¡Casi Agotado!",
    isPromoEligible: true,
  },
  {
    id: 6,
    title: "Peru Tech Summit & Fintech 2025",
    category: "Tecnología & Startups",
    month: "ENE",
    day: "25",
    dateOrder: 6,
    venue: "Centro de Convenciones 27 de Enero",
    city: "Lima Metropolitana",
    price: 210,
    soldPct: 52,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnSl3ont3CBrtb1H33ZqHtBMTjtBXx1dOOA-YjrHT5tCzbqS1VDXnME4UwdvipQDG8evsJ3Q4wzodcrYQyU8hsiunhR1xCZZIvlEUJBewqoNsaCFJF6oGn4WRUMn2rAZBZ6tevrO1w9Z8D2POeEQco0X5gHlXOONXHyY8VERIblexp9Xr_6v1fNF_fIAyhA726EQ8vsxoayWBAdrJHBpNA3NhydUK-tNi8MeXhEL6YdH8_HcJhZpAcgw",
    tag: "Tecnología",
    badge: "Pase Corporativo",
    isPromoEligible: false,
  },
];

export const MAX_PRICE = 800;

export function formatPrice(value: number): string {
  return `S/ ${value.toFixed(2)}`;
}
