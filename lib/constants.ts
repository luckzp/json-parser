import { EscapeCharacterMap } from "./types";

export const ESCAPE_CHARACTER_MAP: EscapeCharacterMap = {
  '"': '"', // Double quote
  "\\": "\\", // Backslash
  "/": "/", // Forward slash
  b: "\b", // Backspace
  f: "\f", // Form feed
  n: "\n", // Newline
  r: "\r", // Carriage return
  t: "\t", // Tab
};

export const JSON_MIME_TYPE = "application/json";
export const DEFAULT_FILENAME = "data.json";
export const INDENT_SIZE = 2;
export const VISUAL_INDENT = "    ";

export const UI_CONSTANTS = {
  CONTAINER_WIDTH: "w-3/4",
  PANEL_HEIGHT: "h-[85vh]",
  BUTTON_SIZE: "h-10 w-10 p-2",
} as const;

export const PLACEHOLDERS = {
  JSON_INPUT: "Please enter the JSON data...",
} as const;

export const TOOLTIPS = {
  REMOVE_ESCAPE: "Remove escape characters",
  DOWNLOAD: "Download JSON file",
  COPY: "Copy to clipboard",
  COLLAPSE: "Collapse/Expand",
} as const;
