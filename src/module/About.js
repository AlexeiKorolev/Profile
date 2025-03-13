import React from 'react';
import '../style/About.css';
import princetonLogo from '../assets/logos/princeton-logo.svg';
import smlLogo from '../assets/logos/princeton-logo.svg';
import blankLogo from '../assets/logos/princeton-logo.svg';

const About = () => {
    return (
        <section className="about-section">
            <div className="about-container">
                <div className="profile-image-container">
                    <img 
                        src="https://avatars.githubusercontent.com/u/10978757?v=3" 
                        alt="Profile" 
                        className="profile-image"
                    />
                </div>
                <div className="about-content">
                    <h2 className="greeting">
                        Hi, nice to meet you! 👋
                    </h2>
                    <p className="about-text">
                        I'm a Computer Science student at Princeton University minoring in Statistics & Machine Learning. I build, design, and solve.
                    </p>
                    <div className="education-logos">
                        <img src={princetonLogo} alt="Princeton University" className="edu-logo princeton" />
                        <img src={smlLogo} alt="Statistics & Machine Learning" className="edu-logo sml" />
                        <img src={blankLogo} alt="Additional Program" className="edu-logo" />
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