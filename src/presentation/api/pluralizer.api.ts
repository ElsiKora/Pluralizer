import type { EGender } from "../../domain/enum/gender.enum";
import type { ILanguageDetector } from "../../domain/interface/language-detector.interface";
import type { IPluralizerFactory } from "../../domain/interface/pluralizer-factory.interface";
import type { TLanguage } from "../../domain/type/language.type";

import { PluralizerFactory } from "../../application/factory/pluralizer.factory";
import { EnglishPluralizer } from "../../application/service/english-pluralizer.service";
import { LanguageDetector } from "../../application/service/language-detector.service";
import { RussianPluralizer } from "../../application/service/russian-pluralizer.service";
import { Word } from "../../domain/entity/word.entity";

export class Pluralizer {
	private readonly LANGUAGE_DETECTOR: ILanguageDetector;

	private readonly PLURALIZER_FACTORY: IPluralizerFactory;

	constructor() {
		this.PLURALIZER_FACTORY = new PluralizerFactory();
		this.LANGUAGE_DETECTOR = new LanguageDetector();

		// Register all supported pluralizers
		(this.PLURALIZER_FACTORY as PluralizerFactory).registerPluralizer("en", new EnglishPluralizer());
		(this.PLURALIZER_FACTORY as PluralizerFactory).registerPluralizer("ru", new RussianPluralizer());
	}

	/**
	 * Gets a list of all supported languages
	 * @returns {Array<TLanguage>} Array of supported language codes
	 */
	getSupportedLanguages(): Array<TLanguage> {
		return this.PLURALIZER_FACTORY.getSupportedLanguages();
	}

	isPlural(word: string, language?: TLanguage): boolean {
		const detectedLanguage: TLanguage = language ?? this.LANGUAGE_DETECTOR.detectLanguage(word);

		return this.PLURALIZER_FACTORY.createPluralizer(detectedLanguage).isPlural(word);
	}

	isSingular(word: string, language?: TLanguage): boolean {
		const detectedLanguage: TLanguage = language ?? this.LANGUAGE_DETECTOR.detectLanguage(word);

		return this.PLURALIZER_FACTORY.createPluralizer(detectedLanguage).isSingular(word);
	}

	pluralize(
		word: string,
		options?: {
			count?: number;
			gender?: EGender;
			language?: TLanguage;
		},
	): string {
		const {
			// eslint-disable-next-line @elsikora/typescript/no-magic-numbers
			count = 2,
			gender,
			language = this.LANGUAGE_DETECTOR.detectLanguage(word),
		}: {
			count?: number;
			gender?: EGender;
			language?: TLanguage;
		} = options ?? {};

		// If count is 1, return singular form (this is common for all languages)
		if (count === 1) {
			return word;
		}

		// Create a word entity with the detected or specified language
		const wordEntity: Word = new Word(word, { gender, language });

		// Use the factory to get the appropriate pluralizer
		return this.PLURALIZER_FACTORY.createPluralizer(language).pluralize(wordEntity, count);
	}

	/**
	 * Checks if a language is supported
	 * @param {TLanguage} language The language code to check
	 * @returns {boolean} True if the language is supported, false otherwise
	 */
	supportsLanguage(language: TLanguage): boolean {
		return this.PLURALIZER_FACTORY.supportsLanguage(language);
	}

	toPlural(
		word: string,
		options?: {
			gender?: EGender;
			language?: TLanguage;
		},
	): string {
		const {
			gender,
			language = this.LANGUAGE_DETECTOR.detectLanguage(word),
		}: {
			gender?: EGender;
			language?: TLanguage;
		} = options ?? {};

		// For languages that require gender, we need to handle them specially
		if (gender) {
			// Create a word entity with the detected or specified language and gender
			const wordEntity: Word = new Word(word, { gender, language });

			return this.PLURALIZER_FACTORY.createPluralizer(language).pluralize(wordEntity);
		}

		return this.PLURALIZER_FACTORY.createPluralizer(language).toPlural(word);
	}

	toSingular(word: string, language?: TLanguage): string {
		const detectedLanguage: TLanguage = language ?? this.LANGUAGE_DETECTOR.detectLanguage(word);

		return this.PLURALIZER_FACTORY.createPluralizer(detectedLanguage).toSingular(word);
	}
}
