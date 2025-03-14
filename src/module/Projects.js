import React, { useState } from 'react';
import '../style/Projects.css';
import gsetVideo from '../assets/videos/gset.mp4';

const ProjectCard = ({ title, description, image, video, skills, links }) => {
    const [isHovered, setIsHovered] = useState(false);

    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, ${isHovered ? '1' : '0.2'}), 
                         rgba(0, 0, 0, ${isHovered ? '1' : '0.3'})), 
                         url(${image})`
    };

    return (
        <div 
            className="project-card" 
            style={backgroundStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {video && isHovered && (
                <video
                    className="project-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={video} type="video/mp4" />
                </video>
            )}
            <div className="project-content">
                <h3 className="project-title">{title}</h3>
                <p className="project-description">{description}</p>
                <div className="project-skills">
                    {skills.map((skill, index) => (
                        <span key={index} className="skill-bubble">{skill}</span>
                    ))}
                </div>
                <div className="project-links">
                    {links.github && (
                        <a href={links.github} className="project-link github" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                            GitHub
                        </a>
                    )}
                    {links.website && (
                        <a href={links.website} className="project-link website" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-globe"></i>
                            Website
                        </a>
                    )}
                    {links.video && (
                        <a href={links.video} className="project-link video" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle"></i>
                            Demo
                        </a>
                    )}
                    {links.details && (
                        <a href={links.details} className="project-link details" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-info-circle"></i>
                            Details
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const projects = [
        {
            title: "IEEE AI Research Paper",
            description: "Coauthored a research paper on AI and a novel method for biometric identification. Presented at the MIT Undergraduate Research Technology Conference.",
            skills: ["MATLAB", "Python", "Machine Learning", "Signal Processing", "Research"],
            video: gsetVideo,
            links: {
                website: "https://ieeexplore.ieee.org/document/10002184",
            }
        },
        {
            title: "Phonetic Sentiment Model",
            description: "Demonstrated that English encodes sentiment within the phonetic pronunciation of words, a proof of concept for a lightweight NLP smart-sentiment model.",
            skills: ["Python", "NLP", "Machine Learning", "Research", "Data Analysis"],
            video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            links: {
                github: "https://github.com/AlexeiKorolev/NLP-Phonetic-Sentiment",
            }
        }
        // Add more projects...
    ];
    return (
        <section className="projects-section">
            <h2 className="section-title" id="projects">Featured Projects</h2>
            <div className="projects-container">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;