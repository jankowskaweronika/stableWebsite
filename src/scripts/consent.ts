import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

export const CONSENT_CHANGED_EVENT = 'stable:consent-changed';

const grantedWhen = (accepted: boolean) => (accepted ? 'granted' : 'denied');

function syncGoogleConsent() {
  window.gtag?.('consent', 'update', {
    analytics_storage: grantedWhen(CookieConsent.acceptedCategory('analytics')),
  });
}

function announceConsentChange() {
  syncGoogleConsent();
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT));
}

export function hasConsent(category: 'analytics' | 'maps'): boolean {
  return CookieConsent.acceptedCategory(category);
}

export function grantConsent(category: 'analytics' | 'maps') {
  const accepted = CookieConsent.getUserPreferences().acceptedCategories;
  CookieConsent.acceptCategory([...new Set([...accepted, category])]);
  announceConsentChange();
}

export function initCookieConsent() {
  return CookieConsent.run({
    guiOptions: {
      consentModal: { layout: 'box wide', position: 'bottom left', equalWeightButtons: true },
      preferencesModal: { layout: 'box', equalWeightButtons: true },
    },
    onConsent: announceConsentChange,
    onChange: announceConsentChange,
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: {
        autoClear: { cookies: [{ name: /^_ga/ }, { name: '_gid' }] },
      },
      maps: {},
    },
    language: {
      default: 'pl',
      translations: {
        pl: {
          consentModal: {
            title: 'Szanujemy Twoją prywatność',
            description:
              'Używamy niezbędnych plików cookies do działania strony. Za Twoją zgodą użyjemy też cookies analitycznych (Google Analytics) oraz wyświetlimy mapę Google. Szczegóły znajdziesz w <a href="/polityka-prywatnosci/">polityce prywatności</a>.',
            acceptAllBtn: 'Akceptuj wszystkie',
            acceptNecessaryBtn: 'Odrzuć wszystkie',
            showPreferencesBtn: 'Ustawienia',
          },
          preferencesModal: {
            title: 'Ustawienia cookies',
            acceptAllBtn: 'Akceptuj wszystkie',
            acceptNecessaryBtn: 'Odrzuć wszystkie',
            savePreferencesBtn: 'Zapisz wybór',
            closeIconLabel: 'Zamknij',
            sections: [
              {
                description:
                  'Wybierz, na które kategorie plików cookies się zgadzasz. Zgodę możesz zmienić w każdej chwili, klikając „Ustawienia cookies” w stopce strony.',
              },
              {
                title: 'Niezbędne',
                description: 'Zapamiętują Twoje wybory dotyczące cookies. Bez nich strona nie działa poprawnie.',
                linkedCategory: 'necessary',
              },
              {
                title: 'Analityczne',
                description:
                  'Google Analytics 4 pomaga nam zrozumieć, jak odwiedzający korzystają ze strony (anonimowe statystyki odwiedzin).',
                linkedCategory: 'analytics',
                cookieTable: {
                  headers: { name: 'Nazwa', domain: 'Domena', desc: 'Opis' },
                  body: [
                    { name: '_ga', domain: 'stajniazlotapodkowa.pl', desc: 'Rozróżnianie użytkowników (2 lata)' },
                    { name: '_ga_*', domain: 'stajniazlotapodkowa.pl', desc: 'Utrzymanie stanu sesji (2 lata)' },
                  ],
                },
              },
              {
                title: 'Mapy',
                description:
                  'Wyświetlenie osadzonej mapy Google Maps na stronie kontaktowej. Google może przy tym zapisywać własne pliki cookies.',
                linkedCategory: 'maps',
              },
              {
                title: 'Więcej informacji',
                description: 'Szczegóły znajdziesz w <a href="/polityka-prywatnosci/">polityce prywatności</a>.',
              },
            ],
          },
        },
      },
    },
  });
}
