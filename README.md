# Stajnia Złota Podkowa — website

Static website for [stajniazlotapodkowa.pl](https://stajniazlotapodkowa.pl), built with [Astro](https://astro.build) and Tailwind CSS 4. No client framework — only small vanilla TypeScript scripts (mobile menu, cookie consent, contact form, map).

## Requirements

- **Node.js 22.16+** (see `.nvmrc`; run `nvm use`).
- Astro is pinned to `~7.3.8` — the newest release that still supports Node 22.16. Astro ≥ 7.4 requires Node ≥ 22.23.4, so **upgrade Node first** before bumping Astro.
- `vite` is pinned via `overrides` so Astro and `@tailwindcss/vite` share one Vite instance.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run check     # type + content check (astro check)
npm run build     # astro check + static build into dist/
npm run preview   # serve dist/ locally
```

Set `ASTRO_TELEMETRY_DISABLED=1` if you don't want Astro telemetry.

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable       | Purpose                                                                          |
| -------------- | -------------------------------------------------------------------------------- |
| `PUBLIC_GA_ID` | Google Analytics 4 measurement ID (`G-XXXXXXX`). Empty = GA is not loaded at all. |

The value is baked in at build time, so rebuild after changing it.

## Where to edit content

Everything visible on the site comes from `src/content/` — components contain no business content.

| What                         | File                                   |
| ---------------------------- | -------------------------------------- |
| Site name, phone, address, e-mail, socials, company data for the privacy policy (`company`: legal name, registered address, NIP), map URLs | `src/content/settings.yaml` |
| Home page hero, "O nas" section, gallery teaser | `src/content/home.yaml` |
| Price list (categories → items) | `src/content/prices.yaml` |
| Offer cards + boarding / photo session details | `src/content/offers/*.md` |
| News (one Markdown file per post) | `src/content/news/*.md` |
| Horse profiles (one file per horse) | `src/content/horses/*.md` |
| Achievements | `src/content/achievements.yaml` |

Schemas live in `src/content.config.ts`; `npm run check` fails on invalid content.

### Conventions

- **Address** — `settings.yaml` stores `street`, `locality`, `postalCode` and `postTown` separately; the site renders them as "ul. Kandydaty 40, Niedrzwica Kościelna" / "24-220 Niedrzwica Duża".
- **Phone** — a single `phone` entry: `number` for the `tel:` link (`+48513097988`) and `display` for the visible text (`+48 513 097 988`).
- **Prices** — `price` is a number in PLN (e.g. `120`); leave it out to show "Cena ustalana indywidualnie". `unit` is shown after a slash (e.g. `unit: miesiąc` → "/ miesiąc"). A category can list `extras` — rendered as "Usługi dodatkowe (płatne osobno)".
- **Horse `TODO` values** — a horse field set to `TODO` (e.g. `born`) renders as a visible "do uzupełnienia" marker; avoid leaving them before publishing.
- **Images** — put photos in `src/assets/images/` and reference them by file name (`image: my-photo.jpg`), always with a descriptive Polish `alt`/`imageAlt`. Astro generates AVIF/WebP in several sizes. A missing file fails the build.
- **News** — the file name becomes the URL (`src/content/news/nowy-sezon.md` → `/aktualnosci/nowy-sezon/`). Front matter: `title`, `date`, `excerpt`, optional `image`, `imageAlt`, `link: { label, url }`, `draft: true` to hide.
- **Horses** — see [Adding a horse](#adding-a-horse) below.
- **Achievements** — one list item per result in `achievements.yaml`: `id`, `date`, `horse`, `event`, `category`, `result`, optional `classNumber` (e.g. `V`), `title` (championship title shown as a gold badge, e.g. `Wiceczempionka klaczy`), `featured: true` (always shown on the home page, in addition to the 3 newest results), `scores` (groups with `group`, `total` and `items: [{ label, value }]`, shown under "Pokaż oceny sędziów"), `url` (the year's results page, shown as "Źródło: LZHK"), `protocolUrl` (PDF protocol) and `sourceLabel` (defaults to `LZHK`). Quote values that contain commas, e.g. `label: 'Głowa, szyja, kłoda'`.
- The privacy policy text is in `src/pages/polityka-prywatnosci.astro` (it pulls the controller data from `settings.yaml`). Update it if you add new tools or cookies, and update the cookie list in `src/scripts/consent.ts` as well.

### Adding a horse

1. Create `src/content/horses/<slug>.md` (lowercase, hyphens, e.g. `nowa-klacz.md`). The slug is internal only — horses have no separate pages.
2. Fill in the front matter:

   ```yaml
   ---
   name: Evira
   breed: Koń rasy małopolskiej
   sex: klacz          # ogier | klacz — decides the group ("Ogiery", "Klacze")
   born: 2019          # year of birth, or TODO
   sire: El Ejido
   dam: Euforia
   damSire: Bibigar
   order: 1            # optional, sorts horses within a group (default 100, then by name)
   image: horses/evira.jpg   # optional, path inside src/assets/images/
   imageAlt: Portret klaczy Evira    # describe the photo in Polish
   imagePosition: 50% 30%            # optional focal point (CSS object-position), default center
   imageFit: contain                 # optional: cover (default, fills the card) | contain (whole photo over a blurred backdrop)
   ---
   ```

3. Photo (optional): put the file in `src/assets/images/horses/` and set `image` to `horses/<file>` together with `imageAlt`. The card crops to 4:3 — use `imagePosition` (e.g. `20% 40%` = left of centre, upper part) to keep the horse's head in frame. For tall portrait photos that would be cropped too tightly, set `imageFit: contain` — the whole photo is shown on top of a blurred, darkened copy of itself. Without a photo the card shows a neutral "Zdjęcie wkrótce" placeholder.
4. Results go to `src/content/achievements.yaml` (see above), with `horse` spelled exactly like `name`.
5. Run `npm run check` — an invalid `sex` value or a missing image file fails the check.

## Privacy features

- Cookie consent: `vanilla-cookieconsent` v3 (categories: necessary, analytics, maps). "Ustawienia cookies" in the footer reopens the preferences.
- GA4 with Consent Mode v2 — all storage denied by default, `analytics_storage` granted only after consent.
- Google Maps iframe loads only after "maps" consent or after clicking "Pokaż mapę"; a plain "Jak dojechać" link is always available.

## Contact form (`public/kontakt.php`)

The form on `/kontakt/` posts to `/kontakt.php`, a small PHP script deployed together with `dist/` (requires **PHP 8.1+**, selectable in the OVH panel or via `.ovhconfig`).

- **Recipient** — the `RECIPIENT_EMAIL` constant at the top of `public/kontakt.php`. It lives only in that file (server-side) and never reaches HTML/JS. Change it there and redeploy the file.
- **Sender** — `SENDER_EMAIL` (`kontakt@stajniazlotapodkowa.pl`, an existing OVH mailbox) is used as `From:` and as the envelope sender (`-f`); the visitor's address goes to `Reply-To:` when they enter an e-mail.
- **Validation & spam protection** — required fields, e-mail or phone format, length limits, required consent checkbox, honeypot field `website`, minimum fill time (`form_started_at`, set by JS), rejection of line breaks in header-bound values.
- **Responses** — the JS submit (`Accept: application/json`) gets `{ ok, message }`; a plain POST (no JS) gets a 303 redirect to `/kontakt/dziekujemy/` or back to `/kontakt/?blad=1#blad-formularza`, which shows an error message.
- `astro dev` doesn't run PHP, so the form only works on the real hosting (or locally with `php -S` serving `dist/`).

**If messages land in spam (or don't arrive):** make sure the `kontakt@stajniazlotapodkowa.pl` mailbox still exists in the OVH panel (the sender must be a real mailbox on the domain), and check that the domain has an SPF record that includes OVH (`v=spf1 include:mx.ovh.com ~all`) — ideally DKIM too. Mark the first message as "Not spam" in Gmail.

## Deploy to OVH (shared hosting, Apache)

1. `npm run build` (with a filled-in `.env`).
2. Upload the **contents** of `dist/` (including the hidden `.htaccess`) to the web root (usually `www/`) via FTP/SFTP, e.g. FileZilla. Remove old files from the previous site first.
3. Make sure SSL is enabled for the domain in the OVH panel — `.htaccess` forces HTTPS, redirects `www` → apex and sets security headers (HSTS, CSP, etc.).

If you add a new external service (e.g. YouTube embeds), extend the `Content-Security-Policy` header in `public/.htaccess`, otherwise the browser will block it.

## Remaining TODOs

- `.env`: `PUBLIC_GA_ID` (Google Analytics is not loaded until it is set). When creating the GA4 property, keep data retention at 14 months or less — the privacy policy promises that.
- Optional: more of the stable's own photos (boarding facilities, photo sessions) to replace generic shots.
