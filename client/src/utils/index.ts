import { TFunction } from 'i18next';

export const tArray = <T = string>(
  t: TFunction,
  translationKey: string,
  options = {}
): T[] => {
  const translated = t(translationKey, { ...options, returnObjects: true });
  if (Array.isArray(translated)) {
    return translated as T[];
  }
  return [];
};
