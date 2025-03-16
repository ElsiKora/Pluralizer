'use strict';

var word_entity = require('../../domain/entities/word.entity.js');

const russianPluralRules = [
    // Masculine nouns
    {
        matches: (word, gender) => gender === word_entity.Gender.Masculine && /[бвгдзлмнпрстфх]$/.test(word),
        apply: (word) => `${word}ы`
    },
    {
        matches: (word, gender) => gender === word_entity.Gender.Masculine && /[кгх]$/.test(word),
        apply: (word) => `${word}и`
    },
    {
        matches: (word, gender) => gender === word_entity.Gender.Masculine && /[йь]$/.test(word),
        apply: (word) => `${word.slice(0, -1)}и`
    },
    {
        matches: (word, gender) => gender === word_entity.Gender.Masculine && /[жшщч]$/.test(word),
        apply: (word) => `${word}и`
    },
    // Feminine nouns
    {
        matches: (word, gender) => gender === word_entity.Gender.Feminine && /а$/.test(word),
        apply: (word) => {
            const stem = word.slice(0, -1);
            // Согласные после которых пишется "и" вместо "ы"
            if (/[жшщчгкх]$/.test(stem)) {
                return `${stem}и`;
            }
            return `${stem}ы`;
        }
    },
    {
        matches: (word, gender) => gender === word_entity.Gender.Feminine && /я$/.test(word),
        apply: (word) => `${word.slice(0, -1)}и`
    },
    {
        matches: (word, gender) => gender === word_entity.Gender.Feminine && /ь$/.test(word),
        apply: (word) => `${word.slice(0, -1)}и`
    },
    // Neuter nouns
    {
        matches: (word, gender) => gender === word_entity.Gender.Neuter && /о$/.test(word),
        apply: (word) => `${word.slice(0, -1)}а`
    },
    {
        matches: (word, gender) => gender === word_entity.Gender.Neuter && /е$/.test(word),
        apply: (word) => `${word.slice(0, -1)}я`
    },
    {
        matches: (word, gender) => gender === word_entity.Gender.Neuter && /мя$/.test(word),
        apply: (word) => `${word.slice(0, -1)}ена`
    }
];
const russianSingularRules = [
    // Masculine plurals to singular
    {
        matches: (word, gender) => gender === word_entity.Gender.Masculine && /ы$/.test(word),
        apply: (word) => word.slice(0, -1)
    },
    {
        matches: (word, gender) => gender === word_entity.Gender.Masculine && /и$/.test(word),
        apply: (word) => {
            const stem = word.slice(0, -1);
            if (/[жшщч]$/.test(stem)) {
                return stem;
            }
            return `${stem}ь`;
        }
    },
    // Feminine plurals to singular
    {
        matches: (word, gender) => gender === word_entity.Gender.Feminine && /ы$/.test(word),
        apply: (word) => `${word.slice(0, -1)}а`
    },
    {
        matches: (word, gender) => gender === word_entity.Gender.Feminine && /и$/.test(word),
        apply: (word) => {
            const stem = word.slice(0, -1);
            if (/[жшщч]$/.test(stem)) {
                return `${stem}а`;
            }
            return `${stem}я`;
        }
    },
    // Neuter plurals to singular
    {
        matches: (word, gender) => gender === word_entity.Gender.Neuter && /а$/.test(word),
        apply: (word) => `${word.slice(0, -1)}о`
    },
    {
        matches: (word, gender) => gender === word_entity.Gender.Neuter && /я$/.test(word),
        apply: (word) => `${word.slice(0, -1)}е`
    },
    {
        matches: (word, gender) => gender === word_entity.Gender.Neuter && /ена$/.test(word),
        apply: (word) => `${word.slice(0, -3)}мя`
    }
];

exports.russianPluralRules = russianPluralRules;
exports.russianSingularRules = russianSingularRules;
