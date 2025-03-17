import type { EGender } from "../enum/gender.enum";
import type { IWordProperties } from "../interface/word-properties.interface";
import type { TLanguage } from "../type/language.type";

/**
 * Entity representing a word with its properties
 */
export class Word {
	/**
	 * The properties of the word (language, gender, etc.)
	 * @private
	 * @type {IWordProperties}
	 */
	private readonly PROPERTIES: IWordProperties;

	/**
	 * The string value of the word
	 * @private
	 * @type {string}
	 */
	private readonly VALUE: string;

	/**
	 * Creates a new Word instance
	 * @param {string} value - The string value of the word
	 * @param {IWordProperties} properties - The properties of the word
	 */
	constructor(value: string, properties: IWordProperties) {
		this.VALUE = value;
		this.PROPERTIES = properties;
	}

	/**
	 * Gets the grammatical gender of the word
	 * @returns {EGender | undefined} The gender or undefined if not specified
	 */
	getGender(): EGender | undefined {
		return this.PROPERTIES.gender;
	}

	/**
	 * Gets the language of the word
	 * @returns {TLanguage} The language code
	 */
	getLanguage(): TLanguage {
		return this.PROPERTIES.language;
	}

	/**
	 * Gets the string value of the word
	 * @returns {string} The word's string value
	 */
	getValue(): string {
		return this.VALUE;
	}
}
