import { Pluralizer } from './presentation/api/pluralizer.api';
import { Word } from './domain/entity/word.entity';
import { Gender } from './domain/enum/gender.enum';
import { PluralizerFactory } from './application/factory/pluralizer.factory';
import { LanguageDetector } from './application/service/language-detector.service';
export { Pluralizer };
// Export interfaces, entities, types, enums and factory classes
export { Word, Gender };
export { PluralizerFactory, LanguageDetector };
// Export the default singleton instance
export default new Pluralizer();
