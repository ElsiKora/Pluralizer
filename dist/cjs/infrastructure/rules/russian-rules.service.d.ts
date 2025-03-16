import { Gender } from '../../domain/entities/word.entity';
export interface RussianRule {
    matches: (word: string, gender?: Gender) => boolean;
    apply: (word: string) => string;
}
export declare const russianPluralRules: RussianRule[];
export declare const russianSingularRules: RussianRule[];
