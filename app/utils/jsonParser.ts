import { jsonrepair } from "jsonrepair";

export const parseJsonString = (content: string) => {
  try {
    const trimmed = content.trim();
    if (!trimmed) {
      return { data: null, error: null };
    }

    // 1. 先尝试正常解析
    try {
      // 保留转义
      const parsed = JSON.parse(trimmed);
      return { data: parsed, error: null };
    } catch {
      // 如果正常解析失败，继续下一步
      console.log("正常解析失败");
    }

    // 2. 使用 jsonrepair 修复
    try {
      const repaired = jsonrepair(trimmed);
      const parsed = JSON.parse(repaired);
      return { data: parsed, error: null };
    } catch {
      console.log("jsonrepair 修复失败");
    }

    // 4. 如果上述都失败，抛出原始错误
    throw new Error("Invalid JSON format");
  } catch (e) {
    return { data: null, error: (e as Error).message };
  }
}; 