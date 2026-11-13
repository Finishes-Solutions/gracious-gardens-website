// Gracious Gardens — Google Analytics 4.
// The measurement ID is not a secret: GA4 ships it to every visitor in this
// file, so it belongs in the repo. The guard below means a blank or malformed
// ID disables analytics outright rather than loading a broken tag.
(() => {
  const MEASUREMENT_ID = 'G-JYH753W1F3';

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
