import { Gender, Language } from '../../domain/entities/word.entity';
export declare class Pluralizer {
    private readonly englishPluralizer;
    private readonly russianPluralizer;
    constructor();
    pluralize(word: string, options?: {
        language?: Language;
        count?: number;
        gender?: Gender;
    }): string;
    isPlural(word: string, language?: Language): boolean;
    isSingular(word: string, language?: Language): boolean;
    toPlural(word: string, options?: {
        language?: Language;
        gender?: Gender;
    }): string;
    toSingular(word: string, language?: Language): string;
    private getPluralizerForLanguage;
    private detectLanguage;
}
