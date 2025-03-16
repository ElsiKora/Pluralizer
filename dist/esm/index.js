import { Pluralizer } from './presentation/api/pluralizer.api.js';
export { Word } from './domain/entity/word.entity.js';
export { Gender } from './domain/enum/gender.enum.js';
export { PluralizerFactory } from './application/factory/pluralizer.factory.js';
export { LanguageDetector } from './application/service/language-detector.service.js';

// Export the default singleton instance
var index = new Pluralizer();

export { Pluralizer, index as default };
