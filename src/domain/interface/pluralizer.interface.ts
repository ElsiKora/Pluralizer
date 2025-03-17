import type { Word } from "../entity/word.entity";

/**
 * Interface defining operations for pluralizing and singularizing words
 */
export interface IPluralizer {
	/**
	 * Checks if a word is in plural form
	 * @param {string} word - The word to check
	 * @returns {boolean} True if the word is plural, false otherwise
	 */
	isPlural(word: string): boolean;

	/**
	 * Checks if a word is in singular form
	 * @param {string} word - The word to check
	 * @returns {boolean} True if the word is singular, false otherwise
	 */
	isSingular(word: string): boolean;

	/**
	 * Pluralizes a word based on count and its properties (language, gender, etc.)
	 * @param {Word} word - The word entity to pluralize
	 * @param {number} [count] - Optional count to determine if plural form is needed
	 * @returns {string} The pluralized form of the word
	 */
	pluralize(word: Word, count?: number): string;

	/**
	 * Converts a word to its plural form
	 * @param {string} word - The word to convert to plural
	 * @returns {string} The pluralized form of the word
	 */
	toPlural(word: string): string;

	/**
	 * Converts a word to its singular form
	 * @param {string} word - The word to convert to singular
	 * @returns {string} The singularized form of the word
	 */
	toSingular(word: string): string;
}
