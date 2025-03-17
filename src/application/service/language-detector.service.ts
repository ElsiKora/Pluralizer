import type { ILanguageDetector } from "../../domain/interface/language-detector.interface";
import type { TLanguage } from "../../domain/type/language.type";

export class LanguageDetector implements ILanguageDetector {
	private defaultLanguage: TLanguage;

	private readonly LANGUAGE_PATTERNS: Map<TLanguage, RegExp>;

	constructor(defaultLanguage: TLanguage = "en") {
		this.LANGUAGE_PATTERNS = new Map<TLanguage, RegExp>();
		this.defaultLanguage = defaultLanguage;

		// Register default patterns
		// eslint-disable-next-line regexp/no-obscure-range
		this.addLanguagePattern("ru", /[а-яА-ЯёЁ]/); // Cyrillic characters for Russian
		this.addLanguagePattern("es", /[áéíóúüñ¿¡]/i); // Spanish-specific characters
		// English is the default language, so no pattern needed
	}

	addLanguagePattern(language: TLanguage, pattern: RegExp): void {
		this.LANGUAGE_PATTERNS.set(language, pattern);
	}

	detectLanguage(text: string): TLanguage {
		// If text is empty, return default language
		if (!text) {
			return this.defaultLanguage;
		}

		// Check each language pattern
		for (const [language, pattern] of this.LANGUAGE_PATTERNS.entries()) {
			if (pattern.test(text)) {
				return language;
			}
		}

		// If no pattern matches, return default language
		return this.defaultLanguage;
	}

	/**
	 * Gets the current default language
	 * @returns {TLanguage} The default language code
	 */
	getDefaultLanguage(): TLanguage {
		return this.defaultLanguage;
	}

	/**
	 * Sets the default language to use when no pattern matches
	 * @param {TLanguage} language The language code to use as default
	 * @returns {void}
	 */
	setDefaultLanguage(language: TLanguage): void {
		this.defaultLanguage = language;
	}
}
