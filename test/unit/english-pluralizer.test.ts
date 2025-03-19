import { describe, it, expect } from "vitest";
import { EnglishPluralizer } from "../../src/application/service/english-pluralizer.service";
import { PluralizerFactory, Word } from "../../src";

describe("EnglishPluralizer", () => {
	const factory = new PluralizerFactory();
	factory.registerPluralizer("en", new EnglishPluralizer());
	const pluralizer = factory.createPluralizer("en");

	describe("pluralize", () => {
		it("should pluralize regular nouns correctly", () => {
			const word = new Word("book", { language: "en" });
			expect(pluralizer.pluralize(word)).toBe("books");
		});

		it("should handle words ending in s, x, z, ch, sh, y", () => {
			const testCases = [
				["box", "boxes"],
				["buzz", "buzzes"],
				["match", "matches"],
				["dish", "dishes"],
				["currency", "currencies"],
			];

			testCases.forEach(([singular, expected]) => {
				const word = new Word(singular, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(expected);
			});
		});

		it("should handle words ending in y", () => {
			const testCases = [
				["city", "cities"],
				["boy", "boys"],
				["key", "keys"],
				["day", "days"],
			];

			testCases.forEach(([singular, expected]) => {
				const word = new Word(singular, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(expected);
			});
		});

		it("should handle words ending in f or fe", () => {
			const testCases = [
				["leaf", "leaves"],
				["wolf", "wolves"],
				["knife", "knives"],
				["life", "lives"],
			];

			testCases.forEach(([singular, expected]) => {
				const word = new Word(singular, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(expected);
			});
		});

		it("should handle irregular nouns", () => {
			const testCases = [
				["man", "men"],
				["woman", "women"],
				["child", "children"],
				["foot", "feet"],
				["tooth", "teeth"],
				["goose", "geese"],
				["mouse", "mice"],
				["person", "people"],
				["ox", "oxen"],
				["die", "dice"],
				["criterion", "criteria"],
				["phenomenon", "phenomena"],
				["datum", "data"],
				["bacterium", "bacteria"],
				["cactus", "cacti"],
				["focus", "foci"],
				["fungus", "fungi"],
				["nucleus", "nuclei"],
				["syllabus", "syllabi"],
				["antenna", "antennae"],
				["formula", "formulae"],
				["leaf", "leaves"],
				["knife", "knives"],
				["life", "lives"],
				["wife", "wives"],
				["wolf", "wolves"],
				["half", "halves"],
				["self", "selves"],
				["elf", "elves"],
				["loaf", "loaves"],
				["potato", "potatoes"],
				["tomato", "tomatoes"],
				["echo", "echoes"],
				["hero", "heroes"],
				["volcano", "volcanoes"],
			];

			testCases.forEach(([singular, expected]) => {
				const word = new Word(singular, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(expected);
			});
		});

		it("should handle special words with separate tests", () => {
			expect(pluralizer.toPlural("bus")).toBe("buses");
			expect(pluralizer.toPlural("box")).toBe("boxes");
			expect(pluralizer.toPlural("analysis")).toBe("analyses");
			expect(pluralizer.toPlural("thesis")).toBe("theses");
			expect(pluralizer.toPlural("crisis")).toBe("crises");
		});

		it("should not change uncountable nouns", () => {
			const uncountables = [
				"equipment",
				"information",
				"knowledge",
				"evidence",
				"advice",
				"news",
				"feedback",
				"research",
				"education",
				"wisdom",
				"entertainment",
				"rice",
				"water",
				"milk",
				"coffee",
				"tea",
				"butter",
				"flour",
				"sugar",
				"salt",
				"oil",
				"gold",
				"silver",
				"money",
				"luggage",
				"baggage",
				"furniture",
				"traffic",
				"mail",
				"jewelry",
				"species",
				"series",
				"fish",
				"sheep",
				"deer",
				"moose",
				"aircraft",
				"salmon",
				"bison",
				"swine",
				"trout",
				"mathematics",
				"physics",
				"economics",
				"ethics",
				"politics",
				"measles",
				"mumps",
				"diabetes",
				"software",
				"hardware",
				"firmware",
				"internet",
			];

			uncountables.forEach((term) => {
				const word = new Word(term, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(term);
			});
		});

		it("should respect count parameter", () => {
			const word = new Word("book", { language: "en" });
			expect(pluralizer.pluralize(word, 1)).toBe("book");
			expect(pluralizer.pluralize(word, 2)).toBe("books");
		});

		it("should throw error for non-English words", () => {
			const word = new Word("книга", { language: "ru" });
			expect(() => pluralizer.pluralize(word)).toThrow();
		});
	});

	describe("isPlural", () => {
		it("should identify plural forms correctly", () => {
			const plurals = ["books", "boxes", "cities", "men", "women", "children"];
			plurals.forEach((word) => {
				expect(pluralizer.isPlural(word)).toBe(true);
			});
		});

		it("should identify singular forms correctly", () => {
			const singulars = ["book", "box", "city", "man", "woman", "child"];
			singulars.forEach((word) => {
				expect(pluralizer.isPlural(word)).toBe(false);
			});
		});
	});

	describe("isSingular", () => {
		it("should identify singular forms correctly", () => {
			const singulars = ["book", "box", "city", "man", "woman", "child"];
			singulars.forEach((word) => {
				expect(pluralizer.isSingular(word)).toBe(true);
			});
		});

		it("should identify plural forms correctly", () => {
			const plurals = ["books", "boxes", "cities", "men", "women", "children"];
			plurals.forEach((word) => {
				expect(pluralizer.isSingular(word)).toBe(false);
			});
		});
	});

	describe("toPlural", () => {
		it("should convert singular to plural", () => {
			expect(pluralizer.toPlural("book")).toBe("books");
			expect(pluralizer.toPlural("man")).toBe("men");
			expect(pluralizer.toPlural("city")).toBe("cities");
		});

		it("should not change plural words", () => {
			expect(pluralizer.toPlural("books")).toBe("books");
			expect(pluralizer.toPlural("men")).toBe("men");
			expect(pluralizer.toPlural("cities")).toBe("cities");
		});

		it("should preserve case", () => {
			expect(pluralizer.toPlural("Book")).toBe("Books");
			expect(pluralizer.toPlural("APPLE")).toBe("APPLES");
			expect(pluralizer.toPlural("Man")).toBe("Men");
		});
	});

	describe("toSingular", () => {
		it("should convert plural to singular", () => {
			expect(pluralizer.toSingular("books")).toBe("book");
			expect(pluralizer.toSingular("men")).toBe("man");
			expect(pluralizer.toSingular("cities")).toBe("city");
		});

		it("should not change singular words", () => {
			expect(pluralizer.toSingular("book")).toBe("book");
			expect(pluralizer.toSingular("man")).toBe("man");
			expect(pluralizer.toSingular("city")).toBe("city");
		});

		it("should preserve case", () => {
			expect(pluralizer.toSingular("Books")).toBe("Book");
			expect(pluralizer.toSingular("Men")).toBe("Man");
		});

		it("should handle more complex irregular plurals", () => {
			const testCases = [
				["alumnus", "alumni"],
				["stimulus", "stimuli"],
				["radius", "radii"],
				["genus", "genera"],
				["corpus", "corpora"],
				["basis", "bases"],
				["neurosis", "neuroses"],
				["diagnosis", "diagnoses"],
				["ellipsis", "ellipses"],
				["axis", "axes"],
				["matrix", "matrices"],
				["vertex", "vertices"],
				["apex", "apices"],
				["vortex", "vortices"],
				["automaton", "automata"],
				["polyhedron", "polyhedra"],
				["louse", "lice"],
				["spouse", "spouses"],
				["stratum", "strata"],
				["addendum", "addenda"],
				["erratum", "errata"],
				["medium", "media"],
				["ovum", "ova"],
				["alga", "algae"],
				["larva", "larvae"],
				["vertebra", "vertebrae"],
				["minutia", "minutiae"],
				["schema", "schemata"],
				["stigma", "stigmata"],
				["stoma", "stomata"],
			];

			testCases.forEach(([singular, expected]) => {
				const word = new Word(singular, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(expected);
			});
		});

		it("should handle mixed case words and acronyms correctly", () => {
			const testCases = [
				["iPhone", "iPhones"],
				["iPad", "iPads"],
				["MacBook", "MacBooks"],
				["PowerPoint", "PowerPoints"],
				["YouTube", "YouTubes"],
			];

			testCases.forEach(([singular, expected]) => {
				const word = new Word(singular, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(expected);
			});
		});

		it('should correctly handle singular words ending with "s"', () => {
			const testCases = [
				["lens", "lenses"],
				["atlas", "atlases"],
				["cosmos", "cosmoses"],
				["gas", "gases"],
				["bias", "biases"],
				["iris", "irises"],
				["plus", "pluses"],
				["virus", "viruses"],
				["status", "statuses"],
				["census", "censuses"],
				["apparatus", "apparatuses"],
				["prospectus", "prospectuses"],
				["walrus", "walruses"],
				["octopus", "octopi"],
			];

			testCases.forEach(([singular, expected]) => {
				const word = new Word(singular, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(expected);
			});
		});

		it("should handle words with the same form for singular and plural", () => {
			const testCases = ["sheep", "deer", "moose", "fish", "species", "series", "aircraft", "spacecraft", "bison", "means", "crossroads"];

			testCases.forEach((word) => {
				const wordObj = new Word(word, { language: "en" });
				expect(pluralizer.pluralize(wordObj)).toBe(word);
			});
		});

		it("should handle words with potentially confusing pluralization", () => {
			const testCases = [
				["corpus", "corpora"],
				["genus", "genera"],
				["opus", "opuses"],
				["octopus", "octopi"],
				["virus", "viruses"],
				["terminus", "terminuses"],
				["bacillus", "bacilli"],
				["thesaurus", "thesauruses"],
			];

			testCases.forEach(([singular, expected]) => {
				const word = new Word(singular, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(expected);
			});
		});

		it("should correctly pluralize nouns that change meaning when pluralized", () => {
			const testCases = [
				["custom", "customs"],
				["manner", "manners"],
				["spirit", "spirits"],
				["arm", "arms"],
				["spectacle", "spectacles"],
				["premise", "premises"],
				["content", "contents"],
				["good", "goods"],
				["powder", "powders"],
				["scale", "scales"],
			];

			testCases.forEach(([singular, expected]) => {
				const word = new Word(singular, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(expected);
			});
		});

		it("should handle edge cases and foreign loanwords", () => {
			const testCases = [
				["parenthesis", "parentheses"],
				["oasis", "oases"],
				["chateau", "chateaux"],
				["tableau", "tableaux"],
				["bureau", "bureaux"],
				["beau", "beaux"],
				["cervix", "cervices"],
				["nebula", "nebulae"],
				["dogma", "dogmata"],
				["lemma", "lemmata"],
			];

			testCases.forEach(([singular, expected]) => {
				const word = new Word(singular, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(expected);
			});
		});

		it("should maintain proper capitalization patterns", () => {
			const testCases = [
				["Word", "Words"],
				["CAPITAL", "CAPITALS"],
				["CamelCase", "CamelCases"],
				["PascalCase", "PascalCases"],
				["snake_case", "snake_cases"],
				["kebab-case", "kebab-cases"],
				["MixedCASE", "MixedCASEs"],
				["lowerUPPER", "lowerUPPERs"],
				["UPPERlower", "UPPERlowers"],
				["Title Case", "Title Cases"],
			];

			testCases.forEach(([singular, expected]) => {
				const word = new Word(singular, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(expected);
			});
		});

		it("should handle words with numbers and special characters", () => {
			const testCases = [
				["user123", "user123s"],
				["123user", "123users"],
				["user-123", "user-123s"],
				["agent007", "agent007s"],
				["x86", "x86s"],
				["$100", "$100s"],
				["@username", "@usernames"],
				["#hashtag", "#hashtags"],
				["word*", "word*s"],
				["word+", "word+s"],
				["word_", "word_s"],
				["word&", "word&s"],
				["mp3", "mp3s"],
				["2020s", "2020s"],
			];

			testCases.forEach(([singular, expected]) => {
				const word = new Word(singular, { language: "en" });
				expect(pluralizer.pluralize(word)).toBe(expected);
			});
		});

		describe("enhanced isPlural and isSingular tests", () => {
			it("should correctly identify complex singular forms", () => {
				const complexSingulars = ["child", "mouse", "tooth", "goose", "phenomenon", "criterion", "analysis", "matrix", "appendix", "alumnus", "cactus", "radius", "stimulus", "fungus", "bacterium", "medium", "datum", "seraph", "cherub", "tableau", "bureau"];

				complexSingulars.forEach((word) => {
					expect(pluralizer.isSingular(word)).toBe(true);
					expect(pluralizer.isPlural(word)).toBe(false);
				});
			});
		});
	});
});
