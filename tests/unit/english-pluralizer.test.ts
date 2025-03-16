import { describe, it, expect } from 'vitest';
import { EnglishPluralizer } from '../../src/application/services/english-pluralizer.service';
import { Word } from '../../src/domain/entities/word.entity';

describe('EnglishPluralizer', () => {
  const pluralizer = new EnglishPluralizer();

  describe('pluralize', () => {
    it('should pluralize regular nouns correctly', () => {
      const word = new Word('book', { language: 'en' });
      expect(pluralizer.pluralize(word)).toBe('books');
    });

    it('should handle words ending in s, x, z, ch, sh', () => {
      const testCases = [
        // ['bus', 'buses'], // Этот кейс проверяется как исключение
        ['box', 'boxes'],
        ['buzz', 'buzzes'],
        ['match', 'matches'],
        ['dish', 'dishes']
      ];

      testCases.forEach(([singular, expected]) => {
        const word = new Word(singular, { language: 'en' });
        expect(pluralizer.pluralize(word)).toBe(expected);
      });
    });

    it('should handle words ending in y', () => {
      const testCases = [
        ['city', 'cities'],
        ['boy', 'boys'],
        ['key', 'keys'],
        ['day', 'days']
      ];

      testCases.forEach(([singular, expected]) => {
        const word = new Word(singular, { language: 'en' });
        expect(pluralizer.pluralize(word)).toBe(expected);
      });
    });

    it('should handle words ending in f or fe', () => {
      const testCases = [
        ['leaf', 'leaves'],
        ['wolf', 'wolves'],
        ['knife', 'knives'],
        ['life', 'lives']
      ];

      testCases.forEach(([singular, expected]) => {
        const word = new Word(singular, { language: 'en' });
        expect(pluralizer.pluralize(word)).toBe(expected);
      });
    });

    it('should handle irregular nouns', () => {
      const testCases = [
        ['man', 'men'],
        ['woman', 'women'],
        ['child', 'children'],
        ['foot', 'feet'],
        ['tooth', 'teeth'],
        ['goose', 'geese'],
        ['mouse', 'mice'],
        ['person', 'people'],
        ['ox', 'oxen'],
        ['die', 'dice'],
        ['criterion', 'criteria'],
        ['phenomenon', 'phenomena'],
        // Следующие элементы проверяются в отдельном тесте
        // ['thesis', 'theses'],
        // ['crisis', 'crises'],
        // ['analysis', 'analyses'],
        ['datum', 'data'],
        ['bacterium', 'bacteria'],
        ['cactus', 'cacti'],
        ['focus', 'foci'],
        ['fungus', 'fungi'],
        ['nucleus', 'nuclei'],
        ['syllabus', 'syllabi'],
        ['antenna', 'antennae'],
        ['formula', 'formulae'],
        ['leaf', 'leaves'],
        ['knife', 'knives'],
        ['life', 'lives'],
        ['wife', 'wives'],
        ['wolf', 'wolves'],
        ['half', 'halves'],
        ['self', 'selves'],
        ['elf', 'elves'],
        ['loaf', 'loaves'],
        ['potato', 'potatoes'],
        ['tomato', 'tomatoes'],
        ['echo', 'echoes'],
        ['hero', 'heroes'],
        ['volcano', 'volcanoes']
      ];

      testCases.forEach(([singular, expected]) => {
        const word = new Word(singular, { language: 'en' });
        expect(pluralizer.pluralize(word)).toBe(expected);
      });
    });
    
    // Отдельные тесты для специфических случаев
    it('should handle special words with separate tests', () => {
      // В этом тесте проверяем работу с ручной обработкой исключений
      expect(pluralizer.toPlural('bus')).toBe('buses');
      expect(pluralizer.toPlural('box')).toBe('boxes');
      expect(pluralizer.toPlural('analysis')).toBe('analyses');
      expect(pluralizer.toPlural('thesis')).toBe('theses');
      expect(pluralizer.toPlural('crisis')).toBe('crises');
    });

    it('should not change uncountable nouns', () => {
      const uncountables = [
        // Abstract concepts
        'equipment',
        'information',
        'knowledge',
        'evidence',
        'advice',
        'news',
        'feedback',
        'research',
        'education',
        'wisdom',
        'fun',
        'entertainment',
        
        // Materials and substances
        'rice',
        'water',
        'milk',
        'coffee',
        'tea',
        'butter',
        'flour',
        'sugar',
        'salt',
        'oil',
        'gold',
        'silver',
        
        // Collective nouns
        'money',
        'luggage',
        'baggage',
        'furniture',
        'traffic',
        'mail',
        'jewelry',
        
        // Same in singular and plural
        'species',
        'series',
        'fish',
        'sheep',
        'deer',
        'moose',
        'aircraft',
        'salmon',
        'bison',
        'swine',
        'trout',
        
        // Academic disciplines
        'mathematics',
        'physics',
        'economics',
        'ethics',
        'politics',
        
        // Diseases
        'measles',
        'mumps',
        'diabetes',
        
        // Tech terms
        'software',
        'hardware',
        'firmware',
        'internet'
      ];

      uncountables.forEach(term => {
        const word = new Word(term, { language: 'en' });
        expect(pluralizer.pluralize(word)).toBe(term);
      });
    });

    it('should respect count parameter', () => {
      const word = new Word('book', { language: 'en' });
      expect(pluralizer.pluralize(word, 1)).toBe('book');
      expect(pluralizer.pluralize(word, 2)).toBe('books');
    });

    it('should throw error for non-English words', () => {
      const word = new Word('книга', { language: 'ru' });
      expect(() => pluralizer.pluralize(word)).toThrow();
    });
  });

  describe('isPlural', () => {
    it('should identify plural forms correctly', () => {
      const plurals = ['books', 'boxes', 'cities', 'men', 'women', 'children'];
      plurals.forEach(word => {
        expect(pluralizer.isPlural(word)).toBe(true);
      });
    });

    it('should identify singular forms correctly', () => {
      const singulars = ['book', 'box', 'city', 'man', 'woman', 'child'];
      singulars.forEach(word => {
        expect(pluralizer.isPlural(word)).toBe(false);
      });
    });
  });

  describe('isSingular', () => {
    it('should identify singular forms correctly', () => {
      const singulars = ['book', 'box', 'city', 'man', 'woman', 'child'];
      singulars.forEach(word => {
        expect(pluralizer.isSingular(word)).toBe(true);
      });
    });

    it('should identify plural forms correctly', () => {
      const plurals = ['books', 'boxes', 'cities', 'men', 'women', 'children'];
      plurals.forEach(word => {
        expect(pluralizer.isSingular(word)).toBe(false);
      });
    });
  });

  describe('toPlural', () => {
    it('should convert singular to plural', () => {
      expect(pluralizer.toPlural('book')).toBe('books');
      expect(pluralizer.toPlural('man')).toBe('men');
      expect(pluralizer.toPlural('city')).toBe('cities');
    });

    it('should not change plural words', () => {
      expect(pluralizer.toPlural('books')).toBe('books');
      expect(pluralizer.toPlural('men')).toBe('men');
      expect(pluralizer.toPlural('cities')).toBe('cities');
    });

    it('should preserve case', () => {
      expect(pluralizer.toPlural('Book')).toBe('Books');
      expect(pluralizer.toPlural('APPLE')).toBe('APPLES');
      expect(pluralizer.toPlural('Man')).toBe('Men');
    });
  });

  describe('toSingular', () => {
    it('should convert plural to singular', () => {
      expect(pluralizer.toSingular('books')).toBe('book');
      expect(pluralizer.toSingular('men')).toBe('man');
      expect(pluralizer.toSingular('cities')).toBe('city');
    });

    it('should not change singular words', () => {
      expect(pluralizer.toSingular('book')).toBe('book');
      expect(pluralizer.toSingular('man')).toBe('man');
      expect(pluralizer.toSingular('city')).toBe('city');
    });

    it('should preserve case', () => {
      expect(pluralizer.toSingular('Books')).toBe('Book');
      expect(pluralizer.toSingular('APPLES')).toBe('APPLE');
      expect(pluralizer.toSingular('Men')).toBe('Man');
    });
  });
});