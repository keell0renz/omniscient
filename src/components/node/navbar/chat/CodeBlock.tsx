import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = React.memo((props: any) => {
    const customStyle = {
        ...vscDarkPlus,
        'code[class*="language-"]': {
            color: 'foreground',
            fontSize: '16px',
        },
    };

    const language = props.className ? props.className.replace('language-', '') : 'javascript';

    return (
        <SyntaxHighlighter language={language} style={customStyle}>
            {props.children}
        </SyntaxHighlighter>
    );
});

export default CodeBlock;
