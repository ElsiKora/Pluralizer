import {Gender} from "../../domain/enum/gender.enum";

export interface RussianRule {
  matches: (word: string, gender?: Gender) => boolean;
  apply: (word: string) => string;
}

export const russianPluralRules: RussianRule[] = [
  // Masculine nouns
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Masculine && /[бвгдзлмнпрстфх]$/.test(word),
    apply: (word: string): string => `${word}ы`
  },
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Masculine && /[кгх]$/.test(word),
    apply: (word: string): string => `${word}и`
  },
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Masculine && /[йь]$/.test(word),
    apply: (word: string): string => `${word.slice(0, -1)}и`
  },
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Masculine && /[жшщч]$/.test(word),
    apply: (word: string): string => `${word}и`
  },
  
  // Feminine nouns
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Feminine && /а$/.test(word),
    apply: (word: string): string => {
      const stem = word.slice(0, -1);
      // If the stem ends in ж, ш, щ, ч, г, к, or х, add и
      if (/[жшщчгкх]$/.test(stem)) {
        return `${stem}и`;
      }
      return `${stem}ы`;
    }
  },
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Feminine && /я$/.test(word),
    apply: (word: string): string => `${word.slice(0, -1)}и`
  },
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Feminine && /ь$/.test(word),
    apply: (word: string): string => `${word.slice(0, -1)}и`
  },
  
  // Neuter nouns
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Neuter && /о$/.test(word),
    apply: (word: string): string => `${word.slice(0, -1)}а`
  },
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Neuter && /е$/.test(word),
    apply: (word: string): string => `${word.slice(0, -1)}я`
  },
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Neuter && /мя$/.test(word),
    apply: (word: string): string => `${word.slice(0, -1)}ена`
  }
];

export const russianSingularRules: RussianRule[] = [
  // Masculine plurals to singular
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Masculine && /ы$/.test(word),
    apply: (word: string): string => word.slice(0, -1)
  },
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Masculine && /и$/.test(word),
    apply: (word: string): string => {
      const stem = word.slice(0, -1);
      if (/[жшщч]$/.test(stem)) {
        return stem;
      }
      return `${stem}ь`;
    }
  },
  
  // Feminine plurals to singular
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Feminine && /ы$/.test(word),
    apply: (word: string): string => `${word.slice(0, -1)}а`
  },
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Feminine && /и$/.test(word),
    apply: (word: string): string => {
      const stem = word.slice(0, -1);
      if (/[жшщч]$/.test(stem)) {
        return `${stem}а`;
      }
      return `${stem}я`;
    }
  },
  
  // Neuter plurals to singular
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Neuter && /а$/.test(word),
    apply: (word: string): string => `${word.slice(0, -1)}о`
  },
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Neuter && /я$/.test(word),
    apply: (word: string): string => `${word.slice(0, -1)}е`
  },
  {
    matches: (word: string, gender?: Gender): boolean => 
      gender === Gender.Neuter && /ена$/.test(word),
    apply: (word: string): string => `${word.slice(0, -3)}мя`
  }
];
