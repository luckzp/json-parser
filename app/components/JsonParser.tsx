"use client";

import { useEffect, useRef } from "react";
import TimestampConverter from "./TimestampConverter";
import JsonToolbar from "@/app/components/JsonToolbar";
import JsonViewer from "@/app/components/JsonViewer";
import { useJsonParser } from "@/app/hooks/useJsonParser";

export default function JsonParser() {
  const { input, parsedData, error, setInput, processEscapeChars } =
    useJsonParser();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // 自动聚焦
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 标题区域 - 与主内容区域保持相同的宽度和对齐方式 */}
      <div className="w-full pt-6  px-12">
        <div className="w-3/4 mx-auto flex justify-between">
          {/* 使用与主内容区域相同的宽度 */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              JSON Parser
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              A tool for parsing and formatting JSON data
            </p>
          </div>
          <TimestampConverter />
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 w-full p-8">
        <div className="w-3/4 h-[85vh] mx-auto flex rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex flex-col w-1/2">
            <JsonToolbar
              data={input}
              onProcessEscape={() => {
                processEscapeChars();
              }}
              variant="input"
            />
            <textarea
              value={input}
              ref={textareaRef}
              onChange={() => {
                setInput(textareaRef.current?.value || "");
              }}
              placeholder="Please enter the JSON data..."
              className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none "
            />
          </div>
          <div className="w-px bg-gray-200" /> {/* 分割线也相应改变颜色 */}
          <div className="w-1/2 overflow-auto flex flex-col">
            <JsonToolbar data={parsedData} variant="output" />
            <div className="flex-1 overflow-auto px-6 py-4">
              {error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                parsedData && <JsonViewer data={parsedData} level={1} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
