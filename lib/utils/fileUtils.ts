import { JsonValue } from "@/lib/types";
import { JSON_MIME_TYPE, DEFAULT_FILENAME, INDENT_SIZE } from "@/lib/constants";

/**
 * Downloads JSON data as a file
 */
export const downloadJsonFile = (
  data: JsonValue,
  filename: string = DEFAULT_FILENAME
): void => {
  try {
    const jsonString = JSON.stringify(data, null, INDENT_SIZE);
    const blob = new Blob([jsonString], { type: JSON_MIME_TYPE });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(
      `Failed to download file: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Copies JSON data to clipboard
 */
export const copyToClipboard = async (data: JsonValue): Promise<void> => {
  try {
    const jsonString = JSON.stringify(data, null, INDENT_SIZE);
    await navigator.clipboard.writeText(jsonString);
  } catch (error) {
    throw new Error(
      `Failed to copy to clipboard: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
