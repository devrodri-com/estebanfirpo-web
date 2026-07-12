export const PUBLIC_EMAIL = "esteban@miamiliferealty.com";
export const PUBLIC_PHONE_DISPLAY = "+1 754 267 3931";
export const PUBLIC_PHONE_E164 = "+17542673931";
export const WHATSAPP_NUMBER = "17542673931";

export const CALENDAR_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ21yM5KOsoq2niX4QY7FXyUrFiLuQpLxw9IIzheIYWY1ruSBHG5DUrSzUmGst3Ew4nb8ZKw6ptP";

export function createWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
