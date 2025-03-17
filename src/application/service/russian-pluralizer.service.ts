import type { Word } from "../../domain/entity/word.entity";
import type { IPluralizer } from "../../domain/interface/pluralizer.interface";
import type { IRule } from "../../infrastructure/interface/rule.interface";

import { EGender } from "../../domain/enum/gender.enum";
import { russianIrregularPlurals, russianIrregularSingulars, russianUncountableWords } from "../../infrastructure/exception/russian-exceptions.service";
import { russianPluralRules, russianSingularRules } from "../../infrastructure/rule/russian-rules.service";
import { CasePreserver } from "../../infrastructure/utility/case-preserver.utility";

export class RussianPluralizer implements IPluralizer {
	/**
	 * Determines if a word is in plural form
	 * @param word - The word to check
	 * @returns True if the word is plural, false otherwise
	 */
	isPlural(word: string): boolean {
		const lowerWord: string = word.toLowerCase();

		// Uncountable words are neither singular nor plural
		if (russianUncountableWords.includes(lowerWord)) {
			return false;
		}

		// If it's in our irregular plurals list, it's plural
		if (Object.values(russianIrregularPlurals).includes(lowerWord)) {
			return true;
		}

		// If it matches any of our singularization rules, it's likely plural
		return russianSingularRules.some((rule: IRule) => rule.matches(lowerWord)) || /[ыи]$/.test(lowerWord);
	}

	/**
	 * Determines if a word is in singular form
	 * @param word - The word to check
	 * @returns True if the word is singular, false otherwise
	 */
	isSingular(word: string): boolean {
		const lowerWord: string = word.toLowerCase();

		// Uncountable words can be considered singular
		if (russianUncountableWords.includes(lowerWord)) {
			return true;
		}

		// If it's in our irregular singulars list, it's singular
		if (Object.keys(russianIrregularPlurals).includes(lowerWord)) {
			return true;
		}

		// If it's not plural, it's likely singular
		return !this.isPlural(lowerWord);
	}

	/**
	 * Pluralizes a word based on a count
	 * @param word - The Word object to pluralize
	 * @param count - The count to determine if pluralization is needed
	 * @returns The pluralized word or original if count is 1
	 */
	// eslint-disable-next-line @elsikora/typescript/no-magic-numbers
	pluralize(word: Word, count: number = 2): string {
		const value: string = word.getValue();

		// Check if word is Russian
		if (word.getLanguage() !== "ru") {
			throw new Error("RussianPluralizer can only pluralize Russian words");
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

	toPlural(word: string, gender?: EGender): string {
		const lowerWord: string = word.toLowerCase();

		// Check if word is uncountable (already plural in Russian)
		if (russianUncountableWords.includes(lowerWord)) {
			return word;
		}

		// Check if word is already plural
		if (this.isPlural(lowerWord)) {
			return word;
		}

		// Check for irregular forms
		if (russianIrregularPlurals[lowerWord]) {
			return CasePreserver.preserveCase(word, russianIrregularPlurals[lowerWord]);
		}

		// Apply regular rules if gender is provided
		if (gender) {
			for (const rule of russianPluralRules) {
				if (rule.matches(lowerWord, gender)) {
					return CasePreserver.preserveCase(word, rule.apply(lowerWord));
				}
			}
		} else {
			// Without gender, we have to make an educated guess
			// Try masculine rules first, then feminine, then neuter
			const genders: Array<EGender> = [EGender.MASCULINE, EGender.FEMININE, EGender.NEUTER];

			for (const testGender of genders) {
				for (const rule of russianPluralRules) {
					if (rule.matches(lowerWord, testGender)) {
						return CasePreserver.preserveCase(word, rule.apply(lowerWord));
					}
				}
			}
		}

		// If no rules match, return the original
		return word;
	}

	toSingular(word: string): string {
		const lowerWord: string = word.toLowerCase();

		// Check if word is uncountable (always plural in Russian)
		if (russianUncountableWords.includes(lowerWord)) {
			return word;
		}

		// Check if word is already singular
		if (this.isSingular(lowerWord)) {
			return word;
		}

		// Check for irregular forms
		if (russianIrregularSingulars[lowerWord]) {
			return CasePreserver.preserveCase(word, russianIrregularSingulars[lowerWord]);
		}

		// Apply regular rules - for Russian, we need to guess the gender
		// Try each gender with its rules
		const genders: Array<EGender> = [EGender.MASCULINE, EGender.FEMININE, EGender.NEUTER];

		for (const gender of genders) {
			for (const rule of russianSingularRules) {
				if (rule.matches(lowerWord, gender)) {
					return CasePreserver.preserveCase(word, rule.apply(lowerWord));
				}
			}
		}

		// If no rules match, return the original
		return word;
	}
}
