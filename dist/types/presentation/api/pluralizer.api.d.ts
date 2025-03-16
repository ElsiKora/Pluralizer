import { Language } from "../../domain/type/language.type";
import { Gender } from "../../domain/enum/gender.enum";
export declare class Pluralizer {
    private readonly pluralizerFactory;
    private readonly languageDetector;
    constructor();
    pluralize(word: string, options?: {
        language?: Language;
        count?: number;
        gender?: Gender;
    }): string;
    isPlural(word: string, language?: Language): boolean;
    isSingular(word: string, language?: Language): boolean;
    toPlural(word: string, options?: {
        language?: Language;
        gender?: Gender;
    }): string;
    toSingular(word: string, language?: Language): string;
    /**
     * Gets a list of all supported languages
     * @returns Array of supported language codes
     */
    getSupportedLanguages(): Language[];
    /**
     * Checks if a language is supported
     * @param language The language code to check
     * @returns True if the language is supported, false otherwise
     */
    supportsLanguage(language: Language): boolean;
}
