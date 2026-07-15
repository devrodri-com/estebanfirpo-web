import { getContactContent } from "@/content/contact";
import type { Locale } from "@/i18n/config";
import { ContactForm } from "./ContactForm";
import { ContactIntro } from "./ContactIntro";

type ContactPageProps = {
  locale: Locale;
};

export function ContactPage({ locale }: ContactPageProps) {
  const copy = getContactContent(locale);

  return (
    <section
      aria-labelledby="contact-page-title"
      data-contact-page
      className="py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-stretch lg:grid-cols-[0.82fr_1.18fr]">
        <ContactIntro locale={locale} copy={copy.intro} />
        <ContactForm locale={locale} copy={copy.form} countryCopy={copy.countrySelector} />
      </div>
    </section>
  );
}
