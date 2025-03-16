'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pluralizer_api = require('./presentation/api/pluralizer.api.js');
var word_entity = require('./domain/entity/word.entity.js');
var gender_enum = require('./domain/enum/gender.enum.js');
var pluralizer_factory = require('./application/factory/pluralizer.factory.js');
var languageDetector_service = require('./application/service/language-detector.service.js');

// Export the default singleton instance
var index = new pluralizer_api.Pluralizer();

exports.Pluralizer = pluralizer_api.Pluralizer;
exports.Word = word_entity.Word;
Object.defineProperty(exports, "Gender", {
	enumerable: true,
	get: function () { return gender_enum.Gender; }
});
exports.PluralizerFactory = pluralizer_factory.PluralizerFactory;
exports.LanguageDetector = languageDetector_service.LanguageDetector;
exports.default = index;
