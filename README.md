<p align="center">
  <img src="https://6jft62zmy9nx2oea.public.blob.vercel-storage.com/pluralizer-lPXqraLoCOMWLAiOFInjgemLC5rcNJ.png" width="500" alt="project-logo">
</p>

<h1 align="center">Pluralizer 🌐</h1>
<p align="center"><em>A powerful multilingual library for pluralizing words in English, Spanish, and Russian</em></p>

<p align="center">
    <a aria-label="ElsiKora logo" href="https://elsikora.com">
  <img src="https://img.shields.io/badge/MADE%20BY%20ElsiKora-333333.svg?style=for-the-badge" alt="ElsiKora">
</a> <img src="https://img.shields.io/badge/version-blue.svg?style=for-the-badge&logo=npm&logoColor=white" alt="version"> <img src="https://img.shields.io/badge/license-green.svg?style=for-the-badge&logo=license&logoColor=white" alt="license"> <img src="https://img.shields.io/badge/javascript-yellow.svg?style=for-the-badge&logo=javascript&logoColor=white" alt="javascript"> <img src="https://img.shields.io/badge/typescript-blue.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript"> <img src="https://img.shields.io/badge/build-brightgreen.svg?style=for-the-badge&logo=github-actions&logoColor=white" alt="build"> <img src="https://img.shields.io/badge/coverage-brightgreen.svg?style=for-the-badge&logo=codecov&logoColor=white" alt="coverage">
</p>


