import { Word } from '../../domain/entities/word.entity.js';
import { EnglishPluralizer } from '../../application/services/english-pluralizer.service.js';
import { RussianPluralizer } from '../../application/services/russian-pluralizer.service.js';

class Pluralizer {
    englishPluralizer;
    russianPluralizer;
    constructor() {
        this.englishPluralizer = new EnglishPluralizer();
        this.russianPluralizer = new RussianPluralizer();
    }
    pluralize(word, options) {
        const { language = this.detectLanguage(word), count = 2, gender } = options || {};
        // Special handling for Russian words
        if (language === 'ru') {
            // If count is 1, return singular form
            if (count === 1) {
                return word;
            }
            // For Russian words, we need gender to properly pluralize
            if (gender) {
                return this.russianPluralizer.toPlural(word, gender);
            }
        }
        const wordEntity = new Word(word, { language, gender });
        return this.getPluralizerForLanguage(language).pluralize(wordEntity, count);
    }
    isPlural(word, language) {
        const detectedLanguage = language || this.detectLanguage(word);
        return this.getPluralizerForLanguage(detectedLanguage).isPlural(word);
    }
    isSingular(word, language) {
        const detectedLanguage = language || this.detectLanguage(word);
        return this.getPluralizerForLanguage(detectedLanguage).isSingular(word);
    }
    toPlural(word, options) {
        const { language = this.detectLanguage(word), gender } = options || {};
        if (language === 'ru' && gender) {
            return this.russianPluralizer.toPlural(word, gender);
        }
        return this.getPluralizerForLanguage(language).toPlural(word);
    }
    toSingular(word, language) {
        const detectedLanguage = language || this.detectLanguage(word);
        return this.getPluralizerForLanguage(detectedLanguage).toSingular(word);
    }
    getPluralizerForLanguage(language) {
        switch (language) {
            case 'en':
                return this.englishPluralizer;
            case 'ru':
                return this.russianPluralizer;
            default:
                throw new Error(`Unsupported language: ${language}`);
        }
    }
    detectLanguage(word) {
        // Very basic language detection - this should be improved for production use
        // Check if the word contains Cyrillic characters
        if (/[а-яА-ЯёЁ]/.test(word)) {
            return 'ru';
        }
        // Default to English
        return 'en';
    }
}

export { Pluralizer };
