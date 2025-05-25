"use client";

import { useState, useCallback } from "react";
import { JsonValue } from "@/lib/types";
import { parseJsonString } from "@/app/utils/jsonUtils";
import { processEscapeCharacters } from "@/lib/utils/stringUtils";

export interface UseJsonParserReturn {
  input: string;
  parsedData: JsonValue | null;
  error: string | null;
  setInput: (value: string) => void;
  parseJson: (content: string) => void;
  processEscapeChars: () => void;
  clearInput: () => void;
  hasData: boolean;
  hasError: boolean;
}

/**
 * Custom hook for managing JSON parsing state and operations
 */
export const useJsonParser = (): UseJsonParserReturn => {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState<JsonValue | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseJson = useCallback((content: string) => {
    const { data, error } = parseJsonString(content);
    setParsedData(data);
    setError(error);
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      parseJson(value);
    },
    [parseJson]
  );

  const processEscapeChars = useCallback(() => {
    try {
      const processedInput = processEscapeCharacters(input);
      setInput(processedInput);
      parseJson(processedInput);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to process escape characters"
      );
    }
  }, [input, parseJson]);

  const clearInput = useCallback(() => {
    setInput("");
    setParsedData(null);
    setError(null);
  }, []);

  return {
    input,
    parsedData,
    error,
    setInput: handleInputChange,
    parseJson,
    processEscapeChars,
    clearInput,
    hasData: parsedData !== null,
    hasError: error !== null,
  };
};
