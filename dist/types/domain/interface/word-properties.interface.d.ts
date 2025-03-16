import { Language } from "../type/language.type";
import { Gender } from "../enum/gender.enum";
export interface WordProperties {
    language: Language;
    gender?: Gender;
}
