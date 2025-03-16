
import {Language} from "../../domain/type/language.type";
import {IPluralizerFactory} from "../../domain/interface/pluralizer-factory.interface";
import {IPluralizer} from "../../domain/interface/pluralizer.interface";

export class PluralizerFactory implements IPluralizerFactory {
  private readonly pluralizers: Map<Language, IPluralizer>;
  
  constructor() {
    this.pluralizers = new Map<Language, IPluralizer>();
    // No built-in pluralizers registered by default
    // All pluralizers should be registered explicitly
  }
  
  /**
   * Registers a new pluralizer for a language
   * @param language The language code
   * @param pluralizer The pluralizer implementation
   */
  registerPluralizer(language: Language, pluralizer: IPluralizer): void {
    this.pluralizers.set(language, pluralizer);
  }
  
  createPluralizer(language: Language): IPluralizer {
    const pluralizer = this.pluralizers.get(language);
    
    if (!pluralizer) {
      throw new Error(`Unsupported language: ${language}`);
    }
    
    return pluralizer;
  }
  
  supportsLanguage(language: Language): boolean {
    return this.pluralizers.has(language);
  }
  
  getSupportedLanguages(): Language[] {
    return Array.from(this.pluralizers.keys()) as Language[];
  }
}
