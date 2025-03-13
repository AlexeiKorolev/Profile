import React, { useState } from 'react';
import '../style/Projects.css';

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
            title: "AI Analytics Platform",
            description: "A full-stack application providing real-time analytics and predictive insights using machine learning algorithms.",
            image: "/path/to/project1-image.jpg",
            skills: ["React", "Python", "TensorFlow", "AWS", "Node.js"],
            video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            links: {
                github: "https://github.com/username/project1",
                website: "https://project1.com",
                video: "https://youtube.com/demo1",
                details: "/projects/ai-analytics"
            }

        },
        {
            title: "AI Analytics Platform",
            description: "A full-stack application providing real-time analytics and predictive insights using machine learning algorithms.",
            image: "/path/to/project1-image.jpg",
            skills: ["React", "Python", "TensorFlow", "AWS", "Node.js"],
            links: {
                github: "https://github.com/username/project1",
                website: "https://project1.com",
                video: "https://youtube.com/demo1",
                details: "/projects/ai-analytics"
            }
        },
        {
            title: "AI Analytics Platform",
            description: "A full-stack application providing real-time analytics and predictive insights using machine learning algorithms.",
            image: "/path/to/project1-image.jpg",
            skills: ["React", "Python", "TensorFlow", "AWS", "Node.js"],
            links: {
                github: "https://github.com/username/project1",
                website: "https://project1.com",
                video: "https://youtube.com/demo1",
                details: "/projects/ai-analytics"
            }
        },
        // Add more projects...
    ];
    return (
        <section className="projects-section">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-container">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;