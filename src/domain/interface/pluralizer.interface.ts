import type { Word } from "../entity/word.entity";

export interface IPluralizer {
	isPlural(word: string): boolean;
	isSingular(word: string): boolean;
	pluralize(word: Word, count?: number): string;
	toPlural(word: string): string;
	toSingular(word: string): string;
}
