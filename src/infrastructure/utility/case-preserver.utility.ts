/* eslint-disable regexp/no-obscure-range */
import type { ICasePreserver } from "../interface/case-preserver.interface";

export const CasePreserver: ICasePreserver = {
	preserveCase(original: string, modified: string): string {
		if (!original || !modified) return modified || "";

		// Handle all uppercase
		if (/^[^a-zа-яёñáéíóúü]*$/.test(original) && /[A-ZА-ЯЁÑÁÉÍÓÚÜ]/.test(original)) {
			return modified.toUpperCase();
		}

		// Handle capitalized
		if (/^[^a-zA-Zа-яА-ЯёЁñÑáÁéÉíÍóÓúÚüÜ]*[A-ZА-ЯЁÑÁÉÍÓÚÜ][^A-ZА-ЯЁÑÁÉÍÓÚÜ]*$/.test(original)) {
			const firstLetterMatch: null | RegExpExecArray = /[a-zа-яёñáéíóúü]/i.exec(modified);

			if (firstLetterMatch) {
				const index: number = firstLetterMatch.index;

				return modified.slice(0, Math.max(0, index)) + modified[index].toUpperCase() + modified.slice(Math.max(0, index + 1)).toLowerCase();
			}

			return modified.toLowerCase();
		}

		// Handle mixed case
		if (/[A-ZА-ЯЁÑÁÉÍÓÚÜ]/.test(original) && /[a-zа-яёñáéíóúü]/.test(original)) {
			let result: string = modified.toLowerCase();

			// Process the case letter by letter with more precise capitalization
			const words: Array<{ end: number; start: number; text: string }> = [];
			let wordStart: number = 0;
			let isInWord: boolean = false;

			// First extract words
			for (let index: number = 0; index < original.length; index++) {
				const char: string = original[index];
				const isLetter: boolean = /[a-zA-Zа-яА-ЯёЁñÑáÁéÉíÍóÓúÚüÜ]/.test(char);

				if (!isInWord && isLetter) {
					wordStart = index;
					isInWord = true;
				} else if (isInWord && !isLetter) {
					words.push({
						end: index,
						start: wordStart,
						text: original.slice(wordStart, index),
					});
					isInWord = false;
				}
			}

			if (isInWord) {
				words.push({
					end: original.length,
					start: wordStart,
					text: original.slice(Math.max(0, wordStart)),
				});
			}

			// Now process the modified string
			const modifiedWords: Array<{ end: number; start: number; text: string }> = [];
			wordStart = 0;
			isInWord = false;

			for (let index: number = 0; index < modified.length; index++) {
				const char: string = modified[index];
				const isLetter: boolean = /[a-zA-Zа-яА-ЯёЁñÑáÁéÉíÍóÓúÚüÜ]/.test(char);

				if (!isInWord && isLetter) {
					wordStart = index;
					isInWord = true;
				} else if (isInWord && !isLetter) {
					modifiedWords.push({
						end: index,
						start: wordStart,
						text: modified.slice(wordStart, index),
					});
					isInWord = false;
				}
			}

			if (isInWord) {
				modifiedWords.push({
					end: modified.length,
					start: wordStart,
					text: modified.slice(Math.max(0, wordStart)),
				});
			}

			// For each word, maintain the capitalization pattern from the original
			for (let wordIndex: number = 0; wordIndex < Math.min(words.length, modifiedWords.length); wordIndex++) {
				const originalWord: { end: number; start: number; text: string } = words[wordIndex];
				const modifiedWord: { end: number; start: number; text: string } = modifiedWords[wordIndex];
				const origText: string = originalWord.text;
				const moduleText: string = modifiedWord.text;

				let charIndex: number = 0;

				for (let index: number = 0; index < origText.length && charIndex < moduleText.length; index++) {
					// Skip non-letter characters in original
					if (!/[a-zA-Zа-яА-ЯёЁñÑáÁéÉíÍóÓúÚüÜ]/.test(origText[index])) {
						continue;
					}

					// If original is uppercase, make modified uppercase
					if ((origText[index] >= "A" && origText[index] <= "Z") || (origText[index] >= "А" && origText[index] <= "Я") || origText[index] === "Ё" || "ÑÁÉÍÓÚÜ".includes(origText[index])) {
						const pos: number = modifiedWord.start + charIndex;
						result = result.slice(0, Math.max(0, pos)) + result[pos].toUpperCase() + result.slice(Math.max(0, pos + 1));
					}

					charIndex++;
				}
			}

			return result;
		}

		return modified.toLowerCase();
	},
};
