export type Language = 'en' | 'ru';
export declare enum Gender {
    Masculine = "masculine",
    Feminine = "feminine",
    Neuter = "neuter"
}
export interface WordProperties {
    language: Language;
    gender?: Gender;
}
export declare class Word {
    private readonly value;
    private readonly properties;
    constructor(value: string, properties: WordProperties);
    getValue(): string;
    getLanguage(): Language;
    getGender(): Gender | undefined;
}
