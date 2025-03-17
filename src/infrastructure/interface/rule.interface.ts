import type { EGender } from "../../domain/enum/gender.enum";

export interface IRule {
	apply: (word: string) => string;
	matches: (word: string, gender?: EGender) => boolean;
}
