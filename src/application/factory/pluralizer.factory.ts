import type { IPluralizerFactory } from "../../domain/interface/pluralizer-factory.interface";
import type { IPluralizer } from "../../domain/interface/pluralizer.interface";
import type { TLanguage } from "../../domain/type/language.type";

export class PluralizerFactory implements IPluralizerFactory {
	private readonly PLURALIZERS: Map<TLanguage, IPluralizer>;

	constructor() {
		this.PLURALIZERS = new Map<TLanguage, IPluralizer>();
	}

	createPluralizer(language: TLanguage): IPluralizer {
		const pluralizer: IPluralizer | undefined = this.PLURALIZERS.get(language);

		if (!pluralizer) {
			throw new Error(`Unsupported language: ${language}`);
		}

		return pluralizer;
	}

	getSupportedLanguages(): Array<TLanguage> {
		return [...this.PLURALIZERS.keys()] as Array<TLanguage>;
	}

	/**
	 * Registers a new pluralizer for a language
	 * @param {TLanguage} language The language code
	 * @param {IPluralizer} pluralizer The pluralizer implementation
	 * @returns {void}
	 */
	registerPluralizer(language: TLanguage, pluralizer: IPluralizer): void {
		this.PLURALIZERS.set(language, pluralizer);
	}

	supportsLanguage(language: TLanguage): boolean {
		return this.PLURALIZERS.has(language);
	}
}
