// Global site configuration. Edit contact details, social links and the
// optional form endpoint here; every page picks them up on the next build.
export const site = {
  name: "Francine D. Ward",
  legalName: "Law Office of Francine D. Ward",
  tagline: "Attorney · Author · Speaker",
  // Used for canonical URLs, the sitemap and the RSS feed.
  url: "https://www.francineward.com",
  description:
    "Francine D. Ward — intellectual property and estate planning attorney admitted in California, New York and D.C., author of Esteemable Acts, and speaker on self-esteem through action.",
  phone: "760-636-0066",
  phoneHref: "+17606360066",
  email: "info@fwardattorney.com",
  address: {
    street: "42215 Washington Street, Ste. A-11",
    city: "Palm Desert",
    region: "CA",
    postal: "92211",
    country: "US",
  },
  hours: "Appointments are virtual · Initial consultation is complimentary",
  // Optional: set to a Formspree (or similar) endpoint to post the contact form
  // directly, e.g. "https://formspree.io/f/abcdwxyz". Leave empty to fall back to email.
  formEndpoint: "",
  socials: [
    // Profile links found on the previous site — confirm each before launch.
    { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/trademarklawyer/" },
    { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/Francineward/" },
    { name: "X", icon: "x", href: "https://x.com/Francineward" },
    { name: "YouTube", icon: "youtube", href: "https://www.youtube.com/channel/UCkYy8SWYRR58Hmx-1xObBzA" },
  ],
  nav: [
    { label: "Meet Francine", href: "meet-francine/" },
    { label: "Law Office", href: "attorney-at-law/" },
    { label: "Esteemable Acts", href: "esteemable-acts/" },
    { label: "Speaking", href: "speaking/" },
    { label: "News", href: "news/", badge: "New" },
    { label: "Insights", href: "insights/" },
  ],
};
