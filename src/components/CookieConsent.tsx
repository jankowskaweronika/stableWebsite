import { useEffect, useState } from 'react';

import Script from 'next/script';

import { GA_TRACKING_ID } from '../lib/gtag';

const COOKIE_CONSENT_KEY = 'cookie-consent';

type ConsentState = 'accepted' | 'rejected' | 'unknown';

const setPreferenceCookie = (value: ConsentState) => {
  if (typeof document === 'undefined') {
    return;
  }

  const expires = new Date(Date.now() + 31536000000).toUTCString();
  document.cookie = `cookie-consent=${value}; path=/; expires=${expires}; SameSite=Lax; Secure`;
};

const getStoredConsent = (): ConsentState => {
  if (typeof window === 'undefined') {
    return 'unknown';
  }

  const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);

  if (stored === 'accepted' || stored === 'rejected') {
    return stored;
  }

  return 'unknown';
};

const CookieConsent = () => {
  const [consent, setConsent] = useState<ConsentState>('unknown');

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  const handleConsent = (value: 'accepted' | 'rejected') => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setPreferenceCookie(value);
    setConsent(value);
  };

  return (
    <>
      {consent === 'accepted' && GA_TRACKING_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });`}
          </Script>
        </>
      )}

      {consent === 'unknown' && (
        <div className="cookie-consent-banner fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-lg text-sm text-gray-700">
          <div className="mx-auto flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="font-semibold text-gray-900">
                Ta strona używa cookies
              </p>
              <p className="mt-1 max-w-2xl text-gray-600">
                Używamy cookies, aby zapewnić prawidłowe działanie strony i
                analizę ruchu.
              </p>
              <p className="mt-1 max-w-2xl text-gray-600">
                Możesz wyrazić zgodę na cookies analityczne lub odrzucić je —
                strona nadal będzie działać.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="rounded-md bg-green-700 px-4 py-2 text-white shadow-sm transition hover:bg-green-800"
                onClick={() => handleConsent('accepted')}
              >
                Akceptuję cookies
              </button>
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 transition hover:bg-gray-50"
                onClick={() => handleConsent('rejected')}
              >
                Odrzuć cookies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
