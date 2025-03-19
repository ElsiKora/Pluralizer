<p align="center">
  <img src="https://6jft62zmy9nx2oea.public.blob.vercel-storage.com/pluralizer-lPXqraLoCOMWLAiOFInjgemLC5rcNJ.png" width="500" alt="project-logo">
</p>

<h1 align="center">Pluralizer 🔄</h1>
<p align="center"><em>A powerful, multilingual library for pluralizing and singularizing words</em></p>

<p align="center">
    <a aria-label="ElsiKora logo" href="https://elsikora.com">
  <img src="https://img.shields.io/badge/MADE%20BY%20ElsiKora-333333.svg?style=for-the-badge" alt="ElsiKora">
</a> <img src="https://img.shields.io/badge/version-blue.svg?style=for-the-badge&logo=npm&logoColor=white" alt="version"> <img src="https://img.shields.io/badge/license-green.svg?style=for-the-badge&logo=license&logoColor=white" alt="license"> <img src="https://img.shields.io/badge/typescript-blue.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript"> <img src="https://img.shields.io/badge/codecov-brightgreen.svg?style=for-the-badge&logo=codecov&logoColor=white" alt="codecov"> <img src="https://img.shields.io/badge/dependencies-brightgreen.svg?style=for-the-badge&logo=npm&logoColor=white" alt="dependencies"> <img src="https://img.shields.io/badge/build-success.svg?style=for-the-badge&logo=github-actions&logoColor=white" alt="build">
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
Pluralizer is a sophisticated, zero-dependency TypeScript library designed to handle word pluralization across multiple languages. Unlike simpler solutions, Pluralizer respects language-specific rules, grammatical gender, and irregular forms, ensuring linguistically correct transformations. It provides comprehensive support for English and Russian, with a flexible architecture that allows easy extension to other languages. Whether you're building an internationalized application, creating natural language interfaces, or developing educational tools, Pluralizer offers a robust solution for grammatically correct word transformations that maintains the nuances of each supported language.

## 🚀 Features
- ✨ **Zero dependencies - lightweight and portable**
- ✨ **Full TypeScript support with comprehensive type definitions**
- ✨ **Multilingual architecture with initial support for English and Russian**
- ✨ **Gender-aware pluralization (especially important for Slavic languages)**
- ✨ **Extensive handling of irregular plural forms in all supported languages**
- ✨ **Automatic language detection based on character patterns**
- ✨ **Case preservation for maintaining proper capitalization**
- ✨ **Comprehensive API for checking if words are singular or plural**
- ✨ **Clean domain-driven design architecture for easy extensibility**
- ✨ **Modular design that allows adding new languages without modifying existing code**
- ✨ **ESM and CommonJS module support for maximum compatibility**
- ✨ **High test coverage with unit and end-to-end tests**

## 🛠 Installation
```bash
### NPM

npm install @elsikora/pluralizer


### Yarn

yarn add @elsikora/pluralizer


### PNPM

pnpm add @elsikora/pluralizer


### Bun

bun add @elsikora/pluralizer


### Direct Import (ESM)
javascript
import { pluralizer } from '@elsikora/pluralizer';


### CommonJS Import
javascript
const { pluralizer } = require('@elsikora/pluralizer');
```

## 💡 Usage
## Basic Usage

The Pluralizer library provides a straightforward API for working with word pluralization in different languages. The simplest way to use it is with the default singleton instance:

```typescript
import { pluralizer } from '@elsikora/pluralizer';

// Simple English pluralization
console.log(pluralizer.pluralize('book'));  // Output: books
console.log(pluralizer.pluralize('child')); // Output: children
console.log(pluralizer.pluralize('box'));   // Output: boxes

// Respect count parameter
console.log(pluralizer.pluralize('book', { count: 1 })); // Output: book
console.log(pluralizer.pluralize('book', { count: 2 })); // Output: books
```

## Working with Multiple Languages

Pluralizer supports automatic language detection and explicit language specification:

```typescript
import { pluralizer, EGender } from '@elsikora/pluralizer';

// Russian pluralization (requires gender specification)
console.log(pluralizer.pluralize('книга', { language: 'ru', gender: EGender.FEMININE })); // Output: книги
console.log(pluralizer.pluralize('стол', { language: 'ru', gender: EGender.MASCULINE })); // Output: столы
console.log(pluralizer.pluralize('окно', { language: 'ru', gender: EGender.NEUTER }));   // Output: окна

// Automatic language detection
console.log(pluralizer.pluralize('книга', { gender: EGender.FEMININE })); // Output: книги (detects Russian)
console.log(pluralizer.pluralize('book')); // Output: books (detects English)
```

