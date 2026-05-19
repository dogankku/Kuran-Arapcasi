export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function imgSrc(path: string | null | undefined): string {
  if (!path) return '';
  return `${BASE_PATH}${path}`;
}
