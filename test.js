import pluralizer, { Gender } from "./dist/esm/index.js";

// Проверяем русские слова с указанием рода
console.log("\n=== Русский язык ===");
console.log("книга → ", pluralizer.toPlural('книга', { gender: Gender.Feminine }));
console.log("стол → ", pluralizer.toPlural('стол', { gender: Gender.Masculine }));
console.log("окно → ", pluralizer.toPlural('окно', { gender: Gender.Neuter }));
console.log("дверь → ", pluralizer.toPlural('дверь', { gender: Gender.Feminine }));
console.log("мать → ", pluralizer.toPlural('мать', { gender: Gender.Masculine }));
console.log("человек → ", pluralizer.toPlural('человек', { gender: Gender.Masculine }));
console.log("сын → ", pluralizer.toPlural('сын', { gender: Gender.Masculine }));
console.log("брат → ", pluralizer.toPlural('брат', { gender: Gender.Masculine }));

// Проверяем английский язык
console.log("\n=== English ===");
console.log("bus → ", pluralizer.toPlural('bus'));
console.log("child → ", pluralizer.toPlural('child'));
console.log("woman → ", pluralizer.toPlural('woman'));
console.log("potato → ", pluralizer.toPlural('potato'));
console.log("analysis → ", pluralizer.toPlural('analysis'));
console.log("deer → ", pluralizer.toPlural('deer'));
console.log("fish → ", pluralizer.toPlural('fish'));
console.log("information → ", pluralizer.toPlural('information'));