## Converting Between Singular and Plural Forms

Pluralizer provides methods to explicitly convert between singular and plural forms:

```typescript
import { pluralizer, EGender } from '@elsikora/pluralizer';

// Converting to plural
console.log(pluralizer.toPlural('book')); // Output: books
console.log(pluralizer.toPlural('child')); // Output: children
console.log(pluralizer.toPlural('книга', { gender: EGender.FEMININE })); // Output: книги

// Converting to singular
console.log(pluralizer.toSingular('books')); // Output: book
console.log(pluralizer.toSingular('children')); // Output: child
console.log(pluralizer.toSingular('книги', 'ru')); // Output: книга
```

## Checking Word Forms

Use these methods to check if a word is in singular or plural form:

```typescript
import { pluralizer } from '@elsikora/pluralizer';

// Check if a word is plural
console.log(pluralizer.isPlural('books')); // Output: true
console.log(pluralizer.isPlural('book'));  // Output: false
console.log(pluralizer.isPlural('children')); // Output: true
console.log(pluralizer.isPlural('книги', 'ru')); // Output: true

// Check if a word is singular
console.log(pluralizer.isSingular('book')); // Output: true
console.log(pluralizer.isSingular('books')); // Output: false
console.log(pluralizer.isSingular('стол', 'ru')); // Output: true
```

## Advanced Usage with Word Entity

For more control, you can create Word entities directly:

```typescript
import { Word, PluralizerFactory, EGender } from '@elsikora/pluralizer';

// Create a factory and get a specific language pluralizer
const factory = new PluralizerFactory();
const englishPluralizer = factory.createPluralizer('en');

// Create a Word entity with properties
const word = new Word('phenomenon', { language: 'en' });

// Pluralize using the entity
console.log(englishPluralizer.pluralize(word)); // Output: phenomena

// Russian word with gender
const russianPluralizer = factory.createPluralizer('ru');
const russianWord = new Word('книга', { language: 'ru', gender: EGender.FEMININE });
console.log(russianPluralizer.pluralize(russianWord)); // Output: книги
```

## Creating a Custom Instance

If you need a custom configuration, you can create your own Pluralizer instance:

```typescript
import { Pluralizer, LanguageDetector } from '@elsikora/pluralizer';

// Create a custom pluralizer instance
const customPluralizer = new Pluralizer();

// Get supported languages
const languages = customPluralizer.getSupportedLanguages();
console.log(languages); // Output: ['en', 'ru']

// Check language support
console.log(customPluralizer.supportsLanguage('en')); // Output: true
console.log(customPluralizer.supportsLanguage('fr')); // Output: false

// Create a custom language detector and add patterns
const detector = new LanguageDetector('es'); // Set Spanish as default
detector.addLanguagePattern('fr', /[àâäæçéèêëîïôœùûüÿ]/i); // Add French pattern
```

## Handling Special Cases

Pluralizer includes special handling for irregular forms and uncountable words:

```typescript
import { pluralizer } from '@elsikora/pluralizer';

// English irregular plurals
console.log(pluralizer.toPlural('phenomenon')); // Output: phenomena
console.log(pluralizer.toPlural('criterion')); // Output: criteria
console.log(pluralizer.toPlural('analysis')); // Output: analyses
console.log(pluralizer.toPlural('cactus')); // Output: cacti

// Russian irregular plurals
console.log(pluralizer.toPlural('человек', { gender: EGender.MASCULINE })); // Output: люди
console.log(pluralizer.toPlural('ребёнок', { gender: EGender.MASCULINE })); // Output: дети

// Uncountable words remain unchanged
console.log(pluralizer.toPlural('equipment')); // Output: equipment
console.log(pluralizer.toPlural('information')); // Output: information
console.log(pluralizer.toPlural('ножницы', { language: 'ru' })); // Output: ножницы
```

## Case Preservation

Pluralizer intelligently preserves the original case pattern:

```typescript
import { pluralizer } from '@elsikora/pluralizer';

// Upper case preservation
console.log(pluralizer.toPlural('BOOK')); // Output: BOOKS
console.log(pluralizer.toPlural('CHILD')); // Output: CHILDREN

// First letter capitalization
console.log(pluralizer.toPlural('Book')); // Output: Books
console.log(pluralizer.toPlural('Child')); // Output: Children

// Mixed case preservation
console.log(pluralizer.toPlural('CamelCase')); // Output: CamelCases
console.log(pluralizer.toPlural('iPod')); // Output: iPods
```

