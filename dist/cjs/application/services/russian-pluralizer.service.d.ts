import { IPluralizer } from '../../domain/interfaces/pluralizer.interface';
import { Word } from '../../domain/entities/word.entity';
import { Gender } from "../../domain/enum/gender.enum";
export declare class RussianPluralizer implements IPluralizer {
    pluralize(word: Word, count?: number): string;
    isPlural(word: string): boolean;
    isSingular(word: string): boolean;
    toPlural(word: string, gender?: Gender): string;
    toSingular(word: string): string;
    private preserveCase;
}
