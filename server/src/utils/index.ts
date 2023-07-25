import { randomBytes } from 'crypto';

export const resolveImgUrl = (imageHash: string) => {
  return `${process.env.IMAGE_CDN_BASE_URL}${imageHash}.png`;
};

export const getRandomAvatar = () => {
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  return `avatar-${randomNumber}`;
};

export const uid = (): string => {
  const randomData = randomBytes(6);

  const uid = randomData
    .toString('base64')
    // Remove any non-alphanumeric characters from the Base64 string
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 10);

  return uid;
};
