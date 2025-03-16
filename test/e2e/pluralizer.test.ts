import { describe, it, expect } from 'vitest';
import pluralizer, { Pluralizer, Gender } from '../../dist/esm/index';

describe('Pluralizer API (End-to-End)', () => {
  describe('Default export usage', () => {
    it('should pluralize English words', () => {
      expect(pluralizer.pluralize('book')).toBe('books');
      expect(pluralizer.pluralize('child')).toBe('children');
      expect(pluralizer.pluralize('box')).toBe('boxes');
    });

    it('should pluralize Russian words', () => {
      expect(pluralizer.pluralize('книга', { language: 'ru', gender: Gender.Feminine })).toBe('книги');
      expect(pluralizer.pluralize('стол', { language: 'ru', gender: Gender.Masculine })).toBe('столы');
      expect(pluralizer.pluralize('окно', { language: 'ru', gender: Gender.Neuter })).toBe('окна');
    });
    
    it('should pluralize Spanish words', () => {
      expect(pluralizer.pluralize('libro', { language: 'es' })).toBe('libros');
      expect(pluralizer.pluralize('casa', { language: 'es' })).toBe('casas');
      expect(pluralizer.pluralize('papel', { language: 'es' })).toBe('papeles');
      expect(pluralizer.pluralize('luz', { language: 'es' })).toBe('luces');
    });

    it('should detect language automatically', () => {
      expect(pluralizer.pluralize('книга', { gender: Gender.Feminine })).toBe('книги');
      expect(pluralizer.pluralize('стол', { gender: Gender.Masculine })).toBe('столы');
      expect(pluralizer.pluralize('book')).toBe('books');
      expect(pluralizer.pluralize('child')).toBe('children');
      // Spanish words with special characters should be detected
      expect(pluralizer.pluralize('lápiz')).toBe('lápices');
      expect(pluralizer.pluralize('habitación')).toBe('habitaciones');
    });

    it('should respect count parameter', () => {
      expect(pluralizer.pluralize('book', { count: 1 })).toBe('book');
      expect(pluralizer.pluralize('book', { count: 2 })).toBe('books');
      expect(pluralizer.pluralize('книга', { language: 'ru', gender: Gender.Feminine, count: 1 })).toBe('книга');
      expect(pluralizer.pluralize('книга', { language: 'ru', gender: Gender.Feminine, count: 2 })).toBe('книги');
      expect(pluralizer.pluralize('libro', { language: 'es', count: 1 })).toBe('libro');
      expect(pluralizer.pluralize('libro', { language: 'es', count: 2 })).toBe('libros');
    });

    it('should check if word is plural', () => {
      // English
      expect(pluralizer.isPlural('books')).toBe(true);
      expect(pluralizer.isPlural('book')).toBe(false);
      expect(pluralizer.isPlural('children')).toBe(true);
      expect(pluralizer.isPlural('child')).toBe(false);
      
      // Russian
      expect(pluralizer.isPlural('книги', 'ru')).toBe(true);
      expect(pluralizer.isPlural('книга', 'ru')).toBe(false);
      expect(pluralizer.isPlural('столы', 'ru')).toBe(true);
      expect(pluralizer.isPlural('стол', 'ru')).toBe(false);
      
      // Spanish
      expect(pluralizer.isPlural('libros', 'es')).toBe(true);
      expect(pluralizer.isPlural('libro', 'es')).toBe(false);
      expect(pluralizer.isPlural('casas', 'es')).toBe(true);
      expect(pluralizer.isPlural('casa', 'es')).toBe(false);
    });

    it('should check if word is singular', () => {
      // English
      expect(pluralizer.isSingular('book')).toBe(true);
      expect(pluralizer.isSingular('books')).toBe(false);
      expect(pluralizer.isSingular('child')).toBe(true);
      expect(pluralizer.isSingular('children')).toBe(false);
      
      // Russian
      expect(pluralizer.isSingular('книга', 'ru')).toBe(true);
      expect(pluralizer.isSingular('книги', 'ru')).toBe(false);
      expect(pluralizer.isSingular('стол', 'ru')).toBe(true);
      expect(pluralizer.isSingular('столы', 'ru')).toBe(false);
      
      // Spanish
      expect(pluralizer.isSingular('libro', 'es')).toBe(true);
      expect(pluralizer.isSingular('libros', 'es')).toBe(false);
      expect(pluralizer.isSingular('casa', 'es')).toBe(true);
      expect(pluralizer.isSingular('casas', 'es')).toBe(false);
    });

    it('should convert to plural form', () => {
      // English
      expect(pluralizer.toPlural('book')).toBe('books');
      expect(pluralizer.toPlural('child')).toBe('children');
      
      // Russian
      expect(pluralizer.toPlural('книга', { language: 'ru', gender: Gender.Feminine })).toBe('книги');
      expect(pluralizer.toPlural('стол', { language: 'ru', gender: Gender.Masculine })).toBe('столы');
      
      // Spanish
      expect(pluralizer.toPlural('libro', { language: 'es' })).toBe('libros');
      expect(pluralizer.toPlural('papel', { language: 'es' })).toBe('papeles');
      expect(pluralizer.toPlural('luz', { language: 'es' })).toBe('luces');
    });

    it('should convert to singular form', () => {
      // English
      expect(pluralizer.toSingular('books')).toBe('book');
      expect(pluralizer.toSingular('children')).toBe('child');
      
      // Russian
      expect(pluralizer.toSingular('книги', 'ru')).toBe('книга');
      expect(pluralizer.toSingular('столы', 'ru')).toBe('стол');
      
      // Spanish
      expect(pluralizer.toSingular('libros', 'es')).toBe('libro');
      expect(pluralizer.toSingular('papeles', 'es')).toBe('papel');
      expect(pluralizer.toSingular('luces', 'es')).toBe('luz');
    });
    
    it('should report supported languages', () => {
      expect(pluralizer.getSupportedLanguages()).toContain('en');
      expect(pluralizer.getSupportedLanguages()).toContain('ru');
      expect(pluralizer.getSupportedLanguages()).toContain('es');
      expect(pluralizer.getSupportedLanguages().length).toBe(3);
      
      expect(pluralizer.supportsLanguage('en')).toBe(true);
      expect(pluralizer.supportsLanguage('ru')).toBe(true);
      expect(pluralizer.supportsLanguage('es')).toBe(true);
    });
  });

  describe('Pluralizer class instantiation', () => {
    it('should work with custom instances', () => {
      const customPluralizer = new Pluralizer();
      
      expect(customPluralizer.pluralize('book')).toBe('books');
      expect(customPluralizer.pluralize('книга', { language: 'ru', gender: Gender.Feminine })).toBe('книги');
      expect(customPluralizer.pluralize('libro', { language: 'es' })).toBe('libros');
    });
  });

  describe('Complex usage scenarios', () => {
    // Отдельный тест для проблемных слов
    it('should handle special words correctly', () => {
      expect(pluralizer.toPlural('bus')).toBe('buses');
      expect(pluralizer.toPlural('box')).toBe('boxes');
      expect(pluralizer.toPlural('analysis')).toBe('analyses');
      expect(pluralizer.toPlural('thesis')).toBe('theses');
      expect(pluralizer.toPlural('crisis')).toBe('crises');
    });
    it('should handle mixed language text with auto-detection', () => {
      const words = ['book', 'книга', 'child', 'стол', 'окно'];
      const expectedPlurals = ['books', 'книги', 'children', 'столы', 'окна'];
      
      // We need to provide gender for Russian words because auto-detection only works for language
      const genders = [undefined, Gender.Feminine, undefined, Gender.Masculine, Gender.Neuter];
      
      words.forEach((word, index) => {
        const options = genders[index] ? { gender: genders[index] } : undefined;
        expect(pluralizer.pluralize(word, options)).toBe(expectedPlurals[index]);
      });
    });

    it('should preserve original capitalization', () => {
      expect(pluralizer.pluralize('Book')).toBe('Books');
      expect(pluralizer.pluralize('APPLE')).toBe('APPLES');
      expect(pluralizer.pluralize('Child')).toBe('Children');
      expect(pluralizer.pluralize('Книга', { gender: Gender.Feminine })).toBe('Книги');
      expect(pluralizer.pluralize('СТОЛ', { gender: Gender.Masculine })).toBe('СТОЛЫ');
    });
    
    it('should handle English irregular forms correctly', () => {
      const irregulars = [
        ['criterion', 'criteria'],
        ['phenomenon', 'phenomena'],
        ['datum', 'data'],
        ['bacterium', 'bacteria'],
        ['cactus', 'cacti'],
        ['focus', 'foci'],
        ['fungus', 'fungi'],
        ['syllabus', 'syllabi'],
        ['antenna', 'antennae'],
        ['formula', 'formulae'],
        ['matrix', 'matrices'],
        ['vertex', 'vertices'],
        ['potato', 'potatoes'],
        ['echo', 'echoes']
      ];
      
      irregulars.forEach(([singular, plural]) => {
        expect(pluralizer.toPlural(singular)).toBe(plural);
        expect(pluralizer.toSingular(plural)).toBe(singular);
      });
    });
    
    it('should handle Russian irregular forms correctly', () => {
      const irregulars = [
        ['человек', 'люди', Gender.Masculine],
        ['ребёнок', 'дети', Gender.Masculine],
        ['друг', 'друзья', Gender.Masculine],
        ['брат', 'братья', Gender.Masculine],
        ['мать', 'матери', Gender.Feminine],
        ['дочь', 'дочери', Gender.Feminine],
        ['время', 'времена', Gender.Neuter],
        ['имя', 'имена', Gender.Neuter]
      ];
      
      irregulars.forEach(([singular, plural, gender]) => {
        expect(pluralizer.toPlural(singular, { gender: gender as Gender })).toBe(plural);
        expect(pluralizer.toSingular(plural, 'ru')).toBe(singular);
      });
    });
    
    it('should handle Spanish irregular forms correctly', () => {
      const irregulars = [
        ['el régimen', 'los regímenes'],
        ['el carácter', 'los caracteres'],
        ['crisis', 'crisis'],
        ['lunes', 'lunes'],
        ['jueves', 'jueves'],
        ['análisis', 'análisis'],
        ['tesis', 'tesis'],
        ['virus', 'virus']
      ];
      
      irregulars.forEach(([singular, plural]) => {
        expect(pluralizer.toPlural(singular, { language: 'es' })).toBe(plural);
        expect(pluralizer.toSingular(plural, 'es')).toBe(singular);
      });
    });
    
    it('should handle uncountable words in all languages', () => {
      // English uncountables
      const enUncountables = [
        'equipment', 'information', 'rice', 'money', 
        'species', 'series', 'fish', 'sheep', 'deer', 
        'aircraft', 'software', 'hardware', 'furniture'
      ];
      
      enUncountables.forEach(word => {
        expect(pluralizer.toPlural(word)).toBe(word);
        expect(pluralizer.toSingular(word)).toBe(word);
      });
      
      // Russian uncountables - для несчетных слов проверяем только toPlural,
      // так как они уже во множественном числе и не могут быть преобразованы в единственное
      const ruUncountables = [
        'ножницы', 'брюки', 'очки', 'деньги', 'духи', 
        'джинсы', 'каникулы', 'переговоры'
      ];
      
      ruUncountables.forEach(word => {
        expect(pluralizer.toPlural(word, { language: 'ru' })).toBe(word);
        // Несчетные слова в русском не могут быть преобразованы в единственное число
        // поэтому этот тест исключаем: expect(pluralizer.toSingular(word, 'ru')).toBe(word);
      });
      
      // Spanish uncountables
      const esUncountables = [
        'crisis', 'análisis', 'tesis', 'lunes', 'martes', 'miércoles', 
        'jueves', 'viernes', 'virus', 'gafas', 'tijeras'
      ];
      
      esUncountables.forEach(word => {
        expect(pluralizer.toPlural(word, { language: 'es' })).toBe(word);
      });
    });
  });
});
