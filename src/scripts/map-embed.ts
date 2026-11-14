import { CONSENT_CHANGED_EVENT, grantConsent, hasConsent } from './consent';

function showMap(container: HTMLElement) {
  if (container.querySelector('iframe')) return;
  const iframe = document.createElement('iframe');
  iframe.src = container.dataset.mapSrc ?? '';
  iframe.title = container.dataset.mapTitle ?? 'Mapa';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.allowFullscreen = true;
  iframe.className = 'absolute inset-0 h-full w-full border-0';
  container.append(iframe);
  container.querySelector<HTMLElement>('[data-map-placeholder]')?.classList.add('hidden');
}

function hideMap(container: HTMLElement) {
  container.querySelector('iframe')?.remove();
  container.querySelector<HTMLElement>('[data-map-placeholder]')?.classList.remove('hidden');
}

export function initMapEmbed() {
  const container = document.querySelector<HTMLElement>('[data-map]');
  if (!container) return;

  const syncWithConsent = () => (hasConsent('maps') ? showMap(container) : hideMap(container));
  window.addEventListener(CONSENT_CHANGED_EVENT, syncWithConsent);
  syncWithConsent();

  container.querySelector('[data-map-load]')?.addEventListener('click', () => {
    grantConsent('maps');
    showMap(container);
  });
}
