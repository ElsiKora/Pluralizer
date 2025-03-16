// Words that look like they could be plural but are singular
import type { TExceptionMap } from "../type/exception-map.type";
export const spanishFalsePluralWords: Array<string> = ["crisis", "análisis", "tesis", "lunes", "martes", "miércoles", "jueves", "viernes", "virus", "atlas"];

export const spanishIrregularPlurals: TExceptionMap = {
	análisis: "análisis",
	crisis: "crisis",
	dosis: "dosis",
	// Compound nouns
	"el abrelatas": "los abrelatas",
	"el álbum": "los álbumes",
	"el bambú": "los bambúes",
	"el bisturí": "los bisturíes",
	"el carácter": "los caracteres",
	"el cascanueces": "los cascanueces",
	"el champú": "los champús", // or champúes
	// Foreign loanwords
	"el club": "los clubes", // or clubs
	// Latin/Greek origin words
	"el currículum": "los currículos",

	"el déficit": "los déficits",
	"el espécimen": "los especímenes",
	"el hindú": "los hindúes",
	"el jabalí": "los jabalíes",
	"el limpiaparabrisas": "los limpiaparabrisas",
	"el memorándum": "los memorandos",
	"el menú": "los menús", // or menúes
	"el parabrisas": "los parabrisas",
	"el paraguas": "los paraguas",
	"el pararrayos": "los pararrayos",
	"el récord": "los récords",

	// Special irregulars
	"el régimen": "los regímenes",
	"el sacacorchos": "los sacacorchos",
	"el superávit": "los superávits",
	"el tabú": "los tabúes",

	"el ultimátum": "los ultimátums",
	fénix: "fénix",
	jueves: "jueves",
	// Invariable (do not change in plural)
	lunes: "lunes",
	martes: "martes",
	miércoles: "miércoles",
	tesis: "tesis",

	tórax: "tórax",
	viernes: "viernes",
	virus: "virus",
};

// Derive singular forms from plural forms
export const spanishIrregularSingulars: TExceptionMap = Object.fromEntries(Object.entries(spanishIrregularPlurals).map(([singular, plural]: [string, string]) => [plural, singular]));

// Words that are the same in singular and plural forms or are always plural/singular
export const spanishUncountableWords: Array<string> = [
	// Days of the week
	"lunes",
	"martes",
	"miércoles",
	"jueves",
	"viernes",

	// Invariable nouns ending in -s
	"crisis",
	"análisis",
	"tesis",
	"virus",
	"cosmos",
	"atlas",

	// Academic subjects
	"matemáticas",
	"física",
	"química",
	"biología",
	"economía",
	"ética",
	"lingüística",
	"genética",
	"robótica",

	// Materials and substances
	"arroz",
	"agua",
	"leche",
	"café",
	"té",
	"mantequilla",
	"harina",
	"azúcar",
	"sal",
	"pimienta",
	"aceite",
	"gasolina",
	"oxígeno",
	"hidrógeno",
	"carbono",
	"oro",
	"plata",
	"hierro",
	"cobre",
	"madera",
	"papel",
	"plástico",
	"ropa",

	// Abstract concepts
	"información",
	"conocimiento",
	"evidencia",
	"consejo", // advice
	"noticias",
	"retroalimentación", // feedback
	"investigación",
	"tarea", // homework
	"educación",
	"sabiduría",
	"diversión",
	"entretenimiento",
	"risa",
	"suerte",
	"inteligencia",
	"coraje",
	"paciencia",
	"orgullo",
	"felicidad",
	"tristeza",
	"ira",

	// Always plural
	"gafas", // glasses
	"tijeras", // scissors
	"pinzas", // tweezers
	"alicates", // pliers
	"pantalones", // pants
	"vaqueros", // jeans
	"prismáticos", // binoculars
	"gafas de sol", // sunglasses
	"pijama", // pajamas
	"pantalones cortos", // shorts
];

// Words that change gender in plural form
export const spanishGenderChanges: Record<string, "feminine" | "masculine"> = {
	"el agua": "feminine", // singular is masculine for pronunciation but feminine in nature
	"el águila": "feminine",
	"el alma": "feminine",
	"el área": "feminine",
	"el arma": "feminine",
	"el arte": "masculine", // singular can be both, plural is masculine
	"el aula": "feminine",
	"el hacha": "feminine",
	"el hambre": "feminine",
};
