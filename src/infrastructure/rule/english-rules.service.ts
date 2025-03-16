/* eslint-disable @elsikora/typescript/no-magic-numbers */
import type { IRule } from "../interface/rule.interface";

export const englishPluralRules: Array<IRule> = [
	// Rule for words ending in is (analysis -> analyses, thesis -> theses, crisis -> crises)
	{
		apply: (word: string): string => `${word.slice(0, -2)}es`,
		matches: (word: string): boolean => word.endsWith("is"),
	},
	{
		apply: (word: string): string => `${word}es`,
		matches: (word: string): boolean => /[^aeiou]s$|[^aeiou]x$|[^aeiou]z$|[cs]h$/.test(word),
	},
	{
		apply: (word: string): string => `${word}s`,
		matches: (word: string): boolean => /[aeiou]y$/.test(word),
	},
	{
		apply: (word: string): string => `${word.slice(0, -1)}ies`,
		matches: (word: string): boolean => /[^aeiou]y$/.test(word),
	},
	{
		apply: (word: string): string => `${word.slice(0, -1)}ves`,
		matches: (word: string): boolean => word.endsWith("f"),
	},
	{
		apply: (word: string): string => `${word.slice(0, -2)}ves`,
		matches: (word: string): boolean => word.endsWith("fe"),
	},
	{
		apply: (word: string): string => `${word}es`,
		matches: (word: string): boolean => word.endsWith("o"),
	},
	{
		apply: (word: string): string => `${word}s`,
		matches: (word: string): boolean => /[^sxzc]$/.test(word),
	},
];

export const englishSingularRules: Array<IRule> = [
	// Rule for words ending in es (wolves -> wolf, boxes -> box, analyses -> analysis)
	{
		apply: (word: string): string => word.slice(0, -2),
		matches: (word: string): boolean => word.endsWith("ses") && word.length > 3,
	},
	{
		apply: (word: string): string => `${word.slice(0, -3)}y`,
		matches: (word: string): boolean => word.endsWith("ies") && word.length > 3,
	},
	{
		apply: (word: string): string => {
			const stem: string = word.slice(0, -3);

			return /[^aeiouf]$/.test(stem) ? `${stem}fe` : `${stem}f`;
		},
		matches: (word: string): boolean => word.endsWith("ves") && word.length > 3,
	},
	{
		apply: (word: string): string => {
			if (/[sxz]es$|[cs]hes$/.test(word)) {
				return word.slice(0, -2);
			}

			if (word.endsWith("oes")) {
				return word.slice(0, -2);
			}

			return word.slice(0, -1);
		},
		matches: (word: string): boolean => word.endsWith("es") && word.length > 2,
	},
	{
		apply: (word: string): string => word.slice(0, -1),
		matches: (word: string): boolean => word.endsWith("s") && word.length > 1,
	},
];
