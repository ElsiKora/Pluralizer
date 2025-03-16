import { IPluralizer } from './pluralizer.interface';
import { Language } from "../type/language.type";
export interface IPluralizerFactory {
    /**
     * Creates a pluralizer instance for the specified language
     * @param language The language code
     * @returns A pluralizer instance for the specified language
     * @throws Error if the language is not supported
     */
    createPluralizer(language: Language): IPluralizer;
    /**
     * Checks if a language is supported by the factory
     * @param language The language code to check
     * @returns True if the language is supported, false otherwise
     */
    supportsLanguage(language: Language): boolean;
    /**
     * Gets all supported languages
     * @returns Array of supported language codes
     */
    getSupportedLanguages(): Language[];
}
