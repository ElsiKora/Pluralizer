import { Gender, Language, Word } from '../../domain/entities/word.entity';
import { IPluralizer } from '../../domain/interfaces/pluralizer.interface';
import { EnglishPluralizer } from '../../application/services/english-pluralizer.service';
import { RussianPluralizer } from '../../application/services/russian-pluralizer.service';

export class Pluralizer {
  private readonly englishPluralizer: IPluralizer;
  private readonly russianPluralizer: IPluralizer;

  constructor() {
    this.englishPluralizer = new EnglishPluralizer();
    this.russianPluralizer = new RussianPluralizer();
  }

  pluralize(word: string, options?: { 
    language?: Language;
    count?: number;
    gender?: Gender;
  }): string {
    const {
      language = this.detectLanguage(word),
      count = 2,
      gender
    } = options || {};

    // Special handling for Russian words
    if (language === 'ru') {
      // If count is 1, return singular form
      if (count === 1) {
        return word;
      }
      
      // For Russian words, we need gender to properly pluralize
      if (gender) {
        return (this.russianPluralizer as RussianPluralizer).toPlural(word, gender);
      }
    }

    const wordEntity = new Word(word, { language, gender });
    return this.getPluralizerForLanguage(language).pluralize(wordEntity, count);
  }

  isPlural(word: string, language?: Language): boolean {
    const detectedLanguage = language || this.detectLanguage(word);
    return this.getPluralizerForLanguage(detectedLanguage).isPlural(word);
  }

  isSingular(word: string, language?: Language): boolean {
    const detectedLanguage = language || this.detectLanguage(word);
    return this.getPluralizerForLanguage(detectedLanguage).isSingular(word);
  }

  toPlural(word: string, options?: {
    language?: Language;
    gender?: Gender;
  }): string {
    const {
      language = this.detectLanguage(word),
      gender
    } = options || {};

    if (language === 'ru' && gender) {
      return (this.russianPluralizer as RussianPluralizer).toPlural(word, gender);
    }

    return this.getPluralizerForLanguage(language).toPlural(word);
  }

  toSingular(word: string, language?: Language): string {
    const detectedLanguage = language || this.detectLanguage(word);
    return this.getPluralizerForLanguage(detectedLanguage).toSingular(word);
  }

  private getPluralizerForLanguage(language: Language): IPluralizer {
    switch (language) {
      case 'en':
        return this.englishPluralizer;
      case 'ru':
        return this.russianPluralizer;
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  }

  private detectLanguage(word: string): Language {
    // Very basic language detection - this should be improved for production use
    // Check if the word contains Cyrillic characters
    if (/[а-яА-ЯёЁ]/.test(word)) {
      return 'ru';
    }
    
    // Default to English
    return 'en';
  }
}
