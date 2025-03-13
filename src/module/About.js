import React from 'react';
import '../style/About.css';

import princetonLogo from '../assets/logos/princeton-logo.svg';
import smlLogo from '../assets/logos/SML-logo2.svg';
import cosLogo from '../assets/logos/cos.png';
import { useInView } from 'react-intersection-observer';
import HiddenDiv from './HiddenDiv';
import CodeTyping from './CodeTyping';
import LaTeXTyping from './LaTeXTyping';
import { THREASH, phrases, customPhrases, customEquations } from './Constants';


const About = () => {
    const [profileRef, profileInView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });
    
    const [contentRef, contentInView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    return (
        <section className="about-section">
            <HiddenDiv positionX={30} positionY={300} threshold={THREASH}>
            <LaTeXTyping 
                equation={customEquations[0]}
                typingSpeed={5}
                deletingSpeed={5}
                pauseDuration={2000}
            />
            </HiddenDiv>

            <HiddenDiv positionX={50} positionY={25} threshold={THREASH}>
            <LaTeXTyping 
                equation={customEquations[1]}
                typingSpeed={5}
                deletingSpeed={5}
                pauseDuration={2000}
            />
            </HiddenDiv>
            <div className="about-container">
                <div 
                    ref={profileRef}
                    className={`profile-image-container fade-in-section ${profileInView ? 'is-visible' : ''}`}
                >
                    <img 
                        src="https://avatars.githubusercontent.com/u/10978757?v=3" 
                        alt="Profile" 
                        className="profile-image"
                    />
                </div>
                <div 
                    ref={contentRef}
                    className={`about-content fade-in-section ${contentInView ? 'is-visible' : ''}`}
                >
                    <h2 className="greeting">
                        Hi, nice to meet you! 👋
                    </h2>
                    <p className="about-text">
                        I'm a Computer Science student at Princeton University minoring in Statistics & Machine Learning. I build cool things.
                    </p>
                    <div className="education-logos">
                        <img src={princetonLogo} alt="Princeton University" className="edu-logo princeton" />
                        <img src={cosLogo} alt="Computer Science" className="edu-logo sml" />
                        <img src={smlLogo} alt="Statistics & Machine Learning" className="edu-logo sml" />
                    </div>
                    <div className="tech-stack">
                        <h3>Tech Stack</h3>
                        <div className="tech-pills">
                            {["Python", "JavaScript", "React", "Node.js", "AWS", "TensorFlow", 
                              "SQL", "Docker"].map((tech, index) => (
                                <span key={index} className="tech-pill">{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;