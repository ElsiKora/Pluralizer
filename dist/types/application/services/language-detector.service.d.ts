import { Language } from '../../domain/entities/word.entity';
import { ILanguageDetector } from '../../domain/interfaces/language-detector.interface';
export declare class LanguageDetector implements ILanguageDetector {
    private languagePatterns;
    private defaultLanguage;
    constructor(defaultLanguage?: Language);
    addLanguagePattern(language: Language, pattern: RegExp): void;
    detectLanguage(text: string): Language;
    /**
     * Sets the default language to use when no pattern matches
     * @param language The language code to use as default
     */
    setDefaultLanguage(language: Language): void;
    /**
     * Gets the current default language
     * @returns The default language code
     */
    getDefaultLanguage(): Language;
}
