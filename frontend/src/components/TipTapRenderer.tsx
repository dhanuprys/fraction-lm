import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import React from "react";
import { Heading } from "@/components/pouf/text";

export function renderTipTapNode(node: any, index: number = 0): React.ReactNode {
  if (!node) return null;

  if (node.type === "doc") {
    return (
      <div
        key={index}
        className="flex flex-col gap-5 text-[var(--ink)] leading-relaxed text-[17px] md:text-[18px]"
      >
        {node.content?.map((n: any, i: number) => renderTipTapNode(n, i))}
      </div>
    );
  }

  if (node.type === "paragraph") {
    return (
      <p key={index} className="my-1">
        {node.content?.map((n: any, i: number) => renderTipTapNode(n, i))}
        {!node.content && <br />}
      </p>
    );
  }

  if (node.type === "text") {
    let el: React.ReactNode = node.text;
    if (node.marks) {
      node.marks.forEach((mark: any, mIdx: number) => {
        if (mark.type === "bold")
          el = (
            <strong key={`b-${mIdx}`} className="font-black">
              {el}
            </strong>
          );
        if (mark.type === "italic") el = <em key={`i-${mIdx}`}>{el}</em>;
        if (mark.type === "strike")
          el = (
            <s key={`s-${mIdx}`} className="text-gray-400">
              {el}
            </s>
          );
      });
    }
    return <span key={index}>{el}</span>;
  }

  if (node.type === "math" || node.type === "math_display") {
    const mathCode =
      node.attrs?.latex ||
      node.attrs?.math ||
      (node.content && node.content[0]?.text) ||
      node.text ||
      "";
    return (
      <div
        key={index}
        className="my-8 overflow-x-auto flex justify-center text-xl md:text-2xl py-6 px-8 bg-[rgba(201,168,255,0.2)] rounded-[24px] border-2 border-[var(--purple)] text-[var(--ink)]"
        style={{ boxShadow: "var(--pouf-blob)" }}
      >
        <BlockMath math={mathCode} />
      </div>
    );
  }

  if (node.type === "inlineMath" || node.type === "math_inline") {
    const mathCode =
      node.attrs?.latex ||
      node.attrs?.math ||
      (node.content && node.content[0]?.text) ||
      node.text ||
      "";
    return (
      <span
        key={index}
        className="px-1 text-[var(--ink)] bg-[rgba(201,168,255,0.2)] rounded font-black text-[1.1em]"
      >
        <InlineMath math={mathCode} />
      </span>
    );
  }

  if (node.type === "image") {
    return (
      <div key={index} className="my-8 flex justify-center">
        <img
          src={node.attrs?.src}
          alt={node.attrs?.alt || "Materi Gambar"}
          className="max-w-full rounded-[24px] shadow-[var(--pouf-blob)] border-[6px] border-white object-cover"
        />
      </div>
    );
  }

  if (node.type === "heading") {
    const level = (node.attrs?.level || 2) as number;
    const safeLevel = (level <= 3 ? level : 3) as 1 | 2 | 3;
    return (
      <div key={index} className={`mt-${level === 1 ? "10" : "8"} mb-2`}>
        <Heading level={safeLevel}>
          {node.content?.map((n: any, i: number) => renderTipTapNode(n, i))}
        </Heading>
      </div>
    );
  }

  if (node.type === "bulletList") {
    return (
      <ul
        key={index}
        className="list-disc pl-8 my-2 flex flex-col gap-3 marker:text-[var(--purple)] marker:text-xl"
      >
        {node.content?.map((n: any, i: number) => renderTipTapNode(n, i))}
      </ul>
    );
  }

  if (node.type === "orderedList") {
    return (
      <ol
        key={index}
        className="list-decimal pl-8 my-2 flex flex-col gap-3 marker:text-[var(--purple)] marker:font-black marker:text-lg"
      >
        {node.content?.map((n: any, i: number) => renderTipTapNode(n, i))}
      </ol>
    );
  }

  if (node.type === "listItem") {
    return (
      <li key={index} className="pl-2">
        {node.content?.map((n: any, i: number) => renderTipTapNode(n, i))}
      </li>
    );
  }

  // Fallback for unknown object
  if (typeof node === "object") {
    if (node.content) {
      return (
        <div key={index}>{node.content.map((n: any, i: number) => renderTipTapNode(n, i))}</div>
      );
    }
  }

  return null;
}
