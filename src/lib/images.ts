import type { ImageMetadata } from 'astro';

const imageModules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

export function resolveImage(fileName: string): ImageMetadata {
  const image = imageModules[`/src/assets/images/${fileName}`];
  if (!image) {
    throw new Error(`Image "${fileName}" not found in src/assets/images/`);
  }
  return image.default;
}
