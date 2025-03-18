import { useDataStore } from 'stores/data/dataStore';

const letterToNumberMap = {
  a: '@',
  A: '@',
  e: '3',
  E: '3',
  i: '!',
  I: '!',
  o: '0',
  O: '0',
  s: '$',
  S: '$',
  t: '7',
  T: '7',
  b: '8',
  B: '8',
  g: '9',
  G: '9',
  z: '2',
  Z: '2',
  l: '1',
  L: '1',

  а: '@',
  А: '@',
  е: '3',
  Е: '3',
  ё: '3',
  Ё: '3',
  з: '3',
  З: '3',
  о: '0',
  О: '0',
  с: '$',
  С: '$',
  т: '7',
  Т: '7',
  в: '8',
  В: '8',
  ч: '4',
  Ч: '4',
  я: '9',
  Я: '9',
  и: '!',
  И: '!',
  д: '9',
  Д: '9',
  б: '6',
  Б: '6',
  г: '9',
  Г: '9',
  ш: '6',
  Ш: '6',
  л: '1',
  Л: '1',
  щ: '6',
  Щ: '6',
  э: '3',
  Э: '3',
  ю: '10',
  Ю: '10',
  ь: '6',
  Ь: '6',
  ъ: '6',
  Ъ: '6',
};

export const replaceLettersWithNumbers = (text: string): string => {
  const data = useDataStore();

  if (!data.isSaved) return text;

  let counts = 0;
  let maxCounts = 10;

  if (text.length <= 10) {
    maxCounts = 3;
  }

  if (text.length <= 6) {
    maxCounts = 2;
  }

  if (text.length <= 4) {
    maxCounts = 1;
  }

  return text
    .split('')
    .map((char) => {
      if (counts >= maxCounts) return char;

      const letter = letterToNumberMap[char as keyof typeof letterToNumberMap];

      if (letter === void 0) return char;

      counts++;

      return letter;
    })
    .join('');
};
