export interface JsonParseResult {
  data: JsonValue | null;
  error: string | null;
}

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray;

export interface JsonObject {
  [key: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> {}

export interface JsonViewerProps {
  data: JsonValue;
  level: number;
}

export interface EscapeCharacterMap {
  [key: string]: string;
}
