import { Gender } from "../../domain/enum/gender.enum";
export interface RussianExceptionEntry {
    plural: string;
    gender: Gender;
}
export interface RussianExceptionMap {
    [singular: string]: RussianExceptionEntry;
}
export declare const russianIrregularPlurals: RussianExceptionMap;
export declare const russianIrregularSingulars: {
    [plural: string]: string;
};
export declare const russianUncountableWords: string[];
