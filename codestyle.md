# Code Style Guide

This document outlines the code style rules, naming conventions, and folder structure standards for the Setup-Wizard project.

## Table of Contents
- [Architecture](#architecture)
- [File and Directory Naming](#file-and-directory-naming)
- [TypeScript Conventions](#typescript-conventions)
- [ESLint Configuration](#eslint-configuration)
- [Prettier Configuration](#prettier-configuration)
- [Stylelint Configuration](#stylelint-configuration)
- [Commit Message Conventions](#commit-message-conventions)
- [Testing Conventions](#testing-conventions)
- [CI/CD Practices](#cicd-practices)

## Architecture

The project follows a clean/hexagonal architecture with clear separation of concerns across four main layers:

### Domain Layer (`src/domain/`)
- Contains business logic core concepts
- Houses enums, interfaces, types, and constants that define the core domain
- No dependencies on other layers
- Subdirectories:
    - `constant/`: Domain-specific constants
    - `enum/`: Core enumeration types
    - `interface/`: Domain model interfaces
    - `type/`: Domain-specific TypeScript types

### Application Layer (`src/application/`)
- Contains application-specific business rules
- Services that implement domain logic and orchestrate operations
- Interfaces that define contracts for infrastructure implementations
- Mappers for data transformation between layers
- Subdirectories:
    - `constant/`: Application-specific constants
    - `interface/`: Application service interfaces
    - `mapper/`: Data transformation logic
    - `service/`: Core application services
    - `type/`: Application-specific TypeScript types

### Infrastructure Layer (`src/infrastructure/`)
- Contains technical implementations
- Concrete implementations of interfaces defined in the application layer
- Adapters for external libraries and frameworks
- Command handling and CLI implementations
- Subdirectories:
    - `command/`: CLI command implementations
    - `enum/`: Infrastructure-specific enums
    - `factory/`: Factory pattern implementations
    - `interface/`: Infrastructure interfaces
    - `mapper/`: Data mapping for external systems
    - `service/`: Infrastructure service implementations
    - `type/`: Infrastructure-specific TypeScript types

### Presentation Layer (`src/presentation/`)
- Handles user interaction
- Command registrars that connect the infrastructure to the user interface
- Lightweight layer focused on exposing functionality to users
- Subdirectories:
    - `registrar/`: Command registration components

## File and Directory Naming

### Directory Naming
- Use kebab-case for directory names
- Directory names should be singular, not plural (e.g., `interface/` not `interfaces/`)
- Directory names should reflect their purpose/content

### File Naming
- Use kebab-case for file names
- Files should be named with specific suffixes that indicate their purpose:
    - `.service.ts`: Service implementations
    - `.interface.ts`: Interface definitions
    - `.enum.ts`: Enum declarations
    - `.constant.ts`: Constant definitions
    - `.type.ts`: Type definitions
    - `.mapper.ts`: Data transformation utilities
    - `.command.ts`: Command implementations
    - `.registrar.ts`: Command registration components
    - `.factory.ts`: Factory pattern implementations
- Test files should be named after the file they test with `.test.ts` suffix

## TypeScript Conventions

### Type Definitions
- Interface naming: Use suffix `Interface` (e.g., `CommandInterface`)
- Enum naming: Use suffix `Enum` (e.g., `ModuleEnum`)
- Type naming: Use suffix `Type` for complex types (e.g., `InitCommandPropertiesType`)
- Constants: Use UPPER_SNAKE_CASE for constant names
- Class properties: Use camelCase for properties

### Code Organization
- Use dependency injection pattern:
    - Services receive dependencies through constructors
    - Interfaces define contracts for implementations
    - Factory pattern used for creating concrete implementations

## ESLint Configuration

- Uses the `@elsikora/eslint-config` package with flat config format
- Ignores build artifacts, generated files, and test files
- Enforces many features:
    - JavaScript linting
    - TypeScript linting
    - JSON validation
    - Markdown linting
    - Node.js best practices
    - Secret detection
    - package.json validation
    - Perfectionist (sorting imports, etc.)
    - Prettier integration
    - Regular expression validation
    - Sonar rules (code quality)
    - Code style enforcement
    - Unicode usage rules
    - YAML validation

## Prettier Configuration

- Arrow function parentheses: Always required
- Bracket placement: Same line
- Bracket spacing: Enabled
- JSX quotes: Double quotes
- Print width: 480 characters (unusually large)
- Prose wrapping: Never
- Semicolons: Required
- Quotes: Double quotes
- Tab width: 2 spaces
- Trailing comma: Required in all places
- Indentation: Tabs instead of spaces

## Stylelint Configuration

- Default severity: Warning
- Uses standard SCSS rules with these configs:
    - `stylelint-config-standard-scss`
    - `stylelint-config-rational-order` (for CSS property ordering)
    - `stylelint-prettier/recommended` (Prettier integration)
    - `stylelint-config-css-modules` (CSS modules support)
- Plugins:
    - `stylelint-order`
    - `stylelint-config-rational-order/plugin`
    - `stylelint-prettier`

## Commit Message Conventions

Uses conventional commit format from `@commitlint/config-conventional` with these rules:

- Body must end with a period
- Body must have a leading blank line
- Body max line length: 100 characters
- Footer must have a leading blank line
- Footer max line length: 100 characters
- Header must be lowercase
- Header must not end with a period
- Header max length: 100 characters
- Header min length: 10 characters
- Scope must be lowercase
- Scope is required
- Scope max length: 30 characters
- Subject must be lowercase
- Subject is required
- Subject must not end with a period
- Subject max length: 80 characters
- Subject min length: 3 characters
- Type must be lowercase
- Type is required
- Type must be one of: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert, wip

## Testing Conventions

### Test Organization
- Test structure mirrors the source code structure:
    - Unit tests in `test/unit/`
    - E2E tests in `test/e2e/`
- Test files are named after the files they test with `.test.ts` suffix
- Special test categories:
    - `*-branch-coverage.test.ts`: Tests focused on branch coverage
    - `*-coverage.test.ts`: Tests focused on general coverage

### Test Approach
- Coverage-focused testing
- Multiple test files for each service to ensure coverage
- Branch coverage tests specifically identified

## CI/CD Practices

### Lint-Staged Configuration
- Runs Prettier on all files
- Excludes test files, vitest files, and CHANGELOG from ESLint
- Runs ESLint with zero-warnings policy on files with specific extensions:
    - JavaScript: js, jsx, mjs, cjs
    - TypeScript: ts, tsx
    - Data formats: json, jsonc, yml, yaml
    - Documentation: md, mdx

### Semantic Release Configuration
- Release branches:
    - main (stable releases)
    - dev (beta prerelease channel)
- Follows conventional commits for versioning:
    - Breaking changes: major version
    - Features (feat): minor version
    - Other types (fix, docs, style, etc.): patch version
- Integrates with GitHub, npm, and changelog generation
- Uses different release flows for stable vs. prerelease branches
