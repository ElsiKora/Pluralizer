'use strict';

class LanguageDetector {
    languagePatterns;
    defaultLanguage;
    constructor(defaultLanguage = 'en') {
        this.languagePatterns = new Map();
        this.defaultLanguage = defaultLanguage;
        // Register default patterns
        this.addLanguagePattern('ru', /[а-яА-ЯёЁ]/); // Cyrillic characters for Russian
        this.addLanguagePattern('es', /[áéíóúüñ¿¡]/i); // Spanish-specific characters
        // English is the default language, so no pattern needed
    }
    addLanguagePattern(language, pattern) {
        this.languagePatterns.set(language, pattern);
    }
    detectLanguage(text) {
        // If text is empty, return default language
        if (!text) {
            return this.defaultLanguage;
        }
        // Check each language pattern
        for (const [language, pattern] of this.languagePatterns.entries()) {
            if (pattern.test(text)) {
                return language;
            }
        }
        // If no pattern matches, return default language
        return this.defaultLanguage;
    }
    /**
     * Sets the default language to use when no pattern matches
     * @param language The language code to use as default
     */
    setDefaultLanguage(language) {
        this.defaultLanguage = language;
    }
    /**
     * Gets the current default language
     * @returns The default language code
     */
    getDefaultLanguage() {
        return this.defaultLanguage;
    }
}

exports.LanguageDetector = LanguageDetector;
