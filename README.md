<p align="center">
  <img src="https://6jft62zmy9nx2oea.public.blob.vercel-storage.com/pluralizer-lPXqraLoCOMWLAiOFInjgemLC5rcNJ.png" width="500" alt="project-logo">
</p>

<h1 align="center">Pluralizer 🔄</h1>
<p align="center"><em>A powerful multilingual word pluralization library with zero dependencies</em></p>

<p align="center">
    <a aria-label="ElsiKora logo" href="https://elsikora.com">
  <img src="https://img.shields.io/badge/MADE%20BY%20ElsiKora-333333.svg?style=for-the-badge" alt="ElsiKora">
</a> <img src="https://img.shields.io/badge/npm-blue.svg?style=for-the-badge&logo=npm&logoColor=white" alt="npm"> <img src="https://img.shields.io/badge/version-brightgreen.svg?style=for-the-badge&logo=github&logoColor=white" alt="version"> <img src="https://img.shields.io/badge/license-blue.svg?style=for-the-badge&logo=license&logoColor=white" alt="license"> <img src="https://img.shields.io/badge/typescript-blue.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript"> <img src="https://img.shields.io/badge/coverage-brightgreen.svg?style=for-the-badge&logo=codecov&logoColor=white" alt="coverage"> <img src="https://img.shields.io/badge/zero-deps-brightgreen.svg?style=for-the-badge&logo=dependabot&logoColor=white" alt="zero-deps">
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
Pluralizer is a robust, language-aware library for handling word pluralization and singularization across multiple languages. Built with a clean domain-driven architecture, it provides accurate word form transformations while respecting grammatical nuances specific to each supported language. Whether you're developing multilingual applications, content management systems, or natural language processing tools, Pluralizer offers a sophisticated solution for handling linguistic transformations with precision. The library currently supports English and Russian with plans to expand to other languages, making it ideal for developers working on global applications that require grammatically correct text generation.

## 🚀 Features
- ✨ **Multi-language support with comprehensive handling of English and Russian**
- ✨ **Automatic language detection for seamless integration in multilingual applications**
- ✨ **Gender-aware pluralization for languages with grammatical gender**
- ✨ **Extensive irregular word handling with carefully curated exception dictionaries**
- ✨ **Preservation of original word capitalization and formatting**
- ✨ **Zero dependencies for minimal footprint in your application**
- ✨ **Comprehensive API with intuitive methods for pluralization, singularization, and form checking**
- ✨ **TypeScript support with full type definitions for enhanced developer experience**
- ✨ **Modular architecture allowing easy extension to additional languages**
- ✨ **Built with domain-driven design principles for maintainability and extensibility**

## 🛠 Installation
```bash
# Using npm
npm install @elsikora/pluralizer

# Using yarn
yarn add @elsikora/pluralizer

# Using pnpm
pnpm add @elsikora/pluralizer

# Using bun
bun add @elsikora/pluralizer


Pluralizer has zero dependencies, so installation is quick and keeps your node_modules clean.
```

## 💡 Usage
## Basic Usage

Pluralizer provides a default export that's ready to use with English words out of the box:

```typescript
import pluralizer from '@elsikora/pluralizer';

// Simple English pluralization
console.log(pluralizer.pluralize('book')); // 'books'
console.log(pluralizer.pluralize('child')); // 'children'
console.log(pluralizer.pluralize('box')); // 'boxes'

// Conditional pluralization based on count
console.log(pluralizer.pluralize('book', { count: 1 })); // 'book'
console.log(pluralizer.pluralize('book', { count: 2 })); // 'books'
```

## Multilingual Support

Pluralizer can handle words in different languages and will automatically detect the language when possible:

```typescript
import pluralizer, { EGender } from '@elsikora/pluralizer';

// Russian words with explicit language and gender
console.log(pluralizer.pluralize('книга', { language: 'ru', gender: EGender.FEMININE })); // 'книги'
console.log(pluralizer.pluralize('стол', { language: 'ru', gender: EGender.MASCULINE })); // 'столы'
console.log(pluralizer.pluralize('окно', { language: 'ru', gender: EGender.NEUTER })); // 'окна'

// Automatic language detection works too
console.log(pluralizer.pluralize('книга', { gender: EGender.FEMININE })); // 'книги'
console.log(pluralizer.pluralize('book')); // 'books'
```

## Working with Word Forms

Check if words are in singular or plural form:

```typescript
import pluralizer from '@elsikora/pluralizer';

// Check English words
console.log(pluralizer.isPlural('books')); // true
console.log(pluralizer.isPlural('book')); // false
console.log(pluralizer.isSingular('child')); // true
console.log(pluralizer.isSingular('children')); // false

// Check Russian words (specify language)
console.log(pluralizer.isPlural('книги', 'ru')); // true
console.log(pluralizer.isPlural('книга', 'ru')); // false
```

Explicitly convert between forms:

```typescript
import pluralizer, { EGender } from '@elsikora/pluralizer';

// To plural form
console.log(pluralizer.toPlural('book')); // 'books'
console.log(pluralizer.toPlural('child')); // 'children'
console.log(pluralizer.toPlural('книга', { language: 'ru', gender: EGender.FEMININE })); // 'книги'

// To singular form
console.log(pluralizer.toSingular('books')); // 'book'
console.log(pluralizer.toSingular('children')); // 'child'
console.log(pluralizer.toSingular('книги', 'ru')); // 'книга'
```

