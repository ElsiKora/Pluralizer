import { IPluralizer } from '../../domain/interfaces/pluralizer.interface';
import { Language, Word } from '../../domain/entities/word.entity';
import { 
  englishIrregularPlurals, 
  englishIrregularSingulars,
  englishUncountableWords,
  englishFalsePluralWords
} from '../../infrastructure/exceptions/english-exceptions.service';
import { 
  englishPluralRules, 
  englishSingularRules 
} from '../../infrastructure/rules/english-rules.service';

export class EnglishPluralizer implements IPluralizer {
  pluralize(word: Word, count = 2): string {
    const value = word.getValue();
    
    // If count is 1, return singular form
    if (count === 1) {
      return value;
    }
    
    // Check if word is English
    if (word.getLanguage() !== 'en') {
      throw new Error('EnglishPluralizer can only pluralize English words');
    }
    
    return this.toPlural(value);
  }
  
  isPlural(word: string): boolean {
    if (englishUncountableWords.includes(word.toLowerCase())) {
      return false;
    }
    
    const lowerWord = word.toLowerCase();
    
    // Check if word is a false plural
    if (englishFalsePluralWords.includes(lowerWord)) {
      return false;
    }
    
    // Check if word is an irregular plural
    if (Object.values(englishIrregularPlurals).includes(lowerWord)) {
      return true;
    }
    
    // Apply rules to check if it's a plural form
    return englishSingularRules.some(rule => rule.matches(lowerWord));
  }
  
  isSingular(word: string): boolean {
    if (englishUncountableWords.includes(word.toLowerCase())) {
      return true;
    }
    
    const lowerWord = word.toLowerCase();
    
    // Check if word is an irregular singular
    if (Object.keys(englishIrregularPlurals).includes(lowerWord)) {
      return true;
    }
    
    // Not plural usually means singular
    return !this.isPlural(lowerWord);
  }
  
  toPlural(word: string): string {
    const lowerWord = word.toLowerCase();
    
    // Check if word is uncountable (same in singular and plural)
    if (englishUncountableWords.includes(lowerWord)) {
      return word;
    }
    
    // Check if word is already plural
    if (this.isPlural(lowerWord)) {
      return word;
    }
    
    // Check irregular forms
    if (englishIrregularPlurals[lowerWord]) {
      // Preserve original capitalization
      const irregular = englishIrregularPlurals[lowerWord];
      return this.preserveCase(word, irregular);
    }
    
    // Apply regular rules
    for (const rule of englishPluralRules) {
      if (rule.matches(lowerWord)) {
        return this.preserveCase(word, rule.apply(lowerWord));
      }
    }
    
    // If no rules match (unlikely), add 's'
    return `${word}s`;
  }
  
  toSingular(word: string): string {
    const lowerWord = word.toLowerCase();
    
    // Check if word is uncountable (same in singular and plural)
    if (englishUncountableWords.includes(lowerWord)) {
      return word;
    }
    
    // Check if word is already singular
    if (this.isSingular(lowerWord)) {
      return word;
    }
    
    // Check irregular forms
    if (englishIrregularSingulars[lowerWord]) {
      // Preserve original capitalization
      const irregular = englishIrregularSingulars[lowerWord];
      return this.preserveCase(word, irregular);
    }
    
    // Apply regular rules
    for (const rule of englishSingularRules) {
      if (rule.matches(lowerWord)) {
        return this.preserveCase(word, rule.apply(lowerWord));
      }
    }
    
    // If no rules match, return the original
    return word;
  }
  
  private preserveCase(original: string, modified: string): string {
    // If original is all uppercase
    if (original === original.toUpperCase()) {
      return modified.toUpperCase();
    }
    
    // If original is capitalized
    if (original[0] === original[0].toUpperCase()) {
      return modified.charAt(0).toUpperCase() + modified.slice(1);
    }
    
    // Otherwise, use lowercase
    return modified.toLowerCase();
  }
}
