import { Pluralizer } from './presentation/api/pluralizer.api';
import { Word } from './domain/entity/word.entity';
import { Language } from './domain/type/language.type';
import { Gender } from './domain/enum/gender.enum';
import { WordProperties } from './domain/interface/word-properties.interface';
import { IPluralizer } from './domain/interface/pluralizer.interface';
import { IPluralizerFactory } from './domain/interface/pluralizer-factory.interface';
import { ILanguageDetector } from './domain/interface/language-detector.interface';
import { PluralizerFactory } from './application/factory/pluralizer.factory';
import { LanguageDetector } from './application/service/language-detector.service';

export { Pluralizer };

// Export interfaces, entities, types, enums and factory classes
export { Word, Language, Gender, WordProperties };
export { IPluralizer, IPluralizerFactory, ILanguageDetector };
export { PluralizerFactory, LanguageDetector };

// Export the default singleton instance
export default new Pluralizer();
