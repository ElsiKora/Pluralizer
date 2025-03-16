/* eslint-disable @elsikora/typescript/no-magic-numbers */
import type { IRule } from "../interface/rule.interface";

export const spanishPluralRules: Array<IRule> = [
	// Special handling for words ending with 'ión' - they drop the accent in plural form
	{
		apply: (word: string): string => {
			// Replace the accented letter with its unaccented version
			if (word.endsWith("ón")) {
				return `${word.slice(0, -2)}ones`;
			} else if (word.endsWith("ión")) {
				return `${word.slice(0, -3)}iones`;
			}

			return word;
		},
		matches: (word: string): boolean => word.endsWith("ón") || word.endsWith("ión"),
	},
	// Words ending in -z change to -ces (handle this first before consonant rule)
	{
		apply: (word: string): string => `${word.slice(0, -1)}ces`,
		matches: (word: string): boolean => word.endsWith("z"),
	},
	// Words ending in unstressed vowel or 'é' add -s
	{
		apply: (word: string): string => `${word}s`,
		matches: (word: string): boolean => /[aeiouáéíóúü]$/.test(word),
	},
	// Words ending in a consonant (but not z, which is handled separately) add -es
	{
		apply: (word: string): string => `${word}es`,
		matches: (word: string): boolean => /[bcdfghj-nñp-tv-y]$/.test(word),
	},
	// Words ending in stressed vowels with an accent mark add -es and lose the accent
	{
		apply: (word: string): string => {
			const unaccented: string = word.replace(/á$/, "a").replace(/í$/, "i").replace(/ó$/, "o").replace(/ú$/, "u");

			return `${unaccented}es`;
		},
		matches: (word: string): boolean => /[áíóú]$/.test(word),
	},
	// Words ending in -s or -x with more than one syllable remain unchanged in plural form
	{
		apply: (word: string): string => word,
		matches: (word: string): boolean => /[sx]$/.test(word) && word.length > 1,
	},
];

export const spanishSingularRules: Array<IRule> = [
	// Words ending in -iones (singular form ends in -ión)
	{
		apply: (word: string): string => `${word.slice(0, -5)}ión`,
		matches: (word: string): boolean => word.endsWith("iones"),
	},
	// Words ending in -ones (singular form usually ends in -ón)
	{
		apply: (word: string): string => `${word.slice(0, -4)}ón`,
		matches: (word: string): boolean => word.endsWith("ones") && !word.endsWith("ciones") && !/[aeiou]iones$/.test(word),
	},
	// Words ending in -ces (plural of -z)
	{
		apply: (word: string): string => `${word.slice(0, -3)}z`,
		matches: (word: string): boolean => word.endsWith("ces") && word.length > 3,
	},
	// Words ending in -es where the singular ends in a consonant
	{
		apply: (word: string): string => word.slice(0, -2),
		matches: (word: string): boolean => /[^aeiouáéíóúü]es$/.test(word) && word.length > 2,
	},
	// Words ending in -s that are the same in singular and plural (like 'crisis')
	{
		apply: (word: string): string => word,
		matches: (word: string): boolean => /[^aeiouáéíóúü]s$/.test(word) && word.length > 1,
	},
	// Basic -s removal for words ending in vowel + s
	{
		apply: (word: string): string => word.slice(0, -1),
		matches: (word: string): boolean => /[aeiouáéíóúü]s$/.test(word) && word.length > 1,
	},
];
