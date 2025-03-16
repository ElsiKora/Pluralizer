
import {Language} from "../../domain/type/language.type";
import {Gender} from "../../domain/enum/gender.enum";
import {PluralizerFactory} from "../../application/factory/pluralizer.factory";
import {IPluralizerFactory} from "../../domain/interface/pluralizer-factory.interface";
import {ILanguageDetector} from "../../domain/interface/language-detector.interface";
import {LanguageDetector} from "../../application/service/language-detector.service";
import {EnglishPluralizer} from "../../application/service/english-pluralizer.service";
import {RussianPluralizer} from "../../application/service/russian-pluralizer.service";
import {SpanishPluralizer} from "../../application/service/spanish-pluralizer.service";
import {Word} from "../../domain/entity/word.entity";

export class Pluralizer {
  private readonly pluralizerFactory: IPluralizerFactory;
  private readonly languageDetector: ILanguageDetector;

  constructor() {
    this.pluralizerFactory = new PluralizerFactory();
    this.languageDetector = new LanguageDetector();
    
    // Register all supported pluralizers
    (this.pluralizerFactory as PluralizerFactory).registerPluralizer('en', new EnglishPluralizer());
    (this.pluralizerFactory as PluralizerFactory).registerPluralizer('ru', new RussianPluralizer());
    (this.pluralizerFactory as PluralizerFactory).registerPluralizer('es', new SpanishPluralizer());
  }

  pluralize(word: string, options?: { 
    language?: Language;
    count?: number;
    gender?: Gender;
  }): string {
    const {
      language = this.languageDetector.detectLanguage(word),
      count = 2,
      gender
    } = options || {};

    // If count is 1, return singular form (this is common for all languages)
    if (count === 1) {
      return word;
    }
    
    // Create a word entity with the detected or specified language
    const wordEntity = new Word(word, { language, gender });
    
    // Use the factory to get the appropriate pluralizer
    return this.pluralizerFactory.createPluralizer(language).pluralize(wordEntity, count);
  }

  isPlural(word: string, language?: Language): boolean {
    const detectedLanguage = language || this.languageDetector.detectLanguage(word);
    return this.pluralizerFactory.createPluralizer(detectedLanguage).isPlural(word);
  }

  isSingular(word: string, language?: Language): boolean {
    const detectedLanguage = language || this.languageDetector.detectLanguage(word);
    return this.pluralizerFactory.createPluralizer(detectedLanguage).isSingular(word);
  }

  toPlural(word: string, options?: {
    language?: Language;
    gender?: Gender;
  }): string {
    const {
      language = this.languageDetector.detectLanguage(word),
      gender
    } = options || {};

    // For languages that require gender, we need to handle them specially
    if (gender) {
      // Create a word entity with the detected or specified language and gender
      const wordEntity = new Word(word, { language, gender });
      return this.pluralizerFactory.createPluralizer(language).pluralize(wordEntity);
    }

    return this.pluralizerFactory.createPluralizer(language).toPlural(word);
  }

  toSingular(word: string, language?: Language): string {
    const detectedLanguage = language || this.languageDetector.detectLanguage(word);
    return this.pluralizerFactory.createPluralizer(detectedLanguage).toSingular(word);
  }
  
  /**
   * Gets a list of all supported languages
   * @returns Array of supported language codes
   */
  getSupportedLanguages(): Language[] {
    return this.pluralizerFactory.getSupportedLanguages();
  }
  
  /**
   * Checks if a language is supported
   * @param language The language code to check
   * @returns True if the language is supported, false otherwise
   */
  supportsLanguage(language: Language): boolean {
    return this.pluralizerFactory.supportsLanguage(language);
  }
}
