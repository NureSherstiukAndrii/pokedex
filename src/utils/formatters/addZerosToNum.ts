export const addZerosToNum = (num: number): string => {
  const convertedNumber = num.toString();

  if (convertedNumber.length >= 3) {
    return convertedNumber;
  }

  return convertedNumber.padStart(3, "0");
};
