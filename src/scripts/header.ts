export function initHeader() {
  const backdrop = document.querySelector<HTMLElement>('[data-header-backdrop]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!backdrop || !toggle || !menu) return;

  const syncScrolledState = () => backdrop.toggleAttribute('data-scrolled', window.scrollY > 24);
  syncScrolledState();
  window.addEventListener('scroll', syncScrolledState, { passive: true });

  const label = toggle.querySelector('[data-menu-label]');
  const openIcon = toggle.querySelector('[data-icon-open]');
  const closeIcon = toggle.querySelector('[data-icon-close]');

  const setOpen = (open: boolean) => {
    menu.toggleAttribute('data-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'Zamknij menu' : 'Otwórz menu';
    openIcon?.classList.toggle('hidden', open);
    closeIcon?.classList.toggle('hidden', !open);
    document.body.classList.toggle('overflow-hidden', open);
    backdrop.toggleAttribute('data-scrolled', open || window.scrollY > 24);
  };

  const isOpen = () => menu.hasAttribute('data-open');

  toggle.addEventListener('click', () => {
    setOpen(!isOpen());
    if (isOpen()) menu.querySelector<HTMLAnchorElement>('a')?.focus();
  });

  menu.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.matchMedia('(min-width: 64rem)').addEventListener('change', (query) => {
    if (query.matches) setOpen(false);
  });
}
