/**
 * Interface for preserving the case pattern of strings during transformations
 */
export interface ICasePreserver {
	/**
	 * Applies the case pattern from the original string to the modified string
	 * @param {string} original - The original string with the case pattern to preserve
	 * @param {string} modified - The modified string to apply the case pattern to
	 * @returns {string} The modified string with the original's case pattern applied
	 */
	preserveCase(original: string, modified: string): string;
}
