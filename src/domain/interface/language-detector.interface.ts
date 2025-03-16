import {Language} from "../type/language.type";

export interface ILanguageDetector {
  /**
   * Detects the language of a given text
   * @param text The text to analyze
   * @returns The detected language code
   */
  detectLanguage(text: string): Language;
  
  /**
   * Adds a language pattern to the detector
   * @param language The language code
   * @param pattern The regex pattern that identifies the language
   */
  addLanguagePattern(language: Language, pattern: RegExp): void;
}
