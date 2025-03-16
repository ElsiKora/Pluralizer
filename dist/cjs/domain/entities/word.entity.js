'use strict';

/**
 * Word entity that represents a word with its properties
 */
class Word {
    value;
    properties;
    constructor(value, properties) {
        this.value = value;
        this.properties = properties;
    }
    getValue() {
        return this.value;
    }
    getLanguage() {
        return this.properties.language;
    }
    getGender() {
        return this.properties.gender;
    }
}

exports.Word = Word;
