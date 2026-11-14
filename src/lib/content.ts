import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export const TODO = 'TODO';

export function isTodo(value: unknown): boolean {
  return typeof value === 'string' && value.trim().startsWith(TODO);
}

export async function getSettings() {
  const entry = await getEntry('settings', 'site');
  if (!entry) throw new Error('Missing "site" entry in src/content/settings.yaml');
  return entry.data;
}

export async function getHome() {
  const entry = await getEntry('home', 'home');
  if (!entry) throw new Error('Missing "home" entry in src/content/home.yaml');
  return entry.data;
}

export async function getOffers() {
  const offers = await getCollection('offers');
  return offers.sort((a, b) => a.data.order - b.data.order);
}

export async function getOffer(id: string) {
  const offer = await getEntry('offers', id);
  if (!offer) throw new Error(`Missing offer "${id}" in src/content/offers/`);
  return offer;
}

export async function getPublishedNews() {
  const news = await getCollection('news', ({ data }) => !data.draft);
  return news.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export type HorseSex = CollectionEntry<'horses'>['data']['sex'];

export const horseSexLabels: Record<HorseSex, { singular: string; plural: string }> = {
  ogier: { singular: 'Ogier', plural: 'Ogiery' },
  klacz: { singular: 'Klacz', plural: 'Klacze' },
};

export async function getHorses() {
  const horses = await getCollection('horses');
  return horses.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name, 'pl'));
}

export async function getHorseGroups() {
  const horses = await getHorses();
  const sexes: HorseSex[] = ['ogier', 'klacz'];
  return sexes
    .map((sex) => ({ sex, label: horseSexLabels[sex].plural, horses: horses.filter((horse) => horse.data.sex === sex) }))
    .filter((group) => group.horses.length > 0);
}

export async function getAchievements() {
  const achievements = await getCollection('achievements');
  return achievements.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getHomeAchievements(latestCount = 3) {
  const achievements = await getAchievements();
  const featured = achievements.filter((achievement) => achievement.data.featured);
  const latest = achievements.filter((achievement) => !achievement.data.featured).slice(0, latestCount);
  return [...featured, ...latest];
}

export async function getPriceCategories() {
  const categories = await getCollection('prices');
  return categories.sort((a, b) => a.data.order - b.data.order);
}

const dateFormatter = new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
const monthFormatter = new Intl.DateTimeFormat('pl-PL', { month: 'long', year: 'numeric' });

export const formatDate = (date: Date) => dateFormatter.format(date);
export const formatMonth = (date: Date) => monthFormatter.format(date);
export const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

const priceFormatter = new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 0, maximumFractionDigits: 2 });

export const INDIVIDUAL_PRICE_LABEL = 'Cena ustalana indywidualnie';

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

export interface PostalAddressFields {
  street: string;
  locality: string;
  postalCode: string;
  postTown: string;
}
