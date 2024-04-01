"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { EditorSkeleton } from "./skeletons/EditorSkeleton";

interface Props {
  value: string | undefined;
  setValue: (val: string) => void;
}

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export const options = [
  "header",
  "bold",
  "size",
  "italic",
  "underline",
  "align",
  "align",
  "align",
  "justify",
  "link",
  "list",
  "bullet",
  "indent",
];

export default function Editor({ value, setValue }: Props) {
  return (
    <div className="max-w-6xl border-2 border-[#E4E4E4] min-h-[730px] ">
      <QuillNoSSRWrapper
        theme="snow"
        modules={modules}
        formats={options}
        className="h-full max-w-6xl w-full px-12 py-5"
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
