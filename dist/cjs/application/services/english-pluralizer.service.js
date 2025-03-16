'use strict';

var englishExceptions_service = require('../../infrastructure/exceptions/english-exceptions.service.js');
var englishRules_service = require('../../infrastructure/rules/english-rules.service.js');

class EnglishPluralizer {
    pluralize(word, count = 2) {
        const value = word.getValue();
        // If count is 1, return singular form
        if (count === 1) {
            return value;
        }
        // Check if word is English
        if (word.getLanguage() !== 'en') {
            throw new Error('EnglishPluralizer can only pluralize English words');
        }
        return this.toPlural(value);
    }
    isPlural(word) {
        if (englishExceptions_service.englishUncountableWords.includes(word.toLowerCase())) {
            return false;
        }
        const lowerWord = word.toLowerCase();
        // Check if word is a false plural
        if (englishExceptions_service.englishFalsePluralWords.includes(lowerWord)) {
            return false;
        }
        // Check if word is an irregular plural
        if (Object.values(englishExceptions_service.englishIrregularPlurals).includes(lowerWord)) {
            return true;
        }
        // Apply rules to check if it's a plural form
        return englishRules_service.englishSingularRules.some(rule => rule.matches(lowerWord));
    }
    isSingular(word) {
        if (englishExceptions_service.englishUncountableWords.includes(word.toLowerCase())) {
            return true;
        }
        const lowerWord = word.toLowerCase();
        // Check if word is an irregular singular
        if (Object.keys(englishExceptions_service.englishIrregularPlurals).includes(lowerWord)) {
            return true;
        }
        // Not plural usually means singular
        return !this.isPlural(lowerWord);
    }
    toPlural(word) {
        const lowerWord = word.toLowerCase();
        // Check if word is uncountable (same in singular and plural)
        if (englishExceptions_service.englishUncountableWords.includes(lowerWord)) {
            return word;
        }
        // Check if word is already plural
        if (this.isPlural(lowerWord)) {
            return word;
        }
        // Check irregular forms
        if (englishExceptions_service.englishIrregularPlurals[lowerWord]) {
            // Preserve original capitalization
            const irregular = englishExceptions_service.englishIrregularPlurals[lowerWord];
            return this.preserveCase(word, irregular);
        }
        // Apply regular rules
        for (const rule of englishRules_service.englishPluralRules) {
            if (rule.matches(lowerWord)) {
                return this.preserveCase(word, rule.apply(lowerWord));
            }
        }
        // If no rules match (unlikely), add 's'
        return `${word}s`;
    }
    toSingular(word) {
        const lowerWord = word.toLowerCase();
        // Check if word is uncountable (same in singular and plural)
        if (englishExceptions_service.englishUncountableWords.includes(lowerWord)) {
            return word;
        }
        // Check if word is already singular
        if (this.isSingular(lowerWord)) {
            return word;
        }
        // Check irregular forms
        if (englishExceptions_service.englishIrregularSingulars[lowerWord]) {
            // Preserve original capitalization
            const irregular = englishExceptions_service.englishIrregularSingulars[lowerWord];
            return this.preserveCase(word, irregular);
        }
        // Apply regular rules
        for (const rule of englishRules_service.englishSingularRules) {
            if (rule.matches(lowerWord)) {
                return this.preserveCase(word, rule.apply(lowerWord));
            }
        }
        // If no rules match, return the original
        return word;
    }
    preserveCase(original, modified) {
        // If original is all uppercase
        if (original === original.toUpperCase()) {
            return modified.toUpperCase();
        }
        // If original is capitalized
        if (original[0] === original[0].toUpperCase()) {
            return modified.charAt(0).toUpperCase() + modified.slice(1);
        }
        // Otherwise, use lowercase
        return modified.toLowerCase();
    }
}

exports.EnglishPluralizer = EnglishPluralizer;
