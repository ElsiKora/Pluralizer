# Add gender tests to Spanish and update interfaces structure

## Plan Overview

**Description:** 1. Add tests with gender to Spanish pluralizer tests
2. Update e2e tests to import from /dist/esm instead of /src
3. Extract interfaces and types from word.entity.ts into separate files

**Created:** 2025-03-16T15:45:39.585Z
**Updated:** 2025-03-16T15:50:59.563Z

**Additional Metadata:**

## Progress Summary

- **Overall Progress:** 64%
- **Completed Items:** 7/11
- **In Progress:** 1
- **Pending:** 0
- **Blocked:** 3
- **Total File Operations:** 11
- **Total Document Operations:** 0

## Task Plan

- ✅ **[file-6do1t7-m8bt532u]** 📄 Modify: Extract types and interfaces from word.entity.ts
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/domain/entities/word.entity.ts``
- 🚫 **[file-6bzcmt-m8bt55fq]** 📄 Create language.type.ts file for the Language type
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/domain/types/language.type.ts``
- 🚫 **[file-e0pzfz-m8bt57hy]** 📄 Create gender.enum.ts file for the Gender enum
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/domain/enums/gender.enum.ts``
- 🚫 **[file-m1m97v-m8bt59v6]** 📄 Create word-properties.interface.ts file for the WordProperties interface
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/domain/interfaces/word-properties.interface.ts``
- ✅ **[file-p0u5n3-m8bt5bwg]** 📄 Modify: Update index.ts to export new types and interfaces
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/index.ts``
- ✅ **[file-72nvh1-m8bt5ea3]** 📄 Modify: Update e2e tests to import from /dist/esm instead of /src
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/tests/e2e/pluralizer.test.ts``
- ✅ **[file-g9pic1-m8bt5gbl]** 📄 Modify: Add gender tests to Spanish pluralizer tests
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/tests/unit/spanish-pluralizer.test.ts``
- ✅ **[file-6mxzyi-m8bt6eui]** 📄 Create language.type.ts file for the Language type
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/domain/type/language.type.ts``
- ✅ **[file-7qjtul-m8bt6kg3]** 📄 Create gender.enum.ts file for the Gender enum
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/domain/enum/gender.enum.ts``
- ✅ **[file-0mcop1-m8bt6pxu]** 📄 Create word-properties.interface.ts file for the WordProperties interface
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/domain/interface/word-properties.interface.ts``
- 🔄 **[file-gdvqaw-m8btbtbl]** 📄 Modify: Update all imports to use new file locations
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/application/factories/pluralizer-factory.service.ts``
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/application/services/english-pluralizer.service.ts``
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/application/services/language-detector.service.ts``
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/application/services/russian-pluralizer.service.ts``
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/application/services/spanish-pluralizer.service.ts``
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/domain/interfaces/language-detector.interface.ts``
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/domain/interfaces/pluralizer-factory.interface.ts``
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/infrastructure/exceptions/russian-exceptions.service.ts``
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/infrastructure/rules/russian-rules.service.ts``
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/infrastructure/rules/spanish-rules.service.ts``
  - ``/Users/keenestcallas/WebstormProjects/Pluralizer/src/presentation/api/pluralizer.api.ts``

## Recent Updates

- **2025-03-16T15:50:59.563Z**: Changed item file-gdvqaw-m8btbtbl status from pending to in progress
- **2025-03-16T15:50:56.817Z**: Added new file operation "Modify: Update all imports to ..." as top-level item
- **2025-03-16T15:50:36.127Z**: Changed item file-g9pic1-m8bt5gbl status from in progress to completed with notes: Added gender-specific tests to Spanish pluralizer tests, including regular nouns and irregular forms
- **2025-03-16T15:49:23.699Z**: Changed item file-g9pic1-m8bt5gbl status from pending to in progress
- **2025-03-16T15:49:21.127Z**: Changed item file-72nvh1-m8bt5ea3 status from in progress to completed with notes: Updated e2e tests to import from dist/esm instead of src
