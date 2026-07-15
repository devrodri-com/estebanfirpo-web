import "server-only";
import type { Locale } from "@/i18n/config";

type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export type ContactContent = {
  intro: {
    eyebrow: string;
    title: string;
    copy: string;
    highlight: string;
    support: string;
    whatsappLabel: string;
    whatsappMessage: string;
    details: ContactDetail[];
  };
  form: {
    eyebrow: string;
    title: string;
    copy: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: {
        label: string;
        placeholder: string;
        internationalPlaceholder: string;
      };
      message: { label: string; placeholder: string };
    };
    submit: string;
    submitting: string;
    phoneInvalid: string;
    sendError: string;
    rateLimited: string;
    success: string;
    closeNotice: string;
  };
  countrySelector: {
    selectCountry: string;
    international: string;
    manualEntry: string;
    search: string;
    noResults: string;
  };
};

const contactContent = {
  es: {
    intro: {
      eyebrow: "Contacto",
      title: "Hablemos de tu próximo paso en Miami",
      copy:
        "Contame qué estás buscando y podré orientarte sobre zonas, proyectos y próximos pasos según tu objetivo.",
      highlight: "Contacto directo con Esteban.",
      support: "Atención en español e inglés.",
      whatsappLabel: "Hablar por WhatsApp",
      whatsappMessage:
        "Hola Esteban, quiero conversar sobre una oportunidad inmobiliaria en Miami y entender qué opciones pueden encajar mejor con mi objetivo.",
      details: [
        { label: "Ubicación", value: "Miami, Florida" },
        { label: "Firma inmobiliaria", value: "Miami Life Realty" },
        {
          label: "Teléfono",
          value: "+1 (754) 267-3931",
          href: "tel:+17542673931",
        },
        {
          label: "Email",
          value: "esteban@miamiliferealty.com",
          href: "mailto:esteban@miamiliferealty.com",
        },
      ],
    },
    form: {
      eyebrow: "Tu consulta",
      title: "Contame qué estás buscando",
      copy:
        "Compartí tus datos y algo de contexto para que pueda entender mejor tu consulta desde el primer contacto.",
      fields: {
        name: { label: "Nombre", placeholder: "Tu nombre" },
        email: { label: "Email", placeholder: "tu@email.com" },
        phone: {
          label: "Teléfono o WhatsApp",
          placeholder: "Número de teléfono",
          internationalPlaceholder: "+ Código de país + número",
        },
        message: {
          label: "¿Qué estás buscando?",
          placeholder:
            "Objetivo, presupuesto aproximado, zona, proyecto o cualquier dato que ayude a entender tu consulta.",
        },
      },
      submit: "Enviar consulta",
      submitting: "Enviando...",
      phoneInvalid: "Por favor, ingresá un número de teléfono válido.",
      sendError: "No se pudo enviar la consulta. Probá nuevamente.",
      rateLimited: "Demasiados intentos. Probá de nuevo en unos minutos.",
      success: "Consulta enviada. Esteban se pondrá en contacto contigo.",
      closeNotice: "Cerrar notificación",
    },
    countrySelector: {
      selectCountry: "Seleccionar país",
      international: "Internacional",
      manualEntry: "Ingreso manual",
      search: "Buscar país...",
      noResults: "No se encontraron países",
    },
  },
  en: {
    intro: {
      eyebrow: "Contact",
      title: "Let’s discuss your next step in Miami",
      copy:
        "Tell me what you are looking for and I can help you understand the areas, projects, and next steps that may best fit your goals.",
      highlight: "Direct contact with Esteban.",
      support: "Available in English and Spanish.",
      whatsappLabel: "Chat on WhatsApp",
      whatsappMessage:
        "Hi Esteban, I would like to discuss a Miami real estate opportunity and understand which options may best fit my goals.",
      details: [
        { label: "Location", value: "Miami, Florida" },
        { label: "Brokerage", value: "Miami Life Realty" },
        {
          label: "Phone",
          value: "+1 (754) 267-3931",
          href: "tel:+17542673931",
        },
        {
          label: "Email",
          value: "esteban@miamiliferealty.com",
          href: "mailto:esteban@miamiliferealty.com",
        },
      ],
    },
    form: {
      eyebrow: "Your inquiry",
      title: "Tell me what you are looking for",
      copy:
        "Share your details and some context so I can better understand your inquiry from the first contact.",
      fields: {
        name: { label: "Name", placeholder: "Your name" },
        email: { label: "Email", placeholder: "you@email.com" },
        phone: {
          label: "Phone or WhatsApp",
          placeholder: "Phone number",
          internationalPlaceholder: "+ Country code + number",
        },
        message: {
          label: "What are you looking for?",
          placeholder:
            "Your goals, approximate budget, preferred area, project, or any context that may help explain your inquiry.",
        },
      },
      submit: "Send inquiry",
      submitting: "Sending...",
      phoneInvalid: "Please enter a valid phone number.",
      sendError: "The inquiry could not be sent. Please try again.",
      rateLimited: "Too many attempts. Please try again in a few minutes.",
      success: "Inquiry sent. Esteban will be in touch with you.",
      closeNotice: "Close notification",
    },
    countrySelector: {
      selectCountry: "Select country",
      international: "International",
      manualEntry: "Manual entry",
      search: "Search country...",
      noResults: "No countries found",
    },
  },
} satisfies Record<Locale, ContactContent>;

export function getContactContent(locale: Locale): ContactContent {
  return contactContent[locale];
}
