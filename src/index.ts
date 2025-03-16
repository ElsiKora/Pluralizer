import { Pluralizer } from './presentation/api/pluralizer.api';
import { Word, Language, Gender } from './domain/entities/word.entity';
import { IPluralizer } from './domain/interfaces/pluralizer.interface';
import { EnglishPluralizer } from './application/services/english-pluralizer.service';
import { RussianPluralizer } from './application/services/russian-pluralizer.service';

export { Pluralizer };

export { Word, Language, Gender, IPluralizer };

export { EnglishPluralizer, RussianPluralizer };

export default new Pluralizer();
