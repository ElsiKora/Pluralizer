import { IPluralizer } from "../../domain/interface/pluralizer.interface";
import { Word } from "../../domain/entity/word.entity";
export declare class EnglishPluralizer implements IPluralizer {
    pluralize(word: Word, count?: number): string;
    isPlural(word: string): boolean;
    isSingular(word: string): boolean;
    toPlural(word: string): string;
    toSingular(word: string): string;
    private preserveCase;
}
