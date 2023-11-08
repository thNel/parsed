export const stringSort = (a: string, b: string) => {
  const numbersFromA = a
    .replace(/\D+/g, ' ')
    .trim()
    .split(' ')
    .map((e) => parseInt(e));
  const numbersFromB = b
    .replace(/\D+/g, ' ')
    .trim()
    .split(' ')
    .map((e) => parseInt(e));

  if (numbersFromA.length !== numbersFromB.length)
    return numbersFromA.length - numbersFromB.length;
  for (let i = 0; i < numbersFromA.length; i++) {
    if (numbersFromA[i] - numbersFromB[i] !== 0) return numbersFromA[i] - numbersFromB[i];
  }
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};