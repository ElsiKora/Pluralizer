import { Gender } from "../../domain/enum/gender.enum";
export interface RussianRule {
    matches: (word: string, gender?: Gender) => boolean;
    apply: (word: string) => string;
}
export declare const russianPluralRules: RussianRule[];
export declare const russianSingularRules: RussianRule[];
