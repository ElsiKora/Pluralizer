import { describe, it, expect } from "vitest";
import { SpanishPluralizer } from "../../src/application/service/spanish-pluralizer.service";
import { EGender, PluralizerFactory, Word } from "../../src";

describe("SpanishPluralizer", () => {
	// Create a factory and register the Spanish pluralizer
	const factory = new PluralizerFactory();
	factory.registerPluralizer("es", new SpanishPluralizer());
	const pluralizer = factory.createPluralizer("es");

	describe("pluralize", () => {
		it("should return singular form if count is 1", () => {
			const word = new Word("libro", { language: "es" });
			expect(pluralizer.pluralize(word, 1)).toBe("libro");
		});

		it("should pluralize regular nouns correctly", () => {
			const tests = [
				// Words ending in vowel add -s
				{ singular: "libro", plural: "libros" },
				{ singular: "casa", plural: "casas" },
				{ singular: "amigo", plural: "amigos" },
				{ singular: "mesa", plural: "mesas" },
				{ singular: "café", plural: "cafés" },

				// Words ending in consonant add -es
				{ singular: "papel", plural: "papeles" },
				{ singular: "habitación", plural: "habitaciones" },
				{ singular: "profesor", plural: "profesores" },
				{ singular: "mujer", plural: "mujeres" },
				{ singular: "ordenador", plural: "ordenadores" },

				// Words ending in -z change to -ces
				{ singular: "pez", plural: "peces" },
				{ singular: "luz", plural: "luces" },
				{ singular: "lápiz", plural: "lápices" },
				{ singular: "nariz", plural: "narices" },
				{ singular: "voz", plural: "voces" },
			];

			tests.forEach(({ singular, plural }) => {
				const word = new Word(singular, { language: "es" });
				expect(pluralizer.pluralize(word, 2)).toBe(plural);
			});
		});

		it("should respect gender when pluralizing", () => {
			// Test with specific gender cases
			const wordTests = [
				{ singular: "gato", gender: EGender.MASCULINE, plural: "gatos" },
				{ singular: "gata", gender: EGender.FEMININE, plural: "gatas" },
				{ singular: "abogado", gender: EGender.MASCULINE, plural: "abogados" },
				{ singular: "abogada", gender: EGender.FEMININE, plural: "abogadas" },
				{ singular: "niño", gender: EGender.MASCULINE, plural: "niños" },
				{ singular: "niña", gender: EGender.FEMININE, plural: "niñas" },
				{ singular: "señor", gender: EGender.MASCULINE, plural: "señores" },
				{ singular: "señora", gender: EGender.FEMININE, plural: "señoras" },
			];

			wordTests.forEach(({ singular, gender, plural }) => {
				const word = new Word(singular, { language: "es", gender });
				expect(pluralizer.pluralize(word, 2)).toBe(plural);
			});
		});

		it("should handle irregular plurals correctly", () => {
			// Test some irregular cases
			const irregulars = [
				{ singular: "el régimen", plural: "los regímenes" },
				{ singular: "el álbum", plural: "los álbumes" },
				{ singular: "el carácter", plural: "los caracteres" },
				{ singular: "el virus", plural: "el virus" },
				{ singular: "crisis", plural: "crisis" },
				{ singular: "lunes", plural: "lunes" },
				{ singular: "análisis", plural: "análisis" },
			];

			irregulars.forEach(({ singular, plural }) => {
				const word = new Word(singular, { language: "es" });
				expect(pluralizer.toPlural(singular)).toBe(plural);
			});
		});

		it("should throw an error if language is not Spanish", () => {
			const word = new Word("book", { language: "en" });
			expect(() => pluralizer.pluralize(word)).toThrow("SpanishPluralizer can only pluralize Spanish words");
		});
	});

	describe("isPlural", () => {
		it("should correctly identify plural words", () => {
			const plurals = ["libros", "casas", "papeles", "habitaciones", "peces", "luces"];
			plurals.forEach((word) => {
				expect(pluralizer.isPlural(word)).toBe(true);
			});
		});

		it("should correctly identify non-plural words", () => {
			const singulars = ["libro", "casa", "papel", "habitación", "pez", "luz"];
			singulars.forEach((word) => {
				expect(pluralizer.isPlural(word)).toBe(false);
			});
		});

		it("should handle words that look plural but are singular", () => {
			const falsePlurals = ["crisis", "análisis", "tesis", "lunes", "virus"];
			falsePlurals.forEach((word) => {
				expect(pluralizer.isPlural(word)).toBe(false);
			});
		});
	});

	describe("isSingular", () => {
		it("should correctly identify singular words", () => {
			const singulars = ["libro", "casa", "papel", "habitación", "pez", "luz"];
			singulars.forEach((word) => {
				expect(pluralizer.isSingular(word)).toBe(true);
			});
		});

		it("should correctly identify non-singular words", () => {
			const plurals = ["libros", "casas", "papeles", "habitaciones", "peces", "luces"];
			plurals.forEach((word) => {
				expect(pluralizer.isSingular(word)).toBe(false);
			});
		});

		it("should handle special cases correctly", () => {
			const specialCases = ["crisis", "análisis", "tesis", "lunes", "virus"];
			specialCases.forEach((word) => {
				expect(pluralizer.isSingular(word)).toBe(true);
			});
		});
	});

	describe("toPlural", () => {
		it("should convert singular words to plural", () => {
			const tests = [
				// Words ending in vowel add -s
				{ singular: "libro", plural: "libros" },
				{ singular: "casa", plural: "casas" },
				// Words ending in consonant add -es
				{ singular: "papel", plural: "papeles" },
				{ singular: "habitación", plural: "habitaciones" },
				// Words ending in -z change to -ces
				{ singular: "pez", plural: "peces" },
				{ singular: "luz", plural: "luces" },
			];

			tests.forEach(({ singular, plural }) => {
				expect(pluralizer.toPlural(singular)).toBe(plural);
			});
		});

		it("should preserve capitalization", () => {
			expect(pluralizer.toPlural("Libro")).toBe("Libros");
			expect(pluralizer.toPlural("CASA")).toBe("CASAS");
			expect(pluralizer.toPlural("Papel")).toBe("Papeles");
		});

		it("should handle uncountable words", () => {
			const uncountables = ["lunes", "martes", "crisis", "análisis", "tesis", "virus"];
			uncountables.forEach((word) => {
				expect(pluralizer.toPlural(word)).toBe(word);
			});
		});
	});

	describe("toSingular", () => {
		it("should convert plural words to singular", () => {
			const tests = [
				// Words ending in -s
				{ plural: "libros", singular: "libro" },
				{ plural: "casas", singular: "casa" },
				// Words ending in -es
				{ plural: "papeles", singular: "papel" },
				{ plural: "habitaciones", singular: "habitación" },
				// Words ending in -ces (from -z)
				{ plural: "peces", singular: "pez" },
				{ plural: "luces", singular: "luz" },
			];

			tests.forEach(({ plural, singular }) => {
				expect(pluralizer.toSingular(plural)).toBe(singular);
			});
		});

		it("should preserve capitalization", () => {
			expect(pluralizer.toSingular("Libros")).toBe("Libro");
			expect(pluralizer.toSingular("CASAS")).toBe("CASA");
			expect(pluralizer.toSingular("Papeles")).toBe("Papel");
		});

		it("should handle uncountable words", () => {
			const uncountables = ["lunes", "martes", "crisis", "análisis", "tesis", "virus"];
			uncountables.forEach((word) => {
				expect(pluralizer.toSingular(word)).toBe(word);
			});
		});
	});
});
