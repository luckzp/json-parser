import { ESCAPE_CHARACTER_MAP, VISUAL_INDENT } from "../constants";

/**
 * Processes escape characters in a string
 */
export const processEscapeCharacters = (input: string): string => {
  return input.replace(/\\(["\\/bfnrt])/g, (_, char) => {
    return ESCAPE_CHARACTER_MAP[char] || char;
  });
};

/**
 * Generates indentation for a given level
 */
export const generateIndent = (level: number): string => {
  return Array(level).fill(VISUAL_INDENT).join("");
};

/**
 * Trims and validates input string
 */
export const sanitizeInput = (input: string): string => {
  return input.trim();
};
