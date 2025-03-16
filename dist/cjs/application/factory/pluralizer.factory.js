'use strict';

class PluralizerFactory {
    pluralizers;
    constructor() {
        this.pluralizers = new Map();
        // No built-in pluralizers registered by default
        // All pluralizers should be registered explicitly
    }
    /**
     * Registers a new pluralizer for a language
     * @param language The language code
     * @param pluralizer The pluralizer implementation
     */
    registerPluralizer(language, pluralizer) {
        this.pluralizers.set(language, pluralizer);
    }
    createPluralizer(language) {
        const pluralizer = this.pluralizers.get(language);
        if (!pluralizer) {
            throw new Error(`Unsupported language: ${language}`);
        }
        return pluralizer;
    }
    supportsLanguage(language) {
        return this.pluralizers.has(language);
    }
    getSupportedLanguages() {
        return Array.from(this.pluralizers.keys());
    }
}

exports.PluralizerFactory = PluralizerFactory;
