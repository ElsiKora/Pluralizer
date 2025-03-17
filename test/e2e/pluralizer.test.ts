import { describe, it, expect } from "vitest";
import pluralizer, { Pluralizer, EGender } from "../../dist/esm/index";

describe("Pluralizer API (End-to-End)", () => {
	describe("Default export usage", () => {
		it("should pluralize English words", () => {
			expect(pluralizer.pluralize("book")).toBe("books");
			expect(pluralizer.pluralize("child")).toBe("children");
			expect(pluralizer.pluralize("box")).toBe("boxes");
		});

		it("should pluralize Russian words", () => {
			expect(pluralizer.pluralize("книга", { language: "ru", gender: EGender.FEMININE })).toBe("книги");
			expect(pluralizer.pluralize("стол", { language: "ru", gender: EGender.MASCULINE })).toBe("столы");
			expect(pluralizer.pluralize("окно", { language: "ru", gender: EGender.NEUTER })).toBe("окна");
		});

		it("should detect language automatically", () => {
			expect(pluralizer.pluralize("книга", { gender: EGender.FEMININE })).toBe("книги");
			expect(pluralizer.pluralize("стол", { gender: EGender.MASCULINE })).toBe("столы");
			expect(pluralizer.pluralize("book")).toBe("books");
			expect(pluralizer.pluralize("child")).toBe("children");
		});

		it("should respect count parameter", () => {
			expect(pluralizer.pluralize("book", { count: 1 })).toBe("book");
			expect(pluralizer.pluralize("book", { count: 2 })).toBe("books");
			expect(pluralizer.pluralize("книга", { language: "ru", gender: EGender.FEMININE, count: 1 })).toBe("книга");
			expect(pluralizer.pluralize("книга", { language: "ru", gender: EGender.FEMININE, count: 2 })).toBe("книги");
		});

		it("should check if word is plural", () => {
			expect(pluralizer.isPlural("books")).toBe(true);
			expect(pluralizer.isPlural("book")).toBe(false);
			expect(pluralizer.isPlural("children")).toBe(true);
			expect(pluralizer.isPlural("child")).toBe(false);

			expect(pluralizer.isPlural("книги", "ru")).toBe(true);
			expect(pluralizer.isPlural("книга", "ru")).toBe(false);
			expect(pluralizer.isPlural("столы", "ru")).toBe(true);
			expect(pluralizer.isPlural("стол", "ru")).toBe(false);
		});

		it("should check if word is singular", () => {
			expect(pluralizer.isSingular("book")).toBe(true);
			expect(pluralizer.isSingular("books")).toBe(false);
			expect(pluralizer.isSingular("child")).toBe(true);
			expect(pluralizer.isSingular("children")).toBe(false);

			expect(pluralizer.isSingular("книга", "ru")).toBe(true);
			expect(pluralizer.isSingular("книги", "ru")).toBe(false);
			expect(pluralizer.isSingular("стол", "ru")).toBe(true);
			expect(pluralizer.isSingular("столы", "ru")).toBe(false);
		});

		it("should convert to plural form", () => {
			expect(pluralizer.toPlural("book")).toBe("books");
			expect(pluralizer.toPlural("child")).toBe("children");

			expect(pluralizer.toPlural("книга", { language: "ru", gender: EGender.FEMININE })).toBe("книги");
			expect(pluralizer.toPlural("стол", { language: "ru", gender: EGender.MASCULINE })).toBe("столы");
		});

		it("should convert to singular form", () => {
			expect(pluralizer.toSingular("books")).toBe("book");
			expect(pluralizer.toSingular("children")).toBe("child");

			expect(pluralizer.toSingular("книги", "ru")).toBe("книга");
			expect(pluralizer.toSingular("столы", "ru")).toBe("стол");
		});

		it("should report supported languages", () => {
			expect(pluralizer.getSupportedLanguages()).toContain("en");
			expect(pluralizer.getSupportedLanguages()).toContain("ru");
			expect(pluralizer.getSupportedLanguages().length).toBe(2);

			expect(pluralizer.supportsLanguage("en")).toBe(true);
			expect(pluralizer.supportsLanguage("ru")).toBe(true);
		});
	});

	describe("Pluralizer class instantiation", () => {
		it("should work with custom instances", () => {
			const customPluralizer = new Pluralizer();

			expect(customPluralizer.pluralize("book")).toBe("books");
			expect(customPluralizer.pluralize("книга", { language: "ru", gender: EGender.FEMININE })).toBe("книги");
		});
	});

	describe("Complex usage scenarios", () => {
		it("should handle special words correctly", () => {
			expect(pluralizer.toPlural("bus")).toBe("buses");
			expect(pluralizer.toPlural("box")).toBe("boxes");
			expect(pluralizer.toPlural("analysis")).toBe("analyses");
			expect(pluralizer.toPlural("thesis")).toBe("theses");
			expect(pluralizer.toPlural("crisis")).toBe("crises");
		});
		it("should handle mixed language text with auto-detection", () => {
			const words = ["book", "книга", "child", "стол", "окно"];
			const expectedPlurals = ["books", "книги", "children", "столы", "окна"];

			const genders = [undefined, EGender.FEMININE, undefined, EGender.MASCULINE, EGender.NEUTER];

			words.forEach((word, index) => {
				const options = genders[index] ? { gender: genders[index] } : undefined;
				expect(pluralizer.pluralize(word, options)).toBe(expectedPlurals[index]);
			});
		});

		it("should preserve original capitalization", () => {
			expect(pluralizer.pluralize("Book")).toBe("Books");
			expect(pluralizer.pluralize("APPLE")).toBe("APPLES");
			expect(pluralizer.pluralize("Child")).toBe("Children");
			expect(pluralizer.pluralize("Книга", { gender: EGender.FEMININE })).toBe("Книги");
			expect(pluralizer.pluralize("СТОЛ", { gender: EGender.MASCULINE })).toBe("СТОЛЫ");
		});

		it("should handle English irregular forms correctly", () => {
			const irregulars = [
				["criterion", "criteria"],
				["phenomenon", "phenomena"],
				["datum", "data"],
				["bacterium", "bacteria"],
				["cactus", "cacti"],
				["focus", "foci"],
				["fungus", "fungi"],
				["syllabus", "syllabi"],
				["antenna", "antennae"],
				["formula", "formulae"],
				["matrix", "matrices"],
				["vertex", "vertices"],
				["potato", "potatoes"],
				["echo", "echoes"],
			];

			irregulars.forEach(([singular, plural]) => {
				expect(pluralizer.toPlural(singular)).toBe(plural);
				expect(pluralizer.toSingular(plural)).toBe(singular);
			});
		});

		it("should handle Russian irregular forms correctly", () => {
			const irregulars = [
				["человек", "люди", EGender.MASCULINE],
				["ребёнок", "дети", EGender.MASCULINE],
				["друг", "друзья", EGender.MASCULINE],
				["брат", "братья", EGender.MASCULINE],
				["мать", "матери", EGender.FEMININE],
				["дочь", "дочери", EGender.FEMININE],
				["время", "времена", EGender.NEUTER],
				["имя", "имена", EGender.NEUTER],
			];

			irregulars.forEach(([singular, plural, gender]) => {
				expect(pluralizer.toPlural(singular, { gender: gender as EGender })).toBe(plural);
				expect(pluralizer.toSingular(plural, "ru")).toBe(singular);
			});
		});

		it("should handle uncountable words in all languages", () => {
			const enUncountables = ["equipment", "information", "rice", "money", "species", "series", "fish", "sheep", "deer", "aircraft", "software", "hardware", "furniture"];

			enUncountables.forEach((word) => {
				expect(pluralizer.toPlural(word)).toBe(word);
				expect(pluralizer.toSingular(word)).toBe(word);
			});

			const ruUncountables = ["ножницы", "брюки", "очки", "деньги", "духи", "джинсы", "каникулы", "переговоры"];

			ruUncountables.forEach((word) => {
				expect(pluralizer.toPlural(word, { language: "ru" })).toBe(word);
			});
		});
	});
});
