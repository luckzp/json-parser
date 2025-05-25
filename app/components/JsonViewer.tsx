"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";

interface JsonViewerProps {
  data: any;
  level: number;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data, level }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const generateIndent = (level: number) => {
    return Array(level).fill("    ").join("");
  };

  if (data === null) {
    return <span className="text-orange-500 font-bold">null</span>;
  }

  if (data === "") {
    return <span className="text-orange-500 font-bold">""</span>;
  }

  if (Array.isArray(data)) {
    return (
      <div className="relative">
        <span
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cursor-pointer inline-block mr-1"
        >
          <FontAwesomeIcon
            icon={isCollapsed ? faPlusSquare : faMinusSquare}
            className="text-gray-600"
          />
        </span>
        {isCollapsed ? (
          <span className="text-gray-800">Array[{data.length}]</span>
        ) : (
          <div className="ml-4">
            [
            {data.map((item, index) => (
              <div key={index}>
                {generateIndent(level)}
                <JsonViewer data={item} level={level + 1} />
                {index < data.length - 1 && ","}
              </div>
            ))}
            {generateIndent(level - 1)}]
          </div>
        )}
      </div>
    );
  }

  if (typeof data === "object") {
    return (
      <div className="relative">
        <span
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cursor-pointer inline-block mr-1"
        >
          <FontAwesomeIcon
            icon={isCollapsed ? faPlusSquare : faMinusSquare}
            className="text-gray-600"
          />
        </span>
        {isCollapsed ? (
          <span className="text-gray-800">Object{"{...}"}</span>
        ) : (
          <div className="ml-4">
            {"{"}
            {Object.entries(data).map(([key, value], index, array) => (
              <div key={key}>
                {generateIndent(level)}
                <span className="text-purple-600 font-bold">"{key}"</span>
                <span className="text-gray-800">: </span>
                <JsonViewer data={value} level={level + 1} />
                {index < array.length - 1 && ","}
              </div>
            ))}
            {generateIndent(level - 1)}
            {"}"}
          </div>
        )}
      </div>
    );
  }

  if (typeof data === "number") {
    return <span className="text-blue-500 font-bold">{data}</span>;
  }

  if (typeof data === "boolean") {
    return <span className="text-red-400 font-bold">{String(data)}</span>;
  }

  if (typeof data === "string") {
    return <span className="text-green-600 font-bold">"{data}"</span>;
  }

  return <span>{String(data)}</span>;
};

export default JsonViewer;
