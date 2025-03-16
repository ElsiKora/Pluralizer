import { IPluralizer } from '../../domain/interfaces/pluralizer.interface';
import { Gender, Word } from '../../domain/entities/word.entity';
export declare class SpanishPluralizer implements IPluralizer {
    pluralize(word: Word, count?: number): string;
    isPlural(word: string): boolean;
    isSingular(word: string): boolean;
    toPlural(word: string, gender?: Gender): string;
    toSingular(word: string): string;
    private preserveCase;
}
