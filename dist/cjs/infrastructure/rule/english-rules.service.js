'use strict';

const englishPluralRules = [
    // Rule for words ending in is (analysis -> analyses, thesis -> theses, crisis -> crises)
    {
        matches: (word) => /is$/.test(word),
        apply: (word) => `${word.slice(0, -2)}es`
    },
    {
        matches: (word) => /[^aeiou]s$|[^aeiou]x$|[^aeiou]z$|[cs]h$/.test(word),
        apply: (word) => `${word}es`
    },
    {
        matches: (word) => /[aeiou]y$/.test(word),
        apply: (word) => `${word}s`
    },
    {
        matches: (word) => /[^aeiou]y$/.test(word),
        apply: (word) => `${word.slice(0, -1)}ies`
    },
    {
        matches: (word) => /f$/.test(word),
        apply: (word) => `${word.slice(0, -1)}ves`
    },
    {
        matches: (word) => /fe$/.test(word),
        apply: (word) => `${word.slice(0, -2)}ves`
    },
    {
        matches: (word) => /o$/.test(word),
        apply: (word) => `${word}es`
    },
    {
        matches: (word) => /[^sxzcs]$/.test(word),
        apply: (word) => `${word}s`
    }
];
const englishSingularRules = [
    // Rule for words ending in es (wolves -> wolf, boxes -> box, analyses -> analysis)
    {
        matches: (word) => /ses$/.test(word) && word.length > 3,
        apply: (word) => `${word.slice(0, -2)}`
    },
    {
        matches: (word) => /ies$/.test(word) && word.length > 3,
        apply: (word) => `${word.slice(0, -3)}y`
    },
    {
        matches: (word) => /ves$/.test(word) && word.length > 3,
        apply: (word) => {
            const stem = word.slice(0, -3);
            return /[^aeiouf]$/.test(stem) ? `${stem}fe` : `${stem}f`;
        }
    },
    {
        matches: (word) => /es$/.test(word) && word.length > 2,
        apply: (word) => {
            if (/[sxz]es$|[cs]hes$/.test(word)) {
                return word.slice(0, -2);
            }
            if (/oes$/.test(word)) {
                return word.slice(0, -2);
            }
            return word.slice(0, -1);
        }
    },
    {
        matches: (word) => /s$/.test(word) && word.length > 1,
        apply: (word) => word.slice(0, -1)
    }
];

exports.englishPluralRules = englishPluralRules;
exports.englishSingularRules = englishSingularRules;
