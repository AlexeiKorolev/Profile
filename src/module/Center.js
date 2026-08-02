import React from 'react';
import '../style/Center.css';
import useTypingEffect from '../hooks/Effects';
import { phrases } from './Constants';
import profile from '../assets/ProfileCropped2.png';
import princetonLogo from '../assets/logos/princeton-logo.svg';

const Center = () => {
    const typedText = useTypingEffect(phrases, 100, 50, 2000);

    return (
        <div className="center-panel">
            <div className="center-card">
                <img src={profile} alt="Alexei Korolev" className="center-photo" />
                <h1 className="center-name">Alexei Korolev</h1>
                <div className="center-typing">{typedText}<span className="typing-cursor">|</span></div>
                <div className="center-edu">
                    <img src={princetonLogo} alt="Princeton University" className="center-edu-logo" />
                    <div className="center-edu-text">
                        <span>Princeton University</span>
                        <span>B.S.E. Computer Science · Minor in Statistics &amp; Machine Learning</span>
                    </div>
                </div>
                <p className="center-bio">
                    Hi! I'm currently interning at Meta and researching machine learning for
                    space-telescope wavefront control. Previously at
                    Nuro, Kenvue, Lycoming Engines, and a few startups. I build things and solve problems. 
                </p>
                <div className="center-links">
                    <a href="mailto:alexei.korolev@princeton.edu" aria-label="Email">
                        <i className="fas fa-envelope"></i>
                    </a>
                    <a href="https://github.com/AlexeiKorolev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://linkedin.com/in/alexei-korolev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
                <p className="center-footnote">
                    © {new Date().getFullYear()} Alexei Korolev · crafted without templates ;)
                </p>
            </div>
        </div>
    );
};

export default Center;
