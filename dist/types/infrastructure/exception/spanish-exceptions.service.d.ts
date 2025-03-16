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
export declare const spanishFalsePluralWords: string[];
export declare const spanishIrregularPlurals: ExceptionMap;
export declare const spanishIrregularSingulars: ExceptionMap;
export declare const spanishUncountableWords: string[];
export declare const spanishGenderChanges: Record<string, 'masculine' | 'feminine'>;
