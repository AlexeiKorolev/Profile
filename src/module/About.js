import React from 'react';
import '../style/About.css';

const About = () => {
    return (
        <section className="about-section">
            <h2 className="section-title">About Me</h2>
            <div className="about-container">
                <div className="profile-image-container">
                    <img 
                        src="https://avatars.githubusercontent.com/u/10978757?v=3" 
                        alt="Alexei Korolev" 
                        className="profile-image"
                    />
                </div>
                <div className="about-content">
                    <p className="about-text">
                        Hi, I'm Alexei, a passionate Software Engineer and Data Scientist with expertise 
                        in building AI-powered solutions and scalable applications. With a background in 
                        both software development and data science, I bring a unique perspective to 
                        solving complex technical challenges.
                    </p>
                    <p className="about-text">
                        I specialize in machine learning, full-stack development, and cloud architecture. 
                        My experience spans across various industries, allowing me to deliver innovative 
                        solutions that drive real business value.
                    </p>
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