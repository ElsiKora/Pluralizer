import { Pluralizer } from './presentation/api/pluralizer.api.js';
export { Gender, Word } from './domain/entities/word.entity.js';
export { EnglishPluralizer } from './application/services/english-pluralizer.service.js';
export { RussianPluralizer } from './application/services/russian-pluralizer.service.js';

// Export default instance for convenience
var index = new Pluralizer();

export { Pluralizer, index as default };
