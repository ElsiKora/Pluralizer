import { Language } from '../type/language.type';
import { Gender } from '../enum/gender.enum';
import { WordProperties } from '../interface/word-properties.interface';

export class Word {
  private readonly value: string;
  private readonly properties: WordProperties;

  constructor(value: string, properties: WordProperties) {
    this.value = value;
    this.properties = properties;
  }

  getValue(): string {
    return this.value;
  }

  getLanguage(): Language {
    return this.properties.language;
  }

  getGender(): Gender | undefined {
    return this.properties.gender;
  }
}
