import { Language } from '../type/language.type';
import { Gender } from '../enum/gender.enum';
import { WordProperties } from '../interface/word-properties.interface';
export declare class Word {
    private readonly value;
    private readonly properties;
    constructor(value: string, properties: WordProperties);
    getValue(): string;
    getLanguage(): Language;
    getGender(): Gender | undefined;
}
