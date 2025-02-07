import { jsonrepair } from "jsonrepair";

export const parseJsonString = (content: string) => {
  try {
    const trimmed = content.trim();
    if (!trimmed) {
      return { data: null, error: null };
    }
    
    // Helper function to try parsing JSON strings
    const tryParse = (str: string) => {
      try {
        return JSON.parse(str);
      } catch {
        // If it's not valid JSON, return the original string
        return str;
      }
    };

    // Process nested JSON strings recursively
    const processNestedJson = (obj: any): any => {
      if (typeof obj === 'string') {
        return tryParse(obj);
      }
      
      if (typeof obj === 'object' && obj !== null) {
        const result: any = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
          result[key] = processNestedJson(obj[key]);
        }
        return result;
      }
      
      return obj;
    };

    // 1. First try normal parsing
    try {
      const parsed = JSON.parse(trimmed);
      return { data: processNestedJson(parsed), error: null };
    } catch (e) {
      console.log("Normal parsing failed:", e);
    }

    // 2. Try using jsonrepair if normal parsing fails
    try {
      const repaired = jsonrepair(trimmed);
      const parsed = JSON.parse(repaired);
      return { data: processNestedJson(parsed), error: null };
    } catch (e) {
      console.log("jsonrepair failed:", e);
    }

    // 3. If all attempts fail, throw error
    throw new Error("Invalid JSON format");
  } catch (e) {
    return { data: null, error: (e as Error).message };
  }
};