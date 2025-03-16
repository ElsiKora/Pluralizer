'use strict';

exports.Gender = void 0;
(function (Gender) {
    Gender["Masculine"] = "masculine";
    Gender["Feminine"] = "feminine";
    Gender["Neuter"] = "neuter";
})(exports.Gender || (exports.Gender = {}));
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
