'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pluralizer_api = require('./presentation/api/pluralizer.api.js');
var word_entity = require('./domain/entities/word.entity.js');
var englishPluralizer_service = require('./application/services/english-pluralizer.service.js');
var russianPluralizer_service = require('./application/services/russian-pluralizer.service.js');

// Export default instance for convenience
var index = new pluralizer_api.Pluralizer();

exports.Pluralizer = pluralizer_api.Pluralizer;
Object.defineProperty(exports, "Gender", {
	enumerable: true,
	get: function () { return word_entity.Gender; }
});
exports.Word = word_entity.Word;
exports.EnglishPluralizer = englishPluralizer_service.EnglishPluralizer;
exports.RussianPluralizer = russianPluralizer_service.RussianPluralizer;
exports.default = index;
