import React, { useEffect, useRef } from 'react';
import '../style/Landing.css';
import useTypingEffect from '../hooks/Effects';

const Landing = () => {
    const titleRef = useRef(null);
    const phrases = [
        "Data Scientist",
        "Software Engineer",
        "AI Researcher",
        "Technology Enthusiast"
    ];
    
    const typedText = useTypingEffect(phrases, 100, 50, 2000);

    return (
        <div className="landing-container">
            <div ref={titleRef} className="title">Alexei Korolev</div>
            <div className="subtitle">{typedText}<span className="cursor">|</span></div>
        </div>
    );
};

export default Landing;