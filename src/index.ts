import { Pluralizer } from "./presentation/api/pluralizer.api";

// Export interfaces, entities, types, enums and factory classes

// Export the default singleton instance
export default new Pluralizer();

export { PluralizerFactory } from "./application/factory/pluralizer.factory";
export { LanguageDetector } from "./application/service/language-detector.service";
export { Word } from "./domain/entity/word.entity";
export { EGender } from "./domain/enum/gender.enum";
export type { ILanguageDetector } from "./domain/interface/language-detector.interface";
export type { IPluralizerFactory } from "./domain/interface/pluralizer-factory.interface";
export type { IPluralizer } from "./domain/interface/pluralizer.interface";
export type { IWordProperties } from "./domain/interface/word-properties.interface";
export type { TLanguage } from "./domain/type/language.type";
export { Pluralizer } from "./presentation/api/pluralizer.api";
