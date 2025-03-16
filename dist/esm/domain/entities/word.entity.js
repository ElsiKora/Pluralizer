var Gender;
(function (Gender) {
    Gender["Masculine"] = "masculine";
    Gender["Feminine"] = "feminine";
    Gender["Neuter"] = "neuter";
})(Gender || (Gender = {}));
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

export { Gender, Word };
