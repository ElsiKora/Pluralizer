import { Gender } from "../../domain/enum/gender.enum";
export interface SpanishRule {
    matches: (word: string, gender?: Gender) => boolean;
    apply: (word: string) => string;
}
export declare const spanishPluralRules: SpanishRule[];
export declare const spanishSingularRules: SpanishRule[];
