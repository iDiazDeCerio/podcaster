const baseSize = 16;

const fontSizeNumbers = {
  xs: 12,
  s: 14,
  m: 16,
  l: 20,
};

export const fontSize = {
  xs: `${(fontSizeNumbers.xs / baseSize) * 100}%`,
  s: `${(fontSizeNumbers.s / baseSize) * 100}%`,
  m: `${(fontSizeNumbers.m / baseSize) * 100}%`,
  l: `${(fontSizeNumbers.l / baseSize) * 100}%`,
};

const lineHeightNumbers = {
  xs: 14,
  s: 16,
  m: 20,
  l: 24,
};

export const lineHeight = {
  xs: `${(lineHeightNumbers.xs / fontSizeNumbers.xs) * 100}%`,
  s: `${(lineHeightNumbers.s / fontSizeNumbers.s) * 100}%`,
  m: `${(lineHeightNumbers.m / fontSizeNumbers.m) * 100}%`,
  l: `${(lineHeightNumbers.l / fontSizeNumbers.l) * 100}%`,
};
