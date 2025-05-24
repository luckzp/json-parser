import { jsonrepair } from "jsonrepair";

export const parseJsonString = (content: string) => {
  try {
    const trimmed = content.trim();
    if (!trimmed) {
      return { data: null, error: null };
    }

    // Helper function to try parsing JSON strings
    const tryParseNestedJson = (str: string): any => {
      try {
        // 尝试解析嵌套的JSON字符串
        const parsed = JSON.parse(str);
        return processNestedJson(parsed);
      } catch {
        // 如果不是有效的JSON，返回原始字符串
        return str;
      }
    };

    // Process nested JSON strings recursively
    const processNestedJson = (obj: any): any => {
      if (typeof obj === "string") {
        return tryParseNestedJson(obj);
      }

      if (typeof obj === "object" && obj !== null) {
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

    // 3. 如果还是失败，尝试处理转义字符后再解析
    try {
      const processedInput = trimmed.replace(/\\(["\\/bfnrt])/g, (_, char) => {
        const escapeMap: { [key: string]: string } = {
          '"': '"',
          "\\": "\\",
          "/": "/",
          b: "\b",
          f: "\f",
          n: "\n",
          r: "\r",
          t: "\t",
        };
        return escapeMap[char] || char;
      });

      const parsed = JSON.parse(processedInput);
      return { data: processNestedJson(parsed), error: null };
    } catch (e) {
      console.log("Escape processing failed:", e);
    }

    throw new Error("Invalid JSON format");
  } catch (e) {
    return { data: null, error: (e as Error).message };
  }
};