## React/Next.js Integration Example

```tsx
import { useState } from 'react';
import { pluralizer } from '@elsikora/pluralizer';

function ItemCounter() {
  const [count, setCount] = useState(1);
  const itemText = pluralizer.pluralize('item', { count });
  
  return (
    <div>
      <button onClick={() => setCount(c => Math.max(0, c - 1))}>-</button>
      <span>{count} {itemText}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}
```

## Internationalization (i18n) Integration

```typescript
import { pluralizer, EGender } from '@elsikora/pluralizer';

function formatMessage(key, count, language = 'en') {
  const messages = {
    'item.count': {
      en: `You have ${count} {item}`,
      ru: `У вас ${count} {item}`
    }
  };
  
  const template = messages[key][language];
  const itemWord = language === 'en' ? 'item' : 'предмет';
  const gender = language === 'ru' ? EGender.MASCULINE : undefined;
  
  return template.replace('{item}', pluralizer.pluralize(itemWord, { count, language, gender }));
}

console.log(formatMessage('item.count', 1, 'en')); // Output: You have 1 item
console.log(formatMessage('item.count', 5, 'en')); // Output: You have 5 items
console.log(formatMessage('item.count', 1, 'ru')); // Output: У вас 1 предмет
console.log(formatMessage('item.count', 5, 'ru')); // Output: У вас 5 предметов
```

## 🛣 Roadmap
| Task / Feature | Status |
|---------------|--------|
| ## Future Development | 🚧 In Progress |
| - Add support for Spanish language pluralization rules | 🚧 In Progress |
| - Expand language support to include French, German, Italian, and more | 🚧 In Progress |
| - Create specialized handling for proper nouns and names | 🚧 In Progress |
| - Develop additional detection mechanisms for ambiguous words | 🚧 In Progress |
| - Add context-aware pluralization for languages with complex number agreement | 🚧 In Progress |
| - Implement browser-specific optimizations for web applications | 🚧 In Progress |
| - Create plugins for popular frameworks (React, Vue, Angular) | 🚧 In Progress |
| - Build integrations with common i18n libraries | 🚧 In Progress |
| - Develop a web-based demo and playground | 🚧 In Progress |
| - Support for numerical words ("one" → "ones", "first" → "firsts") | 🚧 In Progress |
| - Implement count-specific forms for languages with complex countable forms | 🚧 In Progress |
| (done) Zero dependencies - lightweight and portable | 🚧 In Progress |
| (done) Full TypeScript support with comprehensive type definitions | 🚧 In Progress |
| (done) Multilingual architecture with initial support for English and Russian | 🚧 In Progress |

## ❓ FAQ
## Frequently Asked Questions

### How does Pluralizer handle words that are the same in both singular and plural forms?

Pluralizer maintains a comprehensive list of uncountable words for each supported language. Words like "sheep", "fish", "series" in English or "ножницы", "брюки" in Russian are recognized as special cases and will not be transformed.

### Does Pluralizer work with proper nouns and names?

Yes, Pluralizer can handle proper nouns and names. However, because names often follow special pluralization rules or maintain their form, results may vary. We recommend testing with your specific use cases.

### How accurate is the automatic language detection?

The language detector uses character pattern recognition that's highly reliable for distinguishing between Latin-based languages and Cyrillic. For languages sharing the same alphabet, explicit language specification is recommended for best results.

### Can I add support for a new language?

Yes! Pluralizer is designed with extensibility in mind. You can create a new language implementation by extending the appropriate interfaces and registering it with the PluralizerFactory. The documentation includes examples for implementing new language support.

### How does Pluralizer handle case sensitivity?

Pluralizer intelligently preserves the case pattern of the original word. Whether your word is lowercase, UPPERCASE, Title Case, camelCase, or a miXeD case pattern, Pluralizer will maintain that pattern in the transformed word.

### Does Pluralizer support non-standard pluralization rules in technical contexts?

Yes, Pluralizer is built to handle specialized terminology. For example, it correctly transforms technical terms like "index" to "indices" and "matrix" to "matrices". If you encounter specialized terms not handled correctly, you can extend the irregular words list.

### How does Pluralizer handle hyphenated or compound words?

For compound words, Pluralizer typically pluralizes the last word component. For example, "mother-in-law" becomes "mothers-in-law". However, some compound words follow special rules and are included in the irregular words lists.

### Is Pluralizer suitable for large-scale applications?

Yes, Pluralizer is designed for performance and has zero dependencies, making it suitable for large-scale applications. Its modular design allows you to load only the languages you need.

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
