export interface ExceptionMap {
  [singular: string]: string;
}

// Words that end in -s, -ss, -sh, -ch, -x, or -z take -es in the plural
export const englishFalsePluralWords: string[] = [
  'analysis', 'thesis', 'basis', 'crisis', 'bus', 'box', 'cactus', 'focus', 'fungus', 'syllabus', 'nucleus'
];

export const englishIrregularPlurals: ExceptionMap = {
  // Pronouns
  bus: 'buses',
  box: 'boxes',
  thesis: 'theses',
  analysis: 'analyses',
  crisis: 'crises',
  man: 'men',
  woman: 'women',
  child: 'children',
  person: 'people',
  policeman: 'policemen',
  policewoman: 'policewomen',
  fireman: 'firemen',
  firewoman: 'firewomen',
  spokesman: 'spokesmen',
  spokeswoman: 'spokeswomen',
  gentleman: 'gentlemen',
  gentlewoman: 'gentlewomen',
  salesman: 'salesmen',
  saleswoman: 'saleswomen',
  fisherman: 'fishermen',
  businesswoman: 'businesswomen',
  businessman: 'businessmen',
  
  // Animals
  ox: 'oxen',
  goose: 'geese',
  mouse: 'mice',
  louse: 'lice',
  fish: 'fish',
  deer: 'deer',
  sheep: 'sheep',
  moose: 'moose',
  bison: 'bison',
  salmon: 'salmon',
  pike: 'pike',
  trout: 'trout',
  swine: 'swine',
  spacecraft: 'spacecraft',
  hovercraft: 'hovercraft',
  
  // Body parts
  tooth: 'teeth',
  foot: 'feet',
  
  // Latin/Greek endings
  datum: 'data',
  medium: 'media',
  memorandum: 'memoranda',
  millennium: 'millennia',
  stratum: 'strata',
  curriculum: 'curricula',
  
  // -is endings  
  basis: 'bases',
  diagnosis: 'diagnoses',
  synopsis: 'synopses',
  hypothesis: 'hypotheses',
  oasis: 'oases',
  parenthesis: 'parentheses',
  ellipsis: 'ellipses',
  neurosis: 'neuroses',
  
  // -um endings
  bacterium: 'bacteria',
  aquarium: 'aquaria',
  
  // -us endings
  cactus: 'cacti',
  focus: 'foci',
  fungus: 'fungi',
  nucleus: 'nuclei',
  stimulus: 'stimuli',
  syllabus: 'syllabi',
  alumnus: 'alumni',
  radius: 'radii',
  
  // -a endings
  antenna: 'antennae',
  formula: 'formulae',
  nebula: 'nebulae',
  vertebra: 'vertebrae',
  vita: 'vitae',
  larva: 'larvae',
  
  // -x endings
  appendix: 'appendices',
  index: 'indices',
  matrix: 'matrices',
  vertex: 'vertices',
  vortex: 'vortices',
  
  // Other irregular plurals
  die: 'dice',
  penny: 'pence',
  criterion: 'criteria',
  phenomenon: 'phenomena',
  automaton: 'automata',
  corpus: 'corpora',
  genus: 'genera',
  opus: 'opera',
  viscus: 'viscera',
  
  // Recently added
  dwarf: 'dwarves',
  leaf: 'leaves',
  life: 'lives',
  knife: 'knives',
  wife: 'wives',
  wolf: 'wolves',
  half: 'halves',
  loaf: 'loaves',
  thief: 'thieves',
  shelf: 'shelves',
  
  // Exceptions to -y rule
  money: 'moneys',
  attorney: 'attorneys',
  
  // -o exceptions
  echo: 'echoes',
  hero: 'heroes',
  potato: 'potatoes',
  tomato: 'tomatoes',
  volcano: 'volcanoes',
  tornado: 'tornadoes',
  
  // Mixed forms (some sources accept both forms)
  roof: 'roofs', // Sometimes 'rooves' in British English
  hoof: 'hoofs', // Sometimes 'hooves' 
  staff: 'staffs', // For groups of people, otherwise 'staves' for sticks
  scarf: 'scarfs', // Or 'scarves'
  wharf: 'wharfs', // Or 'wharves'
};

// Convert the singular-to-plural mapping to a plural-to-singular mapping
export const englishIrregularSingulars: ExceptionMap = Object.entries(englishIrregularPlurals)
  .reduce((acc: ExceptionMap, [singular, plural]) => {
    acc[plural] = singular;
    return acc;
  }, {});

// Words that are the same in singular and plural forms
export const englishUncountableWords: string[] = [
  // Abstract concepts
  'equipment',
  'information',
  'knowledge',
  'evidence',
  'advice',
  'news',
  'feedback',
  'research',
  'homework',
  'education',
  'wisdom',
  'fun',
  'entertainment',
  'laughter',
  'luck',
  'intelligence',
  'courage',
  'patience',
  'pride',
  'happiness',
  'sadness',
  'anger',
  
  // Subjects and disciplines
  'mathematics',
  'physics',
  'chemistry',
  'biology',
  'economics',
  'politics',
  'ethics',
  'linguistics',
  'gymnastics',
  'aerobics',
  'statistics',
  'civics',
  'robotics',
  'genetics',
  'mechanics',
  'acoustics',
  'economics',
  'electronics',
  'optics',
  'phonetics',
  'thermodynamics',
  
  // Materials and substances
  'rice',
  'water',
  'milk',
  'coffee',
  'tea',
  'soda',
  'butter',
  'flour',
  'sugar',
  'salt',
  'pepper',
  'oil',
  'gasoline',
  'oxygen',
  'hydrogen',
  'carbon',
  'gold',
  'silver',
  'iron',
  'copper',
  'wood',
  'paper',
  'plastic',
  'clothing',
  
  // Collective nouns
  'money',
  'luggage',
  'baggage',
  'furniture',
  'traffic',
  'mail',
  'jewelry',
  'poetry',
  'artwork',
  'cutlery',
  'crockery',
  'machinery',
  'postage',
  'stationery',
  'slang',
  'jargon',
  
  // Plurals that act as singular
  'scissors',
  'tweezers',
  'pliers',
  'pants',
  'trousers',
  'jeans',
  'tights',
  'glasses',
  'binoculars',
  'sunglasses',
  'spectacles',
  'pajamas',
  'shorts',
  'clothes',
  
  // Same in singular and plural
  'species',
  'series',
  'fish',
  'sheep',
  'deer',
  'moose',
  'aircraft',
  'spacecraft',
  'hovercraft',
  'salmon',
  'bison',
  'swine',
  'shrimp',
  'trout',
  'pike',
  'craft',
  'offspring',
  
  // Diseases or medical conditions
  'measles',
  'mumps',
  'rabies',
  'diabetes',
  'herpes',
  
  // Software/tech terms
  'software',
  'hardware',
  'firmware',
  'middleware',
  'malware',
  'spyware',
  'adware',
  'internet',
  'freeware',
  'shareware',
  'bluetooth',
];
