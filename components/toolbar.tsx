"use client";
import Image from "next/image";
import React from "react";


export const modules = {
  toolbar: {
    container: "#toolbar",
  },
};


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
  <div id="toolbar" className="flex justify-between">
    <span className="ql-formats pl-5">
      {/* Important declaration to increase icon size */}
      <button className="relative mr-3">
        <Image
          src="/assets/text.svg"
          alt=""
          width={42}
          height={42}
          className="absolute top-[4px] left-1"
        />
      </button>
      <div className="border-[1.2px] h-7 mt-1 mx-2"></div>

      <button className="ql-bold mx-1"></button>
      <button className="ql-italic mx-1"></button>
      <button className="ql-underline mx-1"></button>
      <div className="border-[1.2px] h-7 ml-3 mt-1 mx-3"></div>
      <button className="ql-align"></button>

      <button className="ql-align mx-1" value="center"></button>
      <button className="ql-align mx-1" value="right"></button>
      <button className="ql-align mx-1" value="justify"></button>
      <div className="border-[1.2px] h-7 ml-3 mt-1"></div>
    </span>
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
        {isNotification && (
          <span className="ql-formats flex ">
          {/* Important declaration to increase icon size */}
          <button className="ql-link mr-1"></button>
          <div className="border-l h-7 ml-3 mt-1"></div>
          <button className="ql-image mr-7 ml-2"></button>
        </span>
        ) }
  </div>
);

export default QuillToolbar;