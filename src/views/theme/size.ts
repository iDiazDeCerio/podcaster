const remScaleNumber = 16;

interface SizeObject {
  tiny: string,
  base: string;
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
}

const sizeNumber = {
  tiny: 2,
  base: 4,
  xs: 8,
  s: 16,
  m: 24,
  l: 32,
  xl: 64,
};

export const size = (
  Object.keys(sizeNumber) as (keyof SizeObject)[]
).reduce<SizeObject>(
  (sizeObject, key) => {
    sizeObject[key] = `${sizeNumber[key] / remScaleNumber}rem`;

    return sizeObject;
  },
  {
    tiny: "",
    base: "",
    xs: "",
    s: "",
    m: "",
    l: "",
    xl: "",
  }
);
