import { parseJsonString } from "@/app/utils/jsonUtils";

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

  test("should handle nested json", () => {
    const input = `
      {
        "user": "{\\\"name\\\":\\\"John\\\",\\\"age\\\":30}",
        "status": "active"
      }
    `;
    const expected = {
      user: {
        name: "John",
        age: 30,
      },
      status: "active",
    };
    const result = parseJsonString(input);
    expect(result).toEqual({ data: expected, error: null });
  });
});
