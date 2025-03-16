// Words that end in -s, -ss, -sh, -ch, -x, or -z take -es in the plural
import type { TExceptionMap } from "../type/exception-map.type";

export const englishFalsePluralWords: Array<string> = ["analysis", "thesis", "basis", "crisis", "bus", "box", "cactus", "focus", "fungus", "syllabus", "nucleus"];

export const englishIrregularPlurals: TExceptionMap = {
	alumnus: "alumni",
	analysis: "analyses",
	// -a endings
	antenna: "antennae",
	// -x endings
	appendix: "appendices",
	aquarium: "aquaria",
	attorney: "attorneys",
	automaton: "automata",
	// -um endings
	bacterium: "bacteria",
	// -is endings
	basis: "bases",
	bison: "bison",
	box: "boxes",
	// Pronouns
	bus: "buses",
	businessman: "businessmen",
	businesswoman: "businesswomen",
	// -us endings
	cactus: "cacti",
	child: "children",
	corpus: "corpora",
	crisis: "crises",
	criterion: "criteria",
	curriculum: "curricula",
	// Latin/Greek endings
	datum: "data",
	deer: "deer",

	diagnosis: "diagnoses",
	// Other irregular plurals
	die: "dice",
	// Recently added
	dwarf: "dwarves",
	// -o exceptions
	echo: "echoes",
	ellipsis: "ellipses",
	fireman: "firemen",
	firewoman: "firewomen",
	fish: "fish",
	fisherman: "fishermen",
	focus: "foci",
	foot: "feet",
	formula: "formulae",
	fungus: "fungi",
	gentleman: "gentlemen",
	gentlewoman: "gentlewomen",

	genus: "genera",
	goose: "geese",

	half: "halves",
	hero: "heroes",
	hoof: "hoofs", // Sometimes 'hooves'
	hovercraft: "hovercraft",
	hypothesis: "hypotheses",
	index: "indices",

	knife: "knives",
	larva: "larvae",
	leaf: "leaves",
	life: "lives",
	loaf: "loaves",
	louse: "lice",
	man: "men",
	matrix: "matrices",

	medium: "media",
	memorandum: "memoranda",

	millennium: "millennia",
	// Exceptions to -y rule
	money: "moneys",
	moose: "moose",
	mouse: "mice",
	nebula: "nebulae",
	neurosis: "neuroses",
	nucleus: "nuclei",
	oasis: "oases",

	opus: "opera",
	// Animals
	ox: "oxen",
	parenthesis: "parentheses",
	penny: "pence",
	person: "people",
	phenomenon: "phenomena",

	pike: "pike",
	policeman: "policemen",
	policewoman: "policewomen",
	potato: "potatoes",
	radius: "radii",

	// Mixed forms (some sources accept both forms)
	roof: "roofs", // Sometimes 'rooves' in British English
	salesman: "salesmen",
	saleswoman: "saleswomen",
	salmon: "salmon",
	scarf: "scarfs", // Or 'scarves'
	sheep: "sheep",
	shelf: "shelves",
	spacecraft: "spacecraft",
	spokesman: "spokesmen",

	spokeswoman: "spokeswomen",
	staff: "staffs", // For groups of people, otherwise 'staves' for sticks
	stimulus: "stimuli",
	stratum: "strata",
	swine: "swine",
	syllabus: "syllabi",
	synopsis: "synopses",
	thesis: "theses",
	thief: "thieves",
	tomato: "tomatoes",

	// Body parts
	tooth: "teeth",
	tornado: "tornadoes",

	trout: "trout",
	vertebra: "vertebrae",
	vertex: "vertices",
	viscus: "viscera",
	vita: "vitae",
	volcano: "volcanoes",

	vortex: "vortices",
	wharf: "wharfs", // Or 'wharves'
	wife: "wives",
	wolf: "wolves",
	woman: "women",
};

// Convert the singular-to-plural mapping to a plural-to-singular mapping
export const englishIrregularSingulars: TExceptionMap = Object.fromEntries(Object.entries(englishIrregularPlurals).map(([singular, plural]: [string, string]) => [plural, singular]));

// Words that are the same in singular and plural forms
export const englishUncountableWords: Array<string> = [
	// Abstract concepts
	"equipment",
	"information",
	"knowledge",
	"evidence",
	"advice",
	"news",
	"feedback",
	"research",
	"homework",
	"education",
	"wisdom",
	"fun",
	"entertainment",
	"laughter",
	"luck",
	"intelligence",
	"courage",
	"patience",
	"pride",
	"happiness",
	"sadness",
	"anger",

	// Subjects and disciplines
	"mathematics",
	"physics",
	"chemistry",
	"biology",
	"economics",
	"politics",
	"ethics",
	"linguistics",
	"gymnastics",
	"aerobics",
	"statistics",
	"civics",
	"robotics",
	"genetics",
	"mechanics",
	"acoustics",
	"economics",
	"electronics",
	"optics",
	"phonetics",
	"thermodynamics",

	// Materials and substances
	"rice",
	"water",
	"milk",
	"coffee",
	"tea",
	"soda",
	"butter",
	"flour",
	"sugar",
	"salt",
	"pepper",
	"oil",
	"gasoline",
	"oxygen",
	"hydrogen",
	"carbon",
	"gold",
	"silver",
	"iron",
	"copper",
	"wood",
	"paper",
	"plastic",
	"clothing",

	// Collective nouns
	"money",
	"luggage",
	"baggage",
	"furniture",
	"traffic",
	"mail",
	"jewelry",
	"poetry",
	"artwork",
	"cutlery",
	"crockery",
	"machinery",
	"postage",
	"stationery",
	"slang",
	"jargon",

	// Plurals that act as singular
	"scissors",
	"tweezers",
	"pliers",
	"pants",
	"trousers",
	"jeans",
	"tights",
	"glasses",
	"binoculars",
	"sunglasses",
	"spectacles",
	"pajamas",
	"shorts",
	"clothes",

	// Same in singular and plural
	"species",
	"series",
	"fish",
	"sheep",
	"deer",
	"moose",
	"aircraft",
	"spacecraft",
	"hovercraft",
	"salmon",
	"bison",
	"swine",
	"shrimp",
	"trout",
	"pike",
	"craft",
	"offspring",

	// Diseases or medical conditions
	"measles",
	"mumps",
	"rabies",
	"diabetes",
	"herpes",

	// Software/tech terms
	"software",
	"hardware",
	"firmware",
	"middleware",
	"malware",
	"spyware",
	"adware",
	"internet",
	"freeware",
	"shareware",
	"bluetooth",
];
