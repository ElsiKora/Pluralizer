import { describe, it, expect } from 'vitest';
import {Gender, PluralizerFactory, Word} from "../../src";
import {RussianPluralizer} from "../../src/application/service/russian-pluralizer.service";

describe('RussianPluralizer', () => {
  // Create a factory and register the Russian pluralizer
  const factory = new PluralizerFactory();
  factory.registerPluralizer('ru', new RussianPluralizer());
  const pluralizer = factory.createPluralizer('ru');

  describe('pluralize', () => {
    it('should pluralize masculine nouns correctly', () => {
      const testCases = [
        ['стол', 'столы'],
        ['компьютер', 'компьютеры'],
        ['телефон', 'телефоны'],
        ['ноутбук', 'ноутбуки']
      ];

      testCases.forEach(([singular, expected]) => {
        const word = new Word(singular, { language: 'ru', gender: Gender.Masculine });
        expect(pluralizer.pluralize(word)).toBe(expected);
      });
    });

    it('should pluralize feminine nouns correctly', () => {
      const testCases = [
        ['книга', 'книги'],
        ['машина', 'машины'],
        ['девушка', 'девушки'],
        ['дверь', 'двери'],
        ['рука', 'руки'],
        ['нога', 'ноги']
      ];

      testCases.forEach(([singular, expected]) => {
        const word = new Word(singular, { language: 'ru', gender: Gender.Feminine });
        expect(pluralizer.pluralize(word)).toBe(expected);
      });
    });

    it('should pluralize neuter nouns correctly', () => {
      const testCases = [
        ['окно', 'окна'],
        ['письмо', 'письма'],
        ['море', 'моря'],
        ['здание', 'здания']
      ];

      testCases.forEach(([singular, expected]) => {
        const word = new Word(singular, { language: 'ru', gender: Gender.Neuter });
        expect(pluralizer.pluralize(word)).toBe(expected);
      });
    });

    it('should handle irregular nouns', () => {
      const testCases = [
        // Masculine exceptions
        ['человек', 'люди'],
        ['ребёнок', 'дети'],
        ['друг', 'друзья'],
        ['брат', 'братья'],
        ['сын', 'сыновья'],
        ['муж', 'мужья'],
        ['стул', 'стулья'],
        ['лист', 'листья'],
        ['цветок', 'цветы'],
        ['глаз', 'глаза'],
        ['город', 'города'],
        ['поезд', 'поезда'],
        ['паспорт', 'паспорта'],
        ['доктор', 'доктора'],
        ['профессор', 'профессора'],
        ['директор', 'директора'],
        ['год', 'года'],
        ['снег', 'снега'],
        ['голос', 'голоса'],
        ['край', 'края'],
        ['учитель', 'учителя'],
        
        // Feminine exceptions
        ['мать', 'матери', Gender.Feminine],
        ['дочь', 'дочери', Gender.Feminine],
        ['сестра', 'сёстры', Gender.Feminine],
        ['рука', 'руки', Gender.Feminine],
        ['нога', 'ноги', Gender.Feminine],
        ['жена', 'жёны', Gender.Feminine],
        ['звезда', 'звёзды', Gender.Feminine],
        ['слеза', 'слёзы', Gender.Feminine],
        ['любовь', 'любови', Gender.Feminine],
        
        // Neuter exceptions
        ['время', 'времена', Gender.Neuter],
        ['имя', 'имена', Gender.Neuter],
        ['семя', 'семена', Gender.Neuter],
        ['ухо', 'уши', Gender.Neuter],
        ['чудо', 'чудеса', Gender.Neuter],
        ['небо', 'небеса', Gender.Neuter],
        ['дерево', 'деревья', Gender.Neuter],
        ['колено', 'колени', Gender.Neuter],
        ['крыло', 'крылья', Gender.Neuter],
        ['плечо', 'плечи', Gender.Neuter],
        ['яблоко', 'яблоки', Gender.Neuter]
      ];

      testCases.forEach(([singular, expected, gender]) => {
        const genderValue = gender || Gender.Masculine;
        const word = new Word(singular, { language: 'ru', gender: genderValue as Gender });
        expect(pluralizer.pluralize(word)).toBe(expected);
      });
    });

    it('should not change uncountable nouns', () => {
      const uncountables = [
        'ножницы',
        'брюки',
        'очки',
        'штаны',
        'джинсы',
        'плавки',
        'перчатки',
        'наушники',
        'гантели',
        'щипцы',
        'клещи',
        'весы',
        'качели',
        'санки',
        'грабли',
        'коньки',
        'лыжи',
        'тапки',
        'туфли',
        'носки',
        'деньги',
        'финансы',
        'средства',
        'макароны',
        'дрожжи',
        'дрова',
        'духи',
        'сливки',
        'всходы',
        'сумерки',
        'данные',
        'переговоры',
        'выборы',
        'хлопоты',
        'проводы',
        'дебаты',
        'прения',
        'похороны',
        'поиски',
        'танцы',
        'шахматы',
        'сутки',
        'будни',
        'выходные',
        'чернила',
        'духи',
        'щи',
        'хлопья'
      ];

      uncountables.forEach(term => {
        const word = new Word(term, { language: 'ru' });
        expect(pluralizer.pluralize(word)).toBe(term);
      });
    });

    it('should respect count parameter', () => {
      const word = new Word('книга', { language: 'ru', gender: Gender.Feminine });
      expect(pluralizer.pluralize(word, 1)).toBe('книга');
      expect(pluralizer.pluralize(word, 2)).toBe('книги');
    });

    it('should throw error for non-Russian words', () => {
      const word = new Word('book', { language: 'en' });
      expect(() => pluralizer.pluralize(word)).toThrow();
    });
  });

  describe('isPlural', () => {
    it('should identify plural forms correctly', () => {
      const plurals = ['столы', 'книги', 'окна', 'люди', 'дети'];
      plurals.forEach(word => {
        expect(pluralizer.isPlural(word)).toBe(true);
      });
    });

    it('should identify singular forms correctly', () => {
      const singulars = ['стол', 'книга', 'окно', 'человек', 'ребёнок'];
      singulars.forEach(word => {
        expect(pluralizer.isPlural(word)).toBe(false);
      });
    });
  });

  describe('isSingular', () => {
    it('should identify singular forms correctly', () => {
      const singulars = ['стол', 'книга', 'окно', 'человек', 'ребёнок'];
      singulars.forEach(word => {
        expect(pluralizer.isSingular(word)).toBe(true);
      });
    });

    it('should identify plural forms correctly', () => {
      const plurals = ['столы', 'книги', 'окна', 'люди', 'дети'];
      plurals.forEach(word => {
        expect(pluralizer.isSingular(word)).toBe(false);
      });
    });
  });

  describe('toPlural', () => {
    it('should convert singular to plural with gender', () => {
      expect(pluralizer.toPlural('стол')).toBe('столы');
      expect(pluralizer.toPlural('книга')).toBe('книги');
      expect(pluralizer.toPlural('окно')).toBe('окна');
    });

    it('should handle irregular singulars with gender', () => {
      expect(pluralizer.toPlural('человек')).toBe('люди');
      expect(pluralizer.toPlural('ребёнок')).toBe('дети');
    });

    it('should not change plural words', () => {
      expect(pluralizer.toPlural('столы')).toBe('столы');
      expect(pluralizer.toPlural('книги')).toBe('книги');
    });

    it('should preserve case', () => {
      expect(pluralizer.toPlural('Книга')).toBe('Книги');
      expect(pluralizer.toPlural('СТОЛ')).toBe('СТОЛЫ');
    });
  });

  describe('toSingular', () => {
    it('should convert plural to singular', () => {
      expect(pluralizer.toSingular('столы')).toBe('стол');
      expect(pluralizer.toSingular('книги')).toBe('книга');
      expect(pluralizer.toSingular('окна')).toBe('окно');
    });

    it('should handle irregular plurals', () => {
      expect(pluralizer.toSingular('люди')).toBe('человек');
      expect(pluralizer.toSingular('дети')).toBe('ребёнок');
    });

    it('should not change singular words', () => {
      expect(pluralizer.toSingular('стол')).toBe('стол');
      expect(pluralizer.toSingular('книга')).toBe('книга');
    });

    it('should preserve case', () => {
      expect(pluralizer.toSingular('Книги')).toBe('Книга');
      expect(pluralizer.toSingular('СТОЛЫ')).toBe('СТОЛ');
    });
  });
});
