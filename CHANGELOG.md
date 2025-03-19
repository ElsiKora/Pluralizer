# [2.0.0](https://github.com/ElsiKora/Pluralizer/compare/v1.0.2...v2.0.0) (2025-03-19)


### Code Refactoring

* **exports:** replace default export with named export and improve module packaging ([3a009f7](https://github.com/ElsiKora/Pluralizer/commit/3a009f7ce1dce9869fc7976d6812d1adcf7cdba7))


### BREAKING CHANGES

* **exports:** The default export has been removed in favor of a named export 'pluralizer'.
Any code using the default import will need to be updated to use the named import instead.

This change improves module compatibility and packaging by:
- Adding package.json generation for ESM and CommonJS outputs
- Replacing default export with named singleton export
- Updating the build configuration to properly handle module types
- Removing 'currency' from uncountable words list and adding it to plural test cases
- Simplifying tsconfig.build.json by extending the main config

## [1.0.2](https://github.com/ElsiKora/Pluralizer/compare/v1.0.1...v1.0.2) (2025-03-19)

## [1.0.1](https://github.com/ElsiKora/Pluralizer/compare/v1.0.0...v1.0.1) (2025-03-17)

# 1.0.0 (2025-03-17)


### Features

* **core:** implement multilingual word pluralization library ([e57430d](https://github.com/ElsiKora/Pluralizer/commit/e57430dd767e91a11e32705b8e2090eaf2c4a35d))

# 1.0.0 (2025-03-17)


### Features

* **core:** implement multilingual word pluralization library ([e57430d](https://github.com/ElsiKora/Pluralizer/commit/e57430dd767e91a11e32705b8e2090eaf2c4a35d))

# 1.0.0 (2025-03-17)


### Features

* **core:** implement multilingual word pluralization library ([e57430d](https://github.com/ElsiKora/Pluralizer/commit/e57430dd767e91a11e32705b8e2090eaf2c4a35d))
