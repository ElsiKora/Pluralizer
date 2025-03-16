import { IPluralizerFactory } from '../../domain/interfaces/pluralizer-factory.interface';
import { IPluralizer } from '../../domain/interfaces/pluralizer.interface';
import { Language } from "../../domain/type/language.type";
export declare class PluralizerFactory implements IPluralizerFactory {
    private readonly pluralizers;
    constructor();
    /**
     * Registers a new pluralizer for a language
     * @param language The language code
     * @param pluralizer The pluralizer implementation
     */
    registerPluralizer(language: Language, pluralizer: IPluralizer): void;
    createPluralizer(language: Language): IPluralizer;
    supportsLanguage(language: Language): boolean;
    getSupportedLanguages(): Language[];
}
