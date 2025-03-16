import { spanishFalsePluralWords, spanishIrregularPlurals, spanishIrregularSingulars, spanishUncountableWords } from "../../infrastructure/exception/spanish-exceptions.service";
import { spanishPluralRules, spanishSingularRules } from "../../infrastructure/rule/spanish-rules.service";
export class SpanishPluralizer {
    pluralize(word, count = 2) {
        const value = word.getValue();
        // Check if word is Spanish
        if (word.getLanguage() !== 'es') {
            throw new Error('SpanishPluralizer can only pluralize Spanish words');
        }
        // If count is 1, return singular form
        if (count === 1) {
            return value;
        }
        return this.toPlural(value, word.getGender());
    }
    isPlural(word) {
        const lowerWord = word.toLowerCase();
        // Check if word is a false plural (looks plural but is singular)
        if (spanishFalsePluralWords.includes(lowerWord)) {
            return false;
        }
        // Handle invariable words (same form in singular and plural)
        // For invariable words, we need to check if they're in the irregular plurals map
        // with the same singular and plural form
        for (const [singular, plural] of Object.entries(spanishIrregularPlurals)) {
            if (singular === plural && lowerWord === singular) {
                return false;
            }
        }
        // Check if word is an irregular plural (where plural differs from singular)
        if (Object.values(spanishIrregularPlurals).includes(lowerWord) &&
            !Object.keys(spanishIrregularPlurals).includes(lowerWord)) {
            return true;
        }
        // For words ending in -s or -es that are not singular invariable words
        if ((lowerWord.endsWith('s') || lowerWord.endsWith('es')) &&
            !spanishFalsePluralWords.includes(lowerWord)) {
            // Special case for words ending in -is (like crisis, tesis)
            if (lowerWord.endsWith('is') && spanishUncountableWords.includes(lowerWord)) {
                return false;
            }
            return true;
        }
        return false;
    }
    isSingular(word) {
        // Words that end in -s but are singular
        if (spanishFalsePluralWords.includes(word.toLowerCase())) {
            return true;
        }
        const lowerWord = word.toLowerCase();
        // Check if word is an irregular singular
        if (Object.keys(spanishIrregularPlurals).includes(lowerWord)) {
            return true;
        }
        // Not plural usually means singular
        return !this.isPlural(lowerWord);
    }
    toPlural(word, gender) {
        const lowerWord = word.toLowerCase();
        // Check if word is uncountable (already plural in Spanish)
        if (spanishUncountableWords.includes(lowerWord) &&
            (lowerWord.endsWith('es') || lowerWord.endsWith('s'))) {
            return word;
        }
        // Check if word is already plural
        if (this.isPlural(lowerWord)) {
            return word;
        }
        // Check irregular forms
        if (spanishIrregularPlurals[lowerWord]) {
            // Preserve original capitalization
            const irregular = spanishIrregularPlurals[lowerWord];
            return this.preserveCase(word, irregular);
        }
        // Apply regular rules
        for (const rule of spanishPluralRules) {
            if (rule.matches(lowerWord, gender)) {
                return this.preserveCase(word, rule.apply(lowerWord));
            }
        }
        // If no rules match (unlikely), add 's'
        return `${word}s`;
    }
    toSingular(word) {
        const lowerWord = word.toLowerCase();
        // Check if word is already singular
        if (this.isSingular(lowerWord) || spanishFalsePluralWords.includes(lowerWord)) {
            return word;
        }
        // Check irregular forms
        if (spanishIrregularSingulars[lowerWord]) {
            // Preserve original capitalization
            const irregular = spanishIrregularSingulars[lowerWord];
            return this.preserveCase(word, irregular);
        }
        // Apply regular rules
        for (const rule of spanishSingularRules) {
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
