import { Gender } from "../../domain/enum/gender.enum";
import { Word } from "../../domain/entity/word.entity";
import { IPluralizer } from "../../domain/interface/pluralizer.interface";
export declare class SpanishPluralizer implements IPluralizer {
    pluralize(word: Word, count?: number): string;
    isPlural(word: string): boolean;
    isSingular(word: string): boolean;
    toPlural(word: string, gender?: Gender): string;
    toSingular(word: string): string;
    private preserveCase;
}
