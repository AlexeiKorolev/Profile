import React from 'react';
import useTypingEffect from '../hooks/Effects';
import 'katex/dist/katex.min.css';
import katex from 'katex';

const LaTeXTyping = () => {
    const latexEquations = [
        `E = mc^2`,
        `\\frac{d}{dx}e^x = e^x`,
        `\\int x^n dx = \\frac{x^{n+1}}{n+1} + C`,
        `\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}`
    ];

    const typedText = useTypingEffect(latexEquations, 5, 5, 2000);

    // Render LaTeX safely
    const renderLatex = (tex) => {
        try {
            return katex.renderToString(tex, {
                throwOnError: false,
                displayMode: true
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
                dangerouslySetInnerHTML={{ 
                    __html: renderLatex(typedText) 
                }} 
            />
        </div>
    );
};

export default LaTeXTyping;