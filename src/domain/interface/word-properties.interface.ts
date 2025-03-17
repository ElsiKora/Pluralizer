import type { EGender } from "../enum/gender.enum";
import type { TLanguage } from "../type/language.type";

export interface IWordProperties {
	gender?: EGender;
	language: TLanguage;
}
