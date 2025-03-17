/* eslint-disable @elsikora/typescript/no-magic-numbers */
import type { IRule } from "../interface/rule.interface";

export const englishPluralRules: Array<IRule> = [
	// Greek words ending in "ma" (schema->schemata, stigma->stigmata)
	{
		apply: (word: string): string => word.slice(0, -2) + "mata",
		matches: (word: string): boolean => {
			if (!/ma$/i.test(word)) return false;

			if (word.length < 5) return false;

			const hasGreekPattern: boolean = /sch|stig|sto|dog|lem|prag|axi|the|dig/i.test(word) || /[st][tdgk-npr]|[gc]h/i.test(word);

			const isCommonWord: boolean = /(?:drama|mama|panorama|cinema|llama|trauma|pyjama|aroma|coma)$/i.test(word);

			return hasGreekPattern && !isCommonWord;
		},
	},
	// Latin words ending in "a" (alga->algae, larva->larvae)
	{
		apply: (word: string): string => word.slice(0, -1) + "ae",
		matches: (word: string): boolean => {
			if (!/a$/i.test(word)) return false;

			if (/(?:pizza|sofa|idea|camera|pasta|yoga|soda|cola|gala|saga|visa|java)$/i.test(word)) return false;

			return /[bcdfghj-np-tv-z]{2}a$/i.test(word) || /v[aeiou]a$/i.test(word) || /(?:ebr|ulat|ntenn|ertebr|rmul|lgae|rv|bs|tui|nuti)a$/i.test(word);
		},
	},
	// Greek words ending in -on with specific patterns (automaton->automata, polyhedron->polyhedra)
	{
		apply: (word: string): string => word.slice(0, -2) + "a",
		matches: (word: string): boolean => /on$/i.test(word) && word.length >= 7 && /(?:hedr|mat|crit|phen|teri|omen)on$/i.test(word),
	},
	// Greek/Latin words ending in "is" (neurosis->neuroses, analysis->analyses)
	{
		apply: (word: string): string => word.slice(0, -2) + "es",
		matches: (word: string): boolean => /is$/i.test(word) && word.length > 4 && !/(?:tennis|aegis|this|his)$/i.test(word),
	},
	// French pattern words ending in "eau" or "eu" (chateau->chateaux)
	{
		apply: (word: string): string => `${word}x`,
		matches: (word: string): boolean => /(?:eau|eu)$/i.test(word),
	},
	// Words ending in s, x, z, ch, sh add es
	{
		apply: (word: string): string => `${word}es`,
		matches: (word: string): boolean => /(?:[sxz]|[cs]h)$/i.test(word),
	},
	// Words ending in consonant + y change to ies
	{
		apply: (word: string): string => `${word.slice(0, -1)}ies`,
		matches: (word: string): boolean => /[^aeiou]y$/i.test(word),
	},
	// Words ending in vowel + y just add s
	{
		apply: (word: string): string => `${word}s`,
		matches: (word: string): boolean => /[aeiou]y$/i.test(word),
	},
	// Words ending in o preceded by a consonant add es
	{
		apply: (word: string): string => `${word}es`,
		matches: (word: string): boolean => /[^aeiou]o$/i.test(word),
	},
	// Words ending in vowel + o just add s
	{
		apply: (word: string): string => `${word}s`,
		matches: (word: string): boolean => /[aeiou]o$/i.test(word),
	},
	// Default rule: add s
	{
		apply: (word: string): string => `${word}s`,
		matches: (_word: string): boolean => true,
	},
];

export const englishSingularRules: Array<IRule> = [
	// Greek words ending in "mata" from "ma" (schemata->schema, stigmata->stigma)
	{
		apply: (word: string): string => word.slice(0, -4) + "ma",
		matches: (word: string): boolean => /mata$/i.test(word) && word.length >= 7,
	},
	// Latin words ending in "ae" from "a" (algae->alga, larvae->larva)
	{
		apply: (word: string): string => word.slice(0, -2) + "a",
		matches: (word: string): boolean => /ae$/i.test(word) && !/(?:sundae|appletinae)$/i.test(word),
	},
	// Greek words ending in "a" from "on" (automata->automaton, polyhedra->polyhedron)
	{
		apply: (word: string): string => word.slice(0, -1) + "on",
		matches: (word: string): boolean => /a$/i.test(word) && word.length >= 7 && /(?:hedr|mat|crit|phen|teri|omen)a$/i.test(word),
	},
	// Greek/Latin plural words ending in "ses" to singular "sis" (neuroses->neurosis)
	{
		apply: (word: string): string => word.slice(0, -2) + "is",
		matches: (word: string): boolean => /ses$/i.test(word) && word.length > 3,
	},
	// French words ending in "eaux" or "eux" (chateaux->chateau, adieux->adieu)
	{
		apply: (word: string): string => word.slice(0, -1),
		matches: (word: string): boolean => /(?:eaux|eux)$/i.test(word),
	},
	{
		apply: (word: string): string => `${word.slice(0, -3)}y`,
		matches: (word: string): boolean => /[^aeiou]ies$/i.test(word) && word.length > 3,
	},
	// Words ending in es from words ending in s, x, z, ch, sh
	{
		apply: (word: string): string => word.slice(0, -2),
		matches: (word: string): boolean => /(?:[sxz]|[cs]h)es$/i.test(word),
	},
	// Words ending in es from words ending in consonant + o
	{
		apply: (word: string): string => word.slice(0, -2),
		matches: (word: string): boolean => /[^aeiou]oes$/i.test(word),
	},
	// Regular plural: remove trailing s if not part of the base word
	{
		apply: (word: string): string => word.slice(0, -1),
		matches: (word: string): boolean => /s$/i.test(word) && !/(?:ss|[aeiou]s)$/i.test(word),
	},
];
