import React from 'react';
import useTypingEffect from '../hooks/Effects';
import 'katex/dist/katex.min.css';
import katex from 'katex';

const LaTeXTyping = ({ 
    equation = `E = mc^2`,
    typingSpeed = 5,
    deletingSpeed = 5,
    pauseDuration = 2000,
    fontSize = 1.5 // New prop for font size scaling
}) => {
    const typedText = equation;

    // Render LaTeX safely
    const renderLatex = (tex) => {
        try {
            return katex.renderToString(tex, {
                throwOnError: false,
                displayMode: true,
                macros: {
                    "\\f": "f(#1)"
                }
            });
        } catch (e) {
            return tex;
        }
    };

    return (
        <div style={{
            padding: '20px',
            borderRadius: '5px',
            minWidth: '300px',
        }}>
            <div  
                style={{
                    fontSize: `${fontSize}em`,
                    lineHeight: '1.5',
                    textAlign: 'center'
                }}
                dangerouslySetInnerHTML={{ 
                    __html: renderLatex(typedText) 
                }} 
            />
        </div>
    );
};

export default LaTeXTyping;