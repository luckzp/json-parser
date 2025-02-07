import { parseJsonString } from "@/app/utils/jsonParser";

describe("parseJsonString", () => {
  test("should parse empty string", () => {
    const result = parseJsonString("");
    expect(result).toEqual({ data: null, error: null });
  });

  test("should parse valid JSON object", () => {
    const input = '{"name": "John", "age": 30}';
    const expected = { name: "John", age: 30 };
    const result = parseJsonString(input);
    expect(result).toEqual({ data: expected, error: null });
  });

  test("should parse valid JSON array", () => {
    const input = "[1, 2, 3]";
    const expected = [1, 2, 3];
    const result = parseJsonString(input);
    expect(result).toEqual({ data: expected, error: null });
  });

  test("should handle escaped quotes", () => {
    const input = '{"message": "Hello \\"World\\""}';
    const expected = { message: 'Hello "World"' };
    const result = parseJsonString(input);
    expect(result).toEqual({ data: expected, error: null });
  });

  test("should handle null values", () => {
    const input = '{"value": null}';
    const expected = { value: null };
    const result = parseJsonString(input);
    expect(result).toEqual({ data: expected, error: null });
  });

  test("should handle nested objects", () => {
    const input = '{"user": {"name": "John", "age": 30}}';
    const expected = { user: { name: "John", age: 30 } };
    const result = parseJsonString(input);
    expect(result).toEqual({ data: expected, error: null });
  });

  test("should return error for invalid JSON", () => {
    const input = '{name: "John"}'; // Missing quotes around property name
    const result = parseJsonString(input);
    expect(result.data).toBeNull();
    expect(result.error).toBe("Invalid JSON format");
  });

  test("should handle escaped characters", () => {
    const input = '{"text": "Line1\\nLine2\\tTabbed"}';
    const expected = { text: "Line1\nLine2\tTabbed" };
    const result = parseJsonString(input);
    expect(result).toEqual({ data: expected, error: null });
  });

  test("should handle whitespace", () => {
    const input = `
      {
        "name": "John",
        "age": 30
      }
    `;
    const expected = { name: "John", age: 30 };
    const result = parseJsonString(input);
    expect(result).toEqual({ data: expected, error: null });
  });
});
