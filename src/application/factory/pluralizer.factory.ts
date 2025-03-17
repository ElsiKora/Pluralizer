import type { IPluralizerFactory } from "../../domain/interface/pluralizer-factory.interface";
import type { IPluralizer } from "../../domain/interface/pluralizer.interface";
import type { TLanguage } from "../../domain/type/language.type";

/**
 * Factory responsible for creating pluralizer instances based on language
 * @implements {IPluralizerFactory}
 */
export class PluralizerFactory implements IPluralizerFactory {
	/**
	 * Map storing pluralizer implementations by language code
	 * @private
	 * @type {Map<TLanguage, IPluralizer>}
	 */
	private readonly PLURALIZERS: Map<TLanguage, IPluralizer>;

	/**
	 * Creates a new instance of the pluralizer factory
	 */
	constructor() {
		this.PLURALIZERS = new Map<TLanguage, IPluralizer>();
	}

	/**
	 * Creates a pluralizer for the specified language
	 * @param {TLanguage} language - The language code to create a pluralizer for
	 * @returns {IPluralizer} The pluralizer instance for the specified language
	 * @throws {Error} If the language is not supported
	 */
	createPluralizer(language: TLanguage): IPluralizer {
		const pluralizer: IPluralizer | undefined = this.PLURALIZERS.get(language);

		if (!pluralizer) {
			throw new Error(`Unsupported language: ${language}`);
		}

		return pluralizer;
	}

	/**
	 * Gets a list of all supported language codes
	 * @returns {Array<TLanguage>} Array of supported language codes
	 */
	getSupportedLanguages(): Array<TLanguage> {
		return [...this.PLURALIZERS.keys()] as Array<TLanguage>;
	}

	/**
	 * Registers a new pluralizer for a language
	 * @param {TLanguage} language - The language code
	 * @param {IPluralizer} pluralizer - The pluralizer implementation
	 * @returns {void}
	 */
	registerPluralizer(language: TLanguage, pluralizer: IPluralizer): void {
		this.PLURALIZERS.set(language, pluralizer);
	}

	/**
	 * Checks if a language is supported
	 * @param {TLanguage} language - The language code to check
	 * @returns {boolean} True if the language is supported, false otherwise
	 */
	supportsLanguage(language: TLanguage): boolean {
		return this.PLURALIZERS.has(language);
	}
}
