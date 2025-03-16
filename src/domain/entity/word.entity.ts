import type { EGender } from "../enum/gender.enum";
import type { IWordProperties } from "../interface/word-properties.interface";
import type { TLanguage } from "../type/language.type";

export class Word {
	private readonly PROPERTIES: IWordProperties;

	private readonly VALUE: string;

	constructor(value: string, properties: IWordProperties) {
		this.VALUE = value;
		this.PROPERTIES = properties;
	}

	getGender(): EGender | undefined {
		return this.PROPERTIES.gender;
	}

	getLanguage(): TLanguage {
		return this.PROPERTIES.language;
	}

	getValue(): string {
		return this.VALUE;
	}
}
