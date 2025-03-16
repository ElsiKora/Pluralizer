export interface EnglishRule {
    matches: (word: string) => boolean;
    apply: (word: string) => string;
}
export declare const englishPluralRules: EnglishRule[];
export declare const englishSingularRules: EnglishRule[];
