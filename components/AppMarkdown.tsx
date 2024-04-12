import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Label } from "./ui/Label";
import { createElement } from "react";

const createMarkdownElement = (tag: keyof JSX.IntrinsicElements, props: any) =>
  createElement(tag, {
    ...props,
  });

// Styling for HTML attributes for markdown component
const REACT_MARKDOWN_CONFIG: Components = {
  img: ({ node, ...props }) =>
    createMarkdownElement("img", {
      className: "py-10 w-full",
      ...props,
    }),
  a: ({ node, ...props }) =>
    createMarkdownElement("a", {
      className: "text-orange",
      target: "_blank",
      ...props,
    }),
  u: ({ node, ...props }) =>
    createMarkdownElement("span", {
      className: "underline",
      ...props,
    }),
  ins: ({ node, ...props }) =>
    createMarkdownElement("span", {
      className: "underline",
      ...props,
    }),
  strong: ({ node, ...props }) =>
    createMarkdownElement("span", {
      className: "font-bold",
      ...props,
    }),
  span: ({ ...props }: any) => <Label.Paragraph {...props} />,
  p: ({ ...props }: any) => <Label.Paragraph {...props} />,
};

interface MarkdownProps {
  children: string;
}
export const AppMarkdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      skipHtml={false}
      components={REACT_MARKDOWN_CONFIG}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {children}
    </ReactMarkdown>
  );
};
