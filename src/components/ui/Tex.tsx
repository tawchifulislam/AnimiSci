import katex from "katex";

export function Tex({
  children,
  display = false,
  className,
}: {
  children: string;
  display?: boolean;
  className?: string;
}) {
  const html = katex.renderToString(children, {
    displayMode: display,
    throwOnError: false,
    strict: false,
  });
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
