export type Language = 'en' | 'ru';

export enum Gender {
  Masculine = 'masculine',
  Feminine = 'feminine',
  Neuter = 'neuter'
}

export interface WordProperties {
  language: Language;
  gender?: Gender;
}

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
