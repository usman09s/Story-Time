"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { formats, modules } from "../components/toolbar";
import { useState } from "react";
import debounce from "lodash.debounce";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p></p>,
});

export default function Editor({
  value,
  isFaq,
  isNotification,
  onStateChange,
}: {
  value: string;
  isFaq?: boolean;
  isNotification?: boolean;
  onStateChange: (newValue: string) => void;
}) {
  const [context, setContext] = useState(value);

  const debouncedHandleStateChange = debounce((newValue: string) => {
    setContext(newValue);
    onStateChange(newValue);
  }, 400);

  const handleStateChange = (newValue: string) => {
    debouncedHandleStateChange(newValue);
  };

  return (
    <div>
      <QuillNoSSRWrapper
        value={value}
        theme="snow"
        onChange={handleStateChange}
        modules={modules}
        formats={formats}
        style={
          isNotification
            ? { height: "300px", fontSize: "20px", padding: "15px" }
            : { height: "595px", fontSize: "50px", padding: "15px" }
        }
        className={`text-black  placeholder:text-TextColor3 ${
          isNotification
            ? "min-h-[300px]   text-white "
            : "bg-DarkLight text-5xl"
        }`}
      />
    </div>
  );
}