## 📚 Table of Contents
- [Description](#-description)
- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Roadmap](#-roadmap)
- [FAQ](#-faq)
- [License](#-license)


## 📖 Description
Pluralizer is a versatile, zero-dependency library that handles the complexities of pluralization across multiple languages. Built with a clean domain-driven architecture, it offers an intuitive API for transforming words between singular and plural forms while accounting for language-specific grammatical rules, irregular forms, and gender considerations. Whether you're developing multilingual applications, localization tools, or educational software, Pluralizer provides precise word transformations with automatic language detection, making it an essential tool for any internationalized project.

## 🚀 Features
- ✨ **Support for multiple languages: English, Spanish, and Russian out of the box**
- ✨ **Automatic language detection based on character patterns**
- ✨ **Gender-aware pluralization for languages like Russian and Spanish**
- ✨ **Comprehensive handling of irregular plural forms in all supported languages**
- ✨ **Ability to check if a word is singular or plural**
- ✨ **Preservation of original word capitalization**
- ✨ **Zero dependencies, lightweight and efficient**
- ✨ **Clean, modular architecture following Domain-Driven Design principles**
- ✨ **Handles uncountable nouns and special cases across languages**
- ✨ **Available in both CommonJS and ESM formats**
- ✨ **Fully typed with TypeScript for better developer experience**

## 🛠 Installation
```bash
# Using npm
npm install pluralizer

# Using yarn
yarn add pluralizer

# Using pnpm
pnpm add pluralizer

# Using bun
bun add pluralizer
```

## 💡 Usage
## Basic Usage

Pluralizer exports a default singleton instance that you can use right away:

```typescript
import pluralizer from 'pluralizer';

// English (default language)
console.log(pluralizer.pluralize('book')); // 'books'
console.log(pluralizer.pluralize('child')); // 'children'

// Spanish with explicit language setting
console.log(pluralizer.pluralize('libro', { language: 'es' })); // 'libros'
console.log(pluralizer.pluralize('luz', { language: 'es' })); // 'luces'

// Russian with gender specification
import { EGender } from 'pluralizer';

console.log(pluralizer.pluralize('книга', { 
  language: 'ru', 
  gender: EGender.FEMININE 
})); // 'книги'

console.log(pluralizer.pluralize('стол', { 
  language: 'ru', 
  gender: EGender.MASCULINE 
})); // 'столы'
```

## Automatic Language Detection

Pluralizer can automatically detect the language of a word based on character patterns:

```typescript
// Russian characters are detected automatically
console.log(pluralizer.pluralize('книга', { gender: EGender.FEMININE })); // 'книги'

// Spanish words with special characters are detected
console.log(pluralizer.pluralize('habitación')); // 'habitaciones'

// Everything else defaults to English
console.log(pluralizer.pluralize('book')); // 'books'
```

## Count-Based Pluralization

You can specify a count to determine if the word should be pluralized:

```typescript
// With count = 1, returns singular form
console.log(pluralizer.pluralize('book', { count: 1 })); // 'book'

// With count > 1, returns plural form
console.log(pluralizer.pluralize('book', { count: 2 })); // 'books'

// Works with any supported language
console.log(pluralizer.pluralize('книга', { 
  language: 'ru', 
  gender: EGender.FEMININE, 
  count: 1 
})); // 'книга'

console.log(pluralizer.pluralize('книга', { 
  language: 'ru', 
  gender: EGender.FEMININE, 
  count: 5 
})); // 'книги'
```

## Checking Word Forms

You can check if a word is in singular or plural form:

```typescript
// English
console.log(pluralizer.isPlural('books')); // true
console.log(pluralizer.isPlural('book')); // false
console.log(pluralizer.isSingular('child')); // true
console.log(pluralizer.isSingular('children')); // false

// With explicit language specification
console.log(pluralizer.isPlural('книги', 'ru')); // true
console.log(pluralizer.isSingular('libro', 'es')); // true
```

## Converting Between Forms

Specifically convert to plural or singular form:

```typescript
// To plural
console.log(pluralizer.toPlural('book')); // 'books'
console.log(pluralizer.toPlural('стол', { 
  language: 'ru', 
  gender: EGender.MASCULINE 
})); // 'столы'

// To singular
console.log(pluralizer.toSingular('books')); // 'book'
console.log(pluralizer.toSingular('libros', 'es')); // 'libro'
```

## Creating Your Own Instance

If you need a custom instance of the Pluralizer:

```typescript
import { Pluralizer } from 'pluralizer';

const customPluralizer = new Pluralizer();
console.log(customPluralizer.pluralize('book')); // 'books'
```

## Advanced: Handling Irregular Forms

Pluralizer handles a wide range of irregular forms in all supported languages:

```typescript
// English irregular forms
console.log(pluralizer.toPlural('child')); // 'children'
console.log(pluralizer.toPlural('person')); // 'people'
console.log(pluralizer.toPlural('criterion')); // 'criteria'
console.log(pluralizer.toPlural('analysis')); // 'analyses'

// Russian irregular forms
console.log(pluralizer.toPlural('человек', { 
  language: 'ru', 
  gender: EGender.MASCULINE 
})); // 'люди'

console.log(pluralizer.toPlural('ребёнок', { 
  language: 'ru', 
  gender: EGender.MASCULINE 
})); // 'дети'

// Spanish irregular forms
console.log(pluralizer.toPlural('el régimen', { language: 'es' })); // 'los regímenes'
console.log(pluralizer.toPlural('crisis', { language: 'es' })); // 'crisis' (unchanged)
```

## Working with Object Models

For more complex scenarios, you can use the `Word` entity directly:

```typescript
import { Word, EGender, PluralizerFactory } from 'pluralizer';

// Create a factory and get a language-specific pluralizer
const factory = new PluralizerFactory();
const ruPluralizer = factory.createPluralizer('ru');

// Create a Word entity with specific properties
const word = new Word('книга', { 
  language: 'ru', 
  gender: EGender.FEMININE 
});

// Pluralize using the specific pluralizer
console.log(ruPluralizer.pluralize(word)); // 'книги'
```

## Supported Languages

You can check which languages are supported:

```typescript
// Get all supported languages
console.log(pluralizer.getSupportedLanguages()); // ['en', 'ru', 'es']

// Check if a specific language is supported
console.log(pluralizer.supportsLanguage('en')); // true
console.log(pluralizer.supportsLanguage('fr')); // false
```

## 🛣 Roadmap
| Task / Feature | Status |
|---------------|--------|
| ## Future Development Plans | 🚧 In Progress |
| - Support for additional languages (French, German, Italian, etc.) | 🚧 In Progress |
| - Extended handling of grammatical cases for Slavic languages | 🚧 In Progress |
| - CLI tool for batch processing of text files | 🚧 In Progress |
| - Browser extension for on-the-fly pluralization | 🚧 In Progress |
| - Integration with popular i18n libraries | 🚧 In Progress |
| - Performance optimizations for handling large text corpora | 🚧 In Progress |
| - Support for number-to-word conversion with correct pluralization | 🚧 In Progress |
| - API for contributing custom language rules and exceptions | 🚧 In Progress |
| (done) Support for multiple languages: English, Spanish, and Russian out of the box | 🚧 In Progress |
| (done) Automatic language detection based on character patterns | 🚧 In Progress |
| (done) Gender-aware pluralization for languages like Russian and Spanish | 🚧 In Progress |

## ❓ FAQ
## Frequently Asked Questions

### Does Pluralizer work in both Node.js and browser environments?
Yes, Pluralizer works in any JavaScript environment, including Node.js, browsers, and edge runtimes.

### How does automatic language detection work?
Pluralizer detects the language based on character patterns. Russian is detected by the presence of Cyrillic characters, Spanish by the presence of Spanish-specific characters like á, é, í, ó, ú, ü, ñ, ¿, ¡. If no specific pattern is detected, it defaults to English.

### Is gender specification required for all languages?
Gender specification is particularly important for Russian and somewhat for Spanish, but not needed for English. For best results with Russian words, always provide the gender when possible.

### Can I add support for additional languages?
Currently, you would need to fork the repository and implement the language-specific pluralizer following the existing patterns. Future versions may provide a more standardized way to extend language support.

### How does Pluralizer handle compound words or phrases?
Pluralizer typically works best with single words. For phrases, you may need to apply pluralization to individual words as appropriate for the target language.

### What's the performance impact for large texts?
Pluralizer is designed to be efficient even with large texts. The automatic language detection and rule-based approach ensures good performance for most use cases.

### Does Pluralizer support regional language variations?
Currently, Pluralizer uses standardized rules for each language and doesn't account for regional variations. Future versions may add support for regional differences in pluralization rules.

## 🔒 License
This project is licensed under **MIT License

Copyright (c) 2025 ElsiKora

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.**.
