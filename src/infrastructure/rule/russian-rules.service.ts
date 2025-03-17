/* eslint-disable @elsikora/typescript/no-magic-numbers */
import type { IRule } from "../interface/rule.interface";

import { EGender } from "../../domain/enum/gender.enum";

export const russianPluralRules: Array<IRule> = [
	// Masculine nouns
	{
		apply: (word: string): string => `${word}ы`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.MASCULINE && /[бвгдзлмнпрстфх]$/.test(word),
	},
	{
		apply: (word: string): string => `${word}и`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.MASCULINE && /[кгх]$/.test(word),
	},
	{
		apply: (word: string): string => `${word.slice(0, -1)}и`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.MASCULINE && /[йь]$/.test(word),
	},
	{
		apply: (word: string): string => `${word}и`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.MASCULINE && /[жшщч]$/.test(word),
	},

	// Feminine nouns
	{
		apply: (word: string): string => {
			const stem: string = word.slice(0, -1);

			// If the stem ends in ж, ш, щ, ч, г, к, or х, add и
			if (/[жшщчгкх]$/.test(stem)) {
				return `${stem}и`;
			}

			return `${stem}ы`;
		},
		matches: (word: string, gender?: EGender): boolean => gender === EGender.FEMININE && word.endsWith("а"),
	},
	{
		apply: (word: string): string => `${word.slice(0, -1)}и`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.FEMININE && word.endsWith("я"),
	},
	{
		apply: (word: string): string => `${word.slice(0, -1)}и`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.FEMININE && word.endsWith("ь"),
	},

	// Neuter nouns
	{
		apply: (word: string): string => `${word.slice(0, -1)}а`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.NEUTER && word.endsWith("о"),
	},
	{
		apply: (word: string): string => `${word.slice(0, -1)}я`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.NEUTER && word.endsWith("е"),
	},
	{
		apply: (word: string): string => `${word.slice(0, -1)}ена`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.NEUTER && word.endsWith("мя"),
	},
];

export const russianSingularRules: Array<IRule> = [
	// Masculine plurals to singular
	{
		apply: (word: string): string => word.slice(0, -1),
		matches: (word: string, gender?: EGender): boolean => gender === EGender.MASCULINE && word.endsWith("ы"),
	},
	{
		apply: (word: string): string => {
			const stem: string = word.slice(0, -1);

			if (/[жшщч]$/.test(stem)) {
				return stem;
			}

			return `${stem}ь`;
		},
		matches: (word: string, gender?: EGender): boolean => gender === EGender.MASCULINE && word.endsWith("и"),
	},

	// Feminine plurals to singular
	{
		apply: (word: string): string => `${word.slice(0, -1)}а`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.FEMININE && word.endsWith("ы"),
	},
	{
		apply: (word: string): string => {
			const stem: string = word.slice(0, -1);

			if (/[жшщч]$/.test(stem)) {
				return `${stem}а`;
			}

			return `${stem}я`;
		},
		matches: (word: string, gender?: EGender): boolean => gender === EGender.FEMININE && word.endsWith("и"),
	},

	// Neuter plurals to singular
	{
		apply: (word: string): string => `${word.slice(0, -1)}о`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.NEUTER && word.endsWith("а"),
	},
	{
		apply: (word: string): string => `${word.slice(0, -1)}е`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.NEUTER && word.endsWith("я"),
	},
	{
		apply: (word: string): string => `${word.slice(0, -3)}мя`,
		matches: (word: string, gender?: EGender): boolean => gender === EGender.NEUTER && word.endsWith("ена"),
	},
];
