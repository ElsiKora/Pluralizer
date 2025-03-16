import { Gender } from '../../domain/entities/word.entity';
export interface SpanishRule {
    matches: (word: string, gender?: Gender) => boolean;
    apply: (word: string) => string;
}
export declare const spanishPluralRules: SpanishRule[];
export declare const spanishSingularRules: SpanishRule[];
