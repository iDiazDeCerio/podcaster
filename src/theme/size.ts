const remScaleNumber = 16;

interface SizeObject {
  base: string | number;
  xs: string | number;
  s: string | number;
  m: string | number;
}
const sizeNumber = {
  base: 4,
  xs: 8,
  s: 16,
  m: 24,
};

export const size = (
  Object.keys(sizeNumber) as (keyof SizeObject)[]
).reduce<SizeObject>(
  (sizeObject, key) => {
    sizeObject[key] = `${sizeNumber[key] / remScaleNumber}rem`;

    return sizeObject;
  },
  {
    base: "",
    xs: "",
    s: "",
    m: "",
  }
);
