'use strict';

var gender_enum = require('../../domain/enum/gender.enum.js');
var russianExceptions_service = require('../../infrastructure/exception/russian-exceptions.service.js');
var russianRules_service = require('../../infrastructure/rule/russian-rules.service.js');

class RussianPluralizer {
    pluralize(word, count = 2) {
        const value = word.getValue();
        // Check if word is Russian
        if (word.getLanguage() !== 'ru') {
            throw new Error('RussianPluralizer can only pluralize Russian words');
        }
        // Russian has different forms for different counts
        // 1 - singular form
        // 2-4 - genitive singular form
        // 5+ - genitive plural form
        if (count === 1) {
            return value;
        }
        // For simplicity, we only support basic pluralization here
        // A complete implementation would handle the 2-4 case differently
        return this.toPlural(value, word.getGender());
    }
    isPlural(word) {
        // Check if word is uncountable (inherently plural in Russian)
        if (russianExceptions_service.russianUncountableWords.includes(word.toLowerCase())) {
            return true;
        }
        const lowerWord = word.toLowerCase();
        // Check if word is an irregular plural
        if (Object.values(russianExceptions_service.russianIrregularSingulars).includes(lowerWord)) {
            return false;
        }
        if (Object.keys(russianExceptions_service.russianIrregularSingulars).includes(lowerWord)) {
            return true;
        }
        // For simplicity, we check common plural endings
        // This is not 100% accurate for all cases
        return /[ыи]$/.test(lowerWord);
    }
    isSingular(word) {
        // Check if word is uncountable (inherently plural in Russian)
        if (russianExceptions_service.russianUncountableWords.includes(word.toLowerCase())) {
            return false;
        }
        // Not plural usually means singular
        return !this.isPlural(word);
    }
    toPlural(word, gender) {
        const lowerWord = word.toLowerCase();
        // Check if word is uncountable (already plural in Russian)
        if (russianExceptions_service.russianUncountableWords.includes(lowerWord)) {
            return word;
        }
        // Check if word is already plural
        if (this.isPlural(lowerWord)) {
            return word;
        }
        // Check irregular forms
        if (russianExceptions_service.russianIrregularPlurals[lowerWord]) {
            // Preserve original capitalization
            const irregular = russianExceptions_service.russianIrregularPlurals[lowerWord].plural;
            return this.preserveCase(word, irregular);
        }
        // Apply regular rules if gender is provided
        if (gender) {
            for (const rule of russianRules_service.russianPluralRules) {
                if (rule.matches(lowerWord, gender)) {
                    return this.preserveCase(word, rule.apply(lowerWord));
                }
            }
        }
        else {
            // Without gender, we have to make an educated guess
            // Try masculine rules first, then feminine, then neuter
            const genders = [gender_enum.Gender.Masculine, gender_enum.Gender.Feminine, gender_enum.Gender.Neuter];
            for (const testGender of genders) {
                for (const rule of russianRules_service.russianPluralRules) {
                    if (rule.matches(lowerWord, testGender)) {
                        return this.preserveCase(word, rule.apply(lowerWord));
                    }
                }
            }
        }
        // If no rules match, return the original
        return word;
    }
    toSingular(word) {
        const lowerWord = word.toLowerCase();
        // Check if word is uncountable (always plural in Russian)
        if (russianExceptions_service.russianUncountableWords.includes(lowerWord)) {
            return word;
        }
        // Check if word is already singular
        if (this.isSingular(lowerWord)) {
            return word;
        }
        // Check irregular forms
        if (russianExceptions_service.russianIrregularSingulars[lowerWord]) {
            // Preserve original capitalization
            const irregular = russianExceptions_service.russianIrregularSingulars[lowerWord];
            return this.preserveCase(word, irregular);
        }
        // Apply regular rules - for Russian, we need to guess the gender
        // Try each gender with its rules
        const genders = [gender_enum.Gender.Masculine, gender_enum.Gender.Feminine, gender_enum.Gender.Neuter];
        for (const gender of genders) {
            for (const rule of russianRules_service.russianSingularRules) {
                if (rule.matches(lowerWord, gender)) {
                    return this.preserveCase(word, rule.apply(lowerWord));
                }
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

exports.RussianPluralizer = RussianPluralizer;
