type MiamiConnectionsGraphicProps = {
  title: string;
  description: string;
  centerLabel: string;
  regions: string[];
};

export function MiamiConnectionsGraphic({
  title,
  description,
  centerLabel,
  regions,
}: MiamiConnectionsGraphicProps) {
  const [latinAmerica, northAmerica, europe] = regions;

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-[#0A2540]/10 bg-[#F6F5F0] p-5 shadow-[0_18px_55px_rgba(10,37,64,0.08)] sm:p-8">
      <svg
        viewBox="0 0 620 420"
        role="img"
        aria-labelledby="miami-connections-title miami-connections-description"
        className="h-auto w-full"
      >
        <title id="miami-connections-title">{title}</title>
        <desc id="miami-connections-description">{description}</desc>
        <defs>
          <radialGradient id="miami-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="miami-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A2540" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0A2540" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        <circle cx="310" cy="210" r="130" fill="url(#miami-glow)" />
        <path d="M310 210 C235 192, 178 133, 105 88" fill="none" stroke="url(#miami-line)" strokeWidth="2" />
        <path d="M310 210 C234 237, 176 289, 104 335" fill="none" stroke="url(#miami-line)" strokeWidth="2" />
        <path d="M310 210 C391 184, 450 124, 524 84" fill="none" stroke="url(#miami-line)" strokeWidth="2" />
        <path d="M310 210 C396 232, 454 280, 528 330" fill="none" stroke="#0A2540" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="5 8" />

        <g>
          <circle cx="310" cy="210" r="47" fill="#0A2540" />
          <circle cx="310" cy="210" r="54" fill="none" stroke="#D4AF37" strokeWidth="2" />
          <text x="310" y="218" textAnchor="middle" fill="white" fontSize="24" fontWeight="700">
            {centerLabel}
          </text>
        </g>

        <g fill="#FBFAF7" stroke="#0A2540" strokeOpacity="0.18">
          <rect x="36" y="51" width="154" height="70" rx="18" />
          <rect x="32" y="298" width="176" height="70" rx="18" />
          <rect x="438" y="47" width="150" height="70" rx="18" />
        </g>
        <g fill="#0A2540" fontSize="20" fontWeight="650" textAnchor="middle">
          <text x="113" y="92">{northAmerica}</text>
          <text x="120" y="339">{latinAmerica}</text>
          <text x="513" y="88">{europe}</text>
        </g>
        <g fill="#D4AF37">
          <circle cx="105" cy="88" r="5" />
          <circle cx="104" cy="335" r="5" />
          <circle cx="524" cy="84" r="5" />
        </g>
      </svg>
    </figure>
  );
}
