import { Pluralizer } from "./presentation/api/pluralizer.api";

/**
 * @file Main entry point for the Pluralizer library
 * @module Pluralizer
 */

/**
 * Factory class for creating pluralizer instances
 */
export { PluralizerFactory } from "./application/factory/pluralizer.factory";

/**
 * Service for detecting language of words
 */
export { LanguageDetector } from "./application/service/language-detector.service";

/**
 * Word entity representing a word with its properties
 */
export { Word } from "./domain/entity/word.entity";

/**
 * Enumeration of grammatical genders
 */
export { EGender } from "./domain/enum/gender.enum";

/**
 * Interface for language detector services
 */
export type { ILanguageDetector } from "./domain/interface/language-detector.interface";

/**
 * Interface for pluralizer factory implementations
 */
export type { IPluralizerFactory } from "./domain/interface/pluralizer-factory.interface";

/**
 * Interface for pluralizer implementations
 */
export type { IPluralizer } from "./domain/interface/pluralizer.interface";

/**
 * Interface for word properties
 */
export type { IWordProperties } from "./domain/interface/word-properties.interface";

/**
 * Type defining supported languages
 */
export type { TLanguage } from "./domain/type/language.type";

/**
 * Main Pluralizer API class
 */
export { Pluralizer } from "./presentation/api/pluralizer.api";

/**
 * Singleton instance of the Pluralizer API
 */
export const pluralizer: Pluralizer = new Pluralizer();
