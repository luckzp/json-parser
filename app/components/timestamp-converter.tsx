"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = React.useState("");
  const [convertedTime, setConvertedTime] = React.useState("");
  const [timezone, setTimezone] = React.useState("Asia/Shanghai");

  const handleConvert = React.useCallback(() => {
    try {
      if (!timestamp.trim()) {
        setConvertedTime("");
        return;
      }
      // Handle unix timestamp (10 or 13 digits) and regular date string
      const date = /^\d{10,13}$/.test(timestamp)
        ? new Date(parseInt(timestamp) * (timestamp.length === 10 ? 1000 : 1))
        : new Date(timestamp);

      const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      setConvertedTime(date.toLocaleString("zh-CN", options));
    } catch (error) {
      setConvertedTime("Invalid timestamp");
    }
  }, [timestamp, timezone]);

  React.useEffect(() => {
    handleConvert();
  }, [handleConvert]);

  return (
    <div className="w-full max-w-2xl space-y-1">
      <div className="text-sm text-gray-600">Timestamp Converter</div>
      <div className="flex items-center gap-4">
        <Input
          placeholder="timestamp"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="flex-1"
        />
        <Input value={convertedTime} readOnly className="flex-1" />
        <Select
          value={timezone}
          onValueChange={setTimezone}
          defaultValue="Asia/Shanghai"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择时区" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
            <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
            <SelectItem value="America/New_York">America/New_York</SelectItem>
            <SelectItem value="Europe/London">Europe/London</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
