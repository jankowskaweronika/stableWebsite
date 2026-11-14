export const mainNavigation = [
  { href: '/cennik/', label: 'Cennik' },
  { href: '/pensjonat/', label: 'Pensjonat' },
  { href: '/sesje-zdjeciowe/', label: 'Sesje zdjęciowe' },
  { href: '/hodowla-i-osiagniecia/', label: 'Hodowla' },
  { href: '/aktualnosci/', label: 'Aktualności' },
] as const;

export const contactLink = { href: '/kontakt/', label: 'Kontakt' } as const;

export function isCurrentPath(currentPath: string, href: string): boolean {
  const normalize = (path: string) => (path.endsWith('/') ? path : `${path}/`);
  return normalize(currentPath).startsWith(normalize(href));
}
