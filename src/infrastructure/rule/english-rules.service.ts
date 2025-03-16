export interface EnglishRule {
  matches: (word: string) => boolean;
  apply: (word: string) => string;
}

export const englishPluralRules: EnglishRule[] = [
  // Rule for words ending in is (analysis -> analyses, thesis -> theses, crisis -> crises)
  {
    matches: (word: string): boolean => /is$/.test(word),
    apply: (word: string): string => `${word.slice(0, -2)}es`
  },
  {
    matches: (word: string): boolean => /[^aeiou]s$|[^aeiou]x$|[^aeiou]z$|[cs]h$/.test(word),
    apply: (word: string): string => `${word}es`
  },
  {
    matches: (word: string): boolean => /[aeiou]y$/.test(word),
    apply: (word: string): string => `${word}s`
  },
  {
    matches: (word: string): boolean => /[^aeiou]y$/.test(word),
    apply: (word: string): string => `${word.slice(0, -1)}ies`
  },
  {
    matches: (word: string): boolean => /f$/.test(word),
    apply: (word: string): string => `${word.slice(0, -1)}ves`
  },
  {
    matches: (word: string): boolean => /fe$/.test(word),
    apply: (word: string): string => `${word.slice(0, -2)}ves`
  },
  {
    matches: (word: string): boolean => /o$/.test(word),
    apply: (word: string): string => `${word}es`
  },
  {
    matches: (word: string): boolean => /[^sxzcs]$/.test(word),
    apply: (word: string): string => `${word}s`
  }
];

export const englishSingularRules: EnglishRule[] = [
  // Rule for words ending in es (wolves -> wolf, boxes -> box, analyses -> analysis)
  {
    matches: (word: string): boolean => /ses$/.test(word) && word.length > 3,
    apply: (word: string): string => `${word.slice(0, -2)}`
  },
  {
    matches: (word: string): boolean => /ies$/.test(word) && word.length > 3,
    apply: (word: string): string => `${word.slice(0, -3)}y`
  },
  {
    matches: (word: string): boolean => /ves$/.test(word) && word.length > 3,
    apply: (word: string): string => {
      const stem = word.slice(0, -3);
      return /[^aeiouf]$/.test(stem) ? `${stem}fe` : `${stem}f`;
    }
  },
  {
    matches: (word: string): boolean => /es$/.test(word) && word.length > 2,
    apply: (word: string): string => {
      if (/[sxz]es$|[cs]hes$/.test(word)) {
        return word.slice(0, -2);
      }
      if (/oes$/.test(word)) {
        return word.slice(0, -2);
      }
      return word.slice(0, -1);
    }
  },
  {
    matches: (word: string): boolean => /s$/.test(word) && word.length > 1,
    apply: (word: string): string => word.slice(0, -1)
  }
];
