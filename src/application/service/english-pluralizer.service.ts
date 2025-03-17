import type { Word } from "../../domain/entity/word.entity";
import type { IPluralizer } from "../../domain/interface/pluralizer.interface";
import type { IRule } from "../../infrastructure/interface/rule.interface";

import { englishFalsePluralWords, englishIrregularPlurals, englishIrregularSingulars, englishUncountableWords } from "../../infrastructure/exception/english-exceptions.service";
import { englishPluralRules, englishSingularRules } from "../../infrastructure/rule/english-rules.service";
import { CasePreserver } from "../../infrastructure/utility/case-preserver.utility";

/**
 * English language implementation of the pluralizer
 * @implements {IPluralizer}
 */
export class EnglishPluralizer implements IPluralizer {
	/**
	 * Determines if a word is in plural form
	 * @param {string} word - The word to check
	 * @returns {boolean} True if the word is plural, false otherwise
	 */
	isPlural(word: string): boolean {
		const lowerWord: string = word.toLowerCase();

		// Uncountable words are neither singular nor plural
		if (englishUncountableWords.includes(lowerWord)) {
			return false;
		}

		// False plurals are not actually plural despite looking like it
		if (englishFalsePluralWords.includes(lowerWord)) {
			return false;
		}

		// If it's in our irregular plurals list, it's plural
		if (Object.values(englishIrregularPlurals).includes(lowerWord)) {
			return true;
		}

		// If it matches any of our singularization rules, it's likely plural
		return englishSingularRules.some((rule: IRule) => rule.matches(lowerWord));
	}

	/**
	 * Determines if a word is in singular form
	 * @param {string} word - The word to check
	 * @returns {boolean} True if the word is singular, false otherwise
	 */
	isSingular(word: string): boolean {
		const lowerWord: string = word.toLowerCase();

		// Uncountable words can be considered singular
		if (englishUncountableWords.includes(lowerWord)) {
			return true;
		}

		// If it's in our irregular singulars list, it's singular
		if (Object.keys(englishIrregularPlurals).includes(lowerWord)) {
			return true;
		}

		// If it's not plural, it's likely singular
		return !this.isPlural(lowerWord);
	}

	/**
	 * Pluralizes a word based on a count
	 * @param {Word} word - The Word object to pluralize
	 * @param {number} count - The count to determine if pluralization is needed
	 * @returns {string} The pluralized word or original if count is 1
	 */
	// eslint-disable-next-line @elsikora/typescript/no-magic-numbers
	pluralize(word: Word, count: number = 2): string {
		const value: string = word.getValue();

		// Check if word is English
		if (word.getLanguage() !== "en") {
			throw new Error("EnglishPluralizerService can only pluralize English words");
		}

		// If count is 1, return singular form
		if (count === 1) {
			return value;
		}

		return this.toPlural(value);
	}

	/**
	 * Converts a word to its plural form
	 * @param {string} word - The word to convert to plural
	 * @returns {string} The plural form of the word
	 */
	toPlural(word: string): string {
		const lowerWord: string = word.toLowerCase();

		// Check if word is uncountable
		if (englishUncountableWords.includes(lowerWord)) {
			return word;
		}

		// Check if word is already plural
		if (this.isPlural(lowerWord)) {
			return word;
		}

		// Check for irregular forms
		if (englishIrregularPlurals[lowerWord]) {
			return CasePreserver.preserveCase(word, englishIrregularPlurals[lowerWord]);
		}

		// Apply regular rules
		for (const rule of englishPluralRules) {
			if (rule.matches(lowerWord)) {
				return CasePreserver.preserveCase(word, rule.apply(lowerWord));
			}
		}

		// If no rules match (unlikely), add 's'
		return `${word}s`;
	}

	/**
	 * Converts a word to its singular form
	 * @param {string} word - The word to convert to singular
	 * @returns {string} The singular form of the word
	 */
	toSingular(word: string): string {
		const lowerWord: string = word.toLowerCase();

		// Check if word is uncountable
		if (englishUncountableWords.includes(lowerWord)) {
			return word;
		}

		// Check if word is already singular
		if (this.isSingular(lowerWord)) {
			return word;
		}

		// Check for irregular forms
		if (englishIrregularSingulars[lowerWord]) {
			return CasePreserver.preserveCase(word, englishIrregularSingulars[lowerWord]);
		}

		// Apply regular rules
		for (const rule of englishSingularRules) {
			if (rule.matches(lowerWord)) {
				return CasePreserver.preserveCase(word, rule.apply(lowerWord));
			}
		}

		// If no rules match, return the original
		return word;
	}
}
