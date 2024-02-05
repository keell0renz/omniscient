import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CheckCheck, Copy } from "lucide-react";

const CodeBlock = ({ className, children }: any) => {
  const language = className
    ? className.replace("language-", "")
    : "javascript";

  const [isCopied, setIsCopied] = useState(false);

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000)
      })
  }

  if (children) {
    const codeArray = children.split(" ")
    if (codeArray.length <= 1) {
      return (
        <p className="font-bold font-mono px-1 py-0.5 my-2 bg-black w-fit inline rounded-full">
          {children}
        </p>
      )
    }
  }

  return (
    <div className="border highlighter my-5 rounded-md">
      <div className="flex flex-row justify-between items-center">
        <p className="ml-2 py-1 text-sm text-muted-foreground">{language}</p>
        <p
          className={`${isCopied ? "hover:bg-transparent select-none" : "cursor-pointer"} hover:bg-gray-500/20 mr-2 py-1 text-sm text-muted-foreground inline-flex items-center gap-1 my-1 rounded-full px-2`}
          onClick={() => handleCopy(children)}
        >
          {isCopied ? (
            <>
              <CheckCheck className="h-full p-1" />
              Done
            </>
          ) : (
            <>
              <Copy className="h-full p-1" />
              Copy
            </>
          )}
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
