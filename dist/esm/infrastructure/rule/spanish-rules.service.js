const spanishPluralRules = [
    // Special handling for words ending with 'ión' - they drop the accent in plural form
    {
        matches: (word) => /ón$/.test(word) || /ión$/.test(word),
        apply: (word) => {
            // Replace the accented letter with its unaccented version
            if (word.endsWith('ón')) {
                return `${word.slice(0, -2)}ones`;
            }
            else if (word.endsWith('ión')) {
                return `${word.slice(0, -3)}iones`;
            }
            return word;
        }
    },
    // Words ending in -z change to -ces (handle this first before consonant rule)
    {
        matches: (word) => /z$/.test(word),
        apply: (word) => `${word.slice(0, -1)}ces`
    },
    // Words ending in unstressed vowel or 'é' add -s
    {
        matches: (word) => /[aeiouáéíóúü]$|é$/.test(word),
        apply: (word) => `${word}s`
    },
    // Words ending in a consonant (but not z, which is handled separately) add -es
    {
        matches: (word) => /[bcdfghjklmnñpqrstvwxy]$/.test(word),
        apply: (word) => `${word}es`
    },
    // Words ending in stressed vowels with an accent mark add -es and lose the accent
    {
        matches: (word) => /[áíóú]$/.test(word),
        apply: (word) => {
            const unaccented = word.replace(/á$/, 'a').replace(/í$/, 'i').replace(/ó$/, 'o').replace(/ú$/, 'u');
            return `${unaccented}es`;
        }
    },
    // Words ending in -s or -x with more than one syllable remain unchanged in plural form
    {
        matches: (word) => (/[sx]$/.test(word) && word.length > 1),
        apply: (word) => word
    }
];
const spanishSingularRules = [
    // Words ending in -iones (singular form ends in -ión)
    {
        matches: (word) => /iones$/.test(word),
        apply: (word) => `${word.slice(0, -5)}ión`
    },
    // Words ending in -ones (singular form usually ends in -ón)
    {
        matches: (word) => /ones$/.test(word) && !/ciones$/.test(word) && !/[aeiou]iones$/.test(word),
        apply: (word) => `${word.slice(0, -4)}ón`
    },
    // Words ending in -ces (plural of -z)
    {
        matches: (word) => /ces$/.test(word) && word.length > 3,
        apply: (word) => `${word.slice(0, -3)}z`
    },
    // Words ending in -es where the singular ends in a consonant
    {
        matches: (word) => /[^aeiouáéíóúü]es$/.test(word) && word.length > 2,
        apply: (word) => word.slice(0, -2)
    },
    // Words ending in -s that are the same in singular and plural (like 'crisis')
    {
        matches: (word) => /[^aeiouáéíóúü]s$/.test(word) && word.length > 1,
        apply: (word) => word
    },
    // Basic -s removal for words ending in vowel + s
    {
        matches: (word) => /[aeiouáéíóúü]s$/.test(word) && word.length > 1,
        apply: (word) => word.slice(0, -1)
    }
];

export { spanishPluralRules, spanishSingularRules };