## Advanced Usage with Custom Instances

For more control, you can create a custom instance of the Pluralizer class:

```typescript
import { Pluralizer, Word, EGender } from '@elsikora/pluralizer';

const customPluralizer = new Pluralizer();

// Create Word objects for more control
const bookWord = new Word('book', { language: 'en' });
const tableWord = new Word('стол', { language: 'ru', gender: EGender.MASCULINE });

console.log(customPluralizer.pluralize(bookWord)); // 'books'
console.log(customPluralizer.pluralize(tableWord)); // 'столы'
```

## Working with the Factory

For advanced use cases, you can use the factory directly:

```typescript
import { PluralizerFactory, EnglishPluralizer, RussianPluralizer } from '@elsikora/pluralizer';

// Create a custom factory
const factory = new PluralizerFactory();

// Register language implementations
factory.registerPluralizer('en', new EnglishPluralizer());
factory.registerPluralizer('ru', new RussianPluralizer());

// Get language-specific pluralizers
const enPluralizer = factory.createPluralizer('en');
const ruPluralizer = factory.createPluralizer('ru');

console.log(enPluralizer.toPlural('analysis')); // 'analyses'
console.log(ruPluralizer.toPlural('человек')); // 'люди'

// Check supported languages
console.log(factory.getSupportedLanguages()); // ['en', 'ru']
console.log(factory.supportsLanguage('en')); // true
console.log(factory.supportsLanguage('fr')); // false
```

## Complex Cases and Irregular Words

Pluralizer handles a wide range of complex cases in both languages:

```typescript
import pluralizer from '@elsikora/pluralizer';

// English irregular forms
console.log(pluralizer.toPlural('criterion')); // 'criteria'
console.log(pluralizer.toPlural('analysis')); // 'analyses'
console.log(pluralizer.toPlural('cactus')); // 'cacti'
console.log(pluralizer.toPlural('focus')); // 'foci'
console.log(pluralizer.toPlural('thesis')); // 'theses'
console.log(pluralizer.toPlural('phenomenon')); // 'phenomena'

// Russian irregular forms
console.log(pluralizer.toPlural('человек', { language: 'ru' })); // 'люди'
console.log(pluralizer.toPlural('ребёнок', { language: 'ru' })); // 'дети'
console.log(pluralizer.toPlural('время', { language: 'ru', gender: EGender.NEUTER })); // 'времена'
```

## Capitalization Preservation

Pluralizer preserves the original capitalization of words:

```typescript
import pluralizer from '@elsikora/pluralizer';

console.log(pluralizer.toPlural('Book')); // 'Books'
console.log(pluralizer.toPlural('APPLE')); // 'APPLES'
console.log(pluralizer.toPlural('Child')); // 'Children'
console.log(pluralizer.toPlural('Книга', { gender: EGender.FEMININE })); // 'Книги'
console.log(pluralizer.toPlural('СТОЛ', { gender: EGender.MASCULINE })); // 'СТОЛЫ'
```

## 🛣 Roadmap
| Task / Feature | Status |
|---------------|--------|
| # Future Development Roadmap | 🚧 In Progress |
| - Add support for Spanish language with gender-aware pluralization | 🚧 In Progress |
| - Implement French language support | 🚧 In Progress |
| - Add German language with its complex pluralization rules | 🚧 In Progress |
| - Support for more complex grammatical cases in Slavic languages | 🚧 In Progress |
| - Expose an API for language pattern registration | 🚧 In Progress |
| - Create plugins for popular frameworks (React, Vue, etc.) | 🚧 In Progress |
| - Develop a web demo for trying the library | 🚧 In Progress |
| - Support for numerical inflection (1st, 2nd, 3rd, etc.) | 🚧 In Progress |
| - Implement specialized rules for technical and scientific terminology | 🚧 In Progress |
| - Support for context-dependent pluralization | 🚧 In Progress |
| (done) Multi-language support with comprehensive handling of English and Russian | 🚧 In Progress |
| (done) Automatic language detection for seamless integration in multilingual applications | 🚧 In Progress |
| (done) Gender-aware pluralization for languages with grammatical gender | 🚧 In Progress |

## ❓ FAQ
## Frequently Asked Questions

### Is Pluralizer suitable for production use?
Yes! Pluralizer has extensive test coverage and is built with maintainability in mind. It's designed to be reliable in production environments.

### Does Pluralizer work in both Node.js and browser environments?
Yes, Pluralizer works in any JavaScript environment and is distributed in both ESM and CommonJS formats.

### How does language detection work?
Language detection is based on character patterns. For example, Cyrillic characters trigger Russian language detection, while the absence of special characters defaults to English.

### What if I need to support a language that isn't included?
Pluralizer is designed to be extensible. You can implement your own language service by following the IPluralizer interface and register it with the PluralizerFactory.

### Does Pluralizer handle uncountable words?
Yes, the library maintains comprehensive lists of uncountable words for each supported language (like "information" or "деньги") and handles them appropriately.

### How large is this library?
Pluralizer is very lightweight. Since it has zero dependencies, it adds minimal overhead to your project.

### Is there a performance impact when using automatic language detection?
The language detection is very efficient and adds negligible overhead. However, if you're processing large amounts of text, explicitly specifying the language may improve performance.

### How do I handle words that need context for correct pluralization?
For words that need additional context, use the Word class to create word entities with the proper grammatical properties.

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
