import React, { useEffect, useRef } from 'react';
import '../style/Landing.css';
import useTypingEffect from '../hooks/Effects';
import HiddenDiv from './HiddenDiv';
import CodeTyping from './CodeTyping';
import LaTeXTyping from './LaTeXTyping';


const Landing = () => {
    const titleRef = useRef(null);
    const phrases = [
        "Data Scientist",
        "Software Engineer",
        "AI Researcher",
        "Technology Enthusiast"
    ];

    const customPhrases = [
        `// Simple quicksort implementation
    function quickSort(arr) {
        if (arr.length <= 1) return arr;
        
        const pivot = arr[0];
        const left = arr.filter((x, i) => i > 0 && x < pivot);
        const right = arr.filter(x => x >= pivot);
        
        return [...quickSort(left), pivot, ...quickSort(right)];
    }`,
        `// Binary search implementation
    function binarySearch(arr, target) {
        let left = 0;
        let right = arr.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }`
    ];

    const customEquations1 = [
        `\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i x \\xi} \\, dx`,
        `\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}`
    ];
    
    const customEquations2 = [
        `f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x - \\mu)^2}{2\\sigma^2}}`,
        `\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}`
    ];
    
    const customEquations3 = [
        `E[X] = \\int_{-\\infty}^{\\infty} x f(x) dx`,
        `E[X] = \\sum_{i} x_i P(x_i)`,
        `\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{i=1}^{n} X_i = E[X]`
    ];
    
    const customEquations4 = [
        `P(G, \\lambda) = \\sum_{i=1}^{n} (-1)^i c_i \\lambda^{n-i}`,
        `PR(v) = \\frac{1 - d}{N} + d \\sum_{u \\in \\text{in}(v)} \\frac{PR(u)}{\\deg^+(u)}`
    ];

    const typedText = useTypingEffect(phrases, 100, 50, 2000);

    return (
        <div className="landing-container">
            <div ref={titleRef} className="title">Alexei Korolev</div>
            <div className="subtitle">{typedText}<span className="cursor">|</span></div>
            <HiddenDiv positionX={30} positionY={30} threshold={400}>
            <LaTeXTyping 
                equations={customEquations1}
                typingSpeed={5}
                deletingSpeed={5}
                pauseDuration={2000}
            />
            </HiddenDiv>

            <HiddenDiv positionX={50} positionY={25} threshold={400}>
            <LaTeXTyping 
                equations={customEquations2}
                typingSpeed={5}
                deletingSpeed={5}
                pauseDuration={2000}
            />
            </HiddenDiv>

            <HiddenDiv positionX={50} positionY={70} threshold={400}>
            <LaTeXTyping 
                equations={customEquations3}
                typingSpeed={5}
                deletingSpeed={5}
                pauseDuration={2000}
            />
            </HiddenDiv>

            <HiddenDiv positionX={80} positionY={70} threshold={400}>
            <LaTeXTyping 
                equations={customEquations3}
                typingSpeed={5}
                deletingSpeed={5}
                pauseDuration={2000}
            />
            </HiddenDiv>

            <HiddenDiv positionX={80} positionY={40} threshold={400}>
            <CodeTyping 
                    phrases={customPhrases}
                    language="javascript"
                    typingSpeed={50}
                    deletingSpeed={5}
                    pauseDuration={2000}
                />
            </HiddenDiv>
            <div className="shape shape1"></div>
            <div className="shape shape2"></div>
            <div className="shape shape3"></div>
            <div className="shape shape4"></div>
            <div className="shape shape5"></div>
        </div>
    );
};

export default Landing;