// Inline SVG icon set (24×24, stroke-based) so pages need no icon font.
const paths = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17L17 7M8 7h9v9"/>',
  arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 6.5l9 6.5 9-6.5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  video: '<rect x="2.5" y="6" width="13" height="12" rx="2.5"/><path d="M15.5 10.5l6-3.5v10l-6-3.5"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
  copyright: '<circle cx="12" cy="12" r="9.5"/><path d="M15 9.4a4 4 0 1 0 0 5.2"/>',
  trademark: '<path d="M3 7h8M7 7v10M13 17V7l3.5 6L20 7v10"/>',
  lock: '<rect x="4" y="10.5" width="16" height="11" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/><circle cx="12" cy="16" r="1.4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>',
  contract: '<path d="M14 2.5H6.5A2.5 2.5 0 0 0 4 5v14a2.5 2.5 0 0 0 2.5 2.5h11A2.5 2.5 0 0 0 20 19V8.5z"/><path d="M14 2.5v6h6M8 13h8M8 17h5"/>',
  megaphone: '<path d="M3 10.5v3a1.5 1.5 0 0 0 1.5 1.5H7l7 5V4L7 9H4.5A1.5 1.5 0 0 0 3 10.5z"/><path d="M18 8.5a5 5 0 0 1 0 7"/>',
  shield: '<path d="M12 2.5l8 3v6c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10v-6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  home: '<path d="M3 11l9-7.5 9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
  scroll: '<path d="M8 21h11a2 2 0 0 0 2-2v-1H10v1a2 2 0 0 1-4 0V5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2h4"/><path d="M6 3h11a2 2 0 0 1 2 2v13"/><path d="M10 8h6M10 12h6"/>',
  heart: '<path d="M12 20.5s-8.5-5-8.5-11A4.8 4.8 0 0 1 12 6.6a4.8 4.8 0 0 1 8.5 2.9c0 6-8.5 11-8.5 11z"/>',
  key: '<circle cx="8" cy="15" r="4.5"/><path d="M11.2 11.8L20 3M16.5 6.5l2.5 2.5M14.5 8.5l2 2"/>',
  spark: '<path d="M12 2.5c.7 4.6 2.9 6.8 7.5 7.5-4.6.7-6.8 2.9-7.5 7.5-.7-4.6-2.9-6.8-7.5-7.5 4.6-.7 6.8-2.9 7.5-7.5z"/><path d="M19 16.5c.3 1.7 1 2.4 2.5 2.7-1.6.3-2.2 1-2.5 2.6-.3-1.6-1-2.3-2.5-2.6 1.6-.3 2.2-1 2.5-2.7z"/>',
  mic: '<rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6"/>',
  graduation: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v5"/>',
  scale: '<path d="M12 3v18M7 21h10M4 7h16"/><path d="M4 7l-2.5 6a3 3 0 0 0 5 0zM20 7l-2.5 6a3 3 0 0 0 5 0z"/><circle cx="12" cy="4" r="1"/>',
  ai: '<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/><path d="M9.5 15l1.8-6h1.4l1.8 6M10.2 13h3.6"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20.5 20.5L16 16"/>',
  quote: '<path d="M10 7H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v3l3-3V9a2 2 0 0 0-1-2zM20 7h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v3l3-3V9a2 2 0 0 0-1-2z"/>',
  globe: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.5 2.6 3.8 5.8 3.8 9.5s-1.3 6.9-3.8 9.5c-2.5-2.6-3.8-5.8-3.8-9.5S9.5 5.1 12 2.5z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/>',
  feed: '<path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.5"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.5c0-1.7 1-3 2.6-3s2.4 1.1 2.4 3V17"/>',
  facebook: '<path d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.6 1.6-1.6h1.6V4.3a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.2H8.6v3h2.7V21"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r=".6"/>',
  youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.5 9.5v5l4.5-2.5z"/>',
  x: '<path d="M4 4h4.5L20 20h-4.5zM19.5 4l-6.6 7.4M4.5 20l6.6-7.4"/>',
  copy: '<rect x="8.5" y="8.5" width="12" height="12" rx="2.5"/><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  coins: '<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M3 11v4c0 1.7 2.7 3 6 3 1 0 2-.1 2.8-.4"/><ellipse cx="17" cy="15" rx="4.5" ry="2.2"/><path d="M12.5 15v3c0 1.2 2 2.2 4.5 2.2s4.5-1 4.5-2.2v-3"/>',
  briefcase: '<rect x="2.5" y="7" width="19" height="13.5" rx="2.5"/><path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M2.5 12.5h19"/>',
  hands: '<path d="M7 11.5V6.5a1.5 1.5 0 0 1 3 0v4M10 10.5V5a1.5 1.5 0 0 1 3 0v5.5M13 10.5V6a1.5 1.5 0 0 1 3 0v6.5"/><path d="M16 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5A6.5 6.5 0 0 1 5 16.5l-1.6-3.3a1.5 1.5 0 0 1 2.6-1.5L7 13.5"/>',
  smile: '<circle cx="12" cy="12" r="9.5"/><path d="M8 14.5s1.5 2 4 2 4-2 4-2M9 9.5h.01M15 9.5h.01"/>',
  compass: '<circle cx="12" cy="12" r="9.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
};

export function icon(name, cls = "") {
  const p = paths[name];
  if (!p) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${p}</svg>`;
}

// The FW monogram, inline so it inherits no external requests.
export function logoMark(cls = "brand-mark", id = "m") {
  return `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3d98c"/><stop offset="1" stop-color="#c9a14a"/></linearGradient><linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff9a76"/><stop offset="1" stop-color="#ee6a4d"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="#15122a"/><g fill="none" stroke="url(#${id}g)" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 47V19h11M13 32h8.5"/><path d="M27 24l5.5 23L39 30l6.5 17L51 24"/></g><path fill="url(#${id}s)" d="M39 7.5q1.2 4.6 5.8 5.8-4.6 1.2-5.8 5.8-1.2-4.6-5.8-5.8 4.6-1.2 5.8-5.8z"/></svg>`;
}

// Large, transparent monogram used as portrait fallback art and decorative panels.
export function monogramArt(id = "art") {
  return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1c6"/><stop offset="1" stop-color="#c9a14a"/></linearGradient><linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb08f"/><stop offset="1" stop-color="#ee6a4d"/></linearGradient></defs><g fill="none" stroke="url(#${id}g)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 47V19h11M13 32h8.5"/><path d="M27 24l5.5 23L39 30l6.5 17L51 24"/></g><path fill="url(#${id}s)" d="M39 7.5q1.2 4.6 5.8 5.8-4.6 1.2-5.8 5.8-1.2-4.6-5.8-5.8 4.6-1.2 5.8-5.8z"/><circle cx="32" cy="32" r="29" fill="none" stroke="rgba(243,217,140,.25)" stroke-width=".4"/></svg>`;
}
