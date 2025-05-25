"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FileJson2, FileDown, Copy, Trash2 } from "lucide-react";
import { JsonValue } from "@/lib/types";
import { downloadJsonFile, copyToClipboard } from "@/lib/utils/fileUtils";
import { UI_CONSTANTS, TOOLTIPS } from "@/lib/constants";

interface JsonToolbarProps {
  data?: JsonValue | null;
  onProcessEscape?: () => void;
  onClear?: () => void;
  onError?: (error: string) => void;
  variant?: "input" | "output";
}

/**
 * Toolbar component for JSON operations
 */
const JsonToolbar: React.FC<JsonToolbarProps> = ({
  data,
  onProcessEscape,
  onError,
  variant = "output",
}) => {
  const handleDownload = useCallback(async () => {
    if (!data) return;

    try {
      downloadJsonFile(data);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Download failed");
    }
  }, [data, onError]);

  const handleCopy = useCallback(async () => {
    if (!data) return;

    try {
      await copyToClipboard(data);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Copy failed");
    }
  }, [data, onError]);

  if (variant === "input") {
    return (
      <div className="flex gap-2 border-b border-border pl-1">
        {onProcessEscape && (
          <Button
            variant="ghost"
            className={UI_CONSTANTS.BUTTON_SIZE}
            onClick={onProcessEscape}
            title={TOOLTIPS.REMOVE_ESCAPE}
            aria-label="Remove escape characters from JSON input"
          >
            <FileJson2 />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-1 border-b border-border pl-3">
      <Button
        variant="ghost"
        size="lg"
        className={UI_CONSTANTS.BUTTON_SIZE}
        onClick={handleDownload}
        disabled={!data}
        title={TOOLTIPS.DOWNLOAD}
        aria-label="Download JSON as file"
      >
        <FileDown />
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className={UI_CONSTANTS.BUTTON_SIZE}
        onClick={handleCopy}
        disabled={!data}
        title={TOOLTIPS.COPY}
        aria-label="Copy JSON to clipboard"
      >
        <Copy />
      </Button>
    </div>
  );
};

export default JsonToolbar;
