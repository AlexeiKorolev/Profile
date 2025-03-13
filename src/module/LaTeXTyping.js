import React from 'react';
import useTypingEffect from '../hooks/Effects';
import 'katex/dist/katex.min.css';
import katex from 'katex';

const LaTeXTyping = ({ 
    equations = [
        `E = mc^2`,
        `\\frac{d}{dx}e^x = e^x`,
        `\\int x^n dx = \\frac{x^{n+1}}{n+1} + C`,
        `\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}`
    ],
    typingSpeed = 5,
    deletingSpeed = 5,
    pauseDuration = 2000,
    fontSize = 1.5 // New prop for font size scaling
}) => {
    const typedText = useTypingEffect(equations, typingSpeed, deletingSpeed, pauseDuration);

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