"use client";
import Image from "next/image";
import React from "react";
import { Quill } from "react-quill";


export const modules = {
  toolbar: {
    container: "#toolbar",
  },
};
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);
// const LinkChange = () => {
//   this,quill.format.
// }
// Formats objects for setting up the Quill editor
export const formats = [
  "bold",
  "italic",
  "underline",
  "align",
  "link",
  "image",
];

// Quill Toolbar component
export const QuillToolbar = ({
  isNotification,
}: {
  isNotification?: boolean;
}) => (
  <div id="toolbar" className="flex justify-between pl-10 ">
    <span className="ql-formats">
      {/* Important declaration to increase icon size */}
      <button className="relative">
        <Image
          src="/assets/TextArea.svg"
          alt=""
          width={33}
          height={20}
          className="absolute top-[6px] left-1"
        />
      </button>
      <div className="border-l h-7 ml-3 mt-1"></div>

      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <div className="border-l h-7 ml-3 mt-1"></div>
      <button className="ql-align"></button>

      <button className="ql-align" value="center"></button>
      <button className="ql-align" value="right"></button>
      <button className="ql-align" value="justify"></button>
      <div className="border-l h-7 ml-3 mt-1"></div>
      {isNotification ? (
        <span className="ql-formats">
          <button className="ql-image"></button>
        </span>
      ) : null}
    </span>
    {isNotification ? null : (
      <>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span className="ql-formats flex ">
          {/* Important declaration to increase icon size */}
          <button className="ql-link"></button>
          <div className="border-l h-7 ml-2 mt-1"></div>
          <button className="ql-image"></button>
        </span>
      </>
    )}
  </div>
);

export default QuillToolbar;
