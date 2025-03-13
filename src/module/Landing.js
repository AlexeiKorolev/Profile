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
            <div className="shape shape1"></div>
            <div className="shape shape2"></div>
            <div className="shape shape3"></div>
            <div className="shape shape4"></div>
            <div className="shape shape5"></div>
        </div>
    );
};

export default Landing;