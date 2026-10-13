export const toPersian = (value: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return value.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
};

export const toPersianFixed = (value: number, digits: number = 1): string => {
  return toPersian(value.toFixed(digits));
};
