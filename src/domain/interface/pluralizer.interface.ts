import {Word} from "../entity/word.entity";

export interface IPluralizer {
  pluralize(word: Word, count?: number): string;
  isPlural(word: string): boolean;
  isSingular(word: string): boolean;
  toPlural(word: string): string;
  toSingular(word: string): string;
}
