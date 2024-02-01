import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";

const CodeBlock = ({ className, children }: any) => {
  const language = className
    ? className.replace("language-", "")
    : "javascript";

  return (
    <div className="border highlighter my-5 rounded-md">
      <div className="flex flex-row justify-between items-center">
        <p className="ml-2 py-1 text-sm text-muted-foreground">{language}</p>
        <p className="mr-2 py-1 text-sm text-muted-foreground inline-flex items-center gap-1 my-1 rounded-full px-2 hover:bg-gray-500/20 cursor-pointer">
          <Copy className="h-full p-1" />
          Copy
        </p>
      </div>
      <SyntaxHighlighter language={language} style={vscDarkPlus}>
        {children}
      </SyntaxHighlighter >
    </div>
  );
};

CodeBlock.displayName = "CodeBlock";

export default React.memo(CodeBlock);
