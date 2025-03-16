export interface SpanishIrregularPlural {
  plural: string;
  gender?: 'masculine' | 'feminine';
}

export interface SpanishIrregularMap {
  [singular: string]: SpanishIrregularPlural;
}

export interface ExceptionMap {
  [singular: string]: string;
}

// Words that look like they could be plural but are singular
export const spanishFalsePluralWords: string[] = [
  'crisis', 'análisis', 'tesis', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'virus', 'atlas'
];

export const spanishIrregularPlurals: ExceptionMap = {
  // Invariable (do not change in plural)
  'lunes': 'lunes',
  'martes': 'martes',
  'miércoles': 'miércoles',
  'jueves': 'jueves',
  'viernes': 'viernes',
  'análisis': 'análisis',
  'crisis': 'crisis',
  'dosis': 'dosis',
  'tesis': 'tesis',
  'virus': 'virus',
  'fénix': 'fénix',
  'tórax': 'tórax',
  
  // Special irregulars
  'el régimen': 'los regímenes',
  'el espécimen': 'los especímenes',
  'el carácter': 'los caracteres',
  'el álbum': 'los álbumes',
  'el menú': 'los menús', // or menúes
  'el bisturí': 'los bisturíes',
  'el jabalí': 'los jabalíes',
  'el hindú': 'los hindúes',
  'el bambú': 'los bambúes',
  'el tabú': 'los tabúes',
  'el champú': 'los champús', // or champúes
  
  // Foreign loanwords
  'el club': 'los clubes', // or clubs
  'el superávit': 'los superávits',
  'el déficit': 'los déficits',
  'el récord': 'los récords',
  
  // Compound nouns
  'el abrelatas': 'los abrelatas',
  'el cascanueces': 'los cascanueces',
  'el limpiaparabrisas': 'los limpiaparabrisas',
  'el parabrisas': 'los parabrisas',
  'el paraguas': 'los paraguas',
  'el pararrayos': 'los pararrayos',
  'el sacacorchos': 'los sacacorchos',
  
  // Latin/Greek origin words
  'el currículum': 'los currículos',
  'el memorándum': 'los memorandos',
  'el ultimátum': 'los ultimátums',
};

// Derive singular forms from plural forms
export const spanishIrregularSingulars: ExceptionMap = Object.entries(spanishIrregularPlurals)
  .reduce((acc: ExceptionMap, [singular, plural]) => {
    // Only add entries where plural differs from singular
    if (singular !== plural) {
      acc[plural] = singular;
    }
    return acc;
  }, {});

// Words that are the same in singular and plural forms or are always plural/singular
export const spanishUncountableWords: string[] = [
  // Days of the week 
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  
  // Invariable nouns ending in -s
  'crisis',
  'análisis',
  'tesis',
  'virus',
  'cosmos',
  'atlas',
  
  // Academic subjects
  'matemáticas',
  'física',
  'química',
  'biología',
  'economía',
  'ética',
  'lingüística',
  'genética',
  'robótica',
  
  // Materials and substances
  'arroz',
  'agua',
  'leche',
  'café',
  'té',
  'mantequilla',
  'harina',
  'azúcar',
  'sal',
  'pimienta',
  'aceite',
  'gasolina',
  'oxígeno',
  'hidrógeno',
  'carbono',
  'oro',
  'plata',
  'hierro',
  'cobre',
  'madera',
  'papel',
  'plástico',
  'ropa',
  
  // Abstract concepts
  'información',
  'conocimiento',
  'evidencia',
  'consejo', // advice
  'noticias',
  'retroalimentación', // feedback
  'investigación',
  'tarea', // homework
  'educación',
  'sabiduría',
  'diversión',
  'entretenimiento',
  'risa',
  'suerte',
  'inteligencia',
  'coraje',
  'paciencia',
  'orgullo',
  'felicidad',
  'tristeza',
  'ira',
  
  // Always plural
  'gafas', // glasses
  'tijeras', // scissors
  'pinzas', // tweezers
  'alicates', // pliers
  'pantalones', // pants
  'vaqueros', // jeans
  'prismáticos', // binoculars
  'gafas de sol', // sunglasses
  'pijama', // pajamas
  'pantalones cortos', // shorts
];

// Words that change gender in plural form
export const spanishGenderChanges: Record<string, 'masculine' | 'feminine'> = {
  'el agua': 'feminine', // singular is masculine for pronunciation but feminine in nature
  'el águila': 'feminine',
  'el arma': 'feminine',
  'el hacha': 'feminine',
  'el alma': 'feminine',
  'el aula': 'feminine',
  'el área': 'feminine',
  'el hambre': 'feminine',
  'el arte': 'masculine' // singular can be both, plural is masculine
};