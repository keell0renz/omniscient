import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ className, children }: any) => {
    const customStyle = {
        ...vscDarkPlus,
        'code[class*="language-"]': {
            color: 'foreground',
            fontSize: '16px',
        },
    };

    const language = className ? className.replace('language-', '') : 'javascript';

    return (
        <SyntaxHighlighter language={language} style={customStyle}>
            {children}
        </SyntaxHighlighter>
    );
};

CodeBlock.displayName = 'CodeBlock';

export default React.memo(CodeBlock);