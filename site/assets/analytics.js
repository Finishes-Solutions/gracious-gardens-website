// Gracious Gardens — Google Analytics 4.
// Inert until MEASUREMENT_ID is set: with the placeholder in place this file
// loads nothing, sets no cookies and sends no requests, so it is safe to ship
// before the GA4 property exists.
//
// To switch it on: create the GA4 property, then replace the placeholder below
// with that property's measurement ID (Admin -> Data streams -> your stream).
(() => {
  const MEASUREMENT_ID = 'G-XXXXXXXXXX';

  if (!/^G-[A-Z0-9]+$/.test(MEASUREMENT_ID)) return;

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(tag);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);
})();
